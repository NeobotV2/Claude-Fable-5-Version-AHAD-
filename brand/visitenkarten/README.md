# AHAD Cleaning – Visitenkarten

Erzeugt aus `brand/signatur/team.json` mit `npm run visitenkarten`
(Personen mit Platzhaltern wie `[Position]` werden übersprungen).

| Datei | Inhalt |
| --- | --- |
| `<slug>/visitenkarte-<slug>-druck.pdf` | Druckdatei, 2 Seiten (vorne, hinten) |
| `<slug>/vorschau-<slug>.png` | Ansicht im Endformat, nicht zum Drucken |

## Druckdaten

- Endformat **85 × 55 mm**, Datenformat **91 × 61 mm** (3 mm Beschnitt rundum),
  ohne Schnittmarken. Texte liegen mindestens 4,5 mm innerhalb der Schnittkante.
- Vektor, Schriften eingebettet (Montserrat, Inter).
- Farben laut Markenhandbuch als RGB/HEX: Navy `#0B2341`, Grün `#0D6B38`,
  Mint `#9CDDB7`. Die Druckerei wandelt in CMYK um. Weil die Rückseite
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
