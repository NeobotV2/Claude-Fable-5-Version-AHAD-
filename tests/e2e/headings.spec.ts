/// <reference lib="dom" />

import { readFileSync } from 'node:fs';
import { expect, test, type Locator } from '@playwright/test';
import { languages, translations } from '../../src/constants/funnelTranslations';

interface RouteManifest {
  pages: Array<{
    path: string;
    requireH1?: boolean;
  }>;
}

const manifest = JSON.parse(
  readFileSync(new URL('../../src/route-manifest.json', import.meta.url), 'utf8'),
) as RouteManifest;

const publicHeadingRoutes = manifest.pages
  .filter((route) => route.requireH1 !== false)
  .map((route) => route.path);

const viewports = [
  { width: 320, height: 800 },
  { width: 390, height: 844 },
  { width: 1440, height: 900 },
] as const;

const funnelHeadingKeys = [
  'successTitle',
  'step1Title',
  'step2Title',
  'step3Title',
  'step4Title',
] as const;

async function inspectHeading(heading: Locator) {
  return heading.evaluate((element) => {
    const splitTokens: Array<{ token: string; lineTops: number[] }> = [];
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    let token = '';
    let tokenCharacterTops: number[] = [];

    const finishToken = () => {
      if (!token) return;

      const lineTops: number[] = [];
      for (const top of tokenCharacterTops) {
        if (!lineTops.some((knownTop) => Math.abs(knownTop - top) <= 1)) {
          lineTops.push(top);
        }
      }

      if (lineTops.length > 1) {
        splitTokens.push({
          token,
          lineTops: lineTops.map((top) => Number(top.toFixed(2))),
        });
      }

      token = '';
      tokenCharacterTops = [];
    };

    let textNode = walker.nextNode();
    while (textNode) {
      const text = textNode.textContent ?? '';
      for (let offset = 0; offset < text.length; offset += 1) {
        const character = text[offset];
        // Whitespace is the only delimiter, so hyphenated compounds stay one token.
        if (/\s/u.test(character)) {
          finishToken();
          continue;
        }

        token += character;
        const range = document.createRange();
        range.setStart(textNode, offset);
        range.setEnd(textNode, offset + 1);
        const rect = range.getBoundingClientRect();
        if (rect.height > 0) tokenCharacterTops.push(rect.top);
      }
      textNode = walker.nextNode();
    }
    finishToken();

    const style = getComputedStyle(element);
    return {
      text: element.textContent?.replace(/\s+/gu, ' ').trim() ?? '',
      breakCount: element.querySelectorAll('br').length,
      splitTokens,
      overflow: element.scrollWidth - element.clientWidth,
      overflowWrap: style.overflowWrap,
      wordBreak: style.wordBreak,
    };
  });
}

function expectHeadingIntact(
  metrics: Awaited<ReturnType<typeof inspectHeading>>,
  context: string,
) {
  expect.soft(metrics.breakCount, `${context} should not use forced <br> elements`).toBe(0);
  expect.soft(metrics.overflow, `${context} should not overflow horizontally`).toBeLessThanOrEqual(1);
  expect.soft(
    metrics.splitTokens,
    `${context} split a non-whitespace token across visual lines ` +
      `(overflow-wrap: ${metrics.overflowWrap}; word-break: ${metrics.wordBreak})`,
  ).toEqual([]);
}

test.describe('responsive primary headings', () => {
  for (const viewport of viewports) {
    test(`all public H1 headings stay intact at ${viewport.width}px`, async ({ page }) => {
      test.setTimeout(90_000);
      await page.setViewportSize(viewport);

      for (const path of publicHeadingRoutes) {
        await test.step(path, async () => {
          await page.goto(path, { waitUntil: 'domcontentloaded' });
          await page.evaluate(() => document.fonts.ready);

          const headings = page.locator('h1');
          const headingCount = await headings.count();
          expect.soft(
            headingCount,
            `${path} should render exactly one H1 at ${viewport.width}px`,
          ).toBe(1);

          if (headingCount !== 1) return;

          const metrics = await inspectHeading(headings.first());

          const context = `${path} at ${viewport.width}px (\"${metrics.text}\")`;
          expectHeadingIntact(metrics, context);
        });
      }
    });
  }

  test('all translated career funnel headings stay intact at 320px', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    await page.goto('/karriere/bewerbung', { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => document.fonts.ready);

    const german = languages.find((language) => language.id === 'de');
    if (!german) throw new Error('German funnel language is missing');

    await page.locator('button').filter({ hasText: german.label }).click();
    const heading = page.locator('h1');
    await expect(heading).toHaveText(translations.de.step1Title);

    for (const language of languages) {
      for (const key of funnelHeadingKeys) {
        await test.step(`${language.id}: ${key}`, async () => {
          const text = translations[language.id][key];
          await heading.evaluate((element, value) => {
            element.textContent = value.text;
            element.setAttribute('dir', value.rtl ? 'rtl' : 'ltr');
          }, { text, rtl: Boolean(language.rtl) });

          const metrics = await inspectHeading(heading);
          expectHeadingIntact(
            metrics,
            `/karriere/bewerbung ${language.id}.${key} at 320px (\"${text}\")`,
          );
        });
      }
    }
  });
});
