/**
 * Erzeugt gebrandete Bild-Assets aus SVG-Vorlagen (sharp/libvips):
 *   - public/og-image.jpg        Social-Preview 1200×630
 *   - public/apple-touch-icon.png
 *   - public/logo-512.png + public/logo.png
 *   - public/images/fallback.jpg  Marken-Fallback für externe Fotos
 *
 * Aufruf: npm run assets
 */
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pub = (...parts) => path.join(root, 'public', ...parts);

const logoMark = (size, x = 0, y = 0) => `
  <g transform="translate(${x} ${y}) scale(${size / 100})">
    <rect x="14" y="14" width="72" height="72" rx="16" transform="rotate(45 50 50)" fill="url(#logoGrad)" mask="url(#logoMask)"/>
  </g>`;

const defs = `
  <defs>
    <linearGradient id="logoGrad" x1="15%" y1="15%" x2="85%" y2="85%">
      <stop offset="0%" stop-color="#2ca06a"/>
      <stop offset="100%" stop-color="#1e60a9"/>
    </linearGradient>
    <mask id="logoMask">
      <rect x="-20" y="-20" width="140" height="140" fill="white"/>
      <rect x="32" y="32" width="36" height="36" rx="6" transform="rotate(45 50 50)" fill="black"/>
    </mask>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00142b"/>
      <stop offset="55%" stop-color="#001c3b"/>
      <stop offset="100%" stop-color="#003a6e"/>
    </linearGradient>
    <radialGradient id="glowGreen" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#2ca06a" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#2ca06a" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowBlue" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#1e60a9" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#1e60a9" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
    </pattern>
  </defs>`;

function ogImageSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  ${defs}
  <rect width="1200" height="630" fill="url(#bgGrad)"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <circle cx="1080" cy="80" r="420" fill="url(#glowBlue)"/>
  <circle cx="120" cy="600" r="380" fill="url(#glowGreen)"/>
  ${logoMark(130, 92, 96)}
  <text x="248" y="172" font-family="DejaVu Sans, Arial, sans-serif" font-weight="bold" font-size="64" letter-spacing="-2" fill="#ffffff">AHAD</text>
  <text x="251" y="206" font-family="DejaVu Sans, Arial, sans-serif" font-size="24" letter-spacing="14" fill="#8bf8ba">CLEANING</text>
  <text x="96" y="350" font-family="DejaVu Sans, Arial, sans-serif" font-weight="bold" font-size="74" letter-spacing="-2.5" fill="#ffffff">Struktur. Sauberkeit.</text>
  <text x="96" y="438" font-family="DejaVu Sans, Arial, sans-serif" font-weight="bold" font-size="74" letter-spacing="-2.5" fill="#8bf8ba">Sicherheit.</text>
  <text x="96" y="502" font-family="DejaVu Sans, Arial, sans-serif" font-size="27" fill="rgba(219,234,254,0.85)">Systematische Gebäudereinigung für Industrie, Verwaltung &amp; Mittelstand</text>
  <g>
    <rect x="96" y="540" width="252" height="44" rx="22" fill="#2ca06a"/>
    <text x="222" y="569" text-anchor="middle" font-family="DejaVu Sans, Arial, sans-serif" font-weight="bold" font-size="20" fill="#ffffff">Angebot in 24h</text>
    <text x="380" y="569" font-family="DejaVu Sans, Arial, sans-serif" font-size="21" fill="rgba(219,234,254,0.7)">ahad-cleaning.de</text>
  </g>
</svg>`;
}

function fallbackSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000" viewBox="0 0 1600 1000">
  ${defs}
  <rect width="1600" height="1000" fill="url(#bgGrad)"/>
  <rect width="1600" height="1000" fill="url(#grid)"/>
  <circle cx="1400" cy="120" r="560" fill="url(#glowBlue)"/>
  <circle cx="180" cy="940" r="500" fill="url(#glowGreen)"/>
  ${logoMark(180, 710, 360)}
  <text x="800" y="640" text-anchor="middle" font-family="DejaVu Sans, Arial, sans-serif" font-weight="bold" font-size="56" letter-spacing="-1" fill="#ffffff">AHAD CLEANING</text>
  <text x="800" y="690" text-anchor="middle" font-family="DejaVu Sans, Arial, sans-serif" font-size="26" letter-spacing="6" fill="#8bf8ba">STRUKTUR · SAUBERKEIT · SICHERHEIT</text>
</svg>`;
}

function iconSvg(padding = 18) {
  const size = 100 + padding * 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  ${defs}
  <rect width="${size}" height="${size}" rx="${size * 0.22}" fill="#001c3b"/>
  ${logoMark(100, padding, padding)}
</svg>`;
}

async function run() {
  await mkdir(pub('images'), { recursive: true });

  await sharp(Buffer.from(ogImageSvg())).jpeg({ quality: 88 }).toFile(pub('og-image.jpg'));
  console.log('✓ public/og-image.jpg');

  await sharp(Buffer.from(fallbackSvg())).jpeg({ quality: 85 }).toFile(pub('images', 'fallback.jpg'));
  console.log('✓ public/images/fallback.jpg');

  await sharp(Buffer.from(iconSvg())).resize(180, 180).png().toFile(pub('apple-touch-icon.png'));
  console.log('✓ public/apple-touch-icon.png');

  await sharp(Buffer.from(iconSvg())).resize(512, 512).png().toFile(pub('logo-512.png'));
  console.log('✓ public/logo-512.png');

  await sharp(Buffer.from(iconSvg(26))).resize(512, 512).png().toFile(pub('logo.png'));
  console.log('✓ public/logo.png');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
