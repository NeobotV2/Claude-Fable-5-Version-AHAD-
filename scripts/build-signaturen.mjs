/**
 * Erzeugt je Person eine fertige E-Mail-Signatur aus der Vorlage
 * brand/signatur/ahad-cleaning-signatur.{html,txt} und den Stammdaten in
 * brand/signatur/team.json.
 *
 * Die Vorlage bleibt die einzige Quelle für Aufbau, Farben und Pflichtblock —
 * hier werden nur die Platzhalter ersetzt. Nicht gefüllte Felder (Durchwahl,
 * Mobil) lassen die betreffende Zeile komplett entfallen, statt sie leer
 * stehen zu lassen.
 *
 * Ausgabe → brand/signatur/personen/<slug>.html und .txt
 *
 * Aufruf: npm run signaturen
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const sig = (...p) => path.join(root, 'brand', 'signatur', ...p);

const [htmlTemplate, txtTemplate, teamRaw] = await Promise.all([
  readFile(sig('ahad-cleaning-signatur.html'), 'utf8'),
  readFile(sig('ahad-cleaning-signatur.txt'), 'utf8'),
  readFile(sig('team.json'), 'utf8'),
]);

const { personen } = JSON.parse(teamRaw);

/** HTML-Sonderzeichen im eingesetzten Text maskieren. */
const esc = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/** Telefonnummer als tel:-Ziel — nur Ziffern und führendes Plus. */
const telHref = (value) => `tel:${String(value).replace(/[^\d+]/g, '')}`;

/**
 * Entfernt die komplette <tr>-Zeile, die den genannten Platzhalter enthält.
 * Greift, wenn zu einer Person keine Durchwahl oder keine Mobilnummer vorliegt.
 */
function dropHtmlRow(html, placeholder) {
  const rows = html.split(/(?=<tr>)/);
  return rows.filter((row) => !row.includes(placeholder)).join('');
}

/** Dieselbe Logik für die Nur-Text-Fassung: Zeile streichen. */
function dropTextLine(text, placeholder) {
  return text
    .split('\n')
    .filter((line) => !line.includes(placeholder))
    .join('\n');
}

/**
 * Die Durchwahl steht in derselben Zeile wie die Zentrale — hier darf nur der
 * Zusatz weg, nicht die ganze Zeile.
 */
function stripDurchwahl(html) {
  return html
    .replace(/\s*&nbsp;·&nbsp;\s*Durchwahl \[DURCHWAHL\]/, '')
    .replace(/ \| Durchwahl \[DURCHWAHL\]/, '');
}

await mkdir(sig('personen'), { recursive: true });

const kopfzeile = '<!--\n  Fertige Signatur — erzeugt von scripts/build-signaturen.mjs.\n' +
  '  Nicht direkt bearbeiten: Stammdaten in brand/signatur/team.json pflegen\n' +
  '  und "npm run signaturen" erneut ausführen.\n-->\n';

for (const person of personen) {
  let html = htmlTemplate.replace(/<!--[\s\S]*?-->\n?/, kopfzeile);
  let txt = txtTemplate;

  if (person.durchwahl) {
    html = html.replace(/\[DURCHWAHL\]/g, esc(person.durchwahl));
    txt = txt.replace(/\[DURCHWAHL\]/g, person.durchwahl);
  } else {
    html = stripDurchwahl(html);
    txt = stripDurchwahl(txt);
  }

  if (person.mobil) {
    html = html
      .replace(/href="tel:\[MOBIL\]"/g, `href="${telHref(person.mobil)}"`)
      .replace(/\[MOBIL\]/g, esc(person.mobil));
    txt = txt.replace(/\[MOBIL\]/g, person.mobil);
  } else {
    html = dropHtmlRow(html, '[MOBIL]');
    txt = dropTextLine(txt, '[MOBIL]');
  }

  html = html
    .replace(/\[NAME\]/g, esc(person.name))
    .replace(/\[POSITION\]/g, esc(person.position))
    .replace(/\[E-MAIL\]/g, esc(person.email));
  txt = txt
    .replace(/\[NAME\]/g, person.name)
    .replace(/\[POSITION\]/g, person.position)
    .replace(/\[E-MAIL\]/g, person.email);

  await writeFile(sig('personen', `${person.slug}.html`), html);
  await writeFile(sig('personen', `${person.slug}.txt`), txt);
}

const offen = personen.filter((p) => `${p.name}${p.position}`.includes('['));
console.log(`✓ ${personen.length * 2} Signaturdateien in brand/signatur/personen/`);
if (offen.length > 0) {
  console.log(`  Noch zu bestätigen: ${offen.map((p) => p.slug).join(', ')}`);
}
