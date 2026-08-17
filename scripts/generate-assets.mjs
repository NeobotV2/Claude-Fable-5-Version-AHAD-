/**
 * Erzeugt alle gebrandeten Bild-Assets aus dem OFFIZIELLEN Logo-Artwork
 * (src/components/logo-art.json — deterministisch aus den Original-SVGs der
 * Druckvorlage extrahiert; dieselbe Quelle, die auch die <Logo>-Komponente nutzt):
 *   - public/favicon.svg          Bildzeichen solo (Farbe, Verlauf)
 *   - public/logo.svg             Primärlogo Lockup (Farbe, Verlauf)
 *   - public/logo-weiss.svg       Lockup negativ weiß (für dunkle Flächen)
 *   - public/og-image.jpg         Social-Preview 1200×630 (Navy, Logo negativ weiß)
 *   - public/apple-touch-icon.png / logo-512.png / logo.png (Avatar: negativ auf Navy)
 *   - public/images/fallback.jpg  Marken-Fallback für externe Fotos
 *
 * Marke: Navy #0B2341, Grün #0D6B38; Falzflächen mit Original-Verlauf.
 * Aufruf: npm run assets
 */
import sharp from 'sharp';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const pub = (...parts) => path.join(root, 'public', ...parts);

const A = JSON.parse(await readFile(path.join(root, 'src/components/logo-art.json'), 'utf8'));

const NAVY = '#0B2341';
const GREEN = '#0D6B38';
const FALZ_NAVY = '#02122A';
const TINT = '#9CDDB7';

const lockW = Number(A.viewBoxLockup.split(' ')[2]); // 1511
const lockH = Number(A.viewBoxLockup.split(' ')[3]); // 392
const iconH = Number(A.viewBoxIcon.split(' ')[3]); // 350
const iconW = Number(A.viewBoxIcon.split(' ')[2]); // 312

/** Original-Falzverläufe als <defs>-Inhalt (eindeutige IDs je Suffix). */
function gradientDefs(sfx = '') {
  const lg = (key, id) => {
    const g = A.gradients[key];
    const stops = g.stops.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join('');
    return `<linearGradient id="${id}" gradientUnits="${g.gradientUnits}" x1="${g.x1}" y1="${g.y1}" x2="${g.x2}" y2="${g.y2}">${stops}</linearGradient>`;
  };
  return lg('green', `gFoldG${sfx}`) + lg('navy', `gFoldN${sfx}`);
}

/** Bildzeichen-Gruppe (Original-Transform). mode: 'color' | 'white' */
function iconGroup(mode, sfx = '') {
  const f =
    mode === 'white'
      ? { navy: '#fff', green: '#fff', fg: '#fff', fn: '#fff' }
      : { navy: NAVY, green: GREEN, fg: `url(#gFoldG${sfx})`, fn: `url(#gFoldN${sfx})` };
  return (
    `<g transform="${A.iconTransform}">` +
    `<path d="${A.icon.navy}" fill-rule="evenodd" fill="${f.navy}"/>` +
    `<path d="${A.icon.green}" fill="${f.green}"/>` +
    `<path d="${A.icon.falzGreen}" fill="${f.fg}"/>` +
    `<path d="${A.icon.falzNavy}" fill="${f.fn}"/>` +
    `</g>`
  );
}

function wordmark(mode) {
  const a = mode === 'white' ? '#fff' : NAVY;
  const c = mode === 'white' ? '#fff' : GREEN;
  return `<path d="${A.wordmark.ahad}" fill="${a}"/><path d="${A.wordmark.cleaning}" fill="${c}"/>`;
}

const lockupSvg = (mode) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${A.viewBoxLockup}" role="img" aria-label="AHAD Cleaning">` +
  `${mode === 'white' ? '' : `<defs>${gradientDefs()}</defs>`}${iconGroup(mode)}${wordmark(mode)}</svg>`;

const iconSvg = (mode) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${A.viewBoxIcon}">` +
  `${mode === 'white' ? '' : `<defs>${gradientDefs()}</defs>`}${iconGroup(mode)}</svg>`;

/** Lockup (Höhe = height) an Zielposition platzieren — für Kompositionen. */
function placeLockup(mode, x, y, height, sfx = '-lk') {
  const s = height / lockH;
  return `<g transform="translate(${x} ${y}) scale(${s})">${iconGroup(mode, sfx)}${wordmark(mode)}</g>`;
}
/** Bildzeichen (Höhe = height) an Zielposition platzieren. */
function placeIcon(mode, x, y, height, sfx = '-ic') {
  const s = height / iconH;
  return `<g transform="translate(${x} ${y}) scale(${s})">${iconGroup(mode, sfx)}</g>`;
}

const bgDefs = `
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${FALZ_NAVY}"/>
      <stop offset="55%" stop-color="${NAVY}"/>
      <stop offset="100%" stop-color="#16386A"/>
    </linearGradient>
    <radialGradient id="glowGreen" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${GREEN}" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="${GREEN}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowBlue" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#1C4576" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#1C4576" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
    </pattern>`;

function ogImageSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>${bgDefs}</defs>
  <rect width="1200" height="630" fill="url(#bgGrad)"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <circle cx="1080" cy="80" r="420" fill="url(#glowBlue)"/>
  <circle cx="120" cy="600" r="380" fill="url(#glowGreen)"/>
  ${placeLockup('white', 96, 92, 96)}
  <text x="96" y="350" font-family="DejaVu Sans, Arial, sans-serif" font-weight="bold" font-size="74" letter-spacing="-2.5" fill="#ffffff">Struktur. Sauberkeit.</text>
  <text x="96" y="438" font-family="DejaVu Sans, Arial, sans-serif" font-weight="bold" font-size="74" letter-spacing="-2.5" fill="${TINT}">Sicherheit.</text>
  <text x="96" y="502" font-family="DejaVu Sans, Arial, sans-serif" font-size="27" fill="rgba(226,237,247,0.85)">Systematische Gebäudereinigung für Industrie, Verwaltung &amp; Mittelstand</text>
  <g>
    <rect x="96" y="540" width="252" height="44" rx="22" fill="${GREEN}"/>
    <text x="222" y="569" text-anchor="middle" font-family="DejaVu Sans, Arial, sans-serif" font-weight="bold" font-size="20" fill="#ffffff">Angebot in 24h</text>
    <text x="380" y="569" font-family="DejaVu Sans, Arial, sans-serif" font-size="21" fill="rgba(226,237,247,0.7)">ahad-cleaning.de</text>
  </g>
</svg>`;
}

function fallbackSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000" viewBox="0 0 1600 1000">
  <defs>${bgDefs}</defs>
  <rect width="1600" height="1000" fill="url(#bgGrad)"/>
  <rect width="1600" height="1000" fill="url(#grid)"/>
  <circle cx="1400" cy="120" r="560" fill="url(#glowBlue)"/>
  <circle cx="180" cy="940" r="500" fill="url(#glowGreen)"/>
  ${placeLockup('white', 470, 430, 150)}
  <text x="800" y="700" text-anchor="middle" font-family="DejaVu Sans, Arial, sans-serif" font-size="26" letter-spacing="6" fill="${TINT}">STRUKTUR · SAUBERKEIT · SICHERHEIT</text>
</svg>`;
}

/**
 * Logo für die E-Mail-Signaturen (brand/signatur/): Vollfarb-Lockup auf weißer
 * Karte mit abgerundeten Ecken. E-Mail-Clients können kein SVG, deshalb PNG.
 *
 * Die weiße Karte ist Absicht: das Lockup ist überwiegend Navy und würde auf
 * transparentem Grund im Dark Mode vieler Clients verschwinden. Auf hellem
 * Mail-Hintergrund — dem Normalfall — ist die Karte unsichtbar, im Dark Mode
 * trägt sie das Logo. Die Ecken bleiben transparent, damit die Karte gerundet
 * wirkt statt als harter Kasten.
 *
 * @param logoH Logohöhe in CSS-Pixeln, wie im Mail-Client dargestellt.
 * @param pad   Weißraum um das Logo, in denselben Einheiten.
 */
function signaturLogoSvg(logoH = 42, pad = 13) {
  const logoW = Math.round((logoH * lockW) / lockH);
  const w = logoW + pad * 2;
  const h = logoH + pad * 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <rect width="${w}" height="${h}" rx="10" fill="#ffffff"/>
  ${placeLockup('color', pad, pad, logoH, '-sig')}
</svg>`;
}

/** App-Icon: Navy-Kachel, Bildzeichen negativ weiß, zentriert. */
function appIconSvg(padding = 22) {
  const size = 128;
  const h = size - padding * 2;
  const w = (h * iconW) / iconH;
  const x = (size - w) / 2;
  const y = (size - h) / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" rx="${size * 0.22}" fill="${NAVY}"/>
  ${placeIcon('white', x, y, h)}
</svg>`;
}

async function run() {
  await mkdir(pub('images'), { recursive: true });

  await writeFile(pub('favicon.svg'), iconSvg('color') + '\n');
  console.log('✓ public/favicon.svg');

  await writeFile(pub('logo.svg'), lockupSvg('color') + '\n');
  console.log('✓ public/logo.svg');

  await writeFile(pub('logo-weiss.svg'), lockupSvg('white') + '\n');
  console.log('✓ public/logo-weiss.svg');

  await sharp(Buffer.from(ogImageSvg())).jpeg({ quality: 88 }).toFile(pub('og-image.jpg'));
  console.log('✓ public/og-image.jpg');

  await sharp(Buffer.from(fallbackSvg())).jpeg({ quality: 85 }).toFile(pub('images', 'fallback.jpg'));
  console.log('✓ public/images/fallback.jpg');

  await sharp(Buffer.from(appIconSvg())).resize(180, 180).png().toFile(pub('apple-touch-icon.png'));
  console.log('✓ public/apple-touch-icon.png');

  await sharp(Buffer.from(appIconSvg())).resize(512, 512).png().toFile(pub('logo-512.png'));
  console.log('✓ public/logo-512.png');

  await sharp(Buffer.from(appIconSvg(30))).resize(512, 512).png().toFile(pub('logo.png'));
  console.log('✓ public/logo.png');

  // 2× gerendert für scharfe Darstellung auf Retina-Displays; im Mail-HTML
  // wird die halbe Größe gesetzt.
  const sigSvg = signaturLogoSvg();
  const sigW = Number(sigSvg.match(/width="(\d+)"/)[1]);
  await sharp(Buffer.from(sigSvg), { density: 600 })
    .resize({ width: sigW * 2 })
    .png({ compressionLevel: 9 })
    .toFile(pub('signatur-logo.png'));
  console.log(`✓ public/signatur-logo.png (${sigW * 2}px, Darstellung ${sigW}px)`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
