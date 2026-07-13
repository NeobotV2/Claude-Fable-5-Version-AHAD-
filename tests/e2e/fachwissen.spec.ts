/// <reference lib="dom" />

import { expect, test } from '@playwright/test';

const articlePaths = [
  '/fachwissen/unterhaltsreinigung-unternehmen-reinigungsintervalle',
  '/fachwissen/iso-9001-iso-14001-gebaeudereinigung-unternehmen',
  '/fachwissen/industrie-produktionsreinigung-ohne-prozessstoerung',
  '/fachwissen/reinigungsfirma-wechseln-checkliste-tipps',
  '/fachwissen/leistungsverzeichnis-gebaeudereinigung-erstellen',
  '/fachwissen/kuechenabluftreinigung-vdi-2052-pflicht-ablauf-nachweis',
  '/fachwissen/was-kostet-gebaeudereinigung-stundensatz-preise',
  '/fachwissen/checkliste-reinigungsangebot',
] as const;

test('Fachwissen is organized by decision and role with eight canonical guides', async ({ page }) => {
  await page.goto('/fachwissen', { waitUntil: 'networkidle' });

  await expect(page.getByRole('heading', { level: 1, name: 'Gebäudereinigung sicher entscheiden' })).toBeVisible();
  await expect(page.getByRole('navigation', { name: 'Themenpfade' }).getByRole('link')).toHaveCount(4);
  await expect(page.getByRole('heading', { level: 2, name: 'Empfohlene Einstiege für Ihre Rolle' })).toBeVisible();

  const roleRegion = page.locator('section[aria-labelledby="rollen-einstieg"]');
  await expect(roleRegion.getByRole('heading', { level: 3 })).toHaveCount(3);

  const guideRegion = page.locator('section[aria-labelledby="alle-leitfaeden"]');
  const guideLinks = guideRegion.locator('a[href^="/fachwissen/"]');
  await expect(guideLinks).toHaveCount(8);
  const hrefs = await guideLinks.evaluateAll((links) => links.map((link) => link.getAttribute('href')));
  expect(new Set(hrefs).size).toBe(8);
});

for (const path of articlePaths) {
  test(`${path} exposes orientation, sources and related next steps`, async ({ page }) => {
    await page.goto(path, { waitUntil: 'networkidle' });

    const article = page.getByRole('article');
    await expect(article).toBeVisible();
    await expect(article.getByRole('navigation', { name: 'Inhaltsübersicht' })).toBeVisible();

    const tocLinks = article.getByRole('navigation', { name: 'Inhaltsübersicht' }).getByRole('link');
    expect(await tocLinks.count()).toBeGreaterThanOrEqual(4);
    for (const href of await tocLinks.evaluateAll((links) => links.map((link) => link.getAttribute('href')))) {
      expect(href).toMatch(/^#[a-z0-9-]+$/);
      await expect(page.locator(href as string)).toHaveCount(1);
    }

    const sourceRegion = article.locator('section[aria-labelledby$="-quellen"]');
    await expect(sourceRegion.getByRole('heading', { level: 2, name: 'Quellen & Prüfstand' })).toBeVisible();
    expect(await sourceRegion.locator('a[target="_blank"]').count()).toBeGreaterThanOrEqual(2);
    const relatedNavigation = article.getByRole('navigation', { name: 'Passend weiterarbeiten' });
    await expect(relatedNavigation.locator('a[href^="/fachwissen/"]')).toHaveCount(2);

    const tables = article.locator('table');
    for (let index = 0; index < await tables.count(); index += 1) {
      const table = tables.nth(index);
      await expect(table.locator('caption')).toHaveCount(1);
      const headers = table.locator('th');
      for (let headerIndex = 0; headerIndex < await headers.count(); headerIndex += 1) {
        await expect(headers.nth(headerIndex)).toHaveAttribute('scope', /^(col|row)$/);
      }
      await expect(table.locator('xpath=ancestor::div[@role="region" and @tabindex="0"][1]')).toHaveCount(1);
    }
  });
}

test('Fachwissen and every guide have no page-level overflow at 320px', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });

  for (const path of ['/fachwissen', ...articlePaths]) {
    await page.goto(path, { waitUntil: 'networkidle' });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow, path).toBeLessThanOrEqual(1);
  }
});
