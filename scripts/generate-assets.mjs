/**
 * Erzeugt gebrandete Bild-Assets aus den Original-Logopfaden des Designbooks
 * (scripts/logo-parts.json — extrahiert aus der Druckvorlage):
 *   - public/favicon.svg          Bildzeichen solo (Farbversion)
 *   - public/logo.svg             Lockup, Verlaufs-Version (digital)
 *   - public/og-image.jpg         Social-Preview 1200×630 (Navy, Logo negativ weiß)
 *   - public/apple-touch-icon.png / logo-512.png / logo.png
 *   - public/images/fallback.jpg  Marken-Fallback für externe Fotos
 *
 * Farben laut Markenrichtlinien v2.0: Navy #0B2341, Grün #0D6B38,
 * Falze #064B20/#02122A (nur im Bildzeichen). Auf Navy: Logo negativ weiß.
 *
 * Aufruf: npm run assets
 */
import sharp from 'sharp';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const pub = (...parts) => path.join(root, 'public', ...parts);

const { parts, icon, lockup } = JSON.parse(await readFile(path.join(here, 'logo-parts.json'), 'utf8'));

const NAVY = '#0B2341';
const GREEN = '#0D6B38';
const FALZ_GREEN = '#064B20';
const FALZ_NAVY = '#02122A';
const TINT = '#9CDDB7';

const vb = (b) => `${b.x1} ${b.y1} ${(b.x2 - b.x1).toFixed(3)} ${(b.y2 - b.y1).toFixed(3)}`;

const gradientDefs = `
    <linearGradient id="gNavy" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#071930"/><stop offset="0.5" stop-color="#0C2747"/><stop offset="1" stop-color="#081D37"/>
    </linearGradient>
    <linearGradient id="gGreen" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#085028"/><stop offset="0.5" stop-color="#0E7039"/><stop offset="1" stop-color="#0A572D"/>
    </linearGradient>`;

/** Bildzeichen-Pfade. mode: 'flat' | 'gradient' | 'white' */
function iconPaths(mode) {
  const fills =
    mode === 'white'
      ? { navy: '#fff', green: '#fff', falzGreen: '#fff', falzNavy: '#fff' }
      : mode === 'gradient'
        ? { navy: 'url(#gNavy)', green: 'url(#gGreen)', falzGreen: FALZ_GREEN, falzNavy: FALZ_NAVY }
        : { navy: NAVY, green: GREEN, falzGreen: FALZ_GREEN, falzNavy: FALZ_NAVY };
  return `
    <path d="${parts.navy.d}" fill-rule="evenodd" fill="${fills.navy}"/>
    <path d="${parts.green.d}" fill="${fills.green}"/>
    <path d="${parts.falzGreen.d}" fill="${fills.falzGreen}"/>
    <path d="${parts.falzNavy.d}" fill="${fills.falzNavy}"/>`;
}

function wordmarkPaths(mode) {
  const a = mode === 'white' ? '#fff' : NAVY;
  const c = mode === 'white' ? '#fff' : GREEN;
  return `
    <path d="${parts.ahad.d}" fill="${a}"/>
    <path d="${parts.cleaning.d}" fill="${c}"/>`;
}

const lockupSvg = (mode, extraDefs = '') =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb(lockup)}" role="img" aria-label="AHAD Cleaning">
  <defs>${extraDefs}</defs>${iconPaths(mode)}${wordmarkPaths(mode)}
</svg>`;

const iconSvg = (mode, extraDefs = '') =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb(icon)}">
  <defs>${extraDefs}</defs>${iconPaths(mode)}
</svg>`;

/** Lockup als eingebettetes <g> in beliebiger Zielgeometrie platzieren. */
function placeLockup(mode, x, y, height) {
  const scale = height / (lockup.y2 - lockup.y1);
  return `<g transform="translate(${x} ${y}) scale(${scale}) translate(${-lockup.x1} ${-lockup.y1})">${iconPaths(mode)}${wordmarkPaths(mode)}</g>`;
}
function placeIcon(mode, x, y, height) {
  const scale = height / (icon.y2 - icon.y1);
  return `<g transform="translate(${x} ${y}) scale(${scale}) translate(${-icon.x1} ${-icon.y1})">${iconPaths(mode)}</g>`;
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
  ${placeLockup('white', 96, 96, 110)}
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
  ${placeLockup('white', 460, 410, 180)}
  <text x="800" y="700" text-anchor="middle" font-family="DejaVu Sans, Arial, sans-serif" font-size="26" letter-spacing="6" fill="${TINT}">STRUKTUR · SAUBERKEIT · SICHERHEIT</text>
</svg>`;
}

/** App-Icon: Navy-Kachel, Bildzeichen negativ weiß (CI: auf Navy nur weiß). */
function appIconSvg(padding = 22) {
  const size = 128;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" rx="${size * 0.22}" fill="${NAVY}"/>
  ${placeIcon('white', padding + 4, padding, size - padding * 2)}
</svg>`;
}

async function run() {
  await mkdir(pub('images'), { recursive: true });

  await writeFile(pub('favicon.svg'), iconSvg('flat') + '\n');
  console.log('✓ public/favicon.svg');

  await writeFile(pub('logo.svg'), lockupSvg('gradient', gradientDefs) + '\n');
  console.log('✓ public/logo.svg');

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
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
