# AHAD Cleaning — Social-Media-Banner

Erzeugt aus dem offiziellen Logo-Artwork (`src/components/logo-art.json`) mit
`npm run social:banner`. Geometrie und Markenfarben sind identisch mit
Website, Druck-Kit und Signatur.

## Dateien

| Datei | Einsatz | Größe |
| --- | --- | --- |
| `linkedin-unternehmensseite-1128x191.png` | Titelbild der Unternehmensseite | 1128 × 191 px |
| `linkedin-profil-1584x396.png` | Hintergrundbild im persönlichen Profil | 1584 × 396 px |
| `linkedin-logo-400x400.png` | Quadratisches Unternehmenslogo | 400 × 400 px |

Zu jeder Datei gibt es zwei Varianten:

* **ohne Zusatz** — dunkler Navy-Grund, Logo negativ weiß (Standard)
* **`-hell`** — weißer Grund, Logo in Markenfarben

und jeweils Fassungen in **`@2x`** und **`@3x`** für hochauflösende Displays.

**Für den Upload `@3x` nehmen** (ersatzweise `@2x`). LinkedIn rechnet große
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
| Navy | `#0B2341` |
| Grün | `#0D6B38` |
| Mint (nur auf dunklem Grund) | `#9CDDB7` |
