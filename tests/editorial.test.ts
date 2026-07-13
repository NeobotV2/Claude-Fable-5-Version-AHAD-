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

test('every editorial article has dates, orientation and official HTTPS primary sources', async () => {
  const { EDITORIAL_ARTICLES, buildArticleSchema } = await editorialModule;
  const articles = Object.values(EDITORIAL_ARTICLES) as Array<{
    slug: string;
    datePublished: string;
    dateModified: string;
    orientationNote: string;
    sources: Array<{ url: string; kind: string }>;
  }>;

  assert.equal(articles.length, 8);
  for (const article of articles) {
    assert.ok(Date.parse(article.datePublished), article.slug);
    assert.ok(Date.parse(article.dateModified), article.slug);
    assert.ok(Date.parse(article.dateModified) >= Date.parse(article.datePublished), article.slug);
    assert.ok(article.orientationNote.length >= 80, article.slug);
    assert.ok(article.sources.length >= 2, article.slug);
    assert.ok(article.sources.every((source) => source.kind === 'official-primary'));
    assert.ok(article.sources.every((source) => new URL(source.url).protocol === 'https:'));

    const schema = buildArticleSchema(article, new Date('2026-07-13T12:00:00Z'));
    assert.equal(schema.author['@type'], 'Organization');
    assert.equal('reviewedBy' in schema, false, `${article.slug} must not invent a Person reviewer`);
    assert.deepEqual(schema.citation, article.sources.map((source) => source.url));
  }
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
