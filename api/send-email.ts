/**
 * Vercel Serverless Function: E-Mail-Benachrichtigung für Formulare via Resend.
 *
 * Wird von Kontaktformular, Angebots- und Karriere-Funnel sowie dem Admin-
 * Testbutton per POST /api/send-email aufgerufen. Die Formulardaten werden
 * zusätzlich (clientseitig) in Firestore gespeichert — diese Funktion ist
 * nur für die E-Mail-Zustellung zuständig.
 *
 * Konfiguration über Umgebungsvariablen (in Vercel setzen):
 *   RESEND_API_KEY  – Pflicht. API-Key aus dem Resend-Dashboard.
 *   LEAD_TO         – Optional. Empfänger (Standard: info@ahad-cleaning.de).
 *   RESEND_FROM     – Optional. Absender. Standard ist der Resend-Test-Absender
 *                     (onboarding@resend.dev); für Produktion eine in Resend
 *                     verifizierte Domain verwenden, z. B.
 *                     "AHAD Cleaning <noreply@ahad-cleaning.de>".
 */
import { Resend } from 'resend';

const TO = process.env.LEAD_TO || 'info@ahad-cleaning.de';
const FROM = process.env.RESEND_FROM || 'AHAD Cleaning <onboarding@resend.dev>';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Nutzereingaben für E-Mail-HTML escapen (verhindert HTML-/Script-Injection). */
function esc(value: unknown): string {
  return String(value ?? '')
    .slice(0, 1000)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Eine Detailzeile — wird nur ausgegeben, wenn ein Wert vorhanden ist. */
function row(label: string, value: unknown): string {
  const v = esc(value);
  return v ? `<p style="margin:4px 0"><strong>${label}:</strong> ${v}</p>` : '';
}

function wrap(title: string, color: string, inner: string, source: string): string {
  return `<div style="font-family:sans-serif;padding:20px;color:#333">
    <h2 style="color:${color}">${title}</h2>
    ${inner}
    <hr style="border:1px solid #eee;margin:20px 0"/>
    <p style="font-size:12px;color:#888">Gesendet von ${source}</p>
  </div>`;
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    res.status(503).json({ error: 'E-Mail-Versand ist nicht konfiguriert.' });
    return;
  }

  const body = typeof req.body === 'string' ? safeParse(req.body) : req.body;
  const { type, data, website } = body ?? {};

  // Honeypot: unsichtbares Feld "website". Füllt es ein Bot, tun wir so,
  // als wäre alles ok — senden aber nichts.
  if (website) {
    res.status(200).json({ success: true });
    return;
  }
  if (!data || typeof data !== 'object') {
    res.status(400).json({ error: 'Ungültige Anfrage.' });
    return;
  }

  let subject = '';
  let html = '';
  let replyTo: string | undefined;

  if (type === 'contact') {
    if (!data.contactPerson && !data.email && !data.phone) {
      res.status(400).json({ error: 'Bitte Kontaktdaten angeben.' });
      return;
    }
    if (data.email && EMAIL_RE.test(String(data.email))) replyTo = String(data.email);
    subject = `Neue Kontaktanfrage: ${esc(data.contactPerson).slice(0, 80) || 'Website'}`;
    html = wrap('Neue Kontaktanfrage', '#004888',
      row('Name', data.contactPerson) +
      row('Firma', data.company) +
      row('E-Mail', data.email) +
      row('Telefon', data.phone) +
      row('Leistung', data.serviceType) +
      row('Nachricht', data.message),
      'AHAD-Kontaktformular');
  } else if (type === 'offer_lead') {
    if (!data.companyName || !data.email || !EMAIL_RE.test(String(data.email))) {
      res.status(400).json({ error: 'Firma und gültige E-Mail sind erforderlich.' });
      return;
    }
    replyTo = String(data.email);
    const services = Array.isArray(data.services)
      ? data.services.slice(0, 20).map(esc).join(', ')
      : esc(data.services);
    subject = `Neue Angebotsanfrage: ${esc(data.companyName).slice(0, 80)}`;
    html = wrap('Neue Angebotsanfrage', '#004888',
      row('Firma', data.companyName) +
      row('Ansprechpartner', data.contactPerson) +
      row('E-Mail', data.email) +
      row('Telefon', data.phone) +
      row('Standort', data.location) +
      row('Objektart', data.objectType) +
      `<p style="margin:4px 0"><strong>Leistungen:</strong> ${services}</p>` +
      row('Fläche', data.areaSize) +
      row('Intervall', data.frequency) +
      row('Wunschtermin', data.preferredTime),
      'AHAD-Angebots-Funnel');
  } else if (type === 'job_application') {
    if (!data.name || !data.phone) {
      res.status(400).json({ error: 'Name und Telefon sind erforderlich.' });
      return;
    }
    subject = `Neue Bewerbung: ${esc(data.name).slice(0, 80)} (${esc(data.jobType).slice(0, 60)})`;
    html = wrap('Neue Bewerbung', '#005332',
      row('Name', data.name) +
      row('Telefon', data.phone) +
      row('Stelle', data.jobType) +
      row('Bereich', data.department) +
      row('Erfahrung', data.experience) +
      row('Startdatum', data.startDate) +
      row('Mobilität', data.mobility) +
      row('Standort', data.location) +
      `<p style="margin:4px 0"><strong>WhatsApp erlaubt:</strong> ${data.whatsappOptIn ? 'Ja' : 'Nein'}</p>`,
      'AHAD-Karriere-Funnel');
  } else {
    res.status(400).json({ error: 'Unbekannter Anfragetyp.' });
    return;
  }

  try {
    const resend = new Resend(apiKey);
    const { data: result, error } = await resend.emails.send({
      from: FROM,
      to: [TO],
      subject,
      html,
      ...(replyTo ? { replyTo } : {}),
    });
    if (error) {
      console.error('Resend error:', error);
      res.status(502).json({ error: 'E-Mail konnte nicht gesendet werden.' });
      return;
    }
    res.status(200).json({ success: true, id: result?.id });
  } catch (err) {
    console.error('send-email error:', err);
    res.status(500).json({ error: 'Interner Serverfehler.' });
  }
}

function safeParse(s: string): any {
  try {
    return JSON.parse(s);
  } catch {
    return null;
  }
}
