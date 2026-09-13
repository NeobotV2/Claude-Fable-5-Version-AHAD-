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

/**
 * Kopierseite: zeigt alle Signaturen und legt je Signatur eine Schaltfläche
 * daneben, die sie mit Formatierung in die Zwischenablage legt.
 *
 * Kopiert wird über eine Auswahl plus document.execCommand('copy'). Das wirkt
 * altmodisch, ist hier aber der verlässliche Weg: Die Seite wird lokal per
 * Doppelklick geöffnet, und die neuere Zwischenablage-API verweigert in
 * manchen Browsern den Dienst, wenn die Seite nicht über https ausgeliefert
 * wird. Wo die neue API vorhanden ist, wird sie zuerst versucht.
 */
function kopierseite(eintraege) {
  const karten = eintraege
    .map(({ person, html, txt }) => {
      const offen = `${person.name}${person.position}`.includes('[');
      return `      <section class="karte">
        <header class="kopf">
          <div>
            <h2>${esc(person.name)}</h2>
            <p class="rolle">${esc(person.position)}</p>
          </div>
          <div class="knoepfe">
            <button type="button" class="knopf" data-ziel="sig-${person.slug}">Signatur kopieren</button>
            <button type="button" class="knopf leise" data-text="txt-${person.slug}">Nur Text</button>
          </div>
        </header>
        ${offen ? '<p class="warnung">Diese Signatur enthält noch Platzhalter in eckigen Klammern. Vor dem Einsatz in <code>brand/signatur/team.json</code> ergänzen und <code>npm run signaturen</code> erneut ausführen.</p>' : ''}
        <div class="buehne"><div id="sig-${person.slug}">${html}</div></div>
        <textarea id="txt-${person.slug}" class="versteckt" readonly>${esc(txt)}</textarea>
      </section>`;
    })
    .join('\n');

  return `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>E-Mail-Signaturen — AHAD Cleaning</title>
<style>
  :root { --navy:#0B2341; --gruen:#0D6B38; --linie:#e6eaef; --grau:#5A6472; }
  * { box-sizing:border-box; }
  body { margin:0; background:#f7f9fb; color:var(--navy);
         font:16px/1.55 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif; }
  .kopfzeile { background:var(--navy); color:#fff; padding:28px 24px; }
  .innen { max-width:900px; margin:0 auto; }
  .kopfzeile h1 { margin:0 0 6px; font-size:22px; }
  .kopfzeile p { margin:0; color:#c8d4e2; font-size:14px; }
  main { padding:28px 24px 64px; }
  .anleitung { background:#fff; border:1px solid var(--linie); border-radius:12px;
               padding:18px 22px; margin-bottom:26px; font-size:14px; }
  .anleitung h2 { margin:0 0 10px; font-size:15px; }
  .anleitung ol { margin:0; padding-left:20px; }
  .anleitung li { margin-bottom:5px; }
  .karte { background:#fff; border:1px solid var(--linie); border-radius:12px;
           padding:20px 22px; margin-bottom:18px; }
  .kopf { display:flex; flex-wrap:wrap; gap:12px; align-items:center;
          justify-content:space-between; margin-bottom:14px; }
  .kopf h2 { margin:0; font-size:17px; }
  .rolle { margin:2px 0 0; font-size:13px; color:var(--grau); }
  .knoepfe { display:flex; gap:8px; flex-wrap:wrap; }
  .knopf { font:inherit; font-size:14px; font-weight:700; cursor:pointer;
           border:0; border-radius:8px; padding:9px 16px;
           background:var(--gruen); color:#fff; }
  .knopf:hover { background:#0A552C; }
  .knopf.leise { background:#fff; color:var(--navy); border:1px solid #9aa8b8; }
  .knopf.leise:hover { background:#eef2f6; }
  .knopf.fertig { background:var(--navy); }
  .buehne { border:1px dashed var(--linie); border-radius:10px; padding:18px; overflow-x:auto; }
  .warnung { margin:0 0 12px; padding:10px 14px; border-radius:8px; font-size:13px;
             background:#fff7ed; border:1px solid #fed7aa; color:#7c2d12; }
  .warnung code { background:#fff; padding:1px 5px; border-radius:4px; }
  .versteckt { position:absolute; left:-10000px; width:1px; height:1px; }
</style>
</head>
<body>
  <div class="kopfzeile"><div class="innen">
    <h1>E-Mail-Signaturen</h1>
    <p>AHAD Cleaning Company GmbH — auf „Signatur kopieren" tippen und im Mailprogramm einfügen.</p>
  </div></div>
  <main class="innen">
    <div class="anleitung">
      <h2>So bauen Sie die Signatur ein</h2>
      <ol>
        <li>Bei Ihrem Namen auf <strong>Signatur kopieren</strong> klicken.</li>
        <li><strong>Outlook:</strong> Datei → Optionen → E-Mail → Signaturen → Neu.
            <strong>Outlook im Browser:</strong> Einstellungen → E-Mail → Signaturen.
            <strong>Apple Mail:</strong> Mail → Einstellungen → Signaturen, dort
            „Standardschrift immer verwenden" ausschalten.</li>
        <li>Ins Signaturfeld einfügen mit <strong>Strg + V</strong> (Mac: <strong>Cmd + V</strong>) und speichern.</li>
        <li>Zur Kontrolle eine Testmail an sich selbst schicken und prüfen, ob das Logo erscheint.</li>
      </ol>
    </div>
${karten}
  </main>
<script>
  function rueckmeldung(knopf, erfolg) {
    var alt = knopf.textContent;
    knopf.textContent = erfolg ? 'Kopiert' : 'Bitte von Hand markieren';
    knopf.classList.toggle('fertig', erfolg);
    setTimeout(function () {
      knopf.textContent = alt;
      knopf.classList.remove('fertig');
    }, 2000);
  }

  function markierenUndKopieren(knoten) {
    var auswahl = window.getSelection();
    var bereich = document.createRange();
    bereich.selectNodeContents(knoten);
    auswahl.removeAllRanges();
    auswahl.addRange(bereich);
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    auswahl.removeAllRanges();
    return ok;
  }

  document.addEventListener('click', function (ereignis) {
    var knopf = ereignis.target.closest('.knopf');
    if (!knopf) return;

    if (knopf.dataset.text) {
      var feld = document.getElementById(knopf.dataset.text);
      var text = feld.value;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(
          function () { rueckmeldung(knopf, true); },
          function () { rueckmeldung(knopf, markierenUndKopieren(feld)); }
        );
        return;
      }
      feld.select();
      var okText = false;
      try { okText = document.execCommand('copy'); } catch (e) { okText = false; }
      rueckmeldung(knopf, okText);
      return;
    }

    var quelle = document.getElementById(knopf.dataset.ziel);
    var reinText = document.getElementById(knopf.dataset.ziel.replace('sig-', 'txt-')).value;

    // Zuerst die moderne API: sie legt Formatierung und Nur-Text gemeinsam ab.
    if (window.ClipboardItem && navigator.clipboard && navigator.clipboard.write) {
      var daten = new ClipboardItem({
        'text/html': new Blob([quelle.innerHTML], { type: 'text/html' }),
        'text/plain': new Blob([reinText], { type: 'text/plain' })
      });
      navigator.clipboard.write([daten]).then(
        function () { rueckmeldung(knopf, true); },
        function () { rueckmeldung(knopf, markierenUndKopieren(quelle)); }
      );
      return;
    }

    rueckmeldung(knopf, markierenUndKopieren(quelle));
  });
</script>
</body>
</html>
`;
}

