import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (file: string) => readFileSync(path.join(root, file), 'utf8').replace(/\r\n/g, '\n');

test('verification metadata is fail-closed and checks evidence plus dates', () => {
  const site = read('src/lib/site.ts');

  assert.match(site, /verification\.evidence\.length > 0/);
  assert.match(site, /verification\.owner\.trim\(\)\.length > 0/);
  assert.match(site, /verifiedAt <= now\.getTime\(\)/);
  assert.match(site, /expiresAt > now\.getTime\(\)/);
  assert.match(site, /new URL\(item\.value\)\.protocol === 'https:'/);
  assert.match(site, /evidence: \[\],\n  verifiedAt: null,\n  expiresAt: null/);
});

test('editorial register cannot mark a claim public without complete evidence', () => {
  const register = JSON.parse(read('docs/content/verification-register.json')) as {
    claims: Array<{
      owner: string;
      evidence: { url: string | null; id: string | null };
      verifiedAt: string | null;
      expiresAt: string | null;
      publicState: string;
    }>;
    clientReferences: Array<{
      owner: string;
      evidence: { url: string | null; id: string | null };
      verifiedAt: string | null;
      expiresAt: string | null;
      publicState: string;
    }>;
  };

  for (const claim of [...register.claims, ...register.clientReferences]) {
    assert.ok(claim.owner.trim().length > 0);
    const complete = Boolean(
      (claim.evidence.url || claim.evidence.id) && claim.verifiedAt && claim.expiresAt,
    );
    if (!complete) assert.equal(claim.publicState, 'blocked');
  }
});

test('organization schema contains the legal address but no unverified local or credential markup', () => {
  const site = read('src/lib/site.ts');
  const start = site.indexOf('export const ORGANIZATION_SCHEMA');
  const organization = site.slice(start, site.indexOf('\n};', start));

  assert.match(organization, /'@type': 'Organization'/);
  assert.match(organization, /streetAddress: SITE\.address\.street/);
  assert.equal(organization.includes("'LocalBusiness'"), false);
  assert.equal(organization.includes('hasCredential'), false);
  assert.equal(organization.includes("'@type': 'GeoCoordinates'"), false);
});

test('the headquarters entry is gated by the claim register and never guesses coordinates', () => {
  const site = read('src/lib/site.ts');
  const entry = site.slice(site.indexOf('export const HQ_LOCAL_BUSINESS_SCHEMA'));

  // Nur mit gültiger Freigabe; Stuttgart und Konstanz bleiben gesperrt.
  assert.match(entry, /= HQ\.publishAsLocalBusiness\s*\? \{[\s\S]*: null;/);
  assert.match(site, /stuttgartBranch: pendingVerification\('Operations'\)/);
  assert.match(site, /konstanzBranch: pendingVerification\('Operations'\)/);
  // Koordinaten erscheinen nur, wenn ein geprüfter Wert eingetragen ist.
  assert.match(site, /publishGeo: canPublishVerification\(CLAIM_VERIFICATIONS\.hqGeo\) && HQ_GEO !== null/);
  assert.match(entry, /HQ\.publishGeo && HQ_GEO\s*\? \{ geo: \{ '@type': 'GeoCoordinates'/);
  // Öffnungszeiten kommen aus derselben Quelle wie die sichtbare Angabe.
  assert.match(site, /hours: 'Mo–Fr · 08:00–17:00[ \u00A0]Uhr'/);
  assert.match(site, /days: \['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'\],\s*opens: '08:00',\s*closes: '17:00'/);
  // Keine Bewertungssterne und keine Zertifikate im Eintrag.
  assert.equal(entry.includes('AggregateRating'), false);
  assert.equal(entry.includes('hasCredential'), false);
});

test('regional pages publish Service area markup without branch addresses or geo coordinates', () => {
  const pages = [
    read('src/pages/standorte/Stuttgart.tsx'),
    read('src/pages/standorte/Konstanz.tsx'),
    read('src/pages/standorte/VillingenSchwenningen.tsx'),
    read('src/pages/standorte/Donaueschingen.tsx'),
    read('src/pages/standorte/Tuttlingen.tsx'),
  ];

  for (const page of pages) {
    assert.match(page, /'@type': 'Service'/);
    assert.match(page, /areaServed:/);
    assert.equal(page.includes("'@type': 'LocalBusiness'"), false);
    assert.equal(page.includes("'@type': 'GeoCoordinates'"), false);
  }
  // Nur die Seite des Hauptsitzes trägt den freigegebenen Unternehmenseintrag.
  assert.deepEqual(
    pages.map((page) => page.includes('HQ_LOCAL_BUSINESS_SCHEMA')),
    [false, false, true, false, false],
  );
  assert.equal(pages[0].includes('Humboldtstraße 27'), false);
  assert.equal(pages[1].includes('Brückengasse 1b'), false);
});

test('unverified aggregate ratings, references and featured testimonial are gated in consumers', () => {
  const site = read('src/lib/site.ts');
  const home = read('src/pages/Home.tsx');
  const reviews = read('src/components/Reviews.tsx');
  const testimonial = read('src/components/FeaturedTestimonial.tsx');
  const clientLogos = read('src/components/ClientLogos.tsx');

  assert.match(site, /export const GOOGLE_RATING =[\s\S]*\? GOOGLE_RATING_CANDIDATE[\s\S]*: null/);
  assert.match(site, /export const REVIEWS: Review\[\] = canPublishVerification\(CLAIM_VERIFICATIONS\.customerReviews\)/);
  assert.match(home, /\{GOOGLE_RATING && \(/);
  // Die Startseite zitiert Bewertungen nicht mehr selbst, sondern nur über die
  // Reviews-Komponente, die ohne freigegebene Bewertungen nichts rendert.
  assert.equal(home.includes('REVIEWS['), false);
  assert.match(home, /<Reviews limit=\{2\} withTestimonial \/>/);
  // Ohne freigegebene Bewertungen bleibt höchstens die (selbst abgesicherte) Kundenstimme.
  assert.match(reviews, /if \(shown\.length === 0\) return withTestimonial \? <FeaturedTestimonial \/> : null/);
  assert.match(reviews, /const lead = withTestimonial && FEATURED_TESTIMONIAL_PUBLISHABLE/);
  assert.match(home, /CLIENT_REFERENCES\.length > 0/);
  assert.equal(reviews.includes('GOOGLE_RATING.count'), false);
  assert.match(testimonial, /if \(!FEATURED_TESTIMONIAL_PUBLISHABLE \|\| !T\) return null/);
  assert.match(clientLogos, /if \(REFERENCES\.length === 0\) return null/);
});

test('ISO article is informational and uses a local responsive image', () => {
  const article = read('src/pages/fachwissen/ISO.tsx');
  const pageHero = read('src/components/PageHero.tsx');

  assert.equal(article.includes('images.unsplash.com'), false);
  assert.match(article, /image=\{IMG\.medizintechnik\}/);
  assert.match(pageHero, /srcSet=\{srcSetFor\(image\)\}/);
  // Der Seitenkopf blendet nichts ein: kein Motion-Wrapper, Inhalt steht sofort.
  assert.equal(pageHero.includes('motion/react'), false);
  assert.equal(article.includes('zertifizierten Dienstleister wie dem'), false);
  assert.equal(article.includes('Wir setzen auf zertifizierte Prozesse'), false);
});
