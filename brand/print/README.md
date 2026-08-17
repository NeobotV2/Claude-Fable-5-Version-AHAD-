# AHAD Cleaning — Logo-Druckdaten (Textil)

Alle Dateien sind aus dem offiziellen Artwork erzeugt
(`src/components/logo-art.json` — dieselbe Quelle wie Website und Designbook).
Geometrie und Markenfarben sind identisch zum Original, es wurde nichts
nachgezeichnet oder neu arrangiert.

Neu erzeugen: `npm run logo:print`

## Markenfarben

| Farbe | HEX | RGB | CMYK (rechnerisch) |
| --- | --- | --- | --- |
| Navy | `#0B2341` | 11 / 35 / 65 | 83 / 46 / 0 / 75 |
| Grün | `#0D6B38` | 13 / 107 / 56 | 88 / 0 / 48 / 58 |
| Weiß | `#FFFFFF` | 255 / 255 / 255 | 0 / 0 / 0 / 0 |

**Verbindlich sind die HEX-Werte.** Die CMYK-Angaben sind rechnerisch aus RGB
abgeleitet und nicht auf ein Druckprofil abgestimmt. Für Siebdruck oder
Stickerei die Sonderfarben (Pantone/Garnnummern) von der Druckerei bzw.
Stickerei anhand der HEX-Werte bestimmen lassen — im Markenhandbuch sind
bisher keine Sonderfarben festgelegt.

## Motive

- **Lockup** — Bildzeichen + Wortmarke „AHAD CLEANING", liegend.
  Standard für Brust- und Rückendruck.
- **Bildzeichen** — Signet solo, ohne Schrift. Für kleine Flächen:
  Brusttasche, Ärmel, Cap, Kragen.

## Versionen

| Version | Einsatz |
| --- | --- |
| `farbe` | Original mit Falzverlauf. Digitaldruck, DTG, DTF, Sublimation — auf **hellen** Shirts. |
| `farbe-flat` | Zweifarbig Navy + Grün, ohne Verlauf. Siebdruck, Flex/Flock, Stickerei — auf **hellen** Shirts. |
| `weiss` | Negativ, komplett weiß. Für **dunkle** Shirts (Navy, Schwarz, Anthrazit). |
| `navy` | Einfarbig `#0B2341`. Ein-Farb-Druck auf hellen Shirts. |
| `gruen` | Einfarbig `#0D6B38`. Ein-Farb-Druck auf hellen Shirts. |
| `schwarz` | Einfarbig Schwarz. Ein-Farb-Druck, Gravur, Prägung, Vorlagen. |

Auf dunklen Shirts nur `weiss` verwenden — das Navy der Farbversion
verschwindet im Stoff.

Bei Siebdruck, Flexdruck und Stickerei immer `farbe-flat` statt `farbe`
nehmen: Verläufe lassen sich in diesen Verfahren nicht sauber umsetzen.

## Formate

| Ordner | Format | Details |
| --- | --- | --- |
| `pdf/` | Vektor-PDF, transparent | Lockup 300 × 77,83 mm · Bildzeichen 250 × 280,45 mm. **Standard-Abgabe an die Druckerei.** |
| `svg/` | Vektor-SVG, transparent | Für Illustrator, Affinity, Inkscape, CorelDRAW, Cutter-Software. |
| `png/` | PNG, transparent, 300 dpi | Lockup 4000 × 1038 px (33,9 cm breit) · Bildzeichen 3000 × 3365 px (25,4 cm breit). Für Shops, die kein Vektor annehmen. |

Vektor (PDF/SVG) ist skalierungsfrei — Größe legt die Druckerei fest.
Die PNGs bitte **nicht vergrößern**, sonst werden die Kanten unscharf.

## Empfohlene Druckgrößen

| Platzierung | Motiv | Breite |
| --- | --- | --- |
| Brust mittig | Lockup | 22–28 cm |
| Brust links | Lockup | 8–10 cm |
| Brust links | Bildzeichen | 6–7 cm Höhe |
| Rücken | Lockup | 28–32 cm |
| Ärmel | Bildzeichen | 4–5 cm Höhe |
| Cap / Kragen | Bildzeichen | 4–6 cm Höhe |

## Regeln

- **Mindestgröße:** Lockup ab 40 mm Breite, Bildzeichen ab 12 mm Breite.
  Darunter reißt „CLEANING" im Druck zu.
- **Schutzraum:** rundherum mindestens die Höhe des Bildzeichen-Schlitzes
  freilassen; nichts hineinsetzen.
- **Nicht verändern:** nicht verzerren, drehen, umfärben, mit Effekten
  (Schatten, Outline, Glow) versehen oder die Wortmarke neu setzen —
  die Schrift ist bewusst in Pfade konvertiert.
- Bildzeichen und Wortmarke nur in der gelieferten Anordnung verwenden.

`uebersicht.png` zeigt alle Versionen auf einem Blatt — das reicht der
Druckerei als Abstimmungsvorlage.
