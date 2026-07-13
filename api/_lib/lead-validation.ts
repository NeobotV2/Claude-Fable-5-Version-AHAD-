export const LEAD_TYPES = ['contact', 'offer_lead', 'job_application'] as const;
export type LeadType = (typeof LEAD_TYPES)[number];

export type ValidationIssue = { field: string; message: string };

export type ContactData = {
  contactPerson: string;
  company: string;
  email: string;
  phone: string;
  serviceType: string;
  message: string;
  privacyNoticeAccepted: true;
  attribution: AttributionData;
};

export type AttributionData = {
  landingPath: string;
  entryPath: string;
  entryService: string;
  entryIndustry: string;
  entryRegion: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  referrerHost: string;
};

export type OfferData = {
  objectType: string;
  services: string[];
  areaSize: string;
  frequency: string;
  anforderungen: string[];
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  location: string;
  preferredTime: string;
  serviceDetails: {
    glassAccess: string;
    productionMode: string;
    constructionPhase: string;
    winterAreaType: string;
    specialRequirements: string;
    desiredStart: string;
  };
  attribution: AttributionData;
  privacyNoticeAccepted: true;
};

export type JobApplicationData = {
  jobType: string;
  department: string;
  experience: 'Ja' | 'Quereinsteiger';
  startDate: string;
  mobility: string;
  location: string;
  name: string;
  phone: string;
  whatsappOptIn: boolean;
  privacyNoticeAccepted: true;
  language: (typeof LANGUAGES)[number];
  jobId?: string;
  sourcePath?: string;
  attribution?: AttributionData;
};

export type ValidLead =
  | { type: 'contact'; data: ContactData }
  | { type: 'offer_lead'; data: OfferData }
  | { type: 'job_application'; data: JobApplicationData };

export type ValidationResult =
  | { ok: true; value: ValidLead }
  | { ok: false; issues: ValidationIssue[] };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+()\d][+()\d\s./-]{4,39}$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

const CONTACT_SERVICES = [
  'Unterhaltsreinigung',
  'Industrie- & Produktionsreinigung',
  'Glas- & Fassadenreinigung',
  'Baureinigung',
  'Medizintechnik- & Reinraumreinigung',
  'Sonderreinigung & Stillstandsservice',
  'Winterdienst & Hausmeisterservice',
  'Küchenabluftreinigung',
  'Sonstiges',
] as const;

const OBJECT_TYPES = [
  'Büro & Verwaltung', 'Industrie & Produktion', 'Medizintechnik & sensible Bereiche', 'Gewerbe & Logistik',
  'Hotellerie & Objektbetrieb', 'Öffentliche Einrichtung', 'Anderes Objekt',
] as const;
const OFFER_SERVICES = [
  'Unterhaltsreinigung',
  'Industrie- & Produktionsreinigung',
  'Glas- & Fassadenreinigung',
  'Baureinigung',
  'Medizintechnik- & Reinraumreinigung',
  'Sonderreinigung & Stillstandsservice',
  'Winterdienst & Hausmeisterservice',
  'Küchenabluftreinigung',
  'Sonstige Leistung',
] as const;
const AREA_SIZES = ['Unter 500 m²', '500–2.000 m²', 'Über 2.000 m²', 'Noch unbekannt'] as const;
const FREQUENCIES = ['Täglich', 'Mehrmals wöchentlich', 'Wöchentlich', 'Einmalig / nach Bedarf', 'Noch offen'] as const;
const REQUIREMENTS = [
  'Feste Objektleitung',
  'Dokumentierte Qualitätskontrollen',
  'Auditfähige Nachweise',
  'Reinigung im laufenden Betrieb',
  'Hygieneplan / Desinfektion',
  'Umweltschonende Verfahren',
  'Bestehendes Leistungsverzeichnis (LV)',
] as const;
const LANGUAGES = ['de', 'ar', 'tr', 'ru', 'ro', 'pl', 'it', 'uk', 'el', 'fr', 'en'] as const;

