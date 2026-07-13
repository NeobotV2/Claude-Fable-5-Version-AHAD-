/**
 * Statisches Prerendering aller im zentralen Manifest registrierten Seiten.
 * Jede Route muss vollständig rendern; ein CSR-Fallback macht den Build rot.
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const dist = path.resolve('dist');
const manifest = JSON.parse(await readFile(path.resolve('src/route-manifest.json'), 'utf8'));
const siteConfig = JSON.parse(await readFile(path.resolve('src/site-config.json'), 'utf8'));
const routes = manifest.pages;
const canonicalOrigin = siteConfig.canonicalOrigin;

if (!canonicalOrigin.startsWith('https://www.')) {
  throw new Error(`Canonical-Origin muss HTTPS und www verwenden: ${canonicalOrigin}`);
}

const seenPaths = new Set();
for (const route of routes) {
  if (!route.path.startsWith('/') || (route.path !== '/' && route.path.endsWith('/'))) {
    throw new Error(`Ungültiger kanonischer Pfad im Routenmanifest: ${route.path}`);
  }
  if (seenPaths.has(route.path)) throw new Error(`Doppelte Route im Manifest: ${route.path}`);
  seenPaths.add(route.path);
}

// Der SSR-Build leert dist-server vor jedem vollständigen Build. Dort halten
// wir die unveränderte Client-Shell fest, damit `npm run prerender` auch bei
// einem zweiten lokalen Aufruf idempotent bleibt.
const templateCache = path.resolve('dist-server/client-template.html');
let template;
try {
  template = await readFile(templateCache, 'utf8');
} catch {
  template = await readFile(path.join(dist, 'index.html'), 'utf8');
  await writeFile(templateCache, template);
}
const serverEntryUrl = pathToFileURL(path.resolve('dist-server/entry-server.js')).href;
const { render } = await import(serverEntryUrl);

// Statische Default-Tags entfernen, damit Helmet sie nicht dupliziert.
const base = template
  .replace(/<title>[\s\S]*?<\/title>\s*/i, '')
  .replace(/<meta\s+name="description"[^>]*>\s*/i, '')
  .replace(/<meta\s+(?:property|name)="(?:og|twitter):[^"]*"[^>]*>\s*/gi, '')
  .replace(/<!--[^>]*Open-Graph[\s\S]*?-->\s*/i, '');

function injectRoot(tpl, html, head) {
  return tpl
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
    .replace('</head>', `${head}\n  </head>`);
}

function validateRender(route, html, head) {
  if (!html.trim()) throw new Error('SSR lieferte keinen Seiteninhalt');
  if (route.requireH1 !== false && !/<h1\b/i.test(html)) throw new Error('SSR-Seite enthält keine H1');
  if (!/<title\b/i.test(head)) throw new Error('Helmet lieferte keinen Title');

  const expectedCanonical = `${canonicalOrigin}${route.path}`;
  if (!head.includes(`rel="canonical" href="${expectedCanonical}"`)) {
    throw new Error(`Canonical fehlt oder weicht ab (erwartet: ${expectedCanonical})`);
  }

  const expectedRobots = route.index ? 'index, follow' : 'noindex, follow';
  if (!head.includes(`name="robots" content="${expectedRobots}"`)) {
    throw new Error(`Robots-Entscheidung fehlt (erwartet: ${expectedRobots})`);
  }
}

let ok = 0;
const failures = [];

async function emit(route, outFile) {
  await mkdir(path.dirname(outFile), { recursive: true });
  try {
    const rendered = await render(route.path);
    const html = rendered.html;
    let head = rendered.head;
    if (route.allowHeadFallback && !head.includes('rel="canonical"')) {
      head += `<title>Admin | AHAD Cleaning</title><meta name="description" content="Geschützter Verwaltungsbereich von AHAD Cleaning."><meta name="robots" content="noindex, follow"><link rel="canonical" href="${canonicalOrigin}${route.path}">`;
    }
    validateRender(route, html, head);
    await writeFile(outFile, injectRoot(base, html, head));
    ok++;
  } catch (error) {
    // Artefakt nur zur lokalen Diagnose schreiben; der Build schlägt unten fehl.
    await writeFile(outFile, template);
    failures.push({ route: route.path, error });
    console.error(`  ✗ ${route.path}: ${error?.message ?? error}`);
  }
}

console.log(`Prerendering ${routes.length} Routen …`);
for (const route of routes) {
  const outFile = route.path === '/'
    ? path.join(dist, 'index.html')
    : path.join(dist, `${route.path.slice(1)}.html`);
  await emit(route, outFile);
}

try {
  const { html, head } = await render('/__not-found__');
  if (!html.trim() || !/<h1\b/i.test(html) || !head.includes('content="noindex, follow"')) {
    throw new Error('404-Seite ist unvollständig oder nicht auf noindex gesetzt');
  }
  await writeFile(path.join(dist, '404.html'), injectRoot(base, html, head));
  ok++;
} catch (error) {
  await writeFile(path.join(dist, '404.html'), template);
  failures.push({ route: '/__not-found__', error });
  console.error(`  ✗ /__not-found__: ${error?.message ?? error}`);
}

const indexableRoutes = routes.filter((route) => route.index);
const sitemap =
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  indexableRoutes
    .map((route) => {
      const suffix = route.path === '/' ? '/' : route.path;
      return `  <url><loc>${canonicalOrigin}${suffix}</loc><priority>${route.priority}</priority></url>`;
    })
    .join('\n') +
  '\n</urlset>\n';

const committedSitemap = await readFile(path.resolve('public/sitemap.xml'), 'utf8');
if (committedSitemap.replace(/\r\n/g, '\n') !== sitemap) {
  throw new Error('public/sitemap.xml weicht vom Routenmanifest ab und muss synchronisiert werden.');
}

await writeFile(path.join(dist, 'sitemap.xml'), sitemap);
console.log(`✓ sitemap.xml generiert (${indexableRoutes.length} indexierbare 200-URLs).`);

if (failures.length > 0) {
  throw new Error(`Prerender fehlgeschlagen: ${failures.length} Route(n) benötigen CSR-Fallback.`);
}

console.log(`✓ Prerender fertig: ${ok} statische Dokumente, 0 Fallbacks.`);
