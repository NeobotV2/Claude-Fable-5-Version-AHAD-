import { gzipSync } from 'node:zlib';
import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'dist');
const KiB = 1024;

// Budgets are deliberately just above the measured 2026-07 baseline. They
// catch regressions without making harmless hash or copy changes flaky.
const BUDGETS = {
  coreJavaScriptGzip: 180 * KiB,
  coreCssGzip: 20 * KiB,
  largestJavaScriptGzip: 120 * KiB,
  pageHtmlGzip: 30 * KiB,
  homeCriticalGzip: 225 * KiB,
};

const errors = [];
const notes = [];
const fail = (message) => errors.push(message);
const gzipSize = (value) => gzipSync(value, { level: 9 }).byteLength;
const kib = (bytes) => `${(bytes / KiB).toFixed(1)} KiB`;

async function readJson(file) {
  return JSON.parse(await readFile(path.join(ROOT, file), 'utf8'));
}

async function walk(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(file));
    else files.push(file);
  }
  return files;
}

function routeFile(routePath) {
  return path.join(DIST, routePath === '/' ? 'index.html' : `${routePath.slice(1)}.html`);
}

function jsonLdBlocks(html) {
  return [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)]
    .map((match) => match[1].trim());
}

function visitJson(value, visit) {
  if (Array.isArray(value)) {
    for (const item of value) visitJson(item, visit);
    return;
  }
  if (value && typeof value === 'object') {
    visit(value);
    for (const nested of Object.values(value)) visitJson(nested, visit);
  }
}

