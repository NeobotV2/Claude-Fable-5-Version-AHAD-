/**
 * Visitenkarten aus den Signatur-Stammdaten (brand/signatur/team.json).
 *
 * Ausgabe → brand/visitenkarten/<slug>/
 *   visitenkarte-<slug>-druck.pdf   2 Seiten (Vorder-, Rückseite), 91 × 61 mm =
 *                                   85 × 55 mm Endformat + 3 mm Beschnitt rundum,
 *                                   Vektor, Schriften eingebettet, ohne Schnittmarken
 *   vorschau-<slug>.png             Ansicht beider Seiten im Endformat
 *
 * Personen mit Platzhaltern („[Position]“) werden übersprungen.
 * Logo aus dem offiziellen Druck-Kit (brand/print/svg), Farben laut Markenhandbuch.
 *
 * Aufruf: npm run visitenkarten
 */
import { chromium } from 'playwright';
import QRCode from 'qrcode';
import { mkdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const team = JSON.parse(await readFile(path.join(root, 'brand/signatur/team.json'), 'utf8'));

const FIRMA = {
  name: 'AHAD Cleaning Company GmbH',
  telefon: '+49 7721 944 79 15',
  strasse: 'Max-Planck-Straße 11',
  plz: '78052',
  ort: 'Villingen-Schwenningen',
  web: 'www.ahad-cleaning.de',
};

const logoFarbe = await readFile(path.join(root, 'brand/print/svg/ahad-lockup-farbe.svg'), 'utf8');
// Wortmarke weiß-mint (Standard auf Navy laut Design-System): Original-Artwork, nur umgefärbt.
const logoWortmarke = (await readFile(path.join(root, 'brand/print/svg/ahad-wortmarke-farbe-flat.svg'), 'utf8'))
  .replace('#0B2341', '#FFFFFF')
  .replace('#0D6B38', '#9CDDB7');
// Schriften als data-URL einbetten: file://-Fonts lädt Chromium aus setContent() nicht.
const fontData = async (file) =>
  `data:font/woff2;base64,${(await readFile(path.join(root, 'src/assets/fonts', file))).toString('base64')}`;
const INTER = await fontData('Inter-var.woff2');

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const vcardEsc = (s) => String(s).replace(/([,;\\])/g, '\\$1');

function vcard(p) {
  const [vorname, ...rest] = p.name.split(' ');
  const nachname = rest.pop() ?? '';
  const weitere = rest.join(' ');
  return [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${vcardEsc(nachname)};${vcardEsc(vorname)};${vcardEsc(weitere)};;`,
    `FN:${vcardEsc(p.name)}`,
    `ORG:${vcardEsc(FIRMA.name)}`,
    `TITLE:${vcardEsc(p.position)}`,
    p.mobil && `TEL;TYPE=CELL:${p.mobil.replace(/\s/g, '')}`,
    `TEL;TYPE=WORK:${FIRMA.telefon.replace(/\s/g, '')}`,
    `EMAIL;TYPE=WORK:${p.email}`,
    `URL:https://${FIRMA.web}`,
    `ADR;TYPE=WORK:;;${vcardEsc(FIRMA.strasse)};${vcardEsc(FIRMA.ort)};;${FIRMA.plz};Deutschland`,
    'END:VCARD',
  ].filter(Boolean).join('\r\n');
}

/**
 * Eine Seite = 91 × 61 mm. Aufbau nach Design-System „AHAD Cleaning“ (Komponente Visitenkarte):
 * Vorderseite Navy mit Wortmarke weiß-mint, Rückseite weiß mit Logo komplett und Kontakt.
 * Die Wortmarke ist auf beiden Seiten gleich groß: 34 mm (Logo komplett 46 mm ⇒ Wortmarke 34 mm).
 * Inhalt im Sicherheitsabstand: 3 mm Beschnitt + 4 mm.
 */
function html(p, qrSvg) {
  const zeilen = [
    p.mobil && `Mobil ${p.mobil}`,
    `${p.mobil ? 'Zentrale' : 'Telefon'} ${FIRMA.telefon}`,
    p.email,
  ].filter(Boolean);

  return `<!doctype html><meta charset="utf-8">
<style>
  @font-face { font-family: Inter; src: url('${INTER}') format('woff2'); font-weight: 400 900; }
  @page { size: 91mm 61mm; margin: 0; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  .seite { width: 91mm; height: 61mm; position: relative; overflow: hidden; page-break-after: always; break-after: page; }
  .seite:last-child { page-break-after: auto; break-after: auto; }

  .vorne { background: #0B2341; display: flex; align-items: center; justify-content: center; }
  .vorne svg { width: 34mm; height: auto; display: block; }

  .hinten { background: #ffffff; color: #1C2733; font-family: Inter, sans-serif; padding: 7mm;
    display: flex; flex-direction: column; justify-content: space-between; }
  .hinten .logo svg { width: 46mm; height: auto; display: block; }
  .hinten .unten { display: flex; align-items: flex-end; justify-content: space-between; gap: 3mm; }
  .hinten .name { font-weight: 700; font-size: 9pt; line-height: 1.25; color: #0B2341; }
  .hinten .position { font-weight: 500; font-size: 7pt; line-height: 1.3; color: #424751; margin-bottom: 1.8mm; }
  .hinten .kontakt { font-size: 7pt; line-height: 1.4; }
  .hinten .web { font-weight: 600; color: #0D6B38; }
  .hinten .adresse { color: #424751; margin-top: 0.8mm; }
  .hinten .qr { width: 16mm; flex: none; }
  .hinten .qr svg { width: 100%; height: auto; display: block; }
</style>

<section class="seite vorne">${logoWortmarke}</section>

<section class="seite hinten">
  <div class="logo">${logoFarbe}</div>
  <div class="unten">
    <div>
      <div class="name">${esc(p.name)}</div>
      <div class="position">${esc(p.position)}</div>
      <div class="kontakt">
        ${zeilen.map((z) => `<div>${esc(z)}</div>`).join('')}
        <div class="web">${FIRMA.web}</div>
        <div class="adresse">${esc(FIRMA.strasse)}<br>${FIRMA.plz} ${esc(FIRMA.ort)}</div>
      </div>
    </div>
    <div class="qr">${qrSvg}</div>
  </div>
</section>`;
}

const personen = team.personen.filter((p) => !/\[.*\]/.test(`${p.name}${p.position}${p.email}`));
const uebersprungen = team.personen.filter((p) => !personen.includes(p));

const browser = await chromium.launch(
  process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {},
);
try {
  for (const p of personen) {
    const dir = path.join(root, 'brand/visitenkarten', p.slug);
    await mkdir(dir, { recursive: true });
    const qrSvg = await QRCode.toString(vcard(p), { type: 'svg', errorCorrectionLevel: 'L', margin: 0, color: { dark: '#0B2341', light: '#ffffff' } });
    const page = await browser.newPage({ deviceScaleFactor: 4 });
    await page.setContent(html(p, qrSvg), { waitUntil: 'load' });
    await page.evaluate('document.fonts.ready');
    const pdf = path.join(dir, `visitenkarte-${p.slug}-druck.pdf`);
    await page.pdf({ path: pdf, width: '91mm', height: '61mm', printBackground: true, preferCSSPageSize: true });

    // Vorschau im Endformat (Beschnitt abgeschnitten), beide Seiten nebeneinander.
    await page.setViewportSize({ width: 1000, height: 400 });
    await page.addStyleTag({ content: `
      body { display: flex; gap: 6mm; padding: 6mm; background: #E9EDF2; width: max-content; }
      .seite { width: 85mm; height: 55mm; border-radius: 0.8mm; box-shadow: 0 1.5mm 4mm rgba(11,35,65,.18); }
      .hinten { padding: 4mm; }` });
    await page.locator('body').screenshot({ path: path.join(dir, `vorschau-${p.slug}.png`) });
    await page.close();
    console.log(`✓ ${p.name}: ${path.relative(root, pdf)}`);
  }
} finally {
  await browser.close();
}
for (const p of uebersprungen) console.log(`– übersprungen (Platzhalter in team.json): ${p.name}`);