await mkdir(sig('personen'), { recursive: true });

const kopfzeile = '<!--\n  Fertige Signatur — erzeugt von scripts/build-signaturen.mjs.\n' +
  '  Nicht direkt bearbeiten: Stammdaten in brand/signatur/team.json pflegen\n' +
  '  und "npm run signaturen" erneut ausführen.\n-->\n';

/** Gerenderte Signaturen für die Kopierseite. */
const erzeugt = [];

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

  // Zusatzzeile (z. B. Prokura oder zweites Geschäftsfeld) — ohne Angabe
  // verschwindet die Zeile, statt leer stehen zu bleiben.
  if (person.zusatz) {
    html = html.replace(/\[ZUSATZ\]/g, esc(person.zusatz));
    txt = txt.replace(/\[ZUSATZ\]/g, person.zusatz);
  } else {
    html = dropHtmlRow(html, '[ZUSATZ]');
    txt = dropTextLine(txt, '[ZUSATZ]');
  }

  // Zweite Webadresse wird an die erste angehängt, nicht als eigene Zeile.
  if (person.web2) {
    const ziel = person.web2.replace(/^https?:\/\//, '').replace(/^www\./, '');
    html = html.replace(
      /\[WEB2\]/g,
      `\n      &nbsp;·&nbsp;\n      <a href="https://www.${esc(ziel)}" style="color:#0D6B38;text-decoration:none;font-weight:bold;">${esc(ziel)}</a>`,
    );
    txt = txt.replace(/\[WEB2\]/g, ` | ${ziel}`);
  } else {
    html = html.replace(/\[WEB2\]/g, '');
    txt = txt.replace(/\[WEB2\]/g, '');
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
  erzeugt.push({ person, html: html.replace(/<!--[\s\S]*?-->\n?/, ''), txt });
}

await writeFile(sig('personen', 'index.html'), kopierseite(erzeugt));

const offen = personen.filter((p) => `${p.name}${p.position}`.includes('['));
console.log(`✓ ${personen.length * 2} Signaturdateien + index.html in brand/signatur/personen/`);
if (offen.length > 0) {
  console.log(`  Noch zu bestätigen: ${offen.map((p) => p.slug).join(', ')}`);
}
