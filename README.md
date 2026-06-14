# AHAD Cleaning — Website

Premium-Webauftritt der AHAD Cleaning Company GmbH: systematische Gebäudereinigung
für Industrie, Verwaltung und Mittelstand in Süddeutschland.

## Stack

- **React 18 + TypeScript + Vite 6** — SPA mit Code-Splitting pro Route
- **Tailwind CSS v4** — Designsystem über `@theme`-Tokens in `src/index.css`
- **motion/react** — Scroll-Reveals, Parallax-Hero, Mikrointeraktionen
- **react-helmet-async** — SEO/Meta + schema.org (Organization, FAQ, Service)
- **Firebase (Firestore)** — Lead-Erfassung aus Kontaktformular & Funnels

## Entwicklung

```bash
npm install
npm run dev          # Entwicklungsserver
npm run build        # Standard-Build = SSG: Client + SSR + Prerender → statisches HTML je Route
npm run build:client # nur Client-Build (ohne Prerender), selten nötig
npm run preview      # Build lokal testen
npm run assets       # Gebrandete Bilder neu generieren (og-image, Icons, Fallback)
```

## Architektur

| Pfad | Zweck |
| --- | --- |
| `src/lib/site.ts` | **Single Source of Truth**: Kontaktdaten, Versprechen (24h/48h), Statistiken, Referenzen, Organization-Schema |
| `src/lib/images.ts` | Zentrale Bild-Bibliothek (kuratierte Unsplash-Fotos + lokaler Marken-Fallback) |
| `src/data/services.tsx` | Inhalte aller 7 Leistungsseiten (datengetrieben) |
| `src/data/branchen.tsx` | Inhalte aller 5 Branchenseiten (Problem → Lösung) |
| `src/components/ui/` | UI-Kit: Button, Reveal, SectionHeading, Stat (CountUp), Accordion, BeforeAfter-Slider, SmartImage |
| `src/components/ServicePage.tsx` | Template für Leistungs-Detailseiten |
| `src/components/IndustryPage.tsx` | Template für Branchenseiten |
| `src/components/PageHero.tsx` | Einheitlicher dunkler Seiten-Hero mit Brotkrumen & CTAs |
| `src/components/CTABand.tsx` | Conversion-Abschluss (Angebot in 24h + Telefon) auf jeder Seite |
| `src/components/StickyCTA.tsx` | Mobile Conversion-Leiste (Anrufen / Angebot) |
| `scripts/generate-assets.mjs` | Erzeugt og-image.jpg, Icons & Fallback-Bild aus SVG (sharp) |

### Marke (Designbook v2.4, Juni 2026)

- **Farben:** AHAD Navy `#0B2341`, AHAD Grün `#0D6B38`, Weiß als Grundfläche,
  Text-Anthrazit `#1C2733` (Fließtext, nie im Logo), Mint `#9CDDB7` nur auf
  dunklen Flächen — dort darf Mint EIN Schlüsselwort/Akzent hervorheben
  (Designbook-Ausnahme), auf Weiß nie als Textfarbe. Alle Töne als Tokens
  in `src/index.css` (`@theme`).
- **Logo:** Originalpfade aus der Druckvorlage in `src/components/logo-paths.ts`
  (Wortmarke ist pfadkonvertiert — nie als Schrift neu setzen). Hauptflächen
  solid, Falzflächen als Navy↔Grün-Verlauf (Stops `#148A49`/`#123660` aus der
  Vorlage gesampelt). Varianten: Verlauf (digital) und Negativ Weiß (auf Navy)
  über `<Logo variant>`.
- **Typografie:** Montserrat führt (Black 900 Headlines, Bold 700 Subheads,
  Regular 400 Fließtext); Space Grotesk nur als digitaler Akzent
  (Eyebrows, Zahlen — `font-accent`).
- **Claim & Messaging:** Genau ein Web-Claim — „Struktur. Sauberkeit. Sicherheit."
  (Signatur im Footer). Weitere Slogans sind Kanal-Material (Fahrzeug, Kleidung,
  Anzeige, Social, LV-Deckblatt) und in `src/lib/messaging.ts` mit Kanal-Zuordnung
  dokumentiert — bewusst NICHT über die Website gestreut.

### Rendering & SEO/GEO

- **SSG ist der Standard-Build.** `npm run build` baut den Client, kompiliert einen
  SSR-Renderer (`src/entry-server.tsx` via `vite.ssr.config.ts`) und prerendert jede
  Route (`scripts/prerender.mjs`) zu statischem HTML mit vollständigem Inhalt,
  Meta-/OG-Tags und JSON-LD — entscheidend für Link-Vorschauen (WhatsApp/LinkedIn/
  Slack), Suchmaschinen und LLM-Fetcher, die kein JavaScript ausführen. Schlägt eine
  Route fehl, wird die SPA-Hülle geschrieben (Build bricht nie ab). Es gibt keinen
  separaten SSG-Befehl mehr — jeder Host, der `npm run build` ausführt, liefert
  prerendertes HTML (Netlify, Vercel, GitHub Pages sind entsprechend gesetzt).
- **OG-Fallback:** `index.html` enthält Basis-OG/Twitter-Tags; der Prerender ersetzt
  sie pro Seite durch das seitenspezifische Helmet (kein Duplikat).
- **Hydration:** `main.tsx` hydriert vorgerendertes HTML, sonst frischer Mount.
- Routenliste fürs Prerendering steht in `scripts/prerender.mjs` (ohne /admin,
  /karriere/bewerbung). Firebase wird in Formularen erst beim Absenden dynamisch
  geladen — hält Prerender und Initial-Bundle schlank.

### Design-Prinzipien

- **Conversion zuerst:** „Angebot in 24h“ als durchgängiges Versprechen — Header-CTA,
  Sticky-Bar (mobil), CTA-Band auf jeder Seite, 4-Schritte-Express-Funnel unter `/angebot`.
- **Dunkle Heroes überall:** Der Header startet transparent über Navy-Heroes und wechselt
  beim Scrollen in weißes Glas. Seiten mit hellem Anfang stehen in `LIGHT_TOP_ROUTES`
  (`src/components/Header.tsx`).
- **Marken-Tokens statt Hex-Werten:** Farben/Schatten/Animationen kommen aus `@theme`
  (`navy`, `brand`, `accent`, `mint`, `paper`, …).

## Firebase konfigurieren

Echte Projektwerte entweder per Umgebungsvariablen (`VITE_FIREBASE_API_KEY`,
`VITE_FIREBASE_PROJECT_ID`, …) setzen oder `src/firebase-applet-config.json`
ersetzen. Ohne echte Konfiguration laufen die Formulare in den dokumentierten
Fehlerpfad (Hinweis mit Telefonnummer) — die Seite selbst funktioniert vollständig.

## Bilder

Fotos werden von `images.unsplash.com` (Unsplash-Lizenz, Hotlinking erlaubt) geladen
und sind in `src/lib/images.ts` kuratiert. Fällt eine Quelle aus, blendet
`<SmartImage>` automatisch das gebrandete Fallback (`public/images/fallback.jpg`) ein.
Eigene Fotos einfach dort eintragen — eine Stelle, ganze Site aktualisiert.
