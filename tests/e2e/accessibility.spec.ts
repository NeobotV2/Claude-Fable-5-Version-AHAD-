import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

const publicRoutes = [
  { path: '/', heading: /Gebäudereinigung/i },
  { path: '/angebot', heading: /Vor-Ort-Besichtigung/i },
  { path: '/karriere/bewerbung', heading: /Sprache/i },
] as const;

async function expectNoSeriousAxeViolations(page: Page) {
  const result = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();
  const violations = result.violations
    .filter(({ impact }) => impact === 'serious' || impact === 'critical')
    .map(({ id, impact, nodes }) => ({ id, impact, targets: nodes.map((node) => node.target.join(' ')) }));
  expect(violations).toEqual([]);
}

function collectHydrationErrors(page: Page) {
  const errors: string[] = [];
  const hydrationPattern = /hydration|hydrating|Minified React error #(418|419|421|422|423|425)/i;
  page.on('console', (message) => {
    if (message.type() === 'error' && hydrationPattern.test(message.text())) errors.push(message.text());
  });
  page.on('pageerror', (error) => {
    if (hydrationPattern.test(error.message)) errors.push(error.message);
  });
  return errors;
}

for (const route of publicRoutes) {
  test(`${route.path} exposes its primary content and has no serious axe violations`, async ({ page }) => {
    const hydrationErrors = collectHydrationErrors(page);
    await page.goto(route.path, { waitUntil: 'networkidle' });
    await expect(page.getByRole('heading', { level: 1, name: route.heading })).toBeVisible();
    expect(hydrationErrors).toEqual([]);
    await expectNoSeriousAxeViolations(page);
  });
}

test('mobile navigation opens from the keyboard, traps focus and restores it on Escape', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  const opener = page.getByRole('button', { name: /Menü öffnen/i });
  await opener.focus();
  await page.keyboard.press('Enter');

  const dialog = page.getByRole('dialog', { name: 'Hauptnavigation' });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('button', { name: /Menü schließen/i })).toBeFocused();

  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(opener).toBeFocused();
});

test('desktop navigation disclosure supports Enter and Escape', async ({ page }) => {
  await page.goto('/');
  // Keep the locator stable while its accessible name changes open <-> close.
  const disclosure = page.locator('button[aria-controls="desktop-submenu-0"]');

  await expect(disclosure).toHaveAccessibleName(/Leistungen: Untermenü öffnen/i);
  await disclosure.focus();
  await page.keyboard.press('Enter');
  await expect(disclosure).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('#desktop-submenu-0')).toBeVisible();

  await page.keyboard.press('Escape');
  await expect(disclosure).toHaveAttribute('aria-expanded', 'false');
  await expect(disclosure).toBeFocused();
});

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  for (const route of publicRoutes) {
    test(`${route.path} keeps prerendered primary content visible`, async ({ page }) => {
      await page.goto(route.path);
      await expect(page.getByRole('heading', { level: 1, name: route.heading })).toBeVisible();
      await expect(page.locator('main')).not.toBeEmpty();
    });
  }
});