const EXACT_KEYS: Record<LeadType, readonly string[]> = {
  contact: ['contactPerson', 'company', 'email', 'phone', 'serviceType', 'message', 'privacyNoticeAccepted', 'attribution'],
  offer_lead: [
    'objectType', 'services', 'areaSize', 'frequency', 'anforderungen', 'companyName',
    'contactPerson', 'email', 'phone', 'location', 'preferredTime', 'serviceDetails',
    'attribution', 'privacyNoticeAccepted',
  ],
  job_application: [
    'jobType', 'department', 'experience', 'startDate', 'mobility', 'location',
    'name', 'phone', 'whatsappOptIn', 'privacyNoticeAccepted', 'language', 'jobId', 'sourcePath', 'attribution',
  ],
};

const REQUIRED_KEYS: Record<LeadType, readonly string[]> = {
  contact: EXACT_KEYS.contact,
  offer_lead: EXACT_KEYS.offer_lead,
  job_application: EXACT_KEYS.job_application.filter((key) => !['jobId', 'sourcePath', 'attribution'].includes(key)),
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function text(
  source: Record<string, unknown>,
  field: string,
  issues: ValidationIssue[],
  options: { min?: number; max: number; optional?: boolean } = { max: 200 },
): string {
  const raw = source[field];
  if (typeof raw !== 'string') {
    issues.push({ field, message: 'Muss Text sein.' });
    return '';
  }
  const value = raw.trim().replace(/\r\n?/g, '\n');
  const min = options.optional ? 0 : (options.min ?? 1);
  if (value.length < min) issues.push({ field, message: 'Pflichtfeld fehlt.' });
  if (value.length > options.max) issues.push({ field, message: `Maximal ${options.max} Zeichen.` });
  return value;
}

function booleanValue(source: Record<string, unknown>, field: string, issues: ValidationIssue[]): boolean {
  if (typeof source[field] !== 'boolean') {
    issues.push({ field, message: 'Muss true oder false sein.' });
    return false;
  }
  return source[field];
}

function member<T extends string>(value: string, allowed: readonly T[], field: string, issues: ValidationIssue[]): T {
  if (!allowed.includes(value as T)) issues.push({ field, message: 'Nicht erlaubter Wert.' });
  return value as T;
}

function stringArray<T extends string>(
  source: Record<string, unknown>,
  field: string,
  allowed: readonly T[],
  issues: ValidationIssue[],
  options: { min: number; max: number },
): T[] {
  const raw = source[field];
  if (!Array.isArray(raw) || raw.some((item) => typeof item !== 'string')) {
    issues.push({ field, message: 'Muss eine Textliste sein.' });
    return [];
  }
  const values = [...new Set(raw.map((item) => item.trim()))];
  if (values.length < options.min || values.length > options.max) {
    issues.push({ field, message: `Zwischen ${options.min} und ${options.max} Einträge erforderlich.` });
  }
  if (values.some((value) => !allowed.includes(value as T))) issues.push({ field, message: 'Enthält einen nicht erlaubten Wert.' });
  return values as T[];
}

function exactNestedStrings(
  source: Record<string, unknown>,
  field: string,
  keys: readonly string[],
  issues: ValidationIssue[],
  max: number,
): Record<string, string> {
  const raw = source[field];
  if (!isRecord(raw)) {
    issues.push({ field, message: 'JSON-Objekt erwartet.' });
    return Object.fromEntries(keys.map((key) => [key, '']));
  }
  const unknown = Object.keys(raw).filter((key) => !keys.includes(key));
  const missing = keys.filter((key) => !(key in raw));
  if (unknown.length) issues.push({ field, message: `Unbekannte Felder: ${unknown.join(', ')}.` });
  if (missing.length) issues.push({ field, message: `Fehlende Felder: ${missing.join(', ')}.` });
  return Object.fromEntries(keys.map((key) => [key, text(raw, key, issues, { max, optional: true })]));
}

function validateExactKeys(type: LeadType, data: Record<string, unknown>, issues: ValidationIssue[]) {
  const allowed = EXACT_KEYS[type];
  const unknown = Object.keys(data).filter((key) => !allowed.includes(key));
  const missing = REQUIRED_KEYS[type].filter((key) => !(key in data));
  if (unknown.length) issues.push({ field: 'data', message: `Unbekannte Felder: ${unknown.join(', ')}.` });
  if (missing.length) issues.push({ field: 'data', message: `Fehlende Felder: ${missing.join(', ')}.` });
}

export function validateLeadPayload(payload: unknown): ValidationResult {
  if (!isRecord(payload)) return { ok: false, issues: [{ field: 'body', message: 'JSON-Objekt erwartet.' }] };
  const topLevelKeys = Object.keys(payload);
  const unknownTopLevel = topLevelKeys.filter((key) => !['type', 'data', 'website', 'formStartedAt', 'idempotencyKey'].includes(key));
  const issues: ValidationIssue[] = [];
  if (unknownTopLevel.length) issues.push({ field: 'body', message: `Unbekannte Felder: ${unknownTopLevel.join(', ')}.` });

  if (typeof payload.type !== 'string' || !LEAD_TYPES.includes(payload.type as LeadType)) {
    issues.push({ field: 'type', message: 'Unbekannter Anfragetyp.' });
    return { ok: false, issues };
  }
  if (!isRecord(payload.data)) {
    issues.push({ field: 'data', message: 'JSON-Objekt erwartet.' });
    return { ok: false, issues };
  }

  const type = payload.type as LeadType;
  const data = payload.data;
  validateExactKeys(type, data, issues);

  if (type === 'contact') {
    const contactPerson = text(data, 'contactPerson', issues, { max: 120 });
    const company = text(data, 'company', issues, { max: 160 });
    const email = text(data, 'email', issues, { max: 254, optional: true }).toLowerCase();
    const phone = text(data, 'phone', issues, { max: 40, optional: true });
    const serviceType = member(text(data, 'serviceType', issues, { max: 80 }), CONTACT_SERVICES, 'serviceType', issues);
    const message = text(data, 'message', issues, { min: 5, max: 3000 });
    const privacyNoticeAccepted = booleanValue(data, 'privacyNoticeAccepted', issues);
    const attribution = exactNestedStrings(
      data,
      'attribution',
      ['landingPath', 'entryPath', 'entryService', 'entryIndustry', 'entryRegion', 'utmSource', 'utmMedium', 'utmCampaign', 'referrerHost'],
      issues,
      300,
    ) as AttributionData;
    if (email && !EMAIL_RE.test(email)) issues.push({ field: 'email', message: 'Ungültige E-Mail-Adresse.' });
    if (phone && !PHONE_RE.test(phone)) issues.push({ field: 'phone', message: 'Ungültige Telefonnummer.' });
    if (!email && !phone) issues.push({ field: 'email', message: 'E-Mail oder Telefon ist erforderlich.' });
    if (!privacyNoticeAccepted) issues.push({ field: 'privacyNoticeAccepted', message: 'Der Datenschutzhinweis muss bestätigt werden.' });
    return issues.length ? { ok: false, issues } : {
      ok: true,
      value: { type, data: { contactPerson, company, email, phone, serviceType, message, privacyNoticeAccepted: true, attribution } },
    };
  }

  if (type === 'offer_lead') {
    const objectType = member(text(data, 'objectType', issues, { max: 100 }), OBJECT_TYPES, 'objectType', issues);
    const services = stringArray(data, 'services', OFFER_SERVICES, issues, { min: 1, max: 9 });
    const areaSize = member(text(data, 'areaSize', issues, { max: 40 }), AREA_SIZES, 'areaSize', issues);
    const frequency = member(text(data, 'frequency', issues, { max: 50 }), FREQUENCIES, 'frequency', issues);
    const anforderungen = stringArray(data, 'anforderungen', REQUIREMENTS, issues, { min: 0, max: 8 });
    const companyName = text(data, 'companyName', issues, { max: 160, optional: true });
    const contactPerson = text(data, 'contactPerson', issues, { max: 120 });
    const email = text(data, 'email', issues, { max: 254, optional: true }).toLowerCase();
    const phone = text(data, 'phone', issues, { max: 40, optional: true });
    const location = text(data, 'location', issues, { max: 160, optional: true });
    const preferredTime = text(data, 'preferredTime', issues, { max: 200, optional: true });
    const serviceDetails = exactNestedStrings(
      data,
      'serviceDetails',
      ['glassAccess', 'productionMode', 'constructionPhase', 'winterAreaType', 'specialRequirements', 'desiredStart'],
      issues,
      500,
    ) as OfferData['serviceDetails'];
    const attribution = exactNestedStrings(
      data,
      'attribution',
      ['landingPath', 'entryPath', 'entryService', 'entryIndustry', 'entryRegion', 'utmSource', 'utmMedium', 'utmCampaign', 'referrerHost'],
      issues,
      300,
    ) as OfferData['attribution'];
    const privacyNoticeAccepted = booleanValue(data, 'privacyNoticeAccepted', issues);
    if (email && !EMAIL_RE.test(email)) issues.push({ field: 'email', message: 'Ungültige E-Mail-Adresse.' });
    if (phone && !PHONE_RE.test(phone)) issues.push({ field: 'phone', message: 'Ungültige Telefonnummer.' });
    if (!email && !phone) issues.push({ field: 'email', message: 'E-Mail oder Telefon ist erforderlich.' });
    if (!privacyNoticeAccepted) issues.push({ field: 'privacyNoticeAccepted', message: 'Der Datenschutzhinweis muss bestätigt werden.' });
    return issues.length ? { ok: false, issues } : {
      ok: true,
      value: {
        type,
        data: {
          objectType, services, areaSize, frequency, anforderungen, companyName, contactPerson,
          email, phone, location, preferredTime, serviceDetails, attribution, privacyNoticeAccepted: true,
        },
      },
    };
  }

  const jobType = text(data, 'jobType', issues, { max: 100 });
  const department = text(data, 'department', issues, { max: 120 });
  const experience = member(text(data, 'experience', issues, { max: 30 }), ['Ja', 'Quereinsteiger'] as const, 'experience', issues);
  const startDate = text(data, 'startDate', issues, { max: 20 });
  const mobility = text(data, 'mobility', issues, { max: 100 });
  const location = text(data, 'location', issues, { max: 160, optional: true });
  const name = text(data, 'name', issues, { max: 120 });
  const phone = text(data, 'phone', issues, { max: 40 });
  const whatsappOptIn = booleanValue(data, 'whatsappOptIn', issues);
  const privacyNoticeAccepted = booleanValue(data, 'privacyNoticeAccepted', issues);
  const language = member(text(data, 'language', issues, { max: 5 }), LANGUAGES, 'language', issues);
  const jobId = 'jobId' in data ? text(data, 'jobId', issues, { max: 100, optional: true }) : undefined;
  const sourcePath = 'sourcePath' in data ? text(data, 'sourcePath', issues, { max: 300, optional: true }) : undefined;
  const attribution = 'attribution' in data ? exactNestedStrings(
    data,
    'attribution',
    ['landingPath', 'entryPath', 'entryService', 'entryIndustry', 'entryRegion', 'utmSource', 'utmMedium', 'utmCampaign', 'referrerHost'],
    issues,
    300,
  ) as AttributionData : undefined;
  if (startDate !== 'Sofort' && !DATE_RE.test(startDate)) issues.push({ field: 'startDate', message: 'Datum im Format YYYY-MM-DD oder „Sofort“ erwartet.' });
  if (phone && !PHONE_RE.test(phone)) issues.push({ field: 'phone', message: 'Ungültige Telefonnummer.' });
  if (!privacyNoticeAccepted) issues.push({ field: 'privacyNoticeAccepted', message: 'Der Datenschutzhinweis muss bestätigt werden.' });
  return issues.length ? { ok: false, issues } : {
    ok: true,
    value: {
      type,
      data: {
        jobType, department, experience, startDate, mobility, location, name, phone,
        whatsappOptIn, privacyNoticeAccepted: true, language,
        ...(jobId ? { jobId } : {}),
        ...(sourcePath ? { sourcePath } : {}),
        ...(attribution ? { attribution } : {}),
      },
    },
  };
}

export function validIdempotencyKey(value: unknown): value is string {
  return typeof value === 'string' && /^[A-Za-z0-9_-]{16,128}$/.test(value);
}
