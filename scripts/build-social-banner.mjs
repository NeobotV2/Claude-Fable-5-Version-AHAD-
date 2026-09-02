/**
 * Erzeugt Social-Media-Banner aus dem OFFIZIELLEN Logo-Artwork
 * (src/components/logo-art.json — dieselbe Quelle wie die <Logo>-Komponente,
 * scripts/generate-assets.mjs und das Druck-Kit). Geometrie und Markenfarben
 * bleiben unverändert; nichts wird nachgezeichnet.
 *
 * Ausgabe → brand/social/
 *   linkedin-unternehmensseite-1128x191.png   Titelbild der Unternehmensseite
 *   linkedin-profil-1584x396.png              Hintergrundbild persönliches Profil
 *   linkedin-logo-400x400.png                 quadratisches Unternehmenslogo
 *   jeweils zusätzlich als -hell (weißer Grund) und @2x (doppelte Auflösung)
 *
 * Gerendert wird mit Chromium, damit die Hausschrift (Montserrat) exakt so
 * sitzt wie auf der Website. Ohne Chromium bricht das Skript mit Hinweis ab.
 *
 * Aufruf: npm run social:banner
 */
import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const out = (...p) => path.join(root, 'brand', 'social', ...p);

const A = JSON.parse(await readFile(path.join(root, 'src/components/logo-art.json'), 'utf8'));

const NAVY = '#0B2341';
const NAVY_DEEP = '#02122A';
const GREEN = '#0D6B38';
const MINT = '#9CDDB7';

const CLAIM = 'Sauberkeit mit System.';
const SUBLINE = 'Gebäudereinigung für Industrie, Verwaltung & Mittelstand';
const REGIONS = 'Villingen-Schwenningen · Stuttgart · Konstanz · ahad-cleaning.de';

const [, , VB_W, VB_H] = A.viewBoxLockup.split(' ').map(Number);
const RATIO = VB_W / VB_H;
const [, , ICON_W, ICON_H] = A.viewBoxIcon.split(' ').map(Number);

/** Original-Falzverläufe (nur in der Farbversion). */
function gradientDefs(sfx) {
  const lg = (key, id) => {
    const g = A.gradients[key];
    const stops = g.stops.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join('');
    return `<linearGradient id="${id}" gradientUnits="${g.gradientUnits}" x1="${g.x1}" y1="${g.y1}" x2="${g.x2}" y2="${g.y2}">${stops}</linearGradient>`;
  };
  return `<defs>${lg('green', `gG${sfx}`)}${lg('navy', `gN${sfx}`)}</defs>`;
}

