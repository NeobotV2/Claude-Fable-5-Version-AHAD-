# AHAD Cleaning Website

React-/TypeScript-Website der AHAD Cleaning Company GmbH für B2B-Gebäudereinigung. Der Produktionsbuild erzeugt für jede öffentliche Route statisches HTML und enthält einen serverseitigen, idempotenten Lead-Workflow.

## Verbindlicher Betrieb

- Produktionshost: **Vercel**
- Kanonische Origin: `https://www.ahad-cleaning.de`
- Rendering: Vite-Client + SSR-Bundle + fail-closed Prerendering
- Leadannahme: Vercel Function `/api/send-email` → Firestore-Persistenz → Resend-Benachrichtigung
- Admin: Firebase Auth/Firestore; öffentliche Browser-Creates sind durch Rules gesperrt
- Netlify ist höchstens eine technische Vorschau ohne freigegebene produktive Leadannahme. GitHub Pages ist kein Deploymentziel.

Der sichere Rollout inklusive zwingender Reihenfolge für App/API und Firestore-Regeln steht in [docs/operations/production-rollout.md](docs/operations/production-rollout.md).

## Lokale Entwicklung

Voraussetzung: Node.js 22 oder 24.

```bash
npm ci
npm run dev
```

Wichtige Prüfungen:

```bash
npm run lint            # ESLint + React-Hooks
npm run typecheck       # App, API und Vite-/Testkonfiguration
npm run test:unit       # Validierung, CSV, Rules, Routing, Claims, Redaktion
npm run build           # Client, SSR, 39 Routen + 404, 0 Fallbacks, Dist-Budgets
npm run test:e2e        # Playwright/axe; benötigt Chromium und einen Build
```

`npm run build` führt über `postbuild` automatisch die Route-, Canonical-, Robots-, Sitemap-, JSON-LD-, No-JavaScript- und gzip-Budgets aus. Ein Prerender-Fallback oder ein öffentliches SSR-Element mit inline `opacity:0` macht den Build rot.

## Architektur

| Pfad | Verantwortung |
| --- | --- |
| `src/route-manifest.json` | Quelle der Wahrheit für Router, Prerender, Sitemap und Indexierung |
| `src/site-config.json` | Kanonische Origin |
| `src/lib/site.ts` | Kontaktdaten und fail-closed veröffentlichte Claims/Referenzen |
| `src/lib/analytics.ts` | PII-freie Event- und Attributionstaxonomie |
| `src/data/jobs.ts` | Ablaufbares Jobmodell; `JobPosting` nur für verifizierte aktive Vakanzen |
| `src/data/editorial.ts` | Artikelquellen und Reviewer-Freigabe |
| `api/send-email.ts` | Server-only Leadannahme, Idempotenz, Rate Limit und Benachrichtigung |
| `api/_lib/lead-validation.ts` | Strikte Payload-Schemas für Kontakt, Angebot und Bewerbung |
| `firestore.rules` | Server-only Creates und begrenzte Adminrechte |
| `scripts/prerender.mjs` | Fail-closed Windows-/Linux-Prerendering |
| `scripts/check-performance-budget.mjs` | Post-Build-Qualitäts- und Performancebudgets |
| `tests/` | Unit-, Route-/Claim- und Playwright-/axe-Regressionstests |

## Formulare und Datenschutz

- Alle Formulare schreiben ausschließlich über die Server-API.
- `Idempotency-Key`, persistentes globales Rate Limit, Honeypot, Startzeit, Origin- und Größenprüfung reduzieren Dubletten und Missbrauch.
- E-Mail **oder** Telefon genügt. Im Angebotsfunnel sind Unternehmen und Einsatzort optional.
- Der Angebotsentwurf liegt höchstens zwei Stunden im `sessionStorage` und enthält keine Kontaktfelder oder Freitexte.
- WhatsApp ist im Bewerbungsfunnel ein separates, freiwilliges Opt-in; die Bewerbung funktioniert ohne WhatsApp.
- Vercel-Events enthalten Pfad-/Kampagnenkontext, aber keine Namen, E-Mail-Adressen, Telefonnummern, Nachrichten oder URL-Abfragen.

Servervariablen sind ohne echte Schlüssel in [.env.example](.env.example) dokumentiert. Werte mit `FIREBASE_*`, `RESEND_*` oder `LEAD_RATE_LIMIT_SECRET` gehören ausschließlich in die verschlüsselten Vercel-Projekteinstellungen.

## Claims, Standorte, Referenzen und Jobs

Nicht belegte Aussagen werden nicht als Tatsachen veröffentlicht. Zertifikate, Kennzahlen, Gesamtbewertungen, Kundenlogos/-stimmen, Niederlassungen und Stellen benötigen Quelle, Verantwortlichen, Freigabedatum und Ablaufdatum; der Gate ist standardmäßig geschlossen. Offene Unternehmensnachweise stehen im Register unter `docs/content/`.

- Villingen-Schwenningen ist die veröffentlichte Unternehmensadresse.
- Stuttgart und Konstanz werden bis zur externen Verifikation als Einsatzgebiete behandelt, ohne Filialadresse, Geo oder `LocalBusiness`-Schema.
- Einzelne Reviews oder Fallstimmen erscheinen nur bei dokumentierter Wiedergabefreigabe; ein selbstbezogenes `AggregateRating` wird nie erzeugt.
- Karriereprofile sind Interessensprofile, solange HR keine aktive, datierte Vakanz freigibt.

## Bilder und Barrierefreiheit

Fotos, Varianten, Fonts und freigegebene Logos werden lokal ausgeliefert; es gibt keine externen Unsplash- oder Logo-CDN-Abrufe. Bilder unter `public/images/ahad/` besitzen nach Möglichkeit 480-/960-Pixel-Varianten.

Kritische Pfade werden auf Tastaturbedienung, Fokusführung, mobilen Menüdialog, Formularnamen/-fehler, `prefers-reduced-motion`, JavaScript-off-Sichtbarkeit und axe-Verstöße geprüft. Automatisierte Checks ersetzen nicht die ausstehende manuelle NVDA-/VoiceOver- und Realgeräte-Abnahme.

## Audit und Status

- [Phase-1-Audit](docs/audit/2026-07-12-phase-1-audit.md)
- [Umsetzungsstatus A-01 bis A-34](docs/audit/2026-07-12-implementation-status.csv)
- [Produktions-Rollout](docs/operations/production-rollout.md)

Externe Aufgaben wie Domainsettings, echte Testleads, Firestore-TTL-Aktivierung, Branch Protection, Zertifikats-/Kunden-/Standortfreigaben, Rechtsprüfung, Feld-CWV und veröffentlichte Fallstudien können nicht aus dem Repository heraus bestätigt werden.
