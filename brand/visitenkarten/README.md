# AHAD Cleaning – Visitenkarten

Erzeugt aus `brand/signatur/team.json` mit `npm run visitenkarten`
(Personen mit Platzhaltern wie `[Position]` werden übersprungen).

| Datei | Inhalt |
| --- | --- |
| `<slug>/visitenkarte-<slug>-druck.pdf` | Druckdatei, 2 Seiten (vorne, hinten) |
| `<slug>/vorschau-<slug>.png` | Ansicht im Endformat, nicht zum Drucken |

## Gestaltung

Nach dem Design-System „AHAD Cleaning“ (Komponente Visitenkarte), gestaltet
auf der Claude-Design-Fläche „Visitenkarten AHAD Cleaning“:

- Vorderseite: vollflächig Navy, Wortmarke weiß-mint mittig.
- Rückseite: weiß, Logo komplett oben links, Name, Funktion, Telefon, E-Mail,
  Webseite (Grün), Anschrift, QR-Code mit vCard.
- Die Wortmarke „AHAD CLEANING“ ist auf beiden Seiten exakt gleich groß
  (34 mm; das Logo komplett ist dafür 46 mm breit).

## Druckdaten

- Endformat **85 × 55 mm**, Datenformat **91 × 61 mm** (3 mm Beschnitt rundum),
  ohne Schnittmarken. Texte liegen mindestens 4 mm innerhalb der Schnittkante.
- Vektor, Schrift eingebettet (Inter); das Logo ist Vektor aus dem Original-Artwork.
- Farben laut Markenhandbuch als RGB/HEX: Navy `#0B2341`, Grün `#0D6B38`,
  Mint `#9CDDB7`. Die Druckerei wandelt in CMYK um. Weil die Vorderseite
  vollflächig Navy ist, vor der Großauflage einen Andruck oder ein kleines
  Testpaket bestellen.
- QR-Code auf der Rückseite: vCard mit Name, Position, Telefon, E-Mail,
  Website und Adresse. Vor dem Druck einmal mit dem Handy testen.

## Bestellangaben (empfohlen)

| Merkmal | Empfehlung |
| --- | --- |
| Format | 85 × 55 mm, beidseitig farbig (4/4) |
| Papier | 400 g/m² Bilderdruck matt |
| Veredelung | Softtouch-Kaschierung beidseitig (griffig, unempfindlich gegen Fingerabdrücke) |
| Alternative | 350–400 g/m² Recycling- oder Naturpapier, passend zu ISO 14001 |
| Auflage | 250–500 je Person |
