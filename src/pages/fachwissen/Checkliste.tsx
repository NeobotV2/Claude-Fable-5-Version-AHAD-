import { Printer, ClipboardCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import PageHero from '@/components/PageHero';
import CTABand from '@/components/CTABand';
import ArticleMeta from '@/components/ArticleMeta';
import ArticleFooter from '@/components/ArticleFooter';
import { buildArticleSchema, EDITORIAL_ARTICLES } from '@/data/editorial';

/**
 * Druckbare Angebots-Checkliste — Lead-Asset für Objektverantwortliche und
 * Einkäufer. Bewusst als eigenständige, print-optimierte Seite (window.print
 * = "Als PDF speichern"), kein PDF-Generator nötig.
 */
const GRUPPEN = [
  {
    id: 'objektdaten',
    titel: '1. Objektdaten bereitlegen',
    punkte: [
      'Flächen in m² — grob je Nutzungsart (Büro, Sanitär, Verkehrsflächen, Küche, Lager)',
      'Bodenbeläge (Hartboden, Teppich, Naturstein …)',
      'Nutzungszeiten / Schichtbetrieb und gewünschte Reinigungszeiten',
      'Besonderheiten: Zugangsregelung, Alarmanlage, sensible Bereiche',
    ],
  },
  {
    id: 'leistung-definieren',
    titel: '2. Leistung definieren',
    punkte: [
      'Welche Bereiche sollen wie oft gereinigt werden? (täglich / wöchentlich / nach Bedarf)',
      'Hygienekritische Zonen (Sanitär, Küche) separat festhalten',
      'Zusatzleistungen: Glasreinigung, Grundreinigung, Winterdienst, Verbrauchsmaterial',
      'Gibt es ein bestehendes Leistungsverzeichnis? (An alle Bieter identisch versenden!)',
    ],
  },
  {
    id: 'angebote-vergleichen',
    titel: '3. Angebote vergleichbar machen',
    punkte: [
      'Liegt jedem Angebot dasselbe Leistungsverzeichnis zugrunde?',
      'Stundenverrechnungssatz und seine Kostenbestandteile nachvollziehbar ausgewiesen?',
      'Leistungswerte mit Objekt, Tätigkeit, Verfahren und Qualitätsziel begründet?',
      'Festpreis mit definiertem Umfang statt Pauschale ohne Inhalt?',
    ],
  },
  {
    id: 'anbieter-pruefen',
    titel: '4. Anbieter prüfen',
    punkte: [
      'Feste Objektleitung mit Name und Erreichbarkeit zugesagt?',
      'Personaleinsatz, Einarbeitung und Vertretungsregelung nachvollziehbar beschrieben?',
      'Geforderte Eignungs- und Versicherungsnachweise aktuell und für den Auftrag einschlägig?',
      'Genannte Zertifikate: Aussteller, Laufzeit und Geltungsbereich verifiziert?',
      'Dokumentierte Qualitätskontrollen und definierter Reklamationsweg?',
      'Referenzen aus vergleichbaren Objekten oder Branchen?',
    ],
  },
  {
    id: 'zusammenarbeit-regeln',
    titel: '5. Zusammenarbeit regeln',
    punkte: [
      'Reaktionszeit bei Meldungen vertraglich festgehalten?',
      'Vertragslaufzeit, Verlängerung, Kündigungsfrist und vereinbarte Form eindeutig geregelt?',
      'Übergabeprozess vom bisherigen Dienstleister geklärt?',
      'Ansprechpartner und Eskalationsweg auf beiden Seiten benannt?',
    ],
  },
];

export default function FachwissenCheckliste() {
  const schema = buildArticleSchema(EDITORIAL_ARTICLES['checkliste-reinigungsangebot']);

  return (
    <article>
      <SEO
        title="Checkliste: Reinigungsangebot einholen & vergleichen | AHAD"
        description="Kostenlose Checkliste für Objektverantwortliche: Welche Daten Sie bereitlegen, wie Sie Angebote vergleichbar machen und woran Sie seriöse Reinigungsanbieter erkennen — druckbar / als PDF."
        keywords="Checkliste Reinigungsangebot, Gebäudereinigung Angebot einholen, Reinigungsfirma vergleichen, Ausschreibung Reinigung Checkliste, AHAD Cleaning"
        schema={schema}
      />

      <div className="print:hidden">
        <PageHero
          compact
          titleSize="lg"
          eyebrow="Fachwissen · Arbeitshilfe"
          title="Die Angebots-Checkliste für Objektverantwortliche"
          lead="In 5 Schritten zum vergleichbaren, belastbaren Reinigungsangebot — bereitlegen, abhaken, ausschreiben. Druckbar oder als PDF speicherbar."
          crumbs={[{ label: 'Fachwissen', href: '/fachwissen' }, { label: 'Angebots-Checkliste' }]}
        />
      </div>

      <div className="mx-auto hidden max-w-3xl px-4 pt-4 print:block print:px-0">
        <p className="text-2xl font-black text-navy">AHAD Cleaning · Angebots-Checkliste Gebäudereinigung</p>
        <p className="mt-1 text-sm text-slate">ahad-cleaning.de · +49 7721 944 79 15 · info@ahad-cleaning.de</p>
      </div>

      <ArticleMeta slug="checkliste-reinigungsangebot" className="print:mt-8" />

      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          {/* Druck-Aktion */}
          <div className="print:hidden flex flex-col sm:flex-row items-center justify-between gap-4 bg-paper border border-line rounded-2xl p-5 mb-10">
            <p className="text-sm text-slate font-medium">
              <strong className="text-navy">Tipp:</strong> Über „Drucken" können Sie die Checkliste auch direkt{' '}
              <strong className="text-navy">als PDF speichern</strong>.
            </p>
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 bg-navy text-white px-6 py-3 rounded-xl font-bold hover:bg-navy-800 transition-all shadow-soft flex-shrink-0"
            >
              <Printer size={17} />
              Checkliste drucken
            </button>
          </div>

          <section aria-labelledby="checkliste-kopfdaten" className="mb-10 rounded-2xl border border-line bg-paper p-6 print:break-inside-avoid">
            <h2 id="checkliste-kopfdaten" className="mb-5 font-headline text-xl font-bold text-navy">
              Kopfdaten für die Anfrage
            </h2>
            <div className="grid gap-5 sm:grid-cols-2">
              {[
                { id: 'objekt', label: 'Objekt / Standort', type: 'text' },
                { id: 'ansprechperson', label: 'Ansprechperson', type: 'text' },
                { id: 'angebotsfrist', label: 'Angebotsfrist', type: 'date' },
                { id: 'leistungsstart', label: 'Geplanter Leistungsstart', type: 'date' },
              ].map((field) => (
                <label key={field.id} htmlFor={`checkliste-${field.id}`} className="block text-sm font-bold text-navy">
                  {field.label}
                  <input
                    id={`checkliste-${field.id}`}
                    name={field.id}
                    type={field.type}
                    className="mt-2 min-h-11 w-full rounded-lg border border-line bg-white px-3 py-2 font-normal text-ink outline-none transition-colors focus:border-brand print:min-h-8 print:rounded-none print:border-0 print:border-b print:border-slate/50 print:bg-transparent print:px-0"
                  />
                </label>
              ))}
            </div>
            <label htmlFor="checkliste-notizen" className="mt-5 block text-sm font-bold text-navy">
              Besondere Rahmenbedingungen / offene Fragen
              <textarea
                id="checkliste-notizen"
                name="notizen"
                rows={3}
                className="mt-2 w-full resize-y rounded-lg border border-line bg-white px-3 py-2 font-normal text-ink outline-none transition-colors focus:border-brand print:resize-none print:rounded-none print:border-0 print:border-b print:border-slate/50 print:bg-transparent print:px-0"
              />
            </label>
          </section>

          <div className="space-y-8">
            {GRUPPEN.map((g) => (
              <div key={g.titel} className="border border-line rounded-2xl p-6 print:border-gray-300 print:break-inside-avoid">
                <h2 id={g.id} className="scroll-mt-28 font-headline text-lg font-bold text-navy mb-4 flex items-center gap-2.5">
                  <ClipboardCheck size={19} className="text-accent print:hidden" aria-hidden="true" />
                  {g.titel}
                </h2>
                <ul className="space-y-3">
                  {g.punkte.map((p, index) => {
                    const inputId = `check-${g.id}-${index}`;
                    return (
                      <li key={p} className="text-[15px] leading-relaxed text-slate">
                        <label htmlFor={inputId} className="flex cursor-pointer items-start gap-3 print:cursor-default">
                          <input
                            id={inputId}
                            name={inputId}
                            type="checkbox"
                            className="mt-0.5 h-[1.125rem] w-[1.125rem] flex-shrink-0 cursor-pointer rounded border-2 border-navy/30 accent-accent print:cursor-default"
                          />
                          <span>{p}</span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          <section aria-labelledby="bietermatrix-titel" className="mt-12 print:break-inside-avoid">
            <h2 id="bietermatrix-titel" className="mb-3 font-headline text-xl font-bold text-navy">
              Kompakte Bietermatrix
            </h2>
            <p className="mb-5 text-sm leading-relaxed text-slate">
              Tragen Sie nur Angebote ein, die auf demselben Stand des Leistungsverzeichnisses beruhen. Abweichungen,
              Optionen und Ausschlüsse gehören in die Spalte „Offene Punkte“.
            </p>
            <div
              className="overflow-x-auto rounded-2xl border border-line shadow-soft print:overflow-visible print:shadow-none"
              role="region"
              aria-label="Bietermatrix zum Angebotsvergleich"
              tabIndex={0}
            >
              <table className="min-w-[58rem] w-full border-collapse bg-white text-left text-sm print:min-w-0 print:text-[10px]">
                <caption className="sr-only">Vergleichsmatrix für bis zu drei Reinigungsangebote</caption>
                <thead>
                  <tr className="bg-navy text-white print:bg-white print:text-navy">
                    <th scope="col" className="px-3 py-3 font-bold">Bieter</th>
                    <th scope="col" className="px-3 py-3 font-bold">Preis / Abrechnung</th>
                    <th scope="col" className="px-3 py-3 font-bold">Prüfstatus</th>
                    <th scope="col" className="px-3 py-3 font-bold">Objektleitung / Service-Level</th>
                    <th scope="col" className="px-3 py-3 font-bold">Offene Punkte</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {['A', 'B', 'C'].map((bidder) => (
                    <tr key={bidder}>
                      <th scope="row" className="min-w-44 px-3 py-3 align-top font-semibold text-navy print:min-w-0">
                        <label htmlFor={`bieter-${bidder}`} className="flex items-center gap-2">
                          <span>{bidder}</span>
                          <input
                            id={`bieter-${bidder}`}
                            name={`bieter-${bidder}`}
                            type="text"
                            aria-label={`Name von Bieter ${bidder}`}
                            className="min-h-9 w-full rounded-md border border-line px-2 py-1 font-normal text-ink outline-none focus:border-brand print:min-h-6 print:rounded-none print:border-0 print:border-b print:border-slate/50 print:px-0"
                          />
                        </label>
                      </th>
                      <td className="min-w-44 px-3 py-3 align-top print:min-w-0">
                        <input
                          name={`preis-${bidder}`}
                          type="text"
                          aria-label={`Preis und Abrechnungsmodell von Bieter ${bidder}`}
                          className="min-h-9 w-full rounded-md border border-line px-2 py-1 text-ink outline-none focus:border-brand print:min-h-6 print:rounded-none print:border-0 print:border-b print:border-slate/50 print:px-0"
                        />
                      </td>
                      <td className="min-w-32 px-3 py-3 align-top print:min-w-0">
                        <label className="flex items-center gap-2">
                          <input name={`umfang-${bidder}`} type="checkbox" className="h-4 w-4 accent-accent" /> Umfang
                        </label>
                        <label className="mt-2 flex items-center gap-2">
                          <input name={`nachweise-${bidder}`} type="checkbox" className="h-4 w-4 accent-accent" /> Nachweise
                        </label>
                      </td>
                      <td className="min-w-48 px-3 py-3 align-top print:min-w-0">
                        <textarea
                          name={`service-${bidder}`}
                          rows={2}
                          aria-label={`Objektleitung und Service-Level von Bieter ${bidder}`}
                          className="w-full resize-y rounded-md border border-line px-2 py-1 text-ink outline-none focus:border-brand print:resize-none print:rounded-none print:border-0 print:border-b print:border-slate/50 print:px-0"
                        />
                      </td>
                      <td className="min-w-48 px-3 py-3 align-top print:min-w-0">
                        <textarea
                          name={`offen-${bidder}`}
                          rows={2}
                          aria-label={`Offene Punkte bei Bieter ${bidder}`}
                          className="w-full resize-y rounded-md border border-line px-2 py-1 text-ink outline-none focus:border-brand print:resize-none print:rounded-none print:border-0 print:border-b print:border-slate/50 print:px-0"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <div className="print:hidden mt-12 bg-navy rounded-3xl p-8 text-white">
            <h2 className="font-headline text-xl font-bold mb-2">Anforderungen vollständig geprüft?</h2>
            <p className="text-blue-100/90 text-sm leading-relaxed mb-6">
              Übertragen Sie die geprüften Objektdaten und Leistungsanforderungen in die Anfrage. Wie ein belastbares
              Leistungsverzeichnis aufgebaut wird, zeigt unser{' '}
              <Link to="/fachwissen/leistungsverzeichnis-gebaeudereinigung-erstellen" className="underline font-semibold hover:text-mint">
                LV-Leitfaden
              </Link>
              ; Richtwerte zu Preisen finden Sie im{' '}
              <Link to="/fachwissen/was-kostet-gebaeudereinigung-stundensatz-preise" className="underline font-semibold hover:text-mint">
                Kosten-Artikel
              </Link>
              .
            </p>
            <Link
              to="/angebot"
              className="inline-flex items-center gap-2 bg-accent text-white px-6 py-3.5 rounded-xl font-bold hover:bg-accent-dark transition-all shadow-glow"
            >
              Kostenlose Besichtigung anfragen
              <ArrowRight size={17} />
            </Link>
          </div>

          {/* Print-Fuß */}
          <p className="hidden print:block mt-8 text-xs text-slate">
            Kostenlose Objektbesichtigung: ahad-cleaning.de/angebot · AHAD Cleaning Company GmbH, Max-Planck-Straße 11,
            78052 Villingen-Schwenningen
          </p>
        </div>
      </section>

      <ArticleFooter slug="checkliste-reinigungsangebot" />

      <div className="print:hidden">
        <CTABand
          title="Nächster Schritt: Anforderungen objektbezogen prüfen"
          lead="Auf Basis Ihrer Angaben klären wir offene Punkte bei der Besichtigung und grenzen den angebotenen Leistungsumfang nachvollziehbar ab."
        />
      </div>
    </article>
  );
}
