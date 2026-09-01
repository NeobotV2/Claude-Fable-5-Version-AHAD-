import { readAttribution, rememberAttribution } from './analytics';

/**
 * Gemeinsamer Übermittlungsweg für Kontaktformular, Angebots- und Karriere-Funnel.
 * Bündelt, was vorher dreifach kopiert war: Idempotenzschlüssel, JSON-Parsing,
 * Fehlerklassen des Servers (Feldfehler, Rate-Limit, Schlüsselkonflikt).
 */
export type LeadType = 'contact' | 'offer_lead' | 'job_application';

export type SubmitLeadResult =
  | { ok: true; duplicate: boolean; notificationSent: boolean }
  | { ok: false; kind: 'validation'; message: string; fields: Record<string, string> }
  | { ok: false; kind: 'rate_limited' | 'rejected' | 'network'; message: string };

type ApiPayload = {
  success?: boolean;
  accepted?: boolean;
  duplicate?: boolean;
  notificationSent?: boolean;
  error?: { code?: string; message?: string; fields?: Record<string, string> };
};

const FIELD_LABELS: Record<string, string> = {
  contactPerson: 'Ansprechperson',
  company: 'Unternehmen',
  companyName: 'Unternehmen',
  email: 'E-Mail',
  phone: 'Telefon',
  message: 'Nachricht',
  serviceType: 'Leistung',
  services: 'Leistungen',
  objectType: 'Objektart',
  areaSize: 'Fläche',
  frequency: 'Turnus',
  location: 'Einsatzort',
  preferredTime: 'Zeitfenster',
  name: 'Name',
  startDate: 'Startdatum',
  jobType: 'Stelle',
  department: 'Bereich',
  mobility: 'Mobilität',
  experience: 'Erfahrung',
};

export const GENERIC_SUBMIT_ERROR =
  'Die Anfrage konnte nicht übermittelt werden. Bitte versuchen Sie es erneut oder rufen Sie uns direkt an.';

export function newIdempotencyKey(prefix: string): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') return crypto.randomUUID();
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

/** Aktuelle Attribution (Session) – fällt auf einen frischen Datensatz zurück. */
export function currentAttribution() {
  return readAttribution() || rememberAttribution(window.location.href);
}

/** Serverseitige Feldfehler als lesbaren Hinweis („E-Mail: Ungültige E-Mail-Adresse.“). */
export function describeFieldErrors(fields: Record<string, string>): string {
  return Object.entries(fields)
    .filter(([field]) => field !== 'formStartedAt' && field !== 'attribution' && field !== 'privacyNoticeAccepted')
    .map(([field, message]) => `${FIELD_LABELS[field] ?? field}: ${message}`)
    .join(' ');
}

export async function submitLead(input: {
  type: LeadType;
  /** Formulardaten des jeweiligen Typs – serverseitig vollständig validiert. */
  data: object;
  website: string;
  formStartedAt: number;
  /** Ref-artiger Halter, damit der Schlüssel über Wiederholungen stabil bleibt. */
  idempotency: { current: string };
  keyPrefix: string;
}): Promise<SubmitLeadResult> {
  input.idempotency.current ||= newIdempotencyKey(input.keyPrefix);

  for (let attempt = 0; attempt < 2; attempt += 1) {
    let response: Response;
    try {
      response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Idempotency-Key': input.idempotency.current },
        body: JSON.stringify({
          type: input.type,
          data: input.data,
          website: input.website,
          formStartedAt: input.formStartedAt,
          idempotencyKey: input.idempotency.current,
        }),
      });
    } catch {
      return { ok: false, kind: 'network', message: GENERIC_SUBMIT_ERROR };
    }

    const result = (await response.json().catch(() => null)) as ApiPayload | null;
    if (response.ok && result?.success === true && result.accepted === true) {
      return { ok: true, duplicate: result.duplicate === true, notificationSent: result.notificationSent === true };
    }

    const code = result?.error?.code;
    if (response.status === 409 && code === 'IDEMPOTENCY_REUSE' && attempt === 0) {
      // Der Schlüssel gehört zu einem früher gespeicherten, inzwischen geänderten
      // Datensatz (z. B. Antwort verloren, dann Eingabe korrigiert): neuer Schlüssel,
      // genau eine Wiederholung – statt dauerhaft in den Fehler zu laufen.
      input.idempotency.current = newIdempotencyKey(input.keyPrefix);
      continue;
    }
    if (response.status === 400 && code === 'VALIDATION_ERROR') {
      return {
        ok: false,
        kind: 'validation',
        message: result?.error?.message || 'Bitte prüfen Sie Ihre Eingaben.',
        fields: result?.error?.fields ?? {},
      };
    }
    if (response.status === 429) {
      return {
        ok: false,
        kind: 'rate_limited',
        message: 'Zu viele Anfragen in kurzer Zeit. Bitte versuchen Sie es in einer Minute erneut oder rufen Sie uns an.',
      };
    }
    return { ok: false, kind: 'rejected', message: GENERIC_SUBMIT_ERROR };
  }

  return { ok: false, kind: 'rejected', message: GENERIC_SUBMIT_ERROR };
}
