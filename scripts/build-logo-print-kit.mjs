/**
 * Erzeugt das Druck-Kit des AHAD-Logos aus dem OFFIZIELLEN Artwork
 * (src/components/logo-art.json — dieselbe Quelle wie die <Logo>-Komponente
 * und scripts/generate-assets.mjs). Nichts wird nachgezeichnet oder
 * neu arrangiert: identische Geometrie, identische Markenfarben.
 *
 * Ausgabe → brand/print/
 *   svg/   Vektor (das, was Druckerei/Stickerei braucht)
 *   pdf/   Vektor-PDF, transparent, maßhaltig (Standard-Abgabeformat)
 *   png/   transparent, 300 dpi, Brustdruck-Größe
 *   uebersicht.png  Kontaktbogen aller Versionen (hell + dunkel)
 *
 * Motive:  lockup (Bildzeichen + Wortmarke) · bildzeichen (Signet solo)
 * Varianten:
 *   farbe        Original mit Falzverlauf   → Digitaldruck/DTG/DTF, helle Shirts
 *   farbe-flat   2 Farben ohne Verlauf      → Siebdruck, Flex/Flock, Stick
 *   weiss        Negativ komplett weiß      → dunkle Shirts
 *   navy         einfarbig #0B2341          → 1-Farb-Druck auf hell
 *   gruen        einfarbig #0D6B38          → 1-Farb-Druck auf hell
 *   schwarz      einfarbig #000000          → 1-Farb-Druck, Gravur, Vorlagen
 *
 * Aufruf: npm run logo:print
 */
import sharp from 'sharp';
import { execFile } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';

const execFileAsync = promisify(execFile);

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const out = (...p) => path.join(root, 'brand', 'print', ...p);

const A = JSON.parse(await readFile(path.join(root, 'src/components/logo-art.json'), 'utf8'));

const NAVY = '#0B2341';
const GREEN = '#0D6B38';

const [, , LOCK_W, LOCK_H] = A.viewBoxLockup.split(' ').map(Number); // 1511 × 392
const [, , ICON_W, ICON_H] = A.viewBoxIcon.split(' ').map(Number); //  312 × 350

/**
 * Füllfarben je Variante. `falz*` sind die beiden Falzflächen am Schlitz:
 * im Original Verläufe, in allen Druckvarianten einfarbig.
 */
const VARIANTS = {
  farbe: { navy: NAVY, green: GREEN, falzG: 'grad', falzN: 'grad', word: NAVY, claim: GREEN },
  'farbe-flat': { navy: NAVY, green: GREEN, falzG: GREEN, falzN: NAVY, word: NAVY, claim: GREEN },
  weiss: { navy: '#ffffff', green: '#ffffff', falzG: '#ffffff', falzN: '#ffffff', word: '#ffffff', claim: '#ffffff' },
  navy: { navy: NAVY, green: NAVY, falzG: NAVY, falzN: NAVY, word: NAVY, claim: NAVY },
  gruen: { navy: GREEN, green: GREEN, falzG: GREEN, falzN: GREEN, word: GREEN, claim: GREEN },
  schwarz: { navy: '#000000', green: '#000000', falzG: '#000000', falzN: '#000000', word: '#000000', claim: '#000000' },
};

/** Varianten, die auf dunklem Grund gezeigt werden (für die Übersicht). */
const FOR_DARK = new Set(['weiss']);

/** Original-Falzverläufe als <defs>-Inhalt (eindeutige IDs je Suffix). */
function gradientDefs(sfx = '') {
  const lg = (key, id) => {
    const g = A.gradients[key];
    const stops = g.stops.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join('');
    return `<linearGradient id="${id}" gradientUnits="${g.gradientUnits}" x1="${g.x1}" y1="${g.y1}" x2="${g.x2}" y2="${g.y2}">${stops}</linearGradient>`;
  };
  return lg('green', `gFoldG${sfx}`) + lg('navy', `gFoldN${sfx}`);
}

