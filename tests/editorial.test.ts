import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';

async function loadEditorialModule() {
  const source = readFileSync(new URL('../src/data/editorial.ts', import.meta.url), 'utf8').replace(
    "import { SITE } from '@/lib/site';",
    "const SITE = { url: 'https://www.ahad-cleaning.de', legalName: 'AHAD Cleaning Company GmbH' } as const;",
  );
  const javascript = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  return import(`data:text/javascript;base64,${Buffer.from(javascript).toString('base64')}`);
}

const editorialModule = loadEditorialModule();

test('every editorial article has dates, orientation and classified HTTPS sources', async () => {
  const { EDITORIAL_ARTICLES, EDITORIAL_ARTICLE_LIST, EDITORIAL_CLUSTER_ORDER, buildArticleSchema } = await editorialModule;
  const articles = Object.values(EDITORIAL_ARTICLES) as Array<{
    slug: string;
    cluster: string;
    listingTitle: string;
    decisionQuestion: string;
    readingMinutes: number;
    related: string[];
    datePublished: string;
    dateModified: string;
    orientationNote: string;
    sources: Array<{ url: string; kind: string; checkedAt: string }>;
  }>;

  assert.equal(articles.length, 8);
  assert.equal(EDITORIAL_ARTICLE_LIST.length, articles.length);
  assert.equal(EDITORIAL_CLUSTER_ORDER.length, 4);
  for (const article of articles) {
    assert.ok(article.listingTitle.length >= 20, article.slug);
    assert.ok(article.decisionQuestion.endsWith('?'), article.slug);
    assert.ok(article.readingMinutes >= 3, article.slug);
    assert.equal(article.related.length, 2, article.slug);
    assert.ok(article.related.every((slug) => slug in EDITORIAL_ARTICLES), article.slug);
    assert.ok(EDITORIAL_CLUSTER_ORDER.includes(article.cluster), article.slug);
    assert.ok(Date.parse(article.datePublished), article.slug);
    assert.ok(Date.parse(article.dateModified), article.slug);
    assert.ok(Date.parse(article.dateModified) >= Date.parse(article.datePublished), article.slug);
    assert.ok(article.orientationNote.length >= 80, article.slug);
    assert.ok(article.sources.length >= 2, article.slug);
    assert.ok(article.sources.every((source) => ['official-primary', 'industry-guidance'].includes(source.kind)));
    assert.ok(article.sources.some((source) => source.kind === 'official-primary'), article.slug);
    assert.ok(article.sources.every((source) => new URL(source.url).protocol === 'https:'));
    assert.ok(article.sources.every((source) => Date.parse(source.checkedAt)), article.slug);

    const schema = buildArticleSchema(article, new Date('2026-07-13T12:00:00Z'));
    assert.equal(schema.author['@type'], 'Organization');
    assert.equal('reviewedBy' in schema, false, `${article.slug} must not invent a Person reviewer`);
    assert.deepEqual(schema.citation, article.sources.map((source) => source.url));
  }
});

test('article navigation ids are unique and complete for every article', async () => {
  const { EDITORIAL_ARTICLES, EDITORIAL_SECTIONS } = await editorialModule;

  assert.deepEqual(Object.keys(EDITORIAL_SECTIONS).sort(), Object.keys(EDITORIAL_ARTICLES).sort());
  for (const [slug, sections] of Object.entries(EDITORIAL_SECTIONS) as Array<[
    string,
    Array<{ id: string; label: string }>,
  ]>) {
    assert.ok(sections.length >= 4, slug);
    assert.equal(new Set(sections.map((section) => section.id)).size, sections.length, slug);
    assert.ok(sections.every((section) => /^[a-z0-9-]+$/.test(section.id)), slug);
    assert.ok(sections.every((section) => section.label.trim().length > 3), slug);
  }
});

test('claim-sensitive guides use directly relevant sources rather than generic indexes', async () => {
  const { EDITORIAL_ARTICLES } = await editorialModule;
  const urls = (slug: string) => EDITORIAL_ARTICLES[slug].sources.map((source: { url: string }) => source.url);

  const costs = EDITORIAL_ARTICLES['was-kostet-gebaeudereinigung-stundensatz-preise'];
  assert.ok(costs.sources.some((source: { kind: string }) => source.kind === 'industry-guidance'));
  assert.ok(urls(costs.slug).some((url: string) => url.includes('/ausschreibung-und-vergabe/')));

  const change = urls('reinigungsfirma-wechseln-checkliste-tipps');
  assert.ok(change.some((url: string) => url.endsWith('/__613a.html')));
  assert.ok(change.some((url: string) => url.endsWith('/__314.html')));
  assert.equal(change.some((url: string) => url.endsWith('/bgb/')), false);

  assert.ok(urls('iso-9001-iso-14001-gebaeudereinigung-unternehmen').some((url: string) => url.endsWith('/__49.html')));
  assert.ok(urls('kuechenabluftreinigung-vdi-2052-pflicht-ablauf-nachweis').some((url: string) => url.includes('vdi-2052-blatt-2')));
});
test('reviewer gate is fail-closed for missing evidence and expired verification', async () => {
  const { isActiveReviewer } = await editorialModule;
  const now = new Date('2026-07-13T12:00:00Z');
  const validReviewer = {
    name: 'Verifizierte Testperson',
    role: 'Fachprüfung',
    evidence: ['EDITORIAL-REVIEW-2026-0001'],
    verifiedAt: '2026-07-01T00:00:00Z',
    expiresAt: '2026-12-31T23:59:59Z',
  };

  assert.equal(isActiveReviewer(validReviewer, now), true);
  assert.equal(isActiveReviewer({ ...validReviewer, evidence: [] }, now), false);
  assert.equal(isActiveReviewer({ ...validReviewer, verifiedAt: null }, now), false);
  assert.equal(isActiveReviewer({ ...validReviewer, expiresAt: '2026-12-31' }, now), false);
  assert.equal(isActiveReviewer({ ...validReviewer, expiresAt: '2026-07-12T23:59:59Z' }, now), false);
  assert.equal(isActiveReviewer({ ...validReviewer, evidence: ['http://not-secure.example'] }, now), false);
});

test('Person schema is emitted only for an active reviewer', async () => {
  const { EDITORIAL_ARTICLES, buildArticleSchema } = await editorialModule;
  const base = EDITORIAL_ARTICLES['checkliste-reinigungsangebot'];
  const active = {
    ...base,
    reviewer: {
      name: 'Verifizierte Testperson',
      role: 'Fachprüfung',
      evidence: ['https://example.org/editorial-evidence/1'],
      verifiedAt: '2026-07-01T00:00:00Z',
      expiresAt: '2026-12-31T23:59:59Z',
    },
  };
  const expired = {
    ...active,
    reviewer: { ...active.reviewer, expiresAt: '2026-07-12T23:59:59Z' },
  };

  const activeSchema = buildArticleSchema(active, new Date('2026-07-13T12:00:00Z'));
  assert.equal(activeSchema.reviewedBy['@type'], 'Person');
  assert.equal(activeSchema.reviewedBy.name, 'Verifizierte Testperson');

  const expiredSchema = buildArticleSchema(expired, new Date('2026-07-13T12:00:00Z'));
  assert.equal('reviewedBy' in expiredSchema, false);
});
