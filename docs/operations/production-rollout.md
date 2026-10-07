# Produktions- und Rolloutvertrag

Stand: 12. Juli 2026

## Verbindliche Plattform

- Produktionshost ist **Vercel**.
- Kanonische Origin ist `https://www.ahad-cleaning.de`.
- Apex, HTTP, Slash- und Legacy-Varianten müssen serverseitig in höchstens einem Hop auf die jeweilige kanonische URL leiten.
- Netlify darf nur als technische Vorschau ohne produktive Leadannahme genutzt werden. GitHub Pages ist kein freigegebener Deploymentpfad, weil dort weder die Server-API noch der vollständige Header-/Redirectvertrag verfügbar ist.
- Änderungen an Vercel-Domainzuordnung, DNS und Branch-Protection erfolgen außerhalb dieses Repositories und müssen im Release-Ticket dokumentiert werden.

## Vor dem ersten Release

1. Die Werte aus `.env.example` als verschlüsselte Vercel-Umgebungsvariablen setzen. Service-Account- und Resend-Schlüssel niemals in das Repository übernehmen.
2. `LEAD_ALLOWED_ORIGINS` auf die tatsächlich erreichbaren Produktionsorigins begrenzen und für `LEAD_RATE_LIMIT_SECRET` einen zufälligen Wert mit mindestens 32 Zeichen verwenden. Fehlt das Secret in Production, schreibt die API beim ersten Lead eine Fehlermeldung ins Vercel-Log. Preview-Deployments (`VERCEL_ENV` ≠ `production`) lassen zusätzlich ihre eigene `VERCEL_URL`/`VERCEL_BRANCH_URL` als Origin zu, damit die Formulare dort testbar sind.
3. `PRIVACY_NOTICE_VERSION` und `WHATSAPP_NOTICE_VERSION` auf die freigegebene Fassung setzen.
4. Domainkonfiguration so prüfen, dass `www` direkt bedient und der Apex-Host direkt auf `www` umgeleitet wird.
5. Offene Claims, Standorte, Zertifikate, Kundenfreigaben und Stellenprofile anhand des Registers prüfen. Nicht freigegebene Inhalte bleiben durch den Code-Gate verborgen.

## Sichere Reihenfolge

1. CI, Unit-/E2E-Tests und den Produktionsbuild ohne Prerender-Fallback abschließen.
2. Website und `/api/send-email` mit den Servervariablen auf Vercel deployen.
3. Je einen ausdrücklich als Test markierten Kontakt-, Angebots- und Bewerbungslead senden. In Firestore genau einen Datensatz, eine stabile Request-ID, korrekte Ablaufzeit und den Benachrichtigungsstatus prüfen. Testdaten anschließend über den Adminweg löschen; der Löschvorgang muss im Audit-Log stehen.
4. Erst danach `npm run firebase:deploy` ausführen. Die neuen Regeln sperren Browser-Creates; ein vorgezogener Rules-Deploy würde die alte Live-Version unterbrechen.
5. Canonicals, Robots, Sitemap, Redirects, CSP-Reports, Asset-Caching und die drei Formularwege auf der Produktionsorigin erneut prüfen.

## Smoke- und Fehlerfälle

- Ein identischer Retry mit derselben `Idempotency-Key` erzeugt keinen zweiten Lead.
- Ein belegter Lead bleibt auch dann gespeichert, wenn die Benachrichtigungsmail ausfällt; die API meldet diesen Zustand ohne falschen Vollerfolg. Ein Retry mit demselben Schlüssel holt die Mail bis zu dreimal nach (`notificationAttempts`), Zustellfehler stehen ohne Lead-Daten im Vercel-Log.
- Notbetrieb ohne Datenbank: Scheitert das Speichern in Firestore (fehlende oder falsche Zugangsdaten, Firestore nicht erreichbar), geht der Lead trotzdem per Resend raus – Betreff mit „[Nicht gespeichert]“, Hinweis in der Mail, Antwort `202` mit `stored: false`. Doppelversand verhindert der Resend-Idempotenzschlüssel (`lead/<Lead-ID>`). Gegen Massenversand gibt es nur einen Best-Effort-Zähler pro Instanz (`LEAD_RATE_MAX` je `LEAD_RATE_WINDOW_MS`), nicht instanzübergreifend; bei Missbrauch hilft eine Vercel-Firewall-Regel für `/api/send-email`. Der Notbetrieb greift nach höchstens drei Speicherversuchen. Erst wenn auch die Mail scheitert, antwortet die API mit `503 STORAGE_UNAVAILABLE`. Im Vercel-Log steht dann „Lead persistence failed“ mit Lead-ID, Fehlerklasse und -meldung (ohne Lead-Daten), bei fehlenden Zugangsdaten `StorageNotConfiguredError`. Der Notbetrieb ist eine Überbrückung: Diese Leads fehlen im Admin-Bereich und ohne Einwilligungsnachweis in Firestore.
- Auf Vercel ohne Dienstkonto bricht die API sofort ab, statt die Google-Standardanmeldung zu versuchen (die dort nicht existiert und erst nach mehreren Sekunden scheitert). `FIREBASE_SERVICE_ACCOUNT_JSON` (kompletter JSON-Schlüssel aus Firebase → Projekteinstellungen → Dienstkonten) ist der empfohlene Weg; versehentlich mitkopierte Anführungszeichen werden entfernt. Variablen gelten erst nach einem neuen Deployment.
- Ein vorgehender Geräte-Zeitstempel (`formStartedAt` in der Zukunft) überspringt nur die Timing-Prüfung; ohne Zeitstempel wird die Anfrage abgewiesen.
- Serverseitige Feldfehler (`VALIDATION_ERROR` mit `fields`) zeigen die Formulare als konkreten Hinweis am Feld an, nicht als generischen Übertragungsfehler.
- Unbekannte Payload-Felder, fremde Origins, zu große Requests und ungültige Kontaktwege werden abgewiesen.
- Ohne JavaScript bleiben öffentliche Kerninhalte und Bilder sichtbar; Formulare dürfen einen verständlichen Fallback-Telefonweg zeigen.
- Bei einem Rollback müssen App und API gemeinsam zurückgerollt werden. Firestore-Regeln nicht auf öffentliche Browser-Creates zurücksetzen; stattdessen die letzte funktionierende Serverversion wiederherstellen.

## Noch externe Freigaben

- Die Vercel-Domainkonfiguration und ein echter Produktions-Testlead können nicht aus dem Repository heraus bestätigt werden.
- Die Firebase-TTL-Verarbeitung und Firestore-Regeln benötigen Projektzugriff; lokale Emulator-Tests benötigen Java.
- Datenschutztext, WhatsApp-Einwilligung sowie Zertifikats-, Standort-, Kunden- und Arbeitgeberclaims benötigen die jeweils benannte fachliche oder rechtliche Freigabe.