const usesGradient = (v) => v.falzG === 'grad' || v.falzN === 'grad';
const fill = (value, gradId) => (value === 'grad' ? `url(#${gradId})` : value);

/** Bildzeichen-Gruppe mit Original-Transform. */
function iconGroup(v, sfx = '') {
  return (
    `<g transform="${A.iconTransform}">` +
    `<path d="${A.icon.navy}" fill-rule="evenodd" fill="${v.navy}"/>` +
    `<path d="${A.icon.green}" fill="${v.green}"/>` +
    `<path d="${A.icon.falzGreen}" fill="${fill(v.falzG, `gFoldG${sfx}`)}"/>` +
    `<path d="${A.icon.falzNavy}" fill="${fill(v.falzN, `gFoldN${sfx}`)}"/>` +
    `</g>`
  );
}

/** Wortmarke — immer pfadkonvertiert, nie als Schrift gesetzt. */
function wordmark(v) {
  return `<path d="${A.wordmark.ahad}" fill="${v.word}"/><path d="${A.wordmark.cleaning}" fill="${v.claim}"/>`;
}

function svgDoc(motif, name) {
  const v = VARIANTS[name];
  const box = motif === 'lockup' ? A.viewBoxLockup : A.viewBoxIcon;
  const w = motif === 'lockup' ? LOCK_W : ICON_W;
  const h = motif === 'lockup' ? LOCK_H : ICON_H;
  const defs = usesGradient(v) ? `<defs>${gradientDefs()}</defs>` : '';
  const body = motif === 'lockup' ? iconGroup(v) + wordmark(v) : iconGroup(v);
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="${box}" ` +
    `role="img" aria-label="AHAD Cleaning">\n${defs}${body}\n</svg>\n`
  );
}

/** Motiv skaliert an eine Position setzen — für die Übersicht. */
function place(motif, name, x, y, height, sfx) {
  const v = VARIANTS[name];
  const s = height / (motif === 'lockup' ? LOCK_H : ICON_H);
  const body = motif === 'lockup' ? iconGroup(v, sfx) + wordmark(v) : iconGroup(v, sfx);
  return `<g transform="translate(${x} ${y}) scale(${s})">${body}</g>`;
}

/** Breite der PNG-Ausgabe: Brustdruck-Maß bei 300 dpi. */
const PNG_WIDTH = { lockup: 4000, bildzeichen: 3000 }; // 33,9 cm bzw. 25,4 cm
const DPI = 300;

/** Breite der PDF-Seite in mm (Höhe folgt aus dem Seitenverhältnis). */
const PDF_WIDTH_MM = { lockup: 300, bildzeichen: 250 };

/** Chromium für die PDF-Ausgabe — ohne Chromium bleibt es bei SVG + PNG. */
function findChromium() {
  const candidates = [
    process.env.CHROMIUM_PATH,
    process.env.PLAYWRIGHT_BROWSERS_PATH && path.join(process.env.PLAYWRIGHT_BROWSERS_PATH, 'chromium'),
    '/opt/pw-browsers/chromium',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    '/usr/bin/google-chrome',
  ].filter(Boolean);
  return candidates.find((p) => existsSync(p)) ?? null;
}

/**
 * SVG → Vektor-PDF in exakter Druckgröße, ohne weißen Hintergrund:
 * die Seite bekommt genau die Motivgröße, damit die Druckerei direkt
 * skalieren und platzieren kann.
 */
async function svgToPdf(chromium, svg, motif, target) {
  const widthMm = PDF_WIDTH_MM[motif];
  const ratio = motif === 'lockup' ? LOCK_H / LOCK_W : ICON_H / ICON_W;
  const heightMm = Math.round(widthMm * ratio * 100) / 100;
  const dir = await mkdtemp(path.join(tmpdir(), 'ahad-logo-pdf-'));
  const html = path.join(dir, 'page.html');
  try {
    await writeFile(
      html,
      `<meta charset="utf-8">
<style>
  @page { size: ${widthMm}mm ${heightMm}mm; margin: 0 }
  html, body { margin: 0; padding: 0; background: transparent }
  svg { display: block; width: ${widthMm}mm; height: ${heightMm}mm }
</style>
${svg}`,
    );
    await execFileAsync(chromium, [
      '--headless',
      '--disable-gpu',
      '--no-sandbox',
      '--no-pdf-header-footer',
      `--print-to-pdf=${target}`,
      html,
    ]);
    return `${widthMm} × ${heightMm} mm`;
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}

const label = (t, x, y, color, size = 30) =>
  `<text x="${x}" y="${y}" font-family="DejaVu Sans, Arial, sans-serif" font-size="${size}" ` +
  `letter-spacing="1.5" fill="${color}">${t}</text>`;

/** Kontaktbogen: jede Variante auf passendem Grund, mit Dateinamen. */
function overviewSvg() {
  const names = Object.keys(VARIANTS);
  const W = 1800;
  const rowH = 260;
  const top = 150;
  const H = top + names.length * rowH + 60;
  const lockH = 84;
  const iconH = 120;

  const rows = names
    .map((name, i) => {
      const y = top + i * rowH;
      const dark = FOR_DARK.has(name);
      const bg = dark ? NAVY : '#ffffff';
      const fg = dark ? 'rgba(255,255,255,0.72)' : 'rgba(11,35,65,0.6)';
      const iconW = (iconH * ICON_W) / ICON_H;
      return (
        `<rect x="60" y="${y}" width="${W - 120}" height="${rowH - 24}" rx="18" fill="${bg}" ` +
        `stroke="${dark ? 'none' : 'rgba(11,35,65,0.12)'}"/>` +
        label(`${name}${dark ? '  ·  auf dunklem Grund' : ''}`, 100, y + 52, fg, 26) +
        place('lockup', name, 100, y + 92, lockH, `-ov-l-${i}`) +
        place('bildzeichen', name, W - 180 - iconW, y + 60, iconH, `-ov-i-${i}`)
      );
    })
    .join('\n  ');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="#F4F6F9"/>
  ${label('AHAD Cleaning — Logo-Versionen für Textildruck', 60, 78, NAVY, 42)}
  ${label('Lockup (links) und Bildzeichen (rechts) · Vektor + 300-dpi-PNG in brand/print/', 60, 118, 'rgba(11,35,65,0.6)', 24)}
  ${rows}
</svg>`;
}

