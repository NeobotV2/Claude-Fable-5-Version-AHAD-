/**
 * Prerendering (SSG): rendert jede Route mit dem SSR-Bundle zu statischem
 * HTML und schreibt sie nach dist/<route>/index.html. Crawler und
 * LLM-Fetcher sehen damit vollständigen Inhalt + Meta ohne JavaScript.
 *
 * Ablauf (npm run build:ssg):
 *   1. vite build            → dist/ (Client-SPA, Template + Assets)
 *   2. vite build:ssr        → dist-server/entry-server.js
 *   3. node prerender.mjs     → injiziert SSR-HTML in jede Seite
 *
 * Schlägt eine Route fehl, wird die SPA-Hülle geschrieben (Route bleibt als
 * Client-Render funktionsfähig) — der Build bricht nie ab.
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const dist = path.resolve('dist');
const ROUTES = [
  '/',
  '/leistungen',
  '/leistungen/unterhaltsreinigung',
  '/leistungen/industrie-produktionsreinigung',
  '/leistungen/glas-fassadenreinigung',
  '/leistungen/baureinigung',
  '/leistungen/medizintechnik-reinigung',
  '/leistungen/sonderreinigung-stillstandsservice',
  '/leistungen/winterdienst-hausmeisterservice',
  '/leistungen/kuechenabluftreinigung-vdi-2052',
  '/branchen',
  '/branchen/industrie-produktion',
  '/branchen/medizintechnik',
  '/branchen/buero-verwaltung',
  '/branchen/gewerbeobjekte',
  '/branchen/hotellerie-objektbetrieb',
  '/ahad-system',
  '/unternehmen',
  '/standorte',
  '/standorte/villingen-schwenningen',
  '/standorte/stuttgart',
  '/standorte/konstanz',
  '/referenzen',
  '/karriere',
  '/angebot',
  '/fachwissen',
  '/fachwissen/unterhaltsreinigung-unternehmen-reinigungsintervalle',
  '/fachwissen/iso-9001-iso-14001-gebaeudereinigung-unternehmen',
  '/fachwissen/industrie-produktionsreinigung-ohne-prozessstoerung',
  '/fachwissen/reinigungsfirma-wechseln-checkliste-tipps',
  '/kontakt',
  '/impressum',
  '/datenschutz',
];

const template = await readFile(path.join(dist, 'index.html'), 'utf8');
const { render } = await import(path.resolve('dist-server/entry-server.js'));

// Statische Default-Tags entfernen, damit Helmet sie nicht dupliziert
// (Titel, Description und die Basis-OG/Twitter-Fallbacks aus index.html).
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

let ok = 0;
let fallback = 0;

async function emit(route, outFile) {
  await mkdir(path.dirname(outFile), { recursive: true });
  try {
    const { html, head } = await render(route);
    await writeFile(outFile, injectRoot(base, html, head));
    ok++;
    return true;
  } catch (err) {
    // Degradiert zur SPA-Hülle — Route funktioniert weiter via Client-Render.
    await writeFile(outFile, template);
    fallback++;
    console.warn(`  ! ${route} → Fallback (CSR): ${err?.message ?? err}`);
    return false;
  }
}

console.log(`Prerendering ${ROUTES.length} Routen …`);
for (const route of ROUTES) {
  const outFile = route === '/' ? path.join(dist, 'index.html') : path.join(dist, route.slice(1), 'index.html');
  await emit(route, outFile);
}

// 404-Seite (SPA-Fallback für Hoster) aus der NotFound-Route.
try {
  const { html, head } = await render('/__not-found__');
  await writeFile(path.join(dist, '404.html'), injectRoot(base, html, head));
  ok++;
} catch {
  await writeFile(path.join(dist, '404.html'), template);
  fallback++;
}

console.log(`✓ Prerender fertig: ${ok} statisch, ${fallback} Fallback.`);
