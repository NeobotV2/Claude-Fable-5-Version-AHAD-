/**
 * Wandelt ausgewählte Original-Fotos (uploads/) in web-optimierte WebP-Assets
 * unter public/images/ahad/ um. EXIF-Rotation wird angewandt, keine Vergrößerung.
 * Aufruf: node scripts/process-photos.mjs
 */
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const src = (f) => path.join(root, 'uploads', f);
const out = (f) => path.join(root, 'public', 'images', 'ahad', f);

/** [Quelldatei, Zielname, Zielbreite] — kuratiert aus dem Foto-Katalog. */
const JOBS = [
  ['IMG_5528.jpg', 'hero-hq-wide.webp', 2000], // Fuhrpark vor Zentrale (Home-Hero)
  ['IMG_5526.jpg', 'hero-hq.webp', 2000], // Zentrale + Fuhrpark (AHAD-System / Standort VS)
  ['AM5A7019.jpg', 'brand-back.webp', 2000], // „Die Hygieneprofis" Rückenlogo (Leistungen-Hero)
  ['IMG_9000.jpg', 'unterhalt.webp', 1400], // Tischreinigung, Schwimmbad-Foyer
  ['AM5A7010.jpg', 'unterhalt-detail.webp', 1100], // Flächenwischen, Brustlogo
  ['AM5A7017.jpg', 'industrie.webp', 1400], // Aufsitz-Scheuersaugmaschine
  ['AM5A7024.jpg', 'industrie-detail.webp', 1100], // Hände am Steuer der Maschine
  ['IMG_9200.jpg', 'glas.webp', 1400], // Glasfassade Atrium, Abzieher
  ['IMG_9178.jpg', 'glas-detail.webp', 1200], // Glasfassade innen, Rückenlogo
  ['IMG_9203.jpg', 'bau.webp', 1400], // Atrium/Neubau Glasreinigung
  ['IMG_8916.jpg', 'sonder.webp', 1400], // Sanitär/Dusche, zwei Mitarbeiter
  ['IMG_9082.jpg', 'sonder-detail.webp', 1100], // Saugdüse auf Teppich
  ['AM5A7016.jpg', 'gewerbe.webp', 1400], // Scheuersaugmaschine im Markt
  ['Bild.jpg', 'team.webp', 1200], // Management-Trio
  ['IMG_5472.jpg', 'meeting.webp', 1400], // Inhaber am Besprechungstisch
  ['IMG_9030.jpg', 'karriere.webp', 1400], // Team mit Reinigungswagen
];

await mkdir(out(''), { recursive: true });
let total = 0;
for (const [s, o, w] of JOBS) {
  const info = await sharp(src(s))
    .rotate()
    .resize({ width: w, withoutEnlargement: true })
    .webp({ quality: 76 })
    .toFile(out(o));
  total += info.size;
  console.log(`✓ ${o.padEnd(22)} ${info.width}×${info.height}  ${(info.size / 1024).toFixed(0)} KB`);
}
console.log(`Σ ${JOBS.length} Bilder, ${(total / 1024 / 1024).toFixed(2)} MB gesamt`);
