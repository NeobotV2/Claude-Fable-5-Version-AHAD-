import { expect, test } from '@playwright/test';

/**
 * Freigegebene Referenzen und Kundenstimmen (Register in src/lib/site.ts,
 * Freigabe 2026-09-01) müssen sichtbar sein; strukturierte Claims ohne
 * Nachweis (Bewertungs-Aggregat, Filialen, Geo, Zertifikate) bleiben gesperrt.
 * Der Unternehmenseintrag des Hauptsitzes (Freigabe 2026-11-17) steht nur auf
 * der Startseite, der Kontaktseite und der Hauptsitz-Seite.
 */
const releasedByRoute = {
  '/': ['Diana Graupner', 'Südwest Messe'],
  '/referenzen': ['Diana Graupner', 'Matthias Porsche', 'Marvin Krüger'],
  '/standorte/konstanz': ['Britta Zorn'],
} as const;

const releasedLogos = ['allianz.svg', 'goldbeck.svg', 'sma-suedwest-messe.png'] as const;

for (const [route, names] of Object.entries(releasedByRoute)) {
  test(`${route} shows released references and keeps unverified structured claims unpublished`, async ({ page }) => {
    await page.goto(route);

    const visibleText = await page.locator('body').innerText();
    for (const name of names) expect(visibleText).toContain(name);

    if (route === '/referenzen') {
      for (const logo of releasedLogos) {
        await expect(page.locator(`img[src$="/images/clients/${logo}"]`).first()).toBeAttached();
      }
    }

    const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
    const schemas = blocks.join('\n');
    for (const schemaType of ['AggregateRating', 'GeoCoordinates', 'hasCredential']) {
      expect(schemas).not.toContain(schemaType);
    }
    if (route === '/') {
      const nodes = blocks.flatMap((block) => [JSON.parse(block)].flat() as Array<Record<string, unknown>>);
      const entry = nodes.find((node) => node['@type'] === 'LocalBusiness');
      expect(entry).toMatchObject({
        address: { streetAddress: 'Max-Planck-Straße 11', postalCode: '78052' },
        openingHoursSpecification: [{ opens: '08:00', closes: '17:00' }],
      });
    } else {
      expect(schemas).not.toContain('LocalBusiness');
    }

    expect(visibleText).not.toContain('Humboldtstraße 27');
    expect(visibleText).not.toContain('Brückengasse 1b');
  });
}
