import { expect, test, type Page } from '@playwright/test';

/**
 * Live-Funktionstest gegen www.ahad-cleaning.de: füllt die drei Formulare wie
 * ein Besucher aus und protokolliert die Antwort von /api/send-email.
 * Erzeugt echte, als TEST markierte Anfragen. Nur manuell/gezielt ausführen.
 */
const STAMP = new Date().toISOString().slice(0, 16).replace('T', ' ');
const MARK = `TEST Funktionsprüfung ${STAMP} UTC (bitte ignorieren)`;

async function submitAndReport(page: Page, label: string, submit: () => Promise<void>) {
  const responsePromise = page.waitForResponse((r) => r.url().includes('/api/send-email') && r.request().method() === 'POST', { timeout: 45_000 });
  await submit();
  const response = await responsePromise;
  const body = await response.text();
  console.log(`\n### ${label}: HTTP ${response.status()} ${body}`);
  await page.waitForTimeout(1500);
  const alert = page.getByRole('alert');
  if (await alert.count()) console.log(`### ${label}: Fehlermeldung im Formular: ${(await alert.first().innerText()).replace(/\s+/g, ' ')}`);
  return response;
}

test('Kontaktformular', async ({ page }) => {
  await page.goto('/kontakt');
  await page.getByLabel('Ihr Name *').fill(MARK);
  await page.getByLabel('Unternehmen *').fill('AHAD Website-Test');
  await page.getByLabel('E-Mail').fill('info@ahad-cleaning.de');
  await page.getByLabel('Ihre Nachricht *').fill(`${MARK}. Automatischer Funktionstest des Kontaktformulars.`);
  const res = await submitAndReport(page, 'Kontakt', () => page.getByRole('button', { name: 'Nachricht senden' }).click());
  expect.soft(res.status(), 'Kontakt: Serverantwort').toBeLessThan(300);
  await expect.soft(page.getByRole('heading', { name: 'Nachricht übermittelt' })).toBeVisible();
});

test('Angebots-Funnel', async ({ page }) => {
  await page.goto('/angebot?service=unterhaltsreinigung&utm_source=funktionstest');
  await page.getByRole('button', { name: /Büro & Verwaltung/ }).click();
  await page.getByRole('button', { name: /^Weiter/ }).click();
  await page.getByRole('button', { name: 'Unter 500 m²' }).click();
  await page.getByRole('button', { name: 'Täglich' }).click();
  await page.getByRole('button', { name: /^Weiter/ }).click();
  await page.getByLabel('Ansprechperson *').fill(MARK);
  await page.getByLabel('E-Mail').fill('info@ahad-cleaning.de');
  const res = await submitAndReport(page, 'Angebot', () => page.getByRole('button', { name: 'Besichtigung anfragen' }).click());
  expect.soft(res.status(), 'Angebot: Serverantwort').toBeLessThan(300);
  await expect.soft(page.getByRole('heading', { name: /Anfrage übermittelt/i })).toBeVisible();
});

test('Bewerbungs-Funnel', async ({ page }) => {
  await page.goto('/karriere/bewerbung');
  await expect(async () => {
    await page.getByRole('button', { name: /Deutsch/ }).click();
    await expect(page.getByRole('button', { name: /Vollzeit:/ })).toBeVisible({ timeout: 1_500 });
  }).toPass({ timeout: 20_000 });
  await page.getByRole('button', { name: /Vollzeit:/ }).click();
  await page.getByRole('button', { name: /Hausmeisterservice/ }).click();
  await page.getByRole('button', { name: 'Ja, ich habe Erfahrung' }).click();
  await page.getByRole('button', { name: 'Ab sofort' }).click();
  await page.getByRole('radio', { name: 'Ich habe ein Auto' }).check();
  await page.getByRole('button', { name: 'Weiter' }).click();
  await page.getByLabel('Vor- und Nachname').fill(MARK);
  await page.getByLabel('Handynummer').fill('07721 9447915');
  const res = await submitAndReport(page, 'Bewerbung', () => page.getByRole('button', { name: 'Bewerbung absenden' }).click());
  expect.soft(res.status(), 'Bewerbung: Serverantwort').toBeLessThan(300);
  await expect.soft(page.getByRole('heading', { name: 'Bewerbung gesendet' })).toBeVisible();
});
