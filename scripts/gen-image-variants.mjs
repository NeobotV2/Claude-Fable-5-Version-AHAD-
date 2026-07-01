/**
 * Erzeugt responsive Varianten (480w/960w) aller echten AHAD-Fotos unter
 * public/images/ahad/ und schreibt ein Manifest nach src/lib/image-variants.json.
 *
 * Das Manifest ist die Quelle der Wahrheit für srcSetFor() in src/lib/images.ts:
 * Nur dort gelistete Varianten landen im srcset — so verweist das srcset nie
 * auf Dateien, die es nicht gibt.
 *
 * Aufruf: node scripts/gen-image-variants.mjs   (einmalig / nach neuen Fotos)
 */
import sharp from 'sharp';
import { readdirSync, writeFileSync } from 'fs';
import path from 'path';

const DIR = 'public/images/ahad';
const WIDTHS = [480, 960];
const manifest = {};

const bases = readdirSync(DIR).filter(
  (f) => f.endsWith('.webp') && !/-(480|960)\.webp$/.test(f)
);

for (const file of bases) {
  const full = path.join(DIR, file);
  const meta = await sharp(full).metadata();
  const stem = file.replace(/\.webp$/, '');
  const widths = [];
  for (const w of WIDTHS) {
    // Nur verkleinern — Hochskalieren bringt nichts.
    if ((meta.width ?? 0) <= w) continue;
    const out = path.join(DIR, `${stem}-${w}.webp`);
    await sharp(full).resize(w).webp({ quality: 72 }).toFile(out);
    widths.push(w);
  }
  manifest[file] = { width: meta.width ?? 0, variants: widths };
}

writeFileSync('src/lib/image-variants.json', JSON.stringify(manifest, null, 2) + '\n');
console.log(`✓ ${bases.length} Basisbilder, Manifest mit Varianten geschrieben.`);
