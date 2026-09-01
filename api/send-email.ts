/**
 * Server-only lead intake: validates, rate-limits and persists exactly once,
 * then attempts the Resend notification. The historical URL remains stable so
 * existing deployments do not need a routing migration.
 */
import { createHash, createHmac, randomUUID } from 'node:crypto';
import { FieldValue, Timestamp, type DocumentReference } from 'firebase-admin/firestore';
import { Resend } from 'resend';
import { getAdminFirestore } from './_lib/firebase-admin.js';
import {
  type ValidLead,
  validIdempotencyKey,
  validateLeadPayload,
} from './_lib/lead-validation.js';

const MAX_BODY_BYTES = 24 * 1024;
const DEFAULT_RATE_WINDOW_MS = 60_000;
const DEFAULT_RATE_MAX = 5;
/** Wie oft eine fehlgeschlagene Benachrichtigung bei Wiederholungen nachgeholt wird. */
const MAX_NOTIFICATION_ATTEMPTS = 3;
const PRIVACY_NOTICE_VERSION = process.env.PRIVACY_NOTICE_VERSION?.trim() || '2026-07-12';
const WHATSAPP_NOTICE_VERSION = process.env.WHATSAPP_NOTICE_VERSION?.trim() || '2026-07-12';

const COLLECTIONS = {
  contact: 'leads',
  offer_lead: 'offer_leads',
  job_application: 'job_applications',
} as const;

const RETENTION_DAYS = {
  contact: 730,
  offer_lead: 730,
  job_application: 365,
} as const;

type ApiRequest = {
  method?: string;
  body?: unknown;
  headers?: Record<string, string | string[] | undefined>;
  socket?: { remoteAddress?: string };
};

type ApiResponse = {
  setHeader(name: string, value: string): void;
  status(code: number): ApiResponse;
  json(value: unknown): void;
};

class RateLimitError extends Error {}

function header(req: ApiRequest, name: string): string {
  const value = req.headers?.[name] ?? req.headers?.[name.toLowerCase()];
  return Array.isArray(value) ? (value[0] ?? '') : (value ?? '');
}

function clientIp(req: ApiRequest): string {
  const forwarded = header(req, 'x-forwarded-for');
  return forwarded.split(',')[0]?.trim() || header(req, 'x-real-ip').trim() || req.socket?.remoteAddress || 'unknown';
}

