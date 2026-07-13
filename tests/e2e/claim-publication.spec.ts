import { expect, test } from '@playwright/test';

const blockedNames = [
  'Matthias Porsche',
  'Marvin Krüger',
  'Britta Zorn',
  'Diana Graupner',
  'Allianz',
  'GOLDBECK',
] as const;

for (const route of ['/', '/referenzen', '/standorte/konstanz'] as const) {
  test(`${route} keeps unapproved names and structured claims unpublished`, async ({ page }) => {
    await page.goto(route);

    const visibleText = await page.locator('body').innerText();
    for (const name of blockedNames) expect(visibleText).not.toContain(name);

    const schemas = (await page.locator('script[type="application/ld+json"]').allTextContents()).join('\n');
    for (const schemaType of ['AggregateRating', 'LocalBusiness', 'GeoCoordinates', 'hasCredential']) {
      expect(schemas).not.toContain(schemaType);
    }

    expect(visibleText).not.toContain('Humboldtstraße 27');
    expect(visibleText).not.toContain('Brückengasse 1b');
  });
}
