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
 *   uebersicht.png  Kontaktbogen aller Versionen auf passendem Grund
 *
 * Motive:
 *   lockup       Bildzeichen + Wortmarke (Primärlogo)
 *   wortmarke    nur „AHAD CLEANING", ohne Bildzeichen
 *   bildzeichen  Signet solo, ohne Schrift
 *
 * Varianten:
 *   farbe                   Original mit Falzverlauf  → DTG/DTF/Digital, weißer Grund
 *   farbe-flat              2 Farben ohne Verlauf     → Siebdruck, Flex/Flock, Stick
 *   farbe-kern-weiss        wie farbe, Innenfeld weiß → farbige helle Shirts
 *   farbe-flat-kern-weiss   wie farbe-flat, Kern weiß → Siebdruck auf farbig hell
 *   weiss                   Negativ komplett weiß     → dunkle Shirts
 *   navy                    einfarbig #0B2341         → 1-Farb-Druck auf hell
 *   gruen                   einfarbig #0D6B38         → 1-Farb-Druck auf hell
 *   schwarz                 einfarbig #000000         → 1-Farb-Druck, Gravur
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

/**
 * Enge Bounding-Box der Wortmarke innerhalb des Lockup-Koordinatensystems.
 * Ermittelt durch Rastern der beiden Wortmarken-Pfade und Trimmen der
 * transparenten Ränder (x 375,125 · y 39 · 1118,875 × 323,625), nach außen
 * auf ganze Einheiten gerundet. Die Pfaddaten bleiben dadurch unverändert —
 * nur die viewBox schneidet das Bildzeichen weg.
 */
const VIEWBOX_WORDMARK = '375 39 1119 324';

/**
 * Füllfarben je Variante. `falz*` sind die beiden Falzflächen am Schlitz:
 * im Original Verläufe, in allen Druckvarianten einfarbig. `kern` füllt das
 * Innenfeld der Raute, das im Original ein Loch ist.
 */
const VARIANTS = {
  farbe: { navy: NAVY, green: GREEN, falzG: 'grad', falzN: 'grad', word: NAVY, claim: GREEN },
  'farbe-flat': { navy: NAVY, green: GREEN, falzG: GREEN, falzN: NAVY, word: NAVY, claim: GREEN },
  // Innenfeld weiß mitgedruckt — für farbige/nicht-weiße helle Shirts (z. B. grey
  // melange). Ohne das nimmt das Innenfeld die Stofffarbe an, weil es im
  // Original ein Loch ist; mit weißem Kern bleibt das Originalaussehen erhalten.
  'farbe-kern-weiss': { navy: NAVY, green: GREEN, falzG: 'grad', falzN: 'grad', word: NAVY, claim: GREEN, kern: '#ffffff' },
  'farbe-flat-kern-weiss': { navy: NAVY, green: GREEN, falzG: GREEN, falzN: NAVY, word: NAVY, claim: GREEN, kern: '#ffffff' },
  weiss: { navy: '#ffffff', green: '#ffffff', falzG: '#ffffff', falzN: '#ffffff', word: '#ffffff', claim: '#ffffff' },
  navy: { navy: NAVY, green: NAVY, falzG: NAVY, falzN: NAVY, word: NAVY, claim: NAVY },
  gruen: { navy: GREEN, green: GREEN, falzG: GREEN, falzN: GREEN, word: GREEN, claim: GREEN },
  schwarz: { navy: '#000000', green: '#000000', falzG: '#000000', falzN: '#000000', word: '#000000', claim: '#000000' },
};

/**
 * Grund, auf dem die Variante in der Übersicht gezeigt wird — jede Version
 * neben dem Untergrund, für den sie gedacht ist.
 */
const PREVIEW_BG = {
  weiss: { bg: NAVY, dark: true, note: 'auf dunklem Grund' },
  'farbe-kern-weiss': { bg: '#A9AEB6', dark: false, note: 'auf farbigem Grund, z. B. grey melange' },
  'farbe-flat-kern-weiss': { bg: '#A9AEB6', dark: false, note: 'auf farbigem Grund, z. B. grey melange' },
};

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

/**
 * Das Innenfeld der Raute als eigener Pfad — im Original der zweite Teilpfad
 * von `icon.navy`, der per evenodd das Loch stanzt. Wird nur für die
 * `kern`-Varianten unter das Bildzeichen gelegt.
 */
const KERN_PATH = `M${A.icon.navy.split(' M')[1]}`;