function safeParse(value: string): unknown {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function requestBody(req: ApiRequest): unknown {
  return typeof req.body === 'string' ? safeParse(req.body) : req.body;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function allowedOrigins(): Set<string> {
  const configured = process.env.LEAD_ALLOWED_ORIGINS?.split(',').map((value) => value.trim()).filter(Boolean) ?? [];
  const origins = new Set(['https://www.ahad-cleaning.de', 'https://ahad-cleaning.de', ...configured]);
  // Preview-Deployments (*.vercel.app) dürfen die Formulare testen — nie in Production.
  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production') {
    for (const host of [process.env.VERCEL_URL, process.env.VERCEL_BRANCH_URL]) {
      if (host?.trim()) origins.add(`https://${host.trim()}`);
    }
  }
  return origins;
}

function sendError(
  res: ApiResponse,
  status: number,
  requestId: string,
  code: string,
  message: string,
  fields?: Record<string, string>,
) {
  res.status(status).json({
    success: false,
    requestId,
    error: { code, message, ...(fields && Object.keys(fields).length ? { fields } : {}) },
  });
}

function accepted(
  res: ApiResponse,
  status: number,
  requestId: string,
  options: { leadId?: string; duplicate: boolean; notificationSent: boolean },
) {
  res.status(status).json({
    success: true,
    accepted: true,
    requestId,
    ...(options.leadId ? { leadId: options.leadId } : {}),
    duplicate: options.duplicate,
    notificationSent: options.notificationSent,
  });
}

function esc(value: unknown): string {
  return String(value ?? '')
    .slice(0, 3000)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function row(label: string, value: unknown): string {
  if (value === '' || value === null || value === undefined) return '';
  const rendered = Array.isArray(value) ? value.join(', ') : value;
  return `<p style="margin:4px 0"><strong>${esc(label)}:</strong> ${esc(rendered)}</p>`;
}

function wrap(title: string, color: string, inner: string, source: string, requestId: string): string {
  return `<div style="font-family:sans-serif;padding:20px;color:#333">
    <h2 style="color:${color}">${esc(title)}</h2>
    ${inner}
    <hr style="border:1px solid #eee;margin:20px 0"/>
    <p style="font-size:12px;color:#666">Quelle: ${esc(source)} · Vorgang: ${esc(requestId)}</p>
  </div>`;
}

function emailFor(lead: ValidLead, requestId: string): { subject: string; html: string; replyTo?: string } {
  if (lead.type === 'contact') {
    const data = lead.data;
    return {
      subject: `Neue Kontaktanfrage: ${data.contactPerson.slice(0, 80)}`,
      html: wrap('Neue Kontaktanfrage', '#004888',
        row('Name', data.contactPerson) + row('Firma', data.company) + row('E-Mail', data.email) +
        row('Telefon', data.phone) + row('Leistung', data.serviceType) + row('Nachricht', data.message),
        'AHAD-Kontaktformular', requestId),
      ...(data.email ? { replyTo: data.email } : {}),
    };
  }

  if (lead.type === 'offer_lead') {
    const data = lead.data;
    const details = data.serviceDetails;
    return {
      subject: `Neue Angebotsanfrage: ${(data.companyName || data.contactPerson).slice(0, 80)}`,
      html: wrap('Neue Angebotsanfrage', '#004888',
        row('Firma', data.companyName) + row('Ansprechpartner', data.contactPerson) + row('E-Mail', data.email) +
        row('Telefon', data.phone) + row('Standort', data.location) + row('Objektart', data.objectType) +
        row('Leistungen', data.services) + row('Fläche', data.areaSize) + row('Intervall', data.frequency) +
        row('Anforderungen', data.anforderungen) +
        row('Glasflächen: Zugänglichkeit', details.glassAccess) +
        row('Produktions-/Schichtbetrieb', details.productionMode) +
        row('Bauphase / Übergabetermin', details.constructionPhase) +
        row('Winterdienst: Flächen / Bereitschaft', details.winterAreaType) +
        row('Hygiene-/Dokumentationsanforderungen', details.specialRequirements) +
        row('Gewünschter Start', details.desiredStart) +
        row('Zeitfenster für die Besichtigung', data.preferredTime) +
        attributionRows(data.attribution),
        'AHAD-Angebots-Funnel', requestId),
      ...(data.email ? { replyTo: data.email } : {}),
    };
  }

  const data = lead.data;
  return {
    subject: `Neue Bewerbung: ${data.name.slice(0, 80)} (${data.jobType.slice(0, 60)})`,
    html: wrap('Neue Bewerbung', '#005332',
      row('Name', data.name) + row('Telefon', data.phone) + row('Stelle', data.jobType) +
      row('Bereich', data.department) + row('Stellenprofil', data.jobId) + row('Erfahrung', data.experience) +
      row('Startdatum', data.startDate) + row('Mobilität', data.mobility) + row('Standort', data.location) +
      row('Sprache', data.language) + row('WhatsApp erlaubt', data.whatsappOptIn ? 'Ja' : 'Nein') +
      row('Formular-URL', data.sourcePath) + attributionRows(data.attribution),
      'AHAD-Karriere-Funnel', requestId),
  };
}

/** PII-freie Herkunftsdaten (Einstiegsseite, Kampagne) für die Auswertung im Postfach. */
function attributionRows(attribution: ValidLead['data']['attribution']): string {
  if (!attribution) return '';
  const campaign = [attribution.utmSource, attribution.utmMedium, attribution.utmCampaign].filter(Boolean).join(' / ');
  return row('Einstiegsseite', attribution.landingPath) + row('Kampagne', campaign) + row('Verweis', attribution.referrerHost);
}

function clampInteger(value: string | undefined, fallback: number, min: number, max: number): number {
  const parsed = Number(value);
  return Number.isInteger(parsed) ? Math.min(max, Math.max(min, parsed)) : fallback;
}

let warnedMissingRateLimitSecret = false;

function rateLimitSecret(): string {
  const secret = process.env.LEAD_RATE_LIMIT_SECRET?.trim();
  if (secret) return secret;
  // Ohne eigenes Secret ist der IP-Hash nur so „opak“ wie die (öffentliche) Projekt-ID.
  if (!warnedMissingRateLimitSecret && process.env.VERCEL_ENV === 'production') {
    warnedMissingRateLimitSecret = true;
    console.error('LEAD_RATE_LIMIT_SECRET ist nicht gesetzt – Rate-Limit-Hash nutzt einen öffentlichen Fallback-Schlüssel.');
  }
  return process.env.FIREBASE_PROJECT_ID || 'ahad-cleaning';
}

function opaqueIpHash(ip: string): string {
  return createHmac('sha256', rateLimitSecret()).update(ip).digest('base64url').slice(0, 40);
}

function leadDocumentId(type: ValidLead['type'], idempotencyKey: string): string {
  return createHash('sha256').update(`${type}:${idempotencyKey}`).digest('base64url').slice(0, 40);
}

function consentMetadata(lead: ValidLead, now: Timestamp) {
  const privacyNotice = { accepted: true, version: PRIVACY_NOTICE_VERSION, capturedAt: now };
  if (lead.type === 'offer_lead') return { legalBasis: 'pre_contractual_request', privacyNotice };
  if (lead.type === 'contact') return { legalBasis: 'request_processing', privacyNotice };
  return {
    legalBasis: 'application_processing',
    privacyNotice,
    whatsapp: {
      accepted: lead.data.whatsappOptIn,
      version: lead.data.whatsappOptIn ? WHATSAPP_NOTICE_VERSION : null,
      capturedAt: lead.data.whatsappOptIn ? now : null,
    },
  };
}

async function persistExactlyOnce(lead: ValidLead, idempotencyKey: string, ip: string, requestId: string) {
  const db = getAdminFirestore();
  const leadId = leadDocumentId(lead.type, idempotencyKey);
  const collection = COLLECTIONS[lead.type];
  const leadRef = db.collection(collection).doc(leadId);
  const rateRef = db.collection('_lead_rate_limits').doc(opaqueIpHash(ip));
  const nowMs = Date.now();
  const now = Timestamp.fromMillis(nowMs);
  const expiresAt = Timestamp.fromMillis(nowMs + RETENTION_DAYS[lead.type] * 86_400_000);
  const windowMs = clampInteger(process.env.LEAD_RATE_WINDOW_MS, DEFAULT_RATE_WINDOW_MS, 10_000, 3_600_000);
  const maxHits = clampInteger(process.env.LEAD_RATE_MAX, DEFAULT_RATE_MAX, 1, 20);
  const payloadHash = createHash('sha256').update(JSON.stringify(lead)).digest('hex');

  const result = await db.runTransaction(async (transaction) => {
    const existing = await transaction.get(leadRef);
    if (existing.exists) {
      const attempts = existing.get('notificationAttempts');
      return {
        created: false,
        conflict: existing.get('payloadHash') !== payloadHash,
        notificationSent: existing.get('emailSent') === true,
        notificationAttempts: Number.isInteger(attempts) ? Number(attempts) : 1,
      };
    }

    const rate = await transaction.get(rateRef);
    const rateData = rate.data();
    const previousWindow = rateData?.windowStartedAt instanceof Timestamp ? rateData.windowStartedAt.toMillis() : 0;
    const sameWindow = previousWindow > nowMs - windowMs;
    const count = sameWindow && Number.isInteger(rateData?.count) ? Number(rateData?.count) : 0;
    if (count >= maxHits) throw new RateLimitError('rate limit exceeded');

    transaction.set(rateRef, {
      count: count + 1,
      windowStartedAt: sameWindow ? rateData?.windowStartedAt : now,
      updatedAt: now,
      expiresAt: Timestamp.fromMillis(nowMs + 86_400_000),
    });
    transaction.create(leadRef, {
      ...lead.data,
      schemaVersion: 2,
      status: 'new',
      emailSent: false,
      notificationStatus: 'pending',
      requestId,
      idempotencyHash: createHash('sha256').update(idempotencyKey).digest('hex'),
      payloadHash,
      consent: consentMetadata(lead, now),
      createdAt: now,
      updatedAt: now,
      expiresAt,
    });
    return { created: true, conflict: false, notificationSent: false, notificationAttempts: 0 };
  });

  return { ...result, leadId, leadRef };
}

async function notify(lead: ValidLead, requestId: string): Promise<{ sent: boolean; providerId?: string; status: string }> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    console.error('Lead notification skipped: RESEND_API_KEY ist nicht konfiguriert', { requestId });
    return { sent: false, status: 'not_configured' };
  }
  const message = emailFor(lead, requestId);
  const to = (process.env.LEAD_TO || 'info@ahad-cleaning.de').split(',').map((value) => value.trim()).filter(Boolean);
  const from = process.env.RESEND_FROM || 'AHAD Cleaning <onboarding@resend.dev>';
  const { data, error } = await new Resend(apiKey).emails.send({ from, to, ...message });
  if (error) {
    // Nur Fehlerklasse loggen – keine Lead-Daten.
    console.error('Lead notification failed', { requestId, error: error.name });
    return { sent: false, status: 'failed' };
  }
  return { sent: true, providerId: data?.id, status: 'sent' };
}

