import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (path: string) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('the attribution context is kept in memory and never written to the device', () => {
  const analytics = read('src/lib/analytics.ts');

  // Aufräumen eines alten Eintrags ist erlaubt, Schreiben und Lesen nicht.
  assert.equal(/(session|local)Storage\.(setItem|getItem)/.test(analytics), false);
  assert.equal(analytics.includes('document.cookie'), false);
  assert.match(analytics, /let sessionAttribution: AttributionContext \| null = null/);
  assert.match(analytics, /sessionStorage\.removeItem\(LEGACY_STORAGE_KEY\)/);
});

test('the offer draft stored in the browser carries neither contact data nor attribution', () => {
  const funnel = read('src/pages/AngebotsFunnel.tsx');
  const start = funnel.indexOf('function safeDraft(');
  const draft = funnel.slice(start, funnel.indexOf('\n}', start));

  for (const field of ['attribution', 'contactName', 'email', 'phone', 'companyName', 'location']) {
    assert.equal(draft.includes(field), false, `${field} darf nicht im Entwurf landen`);
  }
});

test('the privacy notice describes the storage behaviour the code actually has', () => {
  const notice = read('src/pages/rechtliches/Datenschutz.tsx');

  assert.match(notice, /nur im Arbeitsspeicher der geöffneten Seite/);
  assert.equal(/Ebenfalls im Sitzungsspeicher\s+merken wir/.test(notice), false);
});