/** Bildzeichen-Gruppe mit Original-Transform. */
function iconGroup(v, sfx = '') {
  return (
    `<g transform="${A.iconTransform}">` +
    (v.kern ? `<path d="${KERN_PATH}" fill="${v.kern}"/>` : '') +
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

/**
 * Die drei Motive. `hasIcon` steuert, ob Falzverläufe und das Innenfeld
 * überhaupt vorkommen — die Wortmarke braucht beides nicht.
 * `pngWidth` ist die Ausgabebreite in px bei 300 dpi, `pdfWidthMm` die
 * Seitenbreite des Vektor-PDFs.
 */
const MOTIFS = {
  lockup: {
    viewBox: A.viewBoxLockup,
    hasIcon: true,
    pngWidth: 4000, // 33,9 cm
    pdfWidthMm: 300,
    body: (v, sfx) => iconGroup(v, sfx) + wordmark(v),
  },
  wortmarke: {
    viewBox: VIEWBOX_WORDMARK,
    hasIcon: false,
    pngWidth: 4000, // 33,9 cm
    pdfWidthMm: 280,
    body: (v) => wordmark(v),
  },
  bildzeichen: {
    viewBox: A.viewBoxIcon,
    hasIcon: true,
    pngWidth: 3000, // 25,4 cm
    pdfWidthMm: 250,
    body: (v, sfx) => iconGroup(v, sfx),
  },
};

for (const m of Object.values(MOTIFS)) {
  const [x, y, w, h] = m.viewBox.split(' ').map(Number);
  Object.assign(m, { x, y, w, h });
}

/** Varianten, die für dieses Motiv sinnvoll sind. */
function variantsFor(motif) {
  // Ohne Bildzeichen gibt es kein Innenfeld — die kern-Varianten wären
  // byteidentische Dubletten und werden übersprungen.
  return Object.keys(VARIANTS).filter((name) => MOTIFS[motif].hasIcon || !VARIANTS[name].kern);
}

const DPI = 300;

function svgDoc(motif, name) {
  const m = MOTIFS[motif];
  const v = VARIANTS[name];
  const defs = m.hasIcon && usesGradient(v) ? `<defs>${gradientDefs()}</defs>` : '';
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${m.w}" height="${m.h}" viewBox="${m.viewBox}" ` +
    `role="img" aria-label="AHAD Cleaning">\n${defs}${m.body(v)}\n</svg>\n`
  );
}

/**
 * Motiv skaliert an eine Position setzen — für die Übersicht. Der viewBox-
 * Ursprung wird mit herausgerechnet, damit auch die Wortmarke (die im
 * Lockup-Koordinatensystem bei x=375 beginnt) bündig sitzt.
 */
function place(motif, name, x, y, height, sfx) {
  const m = MOTIFS[motif];
  const s = height / m.h;
  const body = m.body(VARIANTS[name], sfx);
  return `<g transform="translate(${x - m.x * s} ${y - m.y * s}) scale(${s})">${body}</g>`;
}

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
  const m = MOTIFS[motif];
  const widthMm = m.pdfWidthMm;
  const heightMm = Math.round((widthMm * m.h) / m.w * 100) / 100;
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

/** Kontaktbogen: jede Variante auf passendem Grund, alle drei Motive. */
function overviewSvg() {
  const names = Object.keys(VARIANTS);
  const W = 1900;
  const rowH = 260;
  const top = 170;
  const H = top + names.length * rowH + 60;
  const lockH = 84;
  const wordH = 60;
  const iconH = 120;
  const iconW = (iconH * MOTIFS.bildzeichen.w) / MOTIFS.bildzeichen.h;

  // place() referenziert Verlaufs-IDs mit Zeilensuffix — die zugehörigen
  // <defs> müssen hier mit ausgegeben werden, sonst fehlen die Falzflächen.
  const defs = names.map((_, i) => gradientDefs(`-ov-l-${i}`) + gradientDefs(`-ov-i-${i}`)).join('');

  const rows = names
    .map((name, i) => {
      const y = top + i * rowH;
      const p = PREVIEW_BG[name] ?? { bg: '#ffffff', dark: false, note: '' };
      const fg = p.dark ? 'rgba(255,255,255,0.72)' : 'rgba(11,35,65,0.6)';
      const hasKern = Boolean(VARIANTS[name].kern);
      return (
        `<rect x="60" y="${y}" width="${W - 120}" height="${rowH - 24}" rx="18" fill="${p.bg}" ` +
        `stroke="${p.bg === '#ffffff' ? 'rgba(11,35,65,0.12)' : 'none'}"/>` +
        label(`${name}${p.note ? `  ·  ${p.note}` : ''}`, 100, y + 52, fg, 26) +
        place('lockup', name, 100, y + 92, lockH, `-ov-l-${i}`) +
        // Für die kern-Varianten gibt es kein eigenes Wortmarken-Motiv.
        (hasKern ? '' : place('wortmarke', name, 620, y + 104, wordH)) +
        place('bildzeichen', name, W - 180 - iconW, y + 60, iconH, `-ov-i-${i}`)
      );
    })
    .join('\n  ');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>${defs}</defs>
  <rect width="${W}" height="${H}" fill="#F4F6F9"/>
  ${label('AHAD Cleaning — Logo-Versionen für Textildruck', 60, 78, NAVY, 42)}
  ${label('Lockup · Wortmarke · Bildzeichen — je als Vektor-PDF, SVG und 300-dpi-PNG in brand/print/', 60, 118, 'rgba(11,35,65,0.6)', 24)}
  ${label('Die kern-Varianten betreffen nur das Bildzeichen, daher ohne Wortmarke-Spalte.', 60, 150, 'rgba(11,35,65,0.45)', 22)}
  ${rows}
</svg>`;
}

async function run() {
  await mkdir(out('svg'), { recursive: true });
  await mkdir(out('png'), { recursive: true });
  await mkdir(out('pdf'), { recursive: true });

  const chromium = findChromium();
  if (!chromium) console.warn('! Kein Chromium gefunden — PDFs werden übersprungen (SVG + PNG entstehen trotzdem).');

  for (const motif of Object.keys(MOTIFS)) {
    for (const name of variantsFor(motif)) {
      const base = `ahad-${motif}-${name}`;
      const svg = svgDoc(motif, name);

      await writeFile(out('svg', `${base}.svg`), svg);
      console.log(`✓ brand/print/svg/${base}.svg`);

      const width = MOTIFS[motif].pngWidth;
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
