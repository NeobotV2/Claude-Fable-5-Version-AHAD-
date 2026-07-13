/**
 * Read-only Live-Audit fuer AHAD Cleaning.
 *
 * Liest Sitemap und HTML der oeffentlichen Website und erzeugt eine
 * reproduzierbare URL-Inventur. Es werden keine externen Daten veraendert.
 * Aufruf: node scripts/audit-live.mjs
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const BASE = 'https://www.ahad-cleaning.de';
const OUT = path.resolve('docs/audit/2026-07-12-url-inventar.csv');
const REDIRECT_OUT = path.resolve('docs/audit/2026-07-12-redirect-matrix.csv');
const EXTRA_PATHS = ['/angebot', '/karriere/bewerbung', '/admin', '/reinigungskonzept', '/kostenrechner'];

const decode = (value = '') =>
  value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(Number.parseInt(n, 16)));

const plain = (value = '') =>
  decode(value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim());

const match = (html, re) => plain(html.match(re)?.[1] ?? '');

function schemaTypes(html) {
  const types = new Set();
  const scripts = html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi);
  const visit = (value) => {
    if (!value || typeof value !== 'object') return;
    if (Array.isArray(value)) return value.forEach(visit);
    const type = value['@type'];
    if (Array.isArray(type)) type.forEach((item) => types.add(String(item)));
    else if (type) types.add(String(type));
    Object.values(value).forEach(visit);
  };
  for (const script of scripts) {
    try {
      visit(JSON.parse(script[1]));
    } catch {
      types.add('INVALID_JSON_LD');
    }
  }
  return [...types].sort().join(', ');
}

function internalLinkCount(html) {
  const targets = new Set();
  for (const found of html.matchAll(/<a[^>]+href=["']([^"']+)["']/gi)) {
    try {
      const url = new URL(decode(found[1]), BASE);
      if (url.hostname === 'www.ahad-cleaning.de' || url.hostname === 'ahad-cleaning.de') {
        targets.add(`${url.pathname}${url.search}`);
      }
    } catch {
      // Ungueltige hrefs werden separat im Linkcheck bewertet.
    }
  }
  return targets.size;
}

function pageType(pathname) {
  if (pathname === '/') return 'Startseite';
  if (pathname === '/leistungen') return 'Leistungsuebersicht';
  if (pathname.startsWith('/leistungen/')) return 'Leistungsdetail';
  if (pathname === '/branchen') return 'Branchenuebersicht';
  if (pathname.startsWith('/branchen/')) return 'Branchendetail';
  if (pathname === '/standorte') return 'Standortuebersicht';
  if (pathname.startsWith('/standorte/')) return 'Standortseite';
  if (pathname === '/fachwissen') return 'Fachwissen-Hub';
  if (pathname.startsWith('/fachwissen/')) return 'Fachartikel';
  if (pathname === '/angebot') return 'Angebotsfunnel';
  if (pathname === '/karriere/bewerbung') return 'Bewerbungsfunnel';
  if (pathname === '/karriere') return 'Karriere';
  if (pathname === '/admin') return 'Admin';
  if (pathname === '/impressum' || pathname === '/datenschutz') return 'Rechtliches';
  if (pathname === '/reinigungskonzept' || pathname === '/kostenrechner') return 'Legacy-Alias';
  return 'Unternehmensseite';
}

function goals(pathname) {
  if (pathname === '/angebot') return ['Gebaeudereinigung Angebot/Besichtigung', 'Formularabschluss'];
  if (pathname === '/karriere/bewerbung') return ['Bewerbung', 'Bewerbung absenden'];
  if (pathname === '/karriere') return ['Arbeitgeber/Jobs', 'Bewerbung starten'];
  if (pathname.startsWith('/fachwissen/')) return ['Informationsintention/Fachkompetenz', 'Weiterfuehrende Anfrage'];
  if (pathname.startsWith('/standorte/')) return ['Lokale Dienstleistersuche', 'Besichtigung oder Anruf'];
  if (pathname.startsWith('/leistungen/')) return ['Leistungsintention B2B', 'Besichtigung anfragen'];
  if (pathname.startsWith('/branchen/')) return ['Branchenloesung B2B', 'Besichtigung anfragen'];
  if (pathname === '/impressum' || pathname === '/datenschutz') return ['Rechtliche Transparenz', 'Vertrauen'];
  if (pathname === '/admin') return ['Kein organischer Zweck', 'Interne Verwaltung'];
  return ['Marke/Navigation/Vertrauen', 'Besichtigung oder Kontakt'];
}

async function fetchChain(startUrl) {
  const chain = [];
  let url = startUrl;
  let firstStatus = 0;
  let firstLocation = '';
  for (let i = 0; i < 6; i += 1) {
    const response = await fetch(url, { redirect: 'manual', headers: { 'user-agent': 'AHAD-Audit/1.0' } });
    const location = response.headers.get('location');
    if (i === 0) {
      firstStatus = response.status;
      firstLocation = location ? new URL(location, url).toString() : '';
    }
    chain.push(`${response.status} ${url}${location ? ` -> ${new URL(location, url)}` : ''}`);
    if (response.status >= 300 && response.status < 400 && location) {
      url = new URL(location, url).toString();
      continue;
    }
    return { response, finalUrl: url, chain, firstStatus, firstLocation };
  }
  throw new Error(`Zu viele Redirects: ${startUrl}`);
}

const sitemapResponse = await fetch(`${BASE}/sitemap.xml`);
if (!sitemapResponse.ok) throw new Error(`Sitemap HTTP ${sitemapResponse.status}`);
const sitemap = await sitemapResponse.text();
const sitemapPaths = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((item) => new URL(item[1]).pathname || '/');
const paths = [...new Set([...sitemapPaths, ...EXTRA_PATHS])];

const rows = [];
for (const pathname of paths) {
  const requestedUrl = `${BASE}${pathname === '/' ? '/' : pathname}`;
  const { response, finalUrl, chain } = await fetchChain(requestedUrl);
  const html = (response.headers.get('content-type') ?? '').includes('text/html') ? await response.text() : '';
  const title = match(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
  const description = match(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i);
  const canonical = match(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i);
  const robots = match(html, /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["']/i);
  const h1 = match(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? '';
  const visibleMain = plain(main.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' '));
  const words = visibleMain ? visibleMain.split(/\s+/u).length : 0;
  const [organicGoal, conversionGoal] = goals(pathname);
  let consolidation = '';
  if (pathname === '/reinigungskonzept' || pathname === '/kostenrechner') consolidation = '/angebot (serverseitig 301)';
  if (pathname === '/karriere/bewerbung') consolidation = 'Route beibehalten und direkt ausliefern';
  if (pathname === '/admin') consolidation = 'Authentifizierte Admin-Route oder bewusst 404';
  const notes = [];
  if (response.status === 404) notes.push('Direktaufruf liefert 404');
  if (canonical.startsWith('https://ahad-cleaning.de')) notes.push('Canonical zeigt auf redirectenden Apex-Host');
  if (pathname === '/angebot' && !robots.includes('noindex')) notes.push('Indexierungsabsicht unklar: sitemap-exkludiert, aber indexierbar');
  rows.push({
    URL: requestedUrl,
    Seitentyp: pageType(pathname),
    'HTTP-Status': response.status,
    'Finale URL': finalUrl,
    Redirectkette: chain.join(' | '),
    Canonical: canonical,
    Indexierungsstatus: response.status === 200 && !robots.includes('noindex') ? 'indexierbar' : robots || `HTTP ${response.status}`,
    Title: title,
    'Meta Description': description,
    H1: h1,
    Wortanzahl: words,
    'Interne Linkziele': internalLinkCount(html),
    'Strukturierte Daten': schemaTypes(html),
    'Organischer Zweck': organicGoal,
    'Conversion-Ziel': conversionGoal,
    'Moegliche Ziel-URL': consolidation,
    Hinweise: notes.join('; '),
  });
  process.stdout.write('.');
}

const columns = Object.keys(rows[0]);
const csvCell = (value) => `"${String(value ?? '').replace(/"/g, '""')}"`;
const csv = [columns, ...rows.map((row) => columns.map((column) => row[column]))]
  .map((row) => row.map(csvCell).join(';'))
  .join('\n');

await mkdir(path.dirname(OUT), { recursive: true });
await writeFile(OUT, `\ufeff${csv}\n`, 'utf8');

const vercel = JSON.parse(await readFile(path.resolve('vercel.json'), 'utf8'));
const redirectRows = [];
for (const redirect of vercel.redirects ?? []) {
  const oldUrl = `${BASE}${redirect.source}`;
  const expectedTarget = new URL(redirect.destination, BASE).toString();
  const live = await fetchChain(oldUrl);
  const reason = redirect.destination.startsWith('/leistungen/')
    ? 'Legacy-Leistungs-URL auf thematisch passende kanonische Leistungsseite konsolidieren'
    : redirect.destination === '/unternehmen'
      ? 'Alte Unternehmensseite auf aktuelle Unternehmensseite konsolidieren'
      : redirect.destination === '/kontakt'
        ? 'Alte Buchungsseite auf aktuellen Kontaktweg konsolidieren'
        : 'Legacy-URL konsolidieren';
  redirectRows.push({
    'Alte URL': oldUrl,
    'Neue Ziel-URL': expectedTarget,
    'Redirect-Typ': redirect.statusCode,
    'Live-Status': live.firstStatus,
    'Live-Location': live.firstLocation,
    'Finale URL': live.finalUrl,
    Begruendung: reason,
    Hinweis: live.firstStatus === redirect.statusCode && live.finalUrl === expectedTarget ? 'wie konfiguriert' : 'Abweichung pruefen',
  });
  process.stdout.write('.');
}

const redirectColumns = Object.keys(redirectRows[0]);
const redirectCsv = [redirectColumns, ...redirectRows.map((row) => redirectColumns.map((column) => row[column]))]
  .map((row) => row.map(csvCell).join(';'))
  .join('\n');
await writeFile(REDIRECT_OUT, `\ufeff${redirectCsv}\n`, 'utf8');

console.log(`\n${rows.length} URLs -> ${OUT}`);
console.log(`${redirectRows.length} Redirects -> ${REDIRECT_OUT}`);