function localAssetReferences(html) {
  const references = new Set();
  const pattern = /<(?:script|link)\b[^>]*(?:src|href)=["']([^"']+)["'][^>]*>/gi;
  for (const [, reference] of html.matchAll(pattern)) {
    if (!reference.startsWith('/') || !/\.(?:js|css)(?:[?#]|$)/i.test(reference)) continue;
    references.add(reference.split(/[?#]/, 1)[0]);
  }
  return [...references];
}

let manifest;
let siteConfig;
try {
  [manifest, siteConfig] = await Promise.all([
    readJson('src/route-manifest.json'),
    readJson('src/site-config.json'),
  ]);
  await stat(DIST);
} catch (error) {
  console.error(`Build-Artefakte oder Manifest fehlen: ${error.message}`);
  process.exit(1);
}

const seenRoutes = new Set();
const expectedSitemapUrls = [];
let largestHtml = { route: '', bytes: 0 };

for (const route of manifest.pages) {
  if (seenRoutes.has(route.path)) fail(`Doppelte Route im Manifest: ${route.path}`);
  seenRoutes.add(route.path);
  if (!route.path.startsWith('/') || (route.path !== '/' && route.path.endsWith('/'))) {
    fail(`Nicht-kanonischer Manifestpfad: ${route.path}`);
  }

  let html;
  try {
    html = await readFile(routeFile(route.path), 'utf8');
  } catch {
    fail(`Prerender-Datei fehlt: ${route.path}`);
    continue;
  }

  const expectedCanonical = `${siteConfig.canonicalOrigin}${route.path}`;
  const expectedRobots = route.index ? 'index, follow' : 'noindex, follow';
  if (!html.includes(`rel="canonical" href="${expectedCanonical}"`)) {
    fail(`Canonical fehlt oder ist falsch: ${route.path}`);
  }
  if (!html.includes(`name="robots" content="${expectedRobots}"`)) {
    fail(`Robots-Wert ist falsch: ${route.path} (erwartet ${expectedRobots})`);
  }
  if (!/<title\b[^>]*>[^<]+<\/title>/i.test(html)) fail(`Title fehlt: ${route.path}`);
  if (route.requireH1 !== false && !/<h1\b/i.test(html)) fail(`Prerender-H1 fehlt: ${route.path}`);
  if (!/<div id="root">\s*\S[\s\S]*<\/div>\s*<\/body>/i.test(html)) fail(`SSR-Inhalt fehlt: ${route.path}`);

  // Inline opacity:0 on server-rendered body content makes essential content
  // disappear when JavaScript or hydration fails. CSS utility opacity is fine.
  if (route.path !== '/admin') {
    const body = html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? '';
    const hiddenInline = [...body.matchAll(/<([a-z][\w:-]*)\b[^>]*style=["'][^"']*\bopacity\s*:\s*0(?:\.0+)?\s*(?:;|$)[^"']*["'][^>]*>/gi)];
    if (hiddenInline.length) {
      fail(`${route.path}: ${hiddenInline.length} serverseitig mit opacity:0 versteckte Elemente`);
    }
  }

  const schemaBlocks = jsonLdBlocks(html);
  if (route.index && schemaBlocks.length === 0) fail(`${route.path}: JSON-LD fehlt`);
  for (const block of schemaBlocks) {
    try {
      const schema = JSON.parse(block);
      visitJson(schema, (node) => {
        const types = Array.isArray(node['@type']) ? node['@type'] : [node['@type']];
        if (types.includes('AggregateRating') || 'aggregateRating' in node) {
          fail(`${route.path}: selbstbezogenes AggregateRating im JSON-LD`);
        }
        if (types.includes('JobPosting')) {
          fail(`${route.path}: JobPosting ohne CI-verifizierten, aktiven Stellenfeed`);
        }
      });
    } catch (error) {
      fail(`${route.path}: ungültiges JSON-LD (${error.message})`);
    }
  }

  if (route.index) expectedSitemapUrls.push(expectedCanonical);
  const compressed = gzipSize(Buffer.from(html));
  if (compressed > largestHtml.bytes) largestHtml = { route: route.path, bytes: compressed };
  if (compressed > BUDGETS.pageHtmlGzip) {
    fail(`${route.path}: HTML gzip ${kib(compressed)} > ${kib(BUDGETS.pageHtmlGzip)}`);
  }
}

try {
  const notFound = await readFile(path.join(DIST, '404.html'), 'utf8');
  if (!notFound.includes('name="robots" content="noindex, follow"')) fail('404.html ist nicht auf noindex gesetzt');
  if (!/<h1\b/i.test(notFound)) fail('404.html enthält keine H1');
} catch {
  fail('404.html fehlt');
}

try {
  const sitemap = await readFile(path.join(DIST, 'sitemap.xml'), 'utf8');
  const actualUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  if (JSON.stringify(actualUrls) !== JSON.stringify(expectedSitemapUrls)) {
    fail('dist/sitemap.xml stimmt nicht exakt mit den indexierbaren Manifest-Routen überein');
  }
} catch {
  fail('dist/sitemap.xml fehlt');
}

const allDistFiles = await walk(DIST);
for (const file of allDistFiles) {
  if (!/\.(?:html|js|css|json|xml|txt)$/i.test(file)) continue;
  const content = await readFile(file, 'utf8');
  if (/https?:\/\/(?:images\.)?unsplash\.com/i.test(content)) {
    fail(`Externe Unsplash-URL im Build: ${path.relative(ROOT, file)}`);
  }
}

const homeHtml = await readFile(path.join(DIST, 'index.html'));
let coreJs = 0;
let coreCss = 0;
for (const reference of localAssetReferences(homeHtml.toString('utf8'))) {
  const file = path.join(DIST, reference.replace(/^\/+/, ''));
  try {
    const compressed = gzipSize(await readFile(file));
    if (reference.endsWith('.js')) coreJs += compressed;
    if (reference.endsWith('.css')) coreCss += compressed;
  } catch {
    fail(`Referenziertes Core-Asset fehlt: ${reference}`);
  }
}

if (coreJs > BUDGETS.coreJavaScriptGzip) {
  fail(`Core-JavaScript gzip ${kib(coreJs)} > ${kib(BUDGETS.coreJavaScriptGzip)}`);
}
if (coreCss > BUDGETS.coreCssGzip) {
  fail(`Core-CSS gzip ${kib(coreCss)} > ${kib(BUDGETS.coreCssGzip)}`);
}
const homeCritical = coreJs + coreCss + gzipSize(homeHtml);
if (homeCritical > BUDGETS.homeCriticalGzip) {
  fail(`Home Critical Payload gzip ${kib(homeCritical)} > ${kib(BUDGETS.homeCriticalGzip)}`);
}

let largestJs = { file: '', bytes: 0 };
for (const file of allDistFiles.filter((candidate) => candidate.endsWith('.js'))) {
  const compressed = gzipSize(await readFile(file));
  if (compressed > largestJs.bytes) largestJs = { file, bytes: compressed };
}
if (largestJs.bytes > BUDGETS.largestJavaScriptGzip) {
  fail(`Größtes JS-Chunk ${path.basename(largestJs.file)} gzip ${kib(largestJs.bytes)} > ${kib(BUDGETS.largestJavaScriptGzip)}`);
}

notes.push(`${manifest.pages.length} Manifest-Routen + 404 statisch geprüft`);
notes.push(`Core JS ${kib(coreJs)}, Core CSS ${kib(coreCss)}, Home Critical ${kib(homeCritical)}`);
notes.push(`Größtes JS ${path.basename(largestJs.file)} ${kib(largestJs.bytes)}, größtes HTML ${largestHtml.route} ${kib(largestHtml.bytes)}`);

for (const note of notes) console.log(`✓ ${note}`);
if (errors.length) {
  for (const error of errors) console.error(`✗ ${error}`);
  console.error(`Build-Qualitätsbarriere fehlgeschlagen (${errors.length} Fehler).`);
  process.exit(1);
}
console.log('✓ Route-, Schema-, No-JS- und Performance-Budgets eingehalten.');
