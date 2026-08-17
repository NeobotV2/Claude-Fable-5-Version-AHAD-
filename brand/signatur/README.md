# E-Mail-Signaturen

Zwei Signaturen — eine je Geschäftsfeld der AHAD Cleaning Company GmbH.
Wer für beide Felder schreibt, legt im Mail-Client zwei Signaturen an und
wählt sie pro Mail aus.

| Datei | Zweck |
| --- | --- |
| `ahad-cleaning-signatur.html` | Gebäudereinigung — zum Einfügen in den Mail-Client. |
| `ahad-cleaning-signatur.txt` | Nur-Text-Fassung. |
| `ahad-care-signatur.html` | Unterstützung im Alltag — zum Einfügen in den Mail-Client. |
| `ahad-care-signatur.txt` | Nur-Text-Fassung. |

Gleiche Farben und gleicher Pflichtblock, aber unterschiedlicher Kopf:
Cleaning führt das Lockup über dem Textblock, Care das Bildzeichen links
daneben (Begründung unten). Öffnungszeiten hat nur Cleaning. Änderungen am
Pflichtblock immer in beiden Dateien nachziehen.

Weil das Cleaning-Lockup den Markennamen schon trägt, steht „AHAD Cleaning"
dort nicht zusätzlich in der Positionszeile — bei Care schon, da das
Bildzeichen allein den Namen nicht nennt.

## Vor dem Einsatz ersetzen

`[NAME]` · `[POSITION]` · `[DURCHWAHL]` · `[MOBIL]` · `[E-MAIL]`

Zeilen, die nicht gebraucht werden (z. B. Durchwahl oder Mobil), komplett
löschen — nicht leer stehen lassen.

## Einbauen

**Outlook (Windows)** — Datei → Optionen → E-Mail → Signaturen. Die HTML-Datei
im Browser öffnen, alles markieren (`Strg+A`), kopieren und ins
Signaturfeld einfügen. Nicht den HTML-Quelltext einfügen, sondern die
gerenderte Ansicht.

**Outlook Web / Microsoft 365** — Einstellungen → E-Mail → Signaturen,
dann genauso über die gerenderte Ansicht einfügen.

**Gmail** — Einstellungen → Allgemein → Signatur. Ebenfalls die gerenderte
Ansicht aus dem Browser kopieren. Gmail kürzt lange Signaturen mit „…";
das ist normal und beim Empfänger vollständig sichtbar.

**Apple Mail** — Mail → Einstellungen → Signaturen. Signatur anlegen,
„Standardschrift immer verwenden" **deaktivieren**, dann einfügen.

## Logos in den Signaturen

**Cleaning** nutzt das vollfarbige **Lockup** — `public/signatur-logo.png`,
erzeugt von `scripts/generate-assets.mjs` (`npm run assets`) aus dem
Original-Artwork. Dargestellt mit 188 × 68 px, gerendert mit 376 px Breite,
damit es auf Retina-Displays scharf bleibt.

Das Lockup sitzt auf einer **weißen Karte mit gerundeten Ecken**. Das ist
Absicht: es ist überwiegend Navy `#0B2341` und würde auf transparentem Grund im
Dark Mode vieler Mail-Clients verschwinden. Auf hellem Mail-Hintergrund — dem
Normalfall — ist die Karte unsichtbar, im Dark Mode trägt sie das Logo.

Was die Karte **nicht** löst: die Textfarben der Signatur sind ebenfalls
überwiegend Navy. Wie die im Dark Mode aussehen, entscheidet der Mail-Client
über seine eigene Farbumrechnung — das ist von außen nicht steuerbar, weil
`<style>`-Blöcke und damit `prefers-color-scheme` in Signaturen nicht
verfügbar sind.

**Care** nutzt das **Bildzeichen** auf Navy-Kachel (`logo-512.png`) und setzt
„AHAD Care" als Text. Grund: für AHAD Care existiert kein eigenes
Logo-Artwork. Die Wortmarke des Bestandslogos ist in Pfade konvertiert
(„AHAD CLEANING"), die Originalschrift liegt nicht im Projekt — „AHAD CARE"
lässt sich damit nicht im gleichen Schriftschnitt setzen, ohne die Marke
nachzuzeichnen. Ein eigenes Care-Logo muss gestalterisch entschieden werden;
danach kann Care auf dieselbe Lockup-Lösung umgestellt werden.

## Technische Hinweise

- Das Logo wird von `https://www.ahad-cleaning.de/logo-512.png` geladen, damit
  es nicht als Anhang mitgeschickt wird. Es hat einen eigenen Navy-Grund und
  bleibt deshalb auch im Dark Mode sichtbar.
- Bewusst nur Tabellen und Inline-Styles: `<style>`-Blöcke, Flexbox und Grid
  werden von Outlook und Gmail entfernt.
- Schriften sind Arial/Helvetica. Markenschriften stehen in E-Mail-Clients
  nicht zur Verfügung und würden unkontrolliert ersetzt.

## Pflichtangaben

Geschäftliche E-Mails gelten als Geschäftsbriefe (§ 35a GmbHG). Der
Fußzeilenblock mit Firma, Sitz, Registergericht, Handelsregisternummer und
Geschäftsführerin muss deshalb erhalten bleiben. Die Angaben stammen aus dem
Impressum (`src/pages/rechtliches/Impressum.tsx`) und sind bei Änderungen dort
und hier gemeinsam zu pflegen.

AHAD Care ist ein Geschäftsfeld der AHAD Cleaning Company GmbH, keine eigene
Gesellschaft — im Pflichtblock steht daher in beiden Signaturen die GmbH.

## Offener Punkt: Claim

Die Signaturen tragen bewusst **keinen Claim**, sondern nur eine sachliche
Beschreibungszeile. Grund: `src/lib/messaging.ts` ist an dieser Stelle
widersprüchlich — der Dateikopf bezeichnet „Struktur. Sauberkeit. Sicherheit."
als den einen verbindlichen Claim, die exportierte Konstante `CLAIM` enthält
dagegen „Sauberkeit mit System.". Solange das nicht geklärt ist, würde ein
Claim in der Signatur womöglich von der Website abweichen.

Sobald entschieden ist, welcher Claim gilt, kann er als vierte Zeile unter der
Marke ergänzt werden.
