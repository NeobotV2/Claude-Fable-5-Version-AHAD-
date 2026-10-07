import test from 'node:test';
import assert from 'node:assert/strict';
import { serviceAccountFromEnvironment, StorageNotConfiguredError } from '../api/_lib/firebase-admin.ts';

const KEY = '-----BEGIN PRIVATE KEY-----\\nabc\\n-----END PRIVATE KEY-----\\n';
const KEY_DECODED = '-----BEGIN PRIVATE KEY-----\nabc\n-----END PRIVATE KEY-----';

test('no credentials at all → undefined (caller decides about the fallback)', () => {
  assert.equal(serviceAccountFromEnvironment({}), undefined);
});

test('separate variables work without FIREBASE_PROJECT_ID and tolerate pasted quotes', () => {
  const account = serviceAccountFromEnvironment({
    FIREBASE_CLIENT_EMAIL: ' "firebase-adminsdk@ahad-cleaning.iam.gserviceaccount.com" ',
    FIREBASE_PRIVATE_KEY: `"${KEY}"`,
  });
  assert.deepEqual(account, {
    projectId: 'ahad-cleaning',
    clientEmail: 'firebase-adminsdk@ahad-cleaning.iam.gserviceaccount.com',
    privateKey: KEY_DECODED,
  });
});

test('a half-configured pair fails fast and names only the missing variable', () => {
  assert.throws(
    () => serviceAccountFromEnvironment({ FIREBASE_CLIENT_EMAIL: 'x@y.iam.gserviceaccount.com' }),
    (error: unknown) => error instanceof StorageNotConfiguredError && /FIREBASE_PRIVATE_KEY fehlt/.test(error.message),
  );
});

test('service-account JSON takes precedence and its project_id wins over FIREBASE_PROJECT_ID', () => {
  const json = JSON.stringify({ project_id: 'ahad-cleaning', client_email: 'sa@ahad-cleaning.iam.gserviceaccount.com', private_key: KEY });
  const account = serviceAccountFromEnvironment({ FIREBASE_SERVICE_ACCOUNT_JSON: `'${json}'`, FIREBASE_PROJECT_ID: 'Falscher Name' });
  assert.equal(account?.projectId, 'ahad-cleaning');
  assert.equal(account?.clientEmail, 'sa@ahad-cleaning.iam.gserviceaccount.com');
  assert.equal(account?.privateKey, KEY_DECODED);
});

test('broken JSON fails with a fixed message that does not echo the secret', () => {
  for (const input of ['{"private_key": "geheim', '{"private_key": geheimSECRET}']) {
    // Gegenprobe: Der rohe Parser-Fehler zitiert den Wert zumindest für die zweite Eingabe.
    if (input.endsWith('}')) assert.throws(() => JSON.parse(input), /geheim/);
    assert.throws(
      () => serviceAccountFromEnvironment({ FIREBASE_SERVICE_ACCOUNT_JSON: input }),
      (error: unknown) =>
        error instanceof StorageNotConfiguredError && error.message === 'FIREBASE_SERVICE_ACCOUNT_JSON ist kein gültiges JSON.',
    );
  }
});

test('JSON without key material is rejected', () => {
  assert.throws(
    () => serviceAccountFromEnvironment({ FIREBASE_SERVICE_ACCOUNT_JSON: JSON.stringify({ project_id: 'ahad-cleaning' }) }),
    StorageNotConfiguredError,
  );
});
