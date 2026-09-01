import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  limit,
  writeBatch,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import fileConfig from './firebase-applet-config.json';

/**
 * Konfiguration: VITE_FIREBASE_*-Umgebungsvariablen haben Vorrang,
 * sonst greift firebase-applet-config.json. So lässt sich das echte
 * Projekt pro Deployment-Umgebung setzen, ohne Code zu ändern.
 */
const env = import.meta.env;
/** Env-Wert nur verwenden, wenn er (nach Trim) wirklich gesetzt ist — sonst
 *  greift die echte Projekt-Config aus firebase-applet-config.json. Der Wert
 *  wird IMMER getrimmt: so machen versehentlich mitkopierte Leerzeichen/Tabs
 *  (z. B. in einer VITE_FIREBASE_*-Variable) die Config nicht kaputt. */
const pick = (envVal: unknown, fileVal: string): string => {
  const v = typeof envVal === 'string' ? envVal.trim() : '';
  return v || String(fileVal).trim();
};

const firebaseConfig = {
  apiKey: pick(env.VITE_FIREBASE_API_KEY, fileConfig.apiKey),
  authDomain: pick(env.VITE_FIREBASE_AUTH_DOMAIN, fileConfig.authDomain),
  projectId: pick(env.VITE_FIREBASE_PROJECT_ID, fileConfig.projectId),
  storageBucket: pick(env.VITE_FIREBASE_STORAGE_BUCKET, fileConfig.storageBucket),
  messagingSenderId: pick(env.VITE_FIREBASE_MESSAGING_SENDER_ID, fileConfig.messagingSenderId),
  appId: pick(env.VITE_FIREBASE_APP_ID, fileConfig.appId),
};
const firestoreDatabaseId: string = pick(env.VITE_FIREBASE_DATABASE_ID, fileConfig.firestoreDatabaseId ?? '(default)');

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, firestoreDatabaseId);
export const googleProvider = new GoogleAuthProvider();

export type { FirebaseUser };
export {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  doc,
  setDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  limit,
  writeBatch,
  serverTimestamp,
  Timestamp,
};
