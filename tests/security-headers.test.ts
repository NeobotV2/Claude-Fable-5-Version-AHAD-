import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (path: string) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

type HeaderRule = { source: string; headers: { key: string; value: string }[] };
const vercel = JSON.parse(read('vercel.json')) as { headers: HeaderRule[] };
const siteWide = vercel.headers.find((rule) => rule.source === '/(.*)');
const csp = siteWide?.headers.find((header) => header.key === 'Content-Security-Policy')?.value ?? '';

/** Zerlegt die Regel in { direktive: [quellen] }. */
const directives = Object.fromEntries(
  csp
    .split(';')
    .map((part) => part.trim().split(/\s+/))
    .filter((tokens) => tokens[0])
    .map(([name, ...sources]) => [name, sources]),
) as Record<string, string[]>;

const allows = (directive: string, host: string) =>
  (directives[directive] ?? []).some((source) => {
    const pattern = source.replace(/^https:\/\//, '');
    return pattern.startsWith('*.') ? host.endsWith(pattern.slice(1)) : host === pattern;
  });

test('the content security policy is enforced, not only reported', () => {
  assert.ok(csp, 'vercel.json braucht einen Content-Security-Policy-Header für alle Pfade');
  assert.equal(
    siteWide?.headers.some((header) => header.key === 'Content-Security-Policy-Report-Only'),
    false,
  );
  assert.deepEqual(directives['default-src'], ["'self'"]);
  assert.deepEqual(directives['object-src'], ["'none'"]);
  assert.deepEqual(directives['frame-ancestors'], ["'none'"]);
});

test('the policy still lets the admin sign in with Google', () => {
  // signInWithPopup lädt das Google-Skript und bettet einen unsichtbaren Rahmen der
  // Auth-Domain ein. Fehlt eine der beiden Freigaben, bleibt der Login-Knopf wirkungslos.
  const { authDomain } = JSON.parse(read('src/firebase-applet-config.json')) as { authDomain: string };
  assert.ok(allows('script-src', 'apis.google.com'));
  assert.ok(allows('frame-src', authDomain), `frame-src muss ${authDomain} erlauben`);
  for (const host of ['identitytoolkit.googleapis.com', 'securetoken.googleapis.com', 'firestore.googleapis.com']) {
    assert.ok(allows('connect-src', host), `connect-src muss ${host} erlauben`);
  }
});

test('netlify.toml carries the same policy as vercel.json', () => {
  assert.ok(read('netlify.toml').includes(`Content-Security-Policy = "${csp}"`));
});
