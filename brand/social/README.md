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

## Profilbilder

Quadratisch, für WhatsApp, LinkedIn, Instagram, Google-Unternehmensprofil und
alles andere, was ein Profilbild verlangt. Jede Variante gibt es in
**1024 × 1024 px** (Standard) und **400 × 400 px** (LinkedIn-Minimum).

| Datei | Grund |
| --- | --- |
| `profilbild-navy-1024x1024.png` | Navy, Logo weiß — **Standardempfehlung** |
| `profilbild-navy-verlauf-1024x1024.png` | Navy mit Verlauf und Raster, Logo weiß |
| `profilbild-gruen-1024x1024.png` | AHAD-Grün, Logo weiß |
| `profilbild-weiss-1024x1024.png` | Weiß, Logo in Markenfarben |
| `profilbild-transparent-1024x1024.png` | ohne Hintergrund, Logo in Markenfarben |
| `profilbild-schriftzug-navy-1024x1024.png` | Navy, Schriftzug „AHAD CLEANING" weiß |
| `profilbild-schriftzug-weiss-1024x1024.png` | Weiß, Schriftzug in Markenfarben |
| `profilbild-schriftzug-gruen-1024x1024.png` | AHAD-Grün, Schriftzug weiß |
| `profilbild-schriftzug-transparent-1024x1024.png` | ohne Hintergrund, Schriftzug in Markenfarben |

Fast alle Dienste beschneiden das Profilbild rund. Das Bildzeichen steht
deshalb zentriert und mit Abstand zum Rand — es wird nichts abgeschnitten.
Die `schriftzug-`-Varianten zeigen die Wortmarke statt des Bildzeichens. Der
runde Beschnitt zwingt die breite Wortmarke klein — in Miniaturgrößen (etwa in
WhatsApp-Chatlisten) ist das Bildzeichen deutlich besser lesbar.

`transparent` nur dort verwenden, wo der Dienst selbst einen Hintergrund
setzt — auf dunklem Grund geht das Navy des Logos sonst unter.

## Schriftzug „AHAD CLEANING"

Fertige Bilddateien in **2400 px** und **1200 px** Breite, mit Schutzraum am
Rand. `schriftzug-*` zeigt nur die Wortmarke, `logo-quer-*` das vollständige
Logo aus Bildzeichen und Wortmarke.

| Datei | Grund |
| --- | --- |
| `schriftzug-weiss-*` / `logo-quer-weiss-*` | weiß, Logo in Markenfarben |
| `schriftzug-navy-*` / `logo-quer-navy-*` | Navy, Logo weiß |
| `schriftzug-transparent-*` / `logo-quer-transparent-*` | ohne Hintergrund, Markenfarben |
| `schriftzug-transparent-weiss-*` / `logo-quer-transparent-weiss-*` | ohne Hintergrund, weiß |

Die Vektorfassungen (SVG, PDF) und Druckauflösungen liegen in `brand/print/` —
für Druckerei und Stickerei immer die dortigen Dateien verwenden.

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
