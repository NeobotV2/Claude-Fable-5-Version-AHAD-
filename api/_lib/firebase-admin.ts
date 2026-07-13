import { applicationDefault, cert, getApps, initializeApp, type App, type ServiceAccount } from 'firebase-admin/app';
import { getFirestore, type Firestore } from 'firebase-admin/firestore';

function serviceAccountFromEnvironment(): ServiceAccount | undefined {
  const json = process.env.FIREBASE_SERVICE_ACCOUNT_JSON?.trim();
  if (json) {
    const parsed = JSON.parse(json) as Record<string, unknown>;
    return {
      projectId: String(parsed.project_id ?? parsed.projectId ?? ''),
      clientEmail: String(parsed.client_email ?? parsed.clientEmail ?? ''),
      privateKey: String(parsed.private_key ?? parsed.privateKey ?? '').replace(/\\n/g, '\n'),
    };
  }

  const projectId = process.env.FIREBASE_PROJECT_ID?.trim();
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL?.trim();
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n').trim();
  if (projectId && clientEmail && privateKey) return { projectId, clientEmail, privateKey };
  return undefined;
}

function getAdminApp(): App {
  const existing = getApps()[0];
  if (existing) return existing;

  const account = serviceAccountFromEnvironment();
  const projectId = process.env.FIREBASE_PROJECT_ID?.trim() || account?.projectId || 'ahad-cleaning';
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
