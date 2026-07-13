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
  const organization = site.slice(site.indexOf('export const ORGANIZATION_SCHEMA'));

  assert.match(organization, /'@type': 'Organization'/);
  assert.match(organization, /streetAddress: SITE\.address\.street/);
  assert.equal(organization.includes("'LocalBusiness'"), false);
  assert.equal(organization.includes('hasCredential'), false);
  assert.equal(organization.includes("'@type': 'GeoCoordinates'"), false);
});

test('regional pages publish Service area markup without branch addresses or geo coordinates', () => {
  const pages = [
    read('src/pages/standorte/Stuttgart.tsx'),
    read('src/pages/standorte/Konstanz.tsx'),
    read('src/pages/standorte/VillingenSchwenningen.tsx'),
  ];

  for (const page of pages) {
    assert.match(page, /'@type': 'Service'/);
    assert.match(page, /areaServed:/);
    assert.equal(page.includes("'@type': 'LocalBusiness'"), false);
    assert.equal(page.includes("'@type': 'GeoCoordinates'"), false);
  }
  assert.equal(pages[0].includes('Humboldtstraße 27'), false);
  assert.equal(pages[1].includes('Brückengasse 1b'), false);
});

test('unverified aggregate ratings, references and featured testimonial are gated in consumers', () => {
  const site = read('src/lib/site.ts');
  const home = read('src/pages/Home.tsx');
  const reviews = read('src/components/Reviews.tsx');
  const testimonial = read('src/components/FeaturedTestimonial.tsx');
  const marquee = read('src/components/LogoMarquee.tsx');

  assert.match(site, /export const GOOGLE_RATING =[\s\S]*\? GOOGLE_RATING_CANDIDATE[\s\S]*: null/);
  assert.match(site, /export const REVIEWS: Review\[\] = canPublishVerification\(CLAIM_VERIFICATIONS\.customerReviews\)/);
  assert.match(home, /\{GOOGLE_RATING && \(/);
  assert.match(home, /\{featuredReview && <motion\.aside/);
  assert.match(home, /CLIENT_REFERENCES\.length > 0/);
  assert.equal(reviews.includes('GOOGLE_RATING.count'), false);
  assert.match(testimonial, /if \(!FEATURED_TESTIMONIAL_PUBLISHABLE \|\| !T\) return null/);
  assert.match(marquee, /if \(REFERENCES\.length === 0\) return null/);
});

test('ISO article is informational and uses a local responsive image', () => {
  const article = read('src/pages/fachwissen/ISO.tsx');

  assert.equal(article.includes('images.unsplash.com'), false);
  assert.match(article, /src=\{IMG\.medizintechnik\}/);
  assert.match(article, /srcSet=\{srcSetFor\(IMG\.medizintechnik\)\}/);
  assert.match(article, /initial=\{false\}/);
  assert.equal(article.includes('zertifizierten Dienstleister wie dem'), false);
  assert.equal(article.includes('Wir setzen auf zertifizierte Prozesse'), false);
});