/**
 * Versendet die Benachrichtigung und hält das Ergebnis am Lead fest. Der Lead
 * ist zu diesem Zeitpunkt bereits sicher gespeichert; ein Zustellfehler darf
 * die Antwort an den Absender deshalb nie zum Fehler machen.
 */
async function deliverNotification(lead: ValidLead, leadRef: DocumentReference, requestId: string): Promise<boolean> {
  let notification: Awaited<ReturnType<typeof notify>>;
  try {
    notification = await notify(lead, requestId);
  } catch (error) {
    console.error('Lead notification failed', { requestId, error: error instanceof Error ? error.name : 'unknown' });
    notification = { sent: false, status: 'failed' };
  }
  try {
    await leadRef.update({
      emailSent: notification.sent,
      notificationStatus: notification.status,
      notificationAttempts: FieldValue.increment(1),
      notificationAttemptedAt: FieldValue.serverTimestamp(),
      ...(notification.providerId ? { notificationProviderId: notification.providerId } : {}),
      updatedAt: FieldValue.serverTimestamp(),
    });
  } catch {
    console.error('Lead notification state update failed', { requestId });
  }
  return notification.sent;
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  const requestId = randomUUID();
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Request-Id', requestId);

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    sendError(res, 405, requestId, 'METHOD_NOT_ALLOWED', 'Nur POST ist erlaubt.');
    return;
  }

  const contentType = header(req, 'content-type').toLowerCase();
  if (!contentType.startsWith('application/json')) {
    sendError(res, 415, requestId, 'UNSUPPORTED_MEDIA_TYPE', 'Content-Type application/json ist erforderlich.');
    return;
  }
  const contentLength = Number(header(req, 'content-length'));
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    sendError(res, 413, requestId, 'PAYLOAD_TOO_LARGE', 'Die Anfrage ist zu groß.');
    return;
  }

  const origin = header(req, 'origin').trim();
  if (origin && !allowedOrigins().has(origin)) {
    sendError(res, 403, requestId, 'ORIGIN_NOT_ALLOWED', 'Diese Anfragequelle ist nicht erlaubt.');
    return;
  }

  // Der Body-Getter der Runtime kann bei defektem JSON selbst werfen – dann
  // soll trotzdem unsere 400-Antwort (statt eines Runtime-500) zurückgehen.
  let body: unknown;
  try {
    body = requestBody(req);
  } catch {
    body = null;
  }
  if (!isRecord(body)) {
    sendError(res, 400, requestId, 'INVALID_JSON', 'Ungültiges JSON.');
    return;
  }
  try {
    if (Buffer.byteLength(JSON.stringify(body), 'utf8') > MAX_BODY_BYTES) {
      sendError(res, 413, requestId, 'PAYLOAD_TOO_LARGE', 'Die Anfrage ist zu groß.');
      return;
    }
  } catch {
    sendError(res, 400, requestId, 'INVALID_JSON', 'Ungültiges JSON.');
    return;
  }

  // Honeypot responses intentionally look successful and never touch Firestore.
  if (typeof body.website === 'string' && body.website.trim()) {
    accepted(res, 202, requestId, { duplicate: false, notificationSent: false });
    return;
  }
  if ('website' in body && typeof body.website !== 'string') {
    sendError(res, 400, requestId, 'VALIDATION_ERROR', 'Bitte prüfen Sie Ihre Eingaben.', { website: 'Muss Text sein.' });
    return;
  }

  const bodyKey = body.idempotencyKey;
  const headerKey = header(req, 'idempotency-key').trim();
  if (bodyKey !== undefined && headerKey && bodyKey !== headerKey) {
    sendError(res, 400, requestId, 'IDEMPOTENCY_KEY_CONFLICT', 'Die Idempotenzschlüssel stimmen nicht überein.');
    return;
  }
  const idempotencyKey = headerKey || bodyKey;
  if (!validIdempotencyKey(idempotencyKey)) {
    sendError(res, 400, requestId, 'INVALID_IDEMPOTENCY_KEY', 'Ein gültiger Idempotenzschlüssel ist erforderlich.');
    return;
  }

  // Alle Formulare senden den Startzeitpunkt; Bots, die ihn weglassen, umgehen
  // die Timing-Prüfung sonst vollständig.
  const startedAt = body.formStartedAt;
  if (typeof startedAt !== 'number' || !Number.isFinite(startedAt) || startedAt <= 0) {
    sendError(res, 400, requestId, 'VALIDATION_ERROR', 'Bitte prüfen Sie Ihre Eingaben.', { formStartedAt: 'Ungültiger Zeitstempel.' });
    return;
  }
  // Geht die Geräteuhr vor (Zeitstempel in der Zukunft), ist keine Aussage über
  // die Ausfüllzeit möglich – dann wird die Prüfung übersprungen statt den Lead
  // dauerhaft abzulehnen. Nur nachweislich unter 500 ms gilt als Automat.
  const elapsed = Date.now() - startedAt;
  if (elapsed >= 0 && elapsed < 500) {
    accepted(res, 202, requestId, { duplicate: false, notificationSent: false });
    return;
  }

  const validation = validateLeadPayload(body);
  if (!validation.ok) {
    const fields = Object.fromEntries(validation.issues.map((issue) => [issue.field, issue.message]));
    sendError(res, 400, requestId, 'VALIDATION_ERROR', 'Bitte prüfen Sie Ihre Eingaben.', fields);
    return;
  }

  try {
    const persisted = await persistExactlyOnce(validation.value, idempotencyKey, clientIp(req), requestId);
    if (persisted.conflict) {
      sendError(res, 409, requestId, 'IDEMPOTENCY_REUSE', 'Dieser Idempotenzschlüssel wurde bereits für andere Daten verwendet.');
      return;
    }
    if (!persisted.created) {
      // Wiederholung mit identischem Schlüssel (z. B. verlorene Antwort): Der Lead
      // existiert bereits. Blieb die Benachrichtigung aus, wird sie – begrenzt –
      // nachgeholt, statt den Absender mit „duplicate“ im Unklaren zu lassen.
      const retry = !persisted.notificationSent && persisted.notificationAttempts < MAX_NOTIFICATION_ATTEMPTS;
      const notificationSent = retry
        ? await deliverNotification(validation.value, persisted.leadRef, requestId)
        : persisted.notificationSent;
      accepted(res, 200, requestId, { leadId: persisted.leadId, duplicate: true, notificationSent });
      return;
    }

    const notificationSent = await deliverNotification(validation.value, persisted.leadRef, requestId);
    accepted(res, notificationSent ? 201 : 202, requestId, {
      leadId: persisted.leadId,
      duplicate: false,
      notificationSent,
    });
  } catch (error) {
    if (error instanceof RateLimitError) {
      const retryWindow = clampInteger(process.env.LEAD_RATE_WINDOW_MS, DEFAULT_RATE_WINDOW_MS, 10_000, 3_600_000);
      res.setHeader('Retry-After', String(Math.ceil(retryWindow / 1000)));
      sendError(res, 429, requestId, 'RATE_LIMITED', 'Zu viele Anfragen. Bitte versuchen Sie es später erneut.');
      return;
    }
    console.error('Lead persistence failed', { requestId, error: error instanceof Error ? error.name : 'unknown' });
    sendError(res, 503, requestId, 'STORAGE_UNAVAILABLE', 'Die Anfrage konnte nicht sicher gespeichert werden. Bitte versuchen Sie es erneut.');
  }
}
