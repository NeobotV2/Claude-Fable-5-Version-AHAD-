# Veröffentlichungs-Gate für Claims und Ortsdaten

Die Website veröffentlicht überprüfbare Marketing-Tatsachen standardmäßig nicht. Der Code in `src/lib/site.ts` schaltet einen Claim nur frei, wenn alle folgenden Angaben vorliegen:

1. verantwortlicher Owner,
2. mindestens eine HTTPS-Nachweis-URL oder eine interne, revisionssichere Evidence-ID,
3. `verifiedAt` als gültiges ISO-Datum, das nicht in der Zukunft liegt,
4. `expiresAt` als gültiges ISO-Datum in der Zukunft.

Fehlt ein Feld oder ist der Nachweis abgelaufen, liefert `canPublishVerification` immer `false`. Das betrifft insbesondere ISO-Zertifikate, Unternehmensstatistiken, aggregierte Google-Bewertungen, Versicherung/Personal-Claims, SLA-Zahlen, Kundenlogos und die hervorgehobene Kundenstimme.

## Freigabeprozess

- Fach-Owner prüft das Originaldokument oder das exakte öffentliche Profil.
- Marketing/Datenschutz prüft bei Namen, Logos und Testimonials zusätzlich die Nutzungsfreigabe.
- Evidence wird nicht als bloße Suchergebnis-URL akzeptiert. Für Google muss der exakte Unternehmensprofil-Link dokumentiert sein.
- Redaktion überträgt Evidence, Prüf- und Ablaufdatum in das zentrale Code-Register und aktualisiert `docs/content/verification-register.json`.
- Vier-Augen-Prüfung und automatisierte Tests müssen vor Veröffentlichung erfolgreich sein.
- Nach Ablauf wird der Inhalt automatisch fail-closed ausgeblendet, bis eine erneute Prüfung dokumentiert wurde.

## Ortsseiten

Die Adresse in Villingen-Schwenningen darf als rechtliche `Organization`-Adresse erscheinen. Ohne zusätzlichen Nachweis werden jedoch weder `LocalBusiness`, Geo-Koordinaten noch eine Filiale ausgegeben. Stuttgart und Konstanz sind aktuell ausschließlich Einsatzgebietsseiten mit `Service`-Schema und `areaServed`. Eine Umstellung auf Niederlassungs-Markup erfordert einen separaten Standortnachweis und eine bewusste Codeänderung.

## Einzelne Kundenstimmen

Einzelne Stimmen werden nicht zu einem Gesamtwert oder einer Bewertungsanzahl hochgerechnet. Namen und Wortlaut bleiben vollständig gesperrt, bis eine dokumentierte Wiedergabefreigabe vorliegt. Ein Plattform-Quellenlink darf zusätzlich nur mit dem verifizierten exakten Profil veröffentlicht werden.
