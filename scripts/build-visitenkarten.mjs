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
import { mkdir, readFile, writeFile } from 'node:fs/promises';
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
const logoWeiss = await readFile(path.join(root, 'brand/print/svg/ahad-lockup-weiss.svg'), 'utf8');
// Schriften als data-URL einbetten: file://-Fonts lädt Chromium aus setContent() nicht.
const fontData = async (file) =>
  `data:font/woff2;base64,${(await readFile(path.join(root, 'src/assets/fonts', file))).toString('base64')}`;
const INTER = await fontData('Inter-var.woff2');
const MONTSERRAT = await fontData('Montserrat-var.woff2');

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

/** Eine Seite = 91 × 61 mm. Inhalt im Sicherheitsabstand: 3 mm Beschnitt + 4 mm. */
function html(p, qrSvg) {
  const zeilen = [
    p.mobil && ['Mobil', p.mobil],
    ['Telefon', FIRMA.telefon],
    ['E-Mail', p.email],
    ['Web', FIRMA.web],
  ].filter(Boolean);

  return `<!doctype html><meta charset="utf-8">
<style>
  @font-face { font-family: Inter; src: url('${INTER}') format('woff2'); font-weight: 400 900; }
  @font-face { font-family: Montserrat; src: url('${MONTSERRAT}') format('woff2'); font-weight: 500 900; }
  @page { size: 91mm 61mm; margin: 0; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  .seite { width: 91mm; height: 61mm; position: relative; overflow: hidden; page-break-after: always; break-after: page; }
  .seite:last-child { page-break-after: auto; break-after: auto; }
  /* Sicherheitsbereich: 3 mm Beschnitt + 4,5 mm Rand */
  .inhalt { position: absolute; inset: 7.5mm; }

  .vorne { background: #ffffff; color: #1C2733; font-family: Inter, sans-serif; }
  .vorne .logo svg { width: 36mm; height: auto; display: block; }
  .vorne .linie { position: absolute; left: 0; top: 0; bottom: 0; width: 4.2mm; background: #0D6B38; }
  .vorne .inhalt { display: flex; flex-direction: column; justify-content: space-between; }
  .vorne .person { margin-bottom: 2.6mm; }
  .vorne .name { font-family: Montserrat, sans-serif; font-weight: 800; font-size: 11pt; color: #0B2341; letter-spacing: -0.01em; }
  .vorne .position { font-weight: 600; font-size: 7.2pt; color: #0D6B38; margin-top: 0.9mm; }
  .vorne .kontakt { font-size: 6.9pt; line-height: 1.45; }
  .vorne .kontakt span { display: inline-block; width: 11mm; color: #5B6878; font-weight: 500; }
  .vorne .kontakt b { font-weight: 600; color: #0B2341; }

  .hinten { background: #0B2341; color: #ffffff; font-family: Inter, sans-serif; }
  .hinten .logo svg { width: 46mm; height: auto; display: block; }
  .hinten .claim { font-family: Montserrat, sans-serif; font-weight: 700; font-size: 8.4pt; color: #9CDDB7; margin-top: 3.2mm; }
  .hinten .unten { position: absolute; left: 0; bottom: 0; width: 44mm; font-size: 6.5pt; line-height: 1.5; color: rgba(255,255,255,0.82); }
  .hinten .leistungen { margin-top: 1.8mm; }
  .hinten .iso { margin-top: 1.6mm; font-weight: 700; color: #ffffff; letter-spacing: 0.04em; }
  .hinten .qr { position: absolute; right: 0; bottom: 0; width: 24mm; text-align: center; }
  .hinten .qr .feld { background: #ffffff; border-radius: 1.6mm; padding: 1.6mm; }
  .hinten .qr svg { width: 100%; height: auto; display: block; }
  .hinten .qr .hinweis { font-size: 5.8pt; margin-top: 1.2mm; color: rgba(255,255,255,0.82); }
</style>

<section class="seite vorne">
  <div class="linie"></div>
  <div class="inhalt" style="left: 10mm">
    <div class="logo">${logoFarbe}</div>
    <div>
      <div class="person">
        <div class="name">${esc(p.name)}</div>
        <div class="position">${esc(p.position)}</div>
      </div>
      <div class="kontakt">
        ${zeilen.map(([k, v]) => `<div><span>${k}</span><b>${esc(v)}</b></div>`).join('')}
      </div>
    </div>
  </div>
</section>

<section class="seite hinten">
  <div class="inhalt">
    <div class="logo">${logoWeiss}</div>
    <div class="claim">Sauberkeit mit System.</div>
    <div class="unten">
      <div>${esc(FIRMA.name)}<br>${esc(FIRMA.strasse)}<br>${FIRMA.plz} ${esc(FIRMA.ort)}</div>
      <div class="leistungen">Gebäude-, Industrie- und Glasreinigung<br>Winterdienst und Hausmeisterservice</div>
      <div class="iso">ISO 9001 · ISO 14001</div>
    </div>
    <div class="qr">
      <div class="feld">${qrSvg}</div>
      <div class="hinweis">Kontakt speichern</div>
    </div>
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
    await page.evaluate(() => document.fonts.ready);
    const pdf = path.join(dir, `visitenkarte-${p.slug}-druck.pdf`);
    await page.pdf({ path: pdf, width: '91mm', height: '61mm', printBackground: true, preferCSSPageSize: true });

    // Vorschau im Endformat (Beschnitt abgeschnitten), beide Seiten nebeneinander.
    await page.setViewportSize({ width: 1000, height: 400 });
    await page.addStyleTag({ content: `
      body { display: flex; gap: 6mm; padding: 6mm; background: #E9EDF2; width: max-content; }
      .seite { width: 85mm; height: 55mm; border-radius: 0.8mm; box-shadow: 0 1.5mm 4mm rgba(11,35,65,.18); }
      .inhalt { inset: 4.5mm; } .vorne .inhalt { left: 7mm !important; }
      .vorne .linie { width: 1.2mm; }` });
    await page.locator('body').screenshot({ path: path.join(dir, `vorschau-${p.slug}.png`) });
    await page.close();
    console.log(`✓ ${p.name}: ${path.relative(root, pdf)}`);
  }
} finally {
  await browser.close();
}
for (const p of uebersprungen) console.log(`– übersprungen (Platzhalter in team.json): ${p.name}`);
