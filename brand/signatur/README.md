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

Beide sind bis auf Marke, Beschreibungszeile, Web-Adresse und die
Öffnungszeiten (nur Cleaning) identisch aufgebaut — gleiches Raster, gleiche
Farben, gleicher Pflichtblock. Änderungen am Layout immer in beiden Dateien
nachziehen.

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

## Warum beide das Bildzeichen nutzen und nicht das Lockup

Beide Signaturen zeigen das **Bildzeichen** auf Navy-Kachel (`logo-512.png`)
und setzen den Markennamen als Text. Gründe:

- **Dark Mode.** Das Lockup ist überwiegend Navy `#0B2341`. Als transparentes
  Bild verschwindet es im dunklen Modus vieler Mail-Clients; mit weißem
  Hintergrund steht ein weißer Kasten in der dunklen Mail. Die Navy-Kachel
  bringt ihren Grund selbst mit und funktioniert in beiden Modi.
- **Ein System für beide Felder.** Cleaning und Care gehören zur selben GmbH.
  Gleicher Aufbau bei beiden wirkt geschlossener als eine Signatur mit
  Lockup und eine ohne.
- **Für AHAD Care gibt es kein eigenes Logo.** Die Wortmarke des
  Bestandslogos ist in Pfade konvertiert („AHAD CLEANING"), die
  Originalschrift liegt nicht im Projekt — „AHAD CARE" lässt sich damit nicht
  im gleichen Schriftschnitt setzen, ohne die Marke nachzuzeichnen. Ein
  eigenes Care-Logo muss gestalterisch entschieden werden.

Wer bei Cleaning stattdessen das vollfarbige Lockup will: dafür muss erst ein
gehostetes PNG des Lockups nach `public/` gelegt werden (aktuell existiert
keins), und der Dark-Mode-Nachteil bleibt.

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
