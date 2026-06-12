/**
 * Lädt die Google-Fonts-Dateien (latin, woff2) einmalig herunter und erzeugt
 * src/styles/fonts.css mit lokalen @font-face-Regeln.
 *
 * Hintergrund: Selbst gehostete Fonts statt fonts.googleapis.com —
 * DSGVO-sauber (keine IP-Übertragung an Google, vgl. LG München I,
 * Az. 3 O 17493/20) und schneller (keine dritte Verbindung).
 *
 * Aufruf: node scripts/fetch-fonts.mjs
 */
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const fontsDir = path.join(root, 'src', 'assets', 'fonts');
const cssFile = path.join(root, 'src', 'styles', 'fonts.css');

// Chrome-UA → Google liefert woff2 mit unicode-range-Subsets aus.
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';

const FAMILIES = [
  { family: 'Inter', weights: [400, 500, 600, 700, 800, 900] },
  { family: 'Space Grotesk', weights: [400, 500, 600, 700] },
  { family: 'Montserrat', weights: [500, 800, 900] },
];

async function fetchCss(family, weights) {
  const url = `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, '+')}:wght@${weights.join(';')}&display=swap`;
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`CSS-Abruf fehlgeschlagen: ${url} → ${res.status}`);
  return res.text();
}

function parseLatinFaces(css) {
  // Blöcke der Form: /* latin */ @font-face { ... url(...woff2) ... }
  const faces = [];
  const re = /\/\*\s*(?<subset>[\w-]+)\s*\*\/\s*@font-face\s*{(?<body>[^}]+)}/g;
  for (const match of css.matchAll(re)) {
    if (match.groups.subset !== 'latin') continue;
    const body = match.groups.body;
    const get = (prop) => body.match(new RegExp(`${prop}:\\s*([^;]+);`))?.[1].trim();
    faces.push({
      family: get('font-family')?.replace(/'/g, ''),
      weight: get('font-weight'),
      url: body.match(/url\((https:[^)]+\.woff2)\)/)?.[1],
      unicodeRange: get('unicode-range'),
    });
  }
  return faces;
}

async function run() {
  await mkdir(fontsDir, { recursive: true });
  await mkdir(path.dirname(cssFile), { recursive: true });

  const rules = [
    '/* Automatisch erzeugt von scripts/fetch-fonts.mjs — selbst gehostete Fonts (latin). */',
  ];

  for (const { family, weights } of FAMILIES) {
    const css = await fetchCss(family, weights);
    const faces = parseLatinFaces(css);
    if (faces.length === 0) throw new Error(`Keine latin-@font-face-Blöcke für ${family} gefunden`);

    // Google liefert Variable Fonts: alle Gewichte zeigen auf dieselbe Datei.
    // Daher eine Datei je Familie mit font-weight-Bereich statt 6 Duplikaten.
    const uniqueUrls = new Set(faces.map((face) => face.url));
    const isVariable = uniqueUrls.size === 1 && faces.length > 1;
    const weightRange = `${Math.min(...weights)} ${Math.max(...weights)}`;

    for (const face of isVariable ? [faces[0]] : faces) {
      const fileName = isVariable
        ? `${family.replace(/ /g, '')}-var.woff2`
        : `${family.replace(/ /g, '')}-${face.weight}.woff2`;
      const res = await fetch(face.url, { headers: { 'User-Agent': UA } });
      if (!res.ok) throw new Error(`Font-Download fehlgeschlagen: ${face.url}`);
      await writeFile(path.join(fontsDir, fileName), Buffer.from(await res.arrayBuffer()));

      rules.push(`@font-face {
  font-family: '${face.family}';
  font-style: normal;
  font-weight: ${isVariable ? weightRange : face.weight};
  font-display: swap;
  src: url('../assets/fonts/${fileName}') format('woff2');
  unicode-range: ${face.unicodeRange};
}`);
      console.log(`✓ ${fileName}`);
    }
  }

  await writeFile(cssFile, rules.join('\n\n') + '\n');
  console.log(`✓ ${path.relative(root, cssFile)} (${rules.length - 1} Schnitte)`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