async function run() {
  await mkdir(out('svg'), { recursive: true });
  await mkdir(out('png'), { recursive: true });
  await mkdir(out('pdf'), { recursive: true });

  const chromium = findChromium();
  if (!chromium) console.warn('! Kein Chromium gefunden — PDFs werden übersprungen (SVG + PNG entstehen trotzdem).');

  for (const motif of ['lockup', 'bildzeichen']) {
    for (const name of Object.keys(VARIANTS)) {
      const base = `ahad-${motif}-${name}`;
      const svg = svgDoc(motif, name);

      await writeFile(out('svg', `${base}.svg`), svg);
      console.log(`✓ brand/print/svg/${base}.svg`);

      const width = PNG_WIDTH[motif];
      await sharp(Buffer.from(svg), { density: 600 })
        .resize({ width })
        .withMetadata({ density: DPI })
        .png({ compressionLevel: 9 })
        .toFile(out('png', `${base}.png`));
      console.log(`✓ brand/print/png/${base}.png (${width}px breit, ${DPI} dpi)`);

      if (chromium) {
        const size = await svgToPdf(chromium, svg, motif, out('pdf', `${base}.pdf`));
        console.log(`✓ brand/print/pdf/${base}.pdf (${size})`);
      }
    }
  }

  const ov = overviewSvg();
  await writeFile(out('uebersicht.svg'), ov + '\n');
  await sharp(Buffer.from(ov), { density: 150 }).png().toFile(out('uebersicht.png'));
  console.log('✓ brand/print/uebersicht.svg + .png');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
