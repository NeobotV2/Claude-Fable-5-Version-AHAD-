import { applicationDefault, cert, getApps, initializeApp, type App, type ServiceAccount } from 'firebase-admin/app';
import { getFirestore, type Firestore } from 'firebase-admin/firestore';

const DEFAULT_PROJECT_ID = 'ahad-cleaning';

/**
 * Speicher ist nicht (korrekt) eingerichtet. Die Meldung nennt nur Variablennamen,
 * nie deren Inhalt – sie landet im Vercel-Log.
 */
export class StorageNotConfiguredError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'StorageNotConfiguredError';
  }
}

type Env = Record<string, string | undefined>;

/** Beim Einfügen in die Vercel-Oberfläche mitkopierte Anführungszeichen entfernen. */
function unquote(value: string | undefined): string {
  const trimmed = value?.trim() ?? '';
  const quoted = trimmed.length >= 2 && (trimmed[0] === '"' || trimmed[0] === "'") && trimmed.at(-1) === trimmed[0];
  return (quoted ? trimmed.slice(1, -1) : trimmed).trim();
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function serviceAccountFromEnvironment(env: Env = process.env): ServiceAccount | undefined {
  const json = unquote(env.FIREBASE_SERVICE_ACCOUNT_JSON);
  if (json) {
    let parsed: unknown;
    try {
      parsed = JSON.parse(json);
    } catch {
      // Bewusst ohne die Parser-Meldung: Sie zitiert Teile des geheimen Werts.
      throw new StorageNotConfiguredError('FIREBASE_SERVICE_ACCOUNT_JSON ist kein gültiges JSON.');
    }
    if (!isRecord(parsed)) throw new StorageNotConfiguredError('FIREBASE_SERVICE_ACCOUNT_JSON ist kein JSON-Objekt.');
    const clientEmail = String(parsed.client_email ?? parsed.clientEmail ?? '').trim();
    const privateKey = String(parsed.private_key ?? parsed.privateKey ?? '').replace(/\\n/g, '\n').trim();
    if (!clientEmail || !privateKey) {
      throw new StorageNotConfiguredError('FIREBASE_SERVICE_ACCOUNT_JSON enthält kein client_email/private_key.');
    }
    return {
      projectId: String(parsed.project_id ?? parsed.projectId ?? '').trim() || env.FIREBASE_PROJECT_ID?.trim() || DEFAULT_PROJECT_ID,
      clientEmail,
      privateKey,
    };
  }

  const clientEmail = unquote(env.FIREBASE_CLIENT_EMAIL);
  const privateKey = unquote(env.FIREBASE_PRIVATE_KEY).replace(/\\n/g, '\n').trim();
  if (clientEmail && privateKey) {
    return { projectId: unquote(env.FIREBASE_PROJECT_ID) || DEFAULT_PROJECT_ID, clientEmail, privateKey };
  }
  if (clientEmail || privateKey) {
    throw new StorageNotConfiguredError(`${clientEmail ? 'FIREBASE_PRIVATE_KEY' : 'FIREBASE_CLIENT_EMAIL'} fehlt.`);
  }
  return undefined;
}

function getAdminApp(): App {
  const existing = getApps()[0];
  if (existing) return existing;

  const account = serviceAccountFromEnvironment();
  // Ohne Dienstkonto bliebe nur die Google-Standardanmeldung. Die gibt es auf Vercel
  // nicht: Sie scheitert erst nach mehreren Sekunden Wiederholung (und mit unbehandelten
  // Promise-Fehlern). Deshalb dort sofort und eindeutig abbrechen.
  if (!account && process.env.VERCEL && !process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    throw new StorageNotConfiguredError(
      'Keine Firebase-Zugangsdaten: FIREBASE_SERVICE_ACCOUNT_JSON oder FIREBASE_CLIENT_EMAIL + FIREBASE_PRIVATE_KEY setzen.',
    );
  }
  const projectId = account?.projectId || process.env.FIREBASE_PROJECT_ID?.trim() || DEFAULT_PROJECT_ID;
  return initializeApp({
    projectId,
    credential: account ? cert(account) : applicationDefault(),
  });
}

export function getAdminFirestore(): Firestore {
  const databaseId = process.env.FIRESTORE_DATABASE_ID?.trim();
  return databaseId && databaseId !== '(default)'
    ? getFirestore(getAdminApp(), databaseId)
    : getFirestore(getAdminApp());
}
