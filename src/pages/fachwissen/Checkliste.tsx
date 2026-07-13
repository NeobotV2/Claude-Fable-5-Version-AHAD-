import { Printer, ClipboardCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import PageHero from '@/components/PageHero';
import CTABand from '@/components/CTABand';
import ArticleMeta from '@/components/ArticleMeta';
import { buildArticleSchema, EDITORIAL_ARTICLES } from '@/data/editorial';

/**
 * Druckbare Angebots-Checkliste — Lead-Asset für Objektverantwortliche und
 * Einkäufer. Bewusst als eigenständige, print-optimierte Seite (window.print
 * = "Als PDF speichern"), kein PDF-Generator nötig.
 */
const GRUPPEN = [
  {
    titel: '1. Objektdaten bereitlegen',
    punkte: [
      'Flächen in m² — grob je Nutzungsart (Büro, Sanitär, Verkehrsflächen, Küche, Lager)',
      'Bodenbeläge (Hartboden, Teppich, Naturstein …)',
      'Nutzungszeiten / Schichtbetrieb und gewünschte Reinigungszeiten',
      'Besonderheiten: Zugangsregelung, Alarmanlage, sensible Bereiche',
    ],
  },
  {
    titel: '2. Leistung definieren',
    punkte: [
      'Welche Bereiche sollen wie oft gereinigt werden? (täglich / wöchentlich / nach Bedarf)',
      'Hygienekritische Zonen (Sanitär, Küche) separat festhalten',
      'Zusatzleistungen: Glasreinigung, Grundreinigung, Winterdienst, Verbrauchsmaterial',
      'Gibt es ein bestehendes Leistungsverzeichnis? (An alle Bieter identisch versenden!)',
    ],
  },
  {
    titel: '3. Angebote vergleichbar machen',
    punkte: [
      'Liegt jedem Angebot dasselbe Leistungsverzeichnis zugrunde?',
      'Stundenverrechnungssatz und seine Kostenbestandteile nachvollziehbar ausgewiesen?',
      'Leistungswerte mit Objekt, Tätigkeit, Verfahren und Qualitätsziel begründet?',
      'Festpreis mit definiertem Umfang statt Pauschale ohne Inhalt?',
    ],
  },
  {
    titel: '4. Anbieter prüfen',
    punkte: [
      'Feste Objektleitung mit Name und Erreichbarkeit zugesagt?',
      'Festangestelltes, tarifgebundenes Personal? (Auftraggeberhaftung § 28e SGB IV!)',
      'Versicherungs- und Sozialversicherungsnachweise aktuell und passend zum Auftrag?',
      'Genannte Zertifikate: Aussteller, Laufzeit und Geltungsbereich verifiziert?',
      'Dokumentierte Qualitätskontrollen und definierter Reklamationsweg?',
      'Referenzen aus vergleichbaren Objekten oder Branchen?',
    ],
  },
  {
    titel: '5. Zusammenarbeit regeln',
    punkte: [
      'Reaktionszeit bei Meldungen vertraglich festgehalten?',
      'Faire Vertragslaufzeit und Kündigungsfristen — keine Knebelverträge?',
      'Übergabeprozess vom bisherigen Dienstleister geklärt?',
      'Ansprechpartner und Eskalationsweg auf beiden Seiten benannt?',
    ],
  },
];

export default function FachwissenCheckliste() {
  const schema = buildArticleSchema(EDITORIAL_ARTICLES['checkliste-reinigungsangebot']);

  return (
    <div>
      <SEO
        title="Checkliste: Reinigungsangebot einholen & vergleichen | AHAD"
        description="Kostenlose Checkliste für Objektverantwortliche: Welche Daten Sie bereitlegen, wie Sie Angebote vergleichbar machen und woran Sie seriöse Reinigungsanbieter erkennen — druckbar / als PDF."
        keywords="Checkliste Reinigungsangebot, Gebäudereinigung Angebot einholen, Reinigungsfirma vergleichen, Ausschreibung Reinigung Checkliste, AHAD Cleaning"
        schema={schema}
      />

      <div className="print:hidden">
        <PageHero
          compact
          eyebrow="Fachwissen · Arbeitshilfe"
          title="Die Angebots-Checkliste für Objektverantwortliche"
          lead="In 5 Schritten zum vergleichbaren, belastbaren Reinigungsangebot — bereitlegen, abhaken, ausschreiben. Druckbar oder als PDF speicherbar."
          crumbs={[{ label: 'Fachwissen', href: '/fachwissen' }, { label: 'Angebots-Checkliste' }]}
        />
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
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 bg-navy text-white px-6 py-3 rounded-xl font-bold hover:bg-navy-800 transition-all shadow-soft flex-shrink-0"
            >
              <Printer size={17} />
              Checkliste drucken
            </button>
          </div>

          {/* Print-Kopf (nur im Druck sichtbar) */}
          <div className="hidden print:block mb-8">
            <p className="text-2xl font-black text-navy">AHAD Cleaning · Angebots-Checkliste Gebäudereinigung</p>
            <p className="text-sm text-slate mt-1">ahad-cleaning.de · +49 7721 944 79 15 · info@ahad-cleaning.de</p>
          </div>

          <div className="space-y-8">
            {GRUPPEN.map((g) => (
              <div key={g.titel} className="border border-line rounded-2xl p-6 print:border-gray-300 print:break-inside-avoid">
                <h2 className="font-headline text-lg font-bold text-navy mb-4 flex items-center gap-2.5">
                  <ClipboardCheck size={19} className="text-accent print:hidden" />
                  {g.titel}
                </h2>
                <ul className="space-y-3">
                  {g.punkte.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-[15px] text-slate leading-relaxed">
                      <span aria-hidden="true" className="mt-0.5 w-4.5 h-4.5 rounded border-2 border-navy/30 flex-shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="print:hidden mt-12 bg-navy rounded-3xl p-8 text-white">
            <h2 className="font-headline text-xl font-bold mb-2">Alle Punkte gesammelt?</h2>
            <p className="text-blue-100/90 text-sm leading-relaxed mb-6">
              Dann haben Sie in unserem Anfrage-Assistenten alles strukturiert eingetragen. Wir melden uns zur
              Terminabstimmung für die kostenlose Objektbesichtigung. Wie ein belastbares
              Leistungsverzeichnis entsteht, zeigt unser{' '}
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

      <div className="print:hidden">
        <CTABand
          title="Lieber direkt starten statt Formulare sammeln?"
          lead="Eine Besichtigung ersetzt viel Papier: Wir nehmen Ihr Objekt strukturiert auf und Sie erhalten ein vergleichbares Festpreisangebot."
        />
      </div>
    </div>
  );
}