/** Bildzeichen — Originalpfade, Originaltransform. */
function iconGroup(white, sfx) {
  return (
    `<g transform="${A.iconTransform}">` +
    `<path d="${A.icon.navy}" fill-rule="evenodd" fill="${white ? '#ffffff' : NAVY}"/>` +
    `<path d="${A.icon.green}" fill="${white ? '#ffffff' : GREEN}"/>` +
    `<path d="${A.icon.falzGreen}" fill="${white ? '#ffffff' : `url(#gG${sfx})`}"/>` +
    `<path d="${A.icon.falzNavy}" fill="${white ? '#ffffff' : `url(#gN${sfx})`}"/>` +
    `</g>`
  );
}

/** Lockup: Bildzeichen + pfadkonvertierte Wortmarke. */
function lockupSvg(height, white, sfx) {
  return (
    `<svg width="${Math.round(height * RATIO)}" height="${height}" viewBox="${A.viewBoxLockup}" ` +
    `xmlns="http://www.w3.org/2000/svg" role="img" aria-label="AHAD Cleaning">` +
    (white ? '' : gradientDefs(sfx)) +
    iconGroup(white, sfx) +
    `<path d="${A.wordmark.ahad}" fill="${white ? '#ffffff' : NAVY}"/>` +
    `<path d="${A.wordmark.cleaning}" fill="${white ? '#ffffff' : GREEN}"/>` +
    `</svg>`
  );
}

/** Bildzeichen solo, quadratisch zentriert. */
function iconSvg(size, white, sfx) {
  return (
    `<svg width="${Math.round(size * (ICON_W / ICON_H))}" height="${size}" viewBox="${A.viewBoxIcon}" ` +
    `xmlns="http://www.w3.org/2000/svg" role="img" aria-label="AHAD Cleaning">` +
    (white ? '' : gradientDefs(sfx)) +
    iconGroup(white, sfx) +
    `</svg>`
  );
}

const fontFile = path.join(root, 'src/assets/fonts/Montserrat-var.woff2');
const fontBase64 = (await readFile(fontFile)).toString('base64');

/**
 * Flächiger Grund. Dunkel = Navy-Verlauf mit feinem Raster und grünem
 * Lichtschein rechts (dieselbe Bildsprache wie der Website-Hero).
 */
function background(dark) {
  if (!dark) {
    return `background:#ffffff;` +
      `background-image:linear-gradient(180deg,#ffffff 0%,#f7f9fb 100%),` +
      `repeating-linear-gradient(0deg,rgba(11,35,65,.05) 0 1px,transparent 1px 56px),` +
      `repeating-linear-gradient(90deg,rgba(11,35,65,.05) 0 1px,transparent 1px 56px);`;
  }
  return `background:${NAVY};` +
    `background-image:radial-gradient(95% 150% at 96% 8%,rgba(13,107,56,.34) 0%,rgba(13,107,56,0) 58%),` +
    `repeating-linear-gradient(0deg,rgba(255,255,255,.05) 0 1px,transparent 1px 56px),` +
    `repeating-linear-gradient(90deg,rgba(255,255,255,.05) 0 1px,transparent 1px 56px),` +
    `linear-gradient(115deg,${NAVY_DEEP} 0%,${NAVY} 58%,#12365F 100%);`;
}

function page(width, height, dark, body) {
  return `<!doctype html><html lang="de"><head><meta charset="utf-8">
<style>
@font-face{font-family:'Montserrat';src:url(data:font/woff2;base64,${fontBase64}) format('woff2');font-weight:100 900;font-display:block}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${width}px;height:${height}px}
body{font-family:'Montserrat',system-ui,sans-serif;-webkit-font-smoothing:antialiased;overflow:hidden}
.stage{position:relative;width:${width}px;height:${height}px;overflow:hidden;${background(dark)}}
.claim{font-weight:800;text-transform:uppercase;color:${dark ? MINT : GREEN}}
.sub{font-weight:600;color:${dark ? 'rgba(255,255,255,.88)' : 'rgba(11,35,65,.86)'}}
.meta{font-weight:600;color:${dark ? 'rgba(255,255,255,.62)' : 'rgba(11,35,65,.6)'}}
.rule{background:${dark ? 'rgba(255,255,255,.22)' : 'rgba(11,35,65,.18)'}}
svg{display:block}
</style></head><body><div class="stage">${body}</div></body></html>`;
}

/**
 * Schutzzonen: Auf der Unternehmensseite liegt das Firmenlogo unten links
 * über dem Titelbild, im persönlichen Profil das Profilfoto. Die Inhalte
 * stehen deshalb mittig bzw. rechts und halten Abstand zu dieser Ecke.
 */
const FORMATS = {
  'linkedin-unternehmensseite': {
    width: 1128,
    height: 191,
    label: 'LinkedIn — Titelbild Unternehmensseite',
    body: (dark, sfx) => `
      <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:15px;padding-left:150px">
        ${lockupSvg(46, dark, sfx)}
        <div class="claim" style="font-size:14px;letter-spacing:.34em">${CLAIM}</div>
      </div>`,
  },
  'linkedin-profil': {
    width: 1584,
    height: 396,
    label: 'LinkedIn — Hintergrundbild persönliches Profil',
    body: (dark, sfx) => `
      <div style="position:absolute;top:0;bottom:0;right:96px;display:flex;flex-direction:column;align-items:flex-end;justify-content:center;gap:22px;text-align:right">
        ${lockupSvg(78, dark, sfx)}
        <div class="claim" style="font-size:23px;letter-spacing:.3em">${CLAIM}</div>
        <div class="rule" style="width:320px;height:1px"></div>
        <div class="sub" style="font-size:18px;letter-spacing:.01em">${SUBLINE}</div>
        <div class="meta" style="font-size:15px;letter-spacing:.05em">${REGIONS}</div>
      </div>`,
  },
  'linkedin-logo': {
    width: 400,
    height: 400,
    label: 'LinkedIn — quadratisches Unternehmenslogo',
    body: (dark, sfx) => `
      <div style="position:absolute;inset:0;display:grid;place-items:center">${iconSvg(212, dark, sfx)}</div>`,
  },
};

function findChromium() {
  const candidates = [
    process.env.CHROMIUM_PATH,
    process.env.PLAYWRIGHT_BROWSERS_PATH && path.join(process.env.PLAYWRIGHT_BROWSERS_PATH, 'chromium'),
    '/opt/pw-browsers/chromium',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    '/usr/bin/google-chrome',
  ].filter(Boolean);
  return candidates.find((candidate) => existsSync(candidate)) ?? null;
}

const executablePath = findChromium();
if (!executablePath) {
  console.error('Kein Chromium gefunden — Banner können nicht gerendert werden.');
  console.error('CHROMIUM_PATH setzen oder Playwright-Chromium installieren.');
  process.exit(1);
}

/**
 * Ausgabestufen. LinkedIn rechnet große Uploads herunter — das Ergebnis bleibt
 * dadurch auch auf Retina-Displays scharf, während die 1x-Fassung dort
 * hochskaliert und weich wirkt. Empfehlung für den Upload: @3x, sonst @2x.
 */
const SCALES = [1, 2, 3];

const { chromium } = await import('playwright');
await mkdir(out(), { recursive: true });

const browser = await chromium.launch({ executablePath });
let written = 0;

for (const [key, format] of Object.entries(FORMATS)) {
  for (const dark of [true, false]) {
    for (const scale of SCALES) {
      const suffix = `${dark ? '' : '-hell'}${scale > 1 ? `@${scale}x` : ''}`;
      const file = `${key}-${format.width}x${format.height}${suffix}.png`;
      const sfx = `${key}${dark ? 'd' : 'l'}${scale}`;
      const page_ = await browser.newPage({
        viewport: { width: format.width, height: format.height },
        deviceScaleFactor: scale,
      });
      await page_.setContent(page(format.width, format.height, dark, format.body(dark, sfx)), {
        waitUntil: 'load',
      });
      // Als String ausgewertet: der Ausdruck läuft im Browser, nicht in Node.
      await page_.evaluate('document.fonts.ready');
      await page_.screenshot({ path: out(file), type: 'png' });
      await page_.close();
      written += 1;
    }
  }
}

await browser.close();

const readme = `# AHAD Cleaning — Social-Media-Banner

Erzeugt aus dem offiziellen Logo-Artwork (\`src/components/logo-art.json\`) mit
\`npm run social:banner\`. Geometrie und Markenfarben sind identisch mit
Website, Druck-Kit und Signatur.

## Dateien

| Datei | Einsatz | Größe |
| --- | --- | --- |
| \`linkedin-unternehmensseite-1128x191.png\` | Titelbild der Unternehmensseite | 1128 × 191 px |
| \`linkedin-profil-1584x396.png\` | Hintergrundbild im persönlichen Profil | 1584 × 396 px |
| \`linkedin-logo-400x400.png\` | Quadratisches Unternehmenslogo | 400 × 400 px |

Zu jeder Datei gibt es zwei Varianten:

* **ohne Zusatz** — dunkler Navy-Grund, Logo negativ weiß (Standard)
* **\`-hell\`** — weißer Grund, Logo in Markenfarben

und jeweils Fassungen in **\`@2x\`** und **\`@3x\`** für hochauflösende Displays.

**Für den Upload \`@3x\` nehmen** (ersatzweise \`@2x\`). LinkedIn rechnet große
Dateien selbst herunter; die 1x-Fassung wird auf Retina-Displays dagegen
hochskaliert und wirkt weich. Die 1x-Datei ist nur der Rückfall, falls ein
Upload wegen der Dateigröße abgelehnt wird.

## Schutzzonen

* **Unternehmensseite:** Das Firmenlogo liegt am Desktop unten links über dem
  Titelbild. Der Inhalt steht deshalb mittig mit Abstand nach links.
* **Persönliches Profil:** Das Profilfoto überdeckt die untere linke Ecke.
  Der Inhalt steht rechts.
* Auf Mobilgeräten werden die Ränder beschnitten — deshalb bleibt außen
  jeweils Luft.

## Markenfarben

| Farbe | HEX |
| --- | --- |
| Navy | \`#0B2341\` |
| Grün | \`#0D6B38\` |
| Mint (nur auf dunklem Grund) | \`#9CDDB7\` |
`;

await writeFile(out('README.md'), readme);
console.log(`✓ ${written} Banner + README in brand/social/ erzeugt`);
