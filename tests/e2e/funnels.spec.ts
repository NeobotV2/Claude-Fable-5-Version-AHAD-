import { expect, test, type Page } from '@playwright/test';

type CapturedLead = { type?: string; data?: Record<string, unknown>; idempotencyKey?: string };

async function captureLeadEndpoint(page: Page) {
  let captured: CapturedLead | null = null;
  await page.route('**/api/send-email', async (route) => {
    captured = route.request().postDataJSON() as CapturedLead;
    await route.fulfill({
      status: 201,
      contentType: 'application/json',
      body: JSON.stringify({
        success: true,
        accepted: true,
        requestId: 'e2e-request',
        leadId: 'e2e-lead',
        duplicate: false,
        notificationSent: true,
      }),
    });
  });
  return () => captured;
}

test('offer funnel completes with one contact channel and preserves PII-free attribution', async ({ page }) => {
  const captured = await captureLeadEndpoint(page);
  await page.goto('/angebot?service=unterhaltsreinigung&utm_source=e2e&utm_campaign=funnel');

  await page.getByRole('button', { name: /Büro & Verwaltung/ }).click();
  await page.getByRole('button', { name: /^Weiter/ }).click();
  await page.getByRole('button', { name: 'Unter 500 m²' }).click();
  await page.getByRole('button', { name: 'Täglich' }).click();
  await page.getByRole('button', { name: /^Weiter/ }).click();
  await page.getByLabel('Ansprechperson *').fill('E2E Kontakt');
  await page.getByLabel('E-Mail').fill('e2e@example.com');
  await page.getByRole('button', { name: 'Besichtigung anfragen' }).click();

  await expect(page.getByRole('heading', { name: /Anfrage erfolgreich übermittelt/i })).toBeVisible();
  const payload = captured();
  expect(payload?.type).toBe('offer_lead');
  expect(payload?.idempotencyKey).toMatch(/^[A-Za-z0-9_-]{16,128}$/);
  expect(payload?.data?.phone).toBe('');
  expect(payload?.data?.companyName).toBe('');
  expect(payload?.data?.location).toBe('');
  expect((payload?.data?.attribution as Record<string, unknown>)?.utmSource).toBe('e2e');
});

test('contact form accepts email without phone through the server endpoint', async ({ page }) => {
  const captured = await captureLeadEndpoint(page);
  await page.goto('/kontakt');

  await page.getByLabel('Ihr Name *').fill('E2E Kontakt');
  await page.getByLabel('Unternehmen *').fill('E2E GmbH');
  await page.getByLabel('E-Mail').fill('kontakt@example.com');
  await page.getByLabel('Ihre Nachricht *').fill('Automatisierter Integrations-Smoke-Test.');
  await page.getByRole('button', { name: 'Nachricht senden' }).click();

  await expect(page.getByRole('heading', { name: 'Nachricht übermittelt' })).toBeVisible();
  expect(captured()?.type).toBe('contact');
  expect(captured()?.data?.phone).toBe('');
});

test('application profile reaches the API without WhatsApp consent', async ({ page }) => {
  const captured = await captureLeadEndpoint(page);
  await page.goto('/karriere/bewerbung?profile=reinigungskraft-vs');

  await page.getByRole('button', { name: /Deutsch/ }).click();
  await page.getByRole('button', { name: /Vollzeit:/ }).click();
  await page.getByRole('button', { name: /Unterhaltsreinigung/ }).click();
  await page.getByRole('button', { name: 'Ja, ich habe Erfahrung' }).click();
  await page.getByRole('button', { name: 'Ab sofort' }).click();
  await page.getByRole('radio', { name: 'Ich habe ein Auto' }).check();
  await page.getByRole('button', { name: 'Weiter' }).click();
  await page.getByLabel('Vor- und Nachname').fill('E2E Bewerber');
  await page.getByLabel('Handynummer').fill('0170 1234567');
  await page.getByRole('button', { name: 'Bewerbung absenden' }).click();

  await expect(page.getByRole('heading', { name: 'Bewerbung gesendet!' })).toBeVisible();
  const payload = captured();
  expect(payload?.type).toBe('job_application');
  expect(payload?.data?.jobId).toBe('reinigungskraft-vs');
  expect(payload?.data?.whatsappOptIn).toBe(false);
});
