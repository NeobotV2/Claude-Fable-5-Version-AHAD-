import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (file: string) => readFileSync(path.join(root, file), 'utf8').replace(/\r\n/g, '\n');
const manifest = JSON.parse(read('src/route-manifest.json'));
const siteConfig = JSON.parse(read('src/site-config.json'));

test('route manifest has unique canonical paths without trailing slashes', () => {
  const paths = manifest.pages.map((page: { path: string }) => page.path);
  assert.equal(new Set(paths).size, paths.length);
  for (const pagePath of paths) {
    assert.match(pagePath, /^\//);
    if (pagePath !== '/') assert.equal(pagePath.endsWith('/'), false);
  }
});

test('committed sitemap is generated exactly from indexable manifest pages', () => {
  const sitemap =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    manifest.pages
      .filter((page: { index: boolean }) => page.index)
      .map(
        (page: { path: string; priority: string }) =>
          `  <url><loc>${siteConfig.canonicalOrigin}${page.path}</loc><priority>${page.priority}</priority></url>`,
      )
      .join('\n') +
    '\n</urlset>\n';

  assert.equal(read('public/sitemap.xml'), sitemap);
  assert.equal(siteConfig.canonicalOrigin, 'https://www.ahad-cleaning.de');
});

test('funnels are prerendered but explicitly excluded from indexing', () => {
  for (const route of ['/angebot', '/karriere/bewerbung']) {
    const page = manifest.pages.find((candidate: { path: string }) => candidate.path === route);
    assert.ok(page, `${route} must be registered`);
    assert.equal(page.index, false);
  }
});

test('Vercel enforces clean no-slash URLs and server-side funnel aliases', () => {
  const config = JSON.parse(read('vercel.json'));
  assert.equal(config.cleanUrls, true);
  assert.equal(config.trailingSlash, false);
  assert.equal(config.rewrites, undefined, 'a catch-all rewrite would create soft 404s');

  for (const source of ['/reinigungskonzept', '/kostenrechner']) {
    assert.ok(
      config.redirects.some(
        (redirect: { source: string; destination: string; statusCode: number }) =>
          redirect.source === source && redirect.destination === '/angebot' && redirect.statusCode === 301,
      ),
    );
  }
});

test('self-serving Organization and LocalBusiness rating markup stays disabled', () => {
  const sources = [read('src/lib/site.ts'), read('src/pages/standorte/Konstanz.tsx')].join('\n');
  assert.equal(sources.includes("'@type': 'AggregateRating'"), false);
  assert.equal(sources.includes('"@type": "AggregateRating"'), false);
});
