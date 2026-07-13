import test from 'node:test';
import assert from 'node:assert/strict';
import { validateLeadPayload, validIdempotencyKey } from '../api/_lib/lead-validation.ts';

const contact = {
  type: 'contact',
  idempotencyKey: '123e4567-e89b-12d3-a456-426614174000',
  website: '',
  data: {
    contactPerson: '  Max Mustermann  ',
    company: 'Muster GmbH',
    email: 'MAX@EXAMPLE.COM',
    phone: '',
    serviceType: 'Unterhaltsreinigung',
    message: 'Bitte um Rückruf.',
    privacyNoticeAccepted: true,
    attribution: {
      landingPath: '/', entryPath: '/kontakt', entryService: '', entryIndustry: '', entryRegion: '',
      utmSource: '', utmMedium: '', utmCampaign: '', referrerHost: '',
    },
  },
};

test('normalizes a valid contact lead and allows email without phone', () => {
  const result = validateLeadPayload(contact);
  assert.equal(result.ok, true);
  if (result.ok && result.value.type === 'contact') {
    assert.equal(result.value.data.contactPerson, 'Max Mustermann');
    assert.equal(result.value.data.email, 'max@example.com');
  }
});

test('allows phone as the only contact channel', () => {
  const result = validateLeadPayload({
    ...contact,
    data: { ...contact.data, email: '', phone: '+49 170 1234567' },
  });
  assert.equal(result.ok, true);
});

test('rejects missing contact channels, false privacy notice confirmation and server-owned fields', () => {
  const result = validateLeadPayload({
    ...contact,
    data: { ...contact.data, email: '', phone: '', privacyNoticeAccepted: false, status: 'closed' },
  });
  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.ok(result.issues.some((issue) => issue.message.includes('Unbekannte Felder')));
    assert.ok(result.issues.some((issue) => issue.field === 'privacyNoticeAccepted'));
    assert.ok(result.issues.some((issue) => issue.message.includes('E-Mail oder Telefon')));
  }
});

const offer = {
  type: 'offer_lead',
  idempotencyKey: 'offer_1234567890abcdef',
  website: '',
  data: {
    objectType: 'Büro & Verwaltung',
    services: ['Unterhaltsreinigung'],
    areaSize: 'Unter 500 m²',
    frequency: 'Täglich',
    anforderungen: ['Feste Objektleitung'],
    serviceDetails: {
      glassAccess: '', productionMode: '', constructionPhase: '', winterAreaType: '',
      specialRequirements: 'Alarmanlage', desiredStart: '2026-08-01',
    },
    companyName: 'Muster GmbH',
    contactPerson: 'Max Mustermann',
    email: '',
    phone: '+49 170 1234567',
    location: 'Stuttgart',
    preferredTime: '',
    attribution: {
      landingPath: '/', entryPath: '/angebot', entryService: 'unterhalt', entryIndustry: '', entryRegion: 'stuttgart',
      utmSource: '', utmMedium: '', utmCampaign: '', referrerHost: '',
    },
    privacyNoticeAccepted: true,
  },
};

const allOfferServices = [
  'Unterhaltsreinigung', 'Industrie- & Produktionsreinigung', 'Glas- & Fassadenreinigung', 'Baureinigung',
  'Medizintechnik- & Reinraumreinigung', 'Sonderreinigung & Stillstandsservice',
  'Winterdienst & Hausmeisterservice', 'Küchenabluftreinigung', 'Sonstige Leistung',
];

test('accepts the extended offer schema', () => {
  const result = validateLeadPayload(offer);
  assert.equal(result.ok, true);
});

test('keeps company and deployment location optional for an early offer lead', () => {
  const result = validateLeadPayload({
    ...offer,
    data: { ...offer.data, companyName: '', location: '' },
  });
  assert.equal(result.ok, true);
});

test('accepts all nine offer service categories', () => {
  const result = validateLeadPayload({
    ...offer,
    data: { ...offer.data, services: allOfferServices },
  });
  assert.equal(result.ok, true);
});

test('rejects more than nine offer services', () => {
  const result = validateLeadPayload({
    ...offer,
    data: { ...offer.data, services: [...allOfferServices, 'Nicht erlaubt'] },
  });
  assert.equal(result.ok, false);
  if (!result.ok) assert.ok(result.issues.some((issue) => issue.field === 'services'));
});

test('accepts optional job identifiers but rejects invalid experience', () => {
  const valid = validateLeadPayload({
    type: 'job_application',
    idempotencyKey: 'job_1234567890abcdef',
    data: {
      jobType: 'Vollzeit', department: 'Unterhaltsreinigung', experience: 'Ja', startDate: 'Sofort',
      mobility: 'Ich habe ein Auto', location: '', name: 'Erika Muster', phone: '0170 1234567',
      whatsappOptIn: false, privacyNoticeAccepted: true, language: 'de', jobId: 'cleaner-vs', sourcePath: '/karriere/bewerbung',
      attribution: {
        landingPath: '/karriere', entryPath: '/karriere/bewerbung', entryService: '', entryIndustry: '', entryRegion: '',
        utmSource: 'google', utmMedium: 'organic', utmCampaign: '', referrerHost: 'google.de',
      },
    },
  });
  assert.equal(valid.ok, true);

  const invalid = validateLeadPayload({
    type: 'job_application',
    idempotencyKey: 'job_1234567890abcdef',
    data: {
      jobType: 'Vollzeit', department: 'Unterhaltsreinigung', experience: 'Vielleicht', startDate: 'Sofort',
      mobility: 'Auto', location: '', name: 'Erika Muster', phone: '0170 1234567',
      whatsappOptIn: false, privacyNoticeAccepted: true, language: 'de',
    },
  });
  assert.equal(invalid.ok, false);
});

test('idempotency keys are high-entropy URL-safe values', () => {
  assert.equal(validIdempotencyKey('123e4567-e89b-12d3-a456-426614174000'), true);
  assert.equal(validIdempotencyKey('short'), false);
  assert.equal(validIdempotencyKey('invalid key with spaces'), false);
});
