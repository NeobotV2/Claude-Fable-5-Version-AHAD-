# E-Mail-Signatur AHAD Care

| Datei | Zweck |
| --- | --- |
| `ahad-care-signatur.html` | Die Signatur zum Einfügen in den Mail-Client. |
| `ahad-care-signatur.txt` | Nur-Text-Fassung für Clients ohne HTML. |

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

## Warum kein AHAD-Care-Logo

Für AHAD Care existiert kein eigenes Logo-Artwork. Die Wortmarke des
Bestandslogos ist in Pfade konvertiert („AHAD CLEANING"), die Originalschrift
liegt nicht im Projekt — „AHAD CARE" lässt sich damit nicht im gleichen
Schriftschnitt setzen, ohne die Marke nachzuzeichnen.

Deshalb nutzt die Signatur das **Bildzeichen** (`logo-512.png`), das
geschäftsfeldneutral ist, und setzt „AHAD Care" als Text. Wenn AHAD Care ein
eigenes Logo bekommen soll, muss das gestalterisch entschieden und die
Originalschrift beschafft werden.

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
Gesellschaft — im Pflichtblock steht daher die GmbH.
