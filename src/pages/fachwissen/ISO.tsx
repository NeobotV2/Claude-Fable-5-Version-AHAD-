import { CircleAlert, SearchCheck, ShieldCheck } from 'lucide-react';
import SEO from '@/components/SEO';
import PageHero from '@/components/PageHero';
import Accordion from '@/components/ui/Accordion';
import CTABand from '@/components/CTABand';
import ArticleMeta from '@/components/ArticleMeta';
import ArticleFooter from '@/components/ArticleFooter';
import { buildArticleSchema, EDITORIAL_ARTICLES } from '@/data/editorial';
import { IMG } from '@/lib/images';

const SLUG = 'iso-9001-iso-14001-gebaeudereinigung-unternehmen' as const;

const faqItems = [
  {
    question: 'Was belegt ein ISO-9001-Zertifikat bei einer Reinigungsfirma?',
    answer:
      'Es dokumentiert, dass eine Zertifizierungsstelle das Qualitätsmanagementsystem der genannten Organisation im ausgewiesenen Geltungsbereich gegen die angegebene Normausgabe bewertet hat. Es belegt nicht automatisch die Qualität jeder einzelnen Reinigung oder jedes betreuten Objekts.',
  },
  {
    question: 'Was belegt ein ISO-14001-Zertifikat?',
    answer:
      'Es bezieht sich auf ein Umweltmanagementsystem im ausgewiesenen Geltungsbereich. Daraus folgt nicht automatisch, dass ein bestimmtes Reinigungsmittel eingesetzt, eine konkrete Verbrauchsmenge unterschritten oder eine bestimmte CO₂-Reduktion erreicht wird. Solche Ergebnisse benötigen eigene, objektbezogene Nachweise.',
  },
  {
    question: 'Welche Normausgaben sind aktuell?',
    answer:
      'Zum redaktionellen Prüfstand vom 13. Juli 2026 ist ISO 9001:2015 die veröffentlichte Ausgabe der ISO 9001; ISO 14001:2026 ist die veröffentlichte Ausgabe der ISO 14001. Weicht die Ausgabe auf einem Zertifikat ab, sollten Gültigkeit und mögliche Übergangsregeln direkt mit der Zertifizierungsstelle geprüft werden.',
  },
  {
    question: 'Wie prüft man ein ISO-Zertifikat?',
    answer:
      'Prüfen Sie Organisation und Standorte, Norm und Ausgabe, Zertifikatsnummer, Gültigkeit, Geltungsbereich, Zertifizierungsstelle und deren Akkreditierung. Gleichen Sie anschließend ab, wie das Managementsystem im konkreten Objekt umgesetzt wird, etwa über Leistungsverzeichnis, Kontrollplan, Reklamationsprozess und dokumentierte Korrekturmaßnahmen.',
  },
  {
    question: 'Braucht ein Reinigungsdienstleister ISO 9001 und ISO 14001?',
    answer:
      'Nicht pauschal. Welche Nachweise angemessen sind, hängt von den Qualitäts- und Umweltrisiken des Auftrags sowie von den Vergabe- und Vertragsunterlagen ab. Ein Zertifikat sollte nur verlangt und bewertet werden, wenn sein Geltungsbereich zur ausgeschriebenen Leistung passt.',
  },
  {
    question: 'Führt ein ISO-Zertifikat bei öffentlichen Vergaben automatisch zu einem Vorteil?',
    answer:
      'Nein. Ob und wie Managementsysteme als Nachweis berücksichtigt werden, ergibt sich aus den konkreten Vergabeunterlagen und den anwendbaren Regeln. Ein Zertifikat bewirkt weder automatisch zusätzliche Wertungspunkte noch einen Zuschlag; bei öffentlichen Vergaben können zudem gleichwertige Nachweise zu berücksichtigen sein.',
  },
];

export default function FachwissenISO() {
  const articleSchema = buildArticleSchema(EDITORIAL_ARTICLES[SLUG]);
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };

  return (
    <article>
      <SEO
        title="ISO 9001 & ISO 14001 bei Reinigungsfirmen prüfen | AHAD"
        description="Was ISO-9001- und ISO-14001-Zertifikate belegen, wo ihre Grenzen liegen und wie Einkauf und Facility Management Zertifikat, Scope und Objektnachweise prüfen."
        keywords="ISO 9001 Gebäudereinigung, ISO 14001 Reinigung, Zertifikat prüfen, Qualitätsmanagement Reinigung, Umweltmanagement Gebäudereinigung"
        schema={[articleSchema, faqSchema]}
      />

      <PageHero
        compact
        titleSize="lg"
        eyebrow="Fachwissen · Qualität & Compliance"
        title="ISO 9001 und ISO 14001: Was Zertifikate wirklich belegen"
        lead="Ein Zertifikat bewertet ein Managementsystem im angegebenen Geltungsbereich. Für die Auswahl eines Reinigungsdienstleisters müssen Auftraggeber zusätzlich prüfen, wie die Anforderungen im konkreten Objekt umgesetzt und nachgewiesen werden."
        image={IMG.medizintechnik}
        imageAlt="Dokumentierte Qualitätskontrolle in einem sensiblen Reinigungsbereich"
        crumbs={[{ label: 'Fachwissen', href: '/fachwissen' }, { label: 'ISO-Zertifikate prüfen' }]}
      />

      <ArticleMeta slug={SLUG} />

      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-8">
          <div className="prose prose-lg max-w-none leading-relaxed text-slate">
            <h2 id="iso-9001-einordnen" className="scroll-mt-28 font-headline text-2xl font-bold text-navy sm:text-3xl">
              ISO 9001 richtig einordnen
            </h2>
            <p>
              Die ISO 9001 beschreibt Anforderungen an ein Qualitätsmanagementsystem. Zum redaktionellen Prüfstand
              vom 13. Juli 2026 ist <strong>ISO 9001:2015</strong> die veröffentlichte Ausgabe. Ein Zertifikat
              dokumentiert, welche Organisation, Standorte und Tätigkeiten eine Zertifizierungsstelle innerhalb des
              ausgewiesenen Geltungsbereichs bewertet hat.
            </p>
            <p>
              Das ist für Auftraggeber ein nützlicher Systemnachweis, aber kein Gütesiegel für jedes einzelne
              Reinigungsergebnis. Ob die vereinbarte Leistung in einem konkreten Büro, einer Produktion oder einem
              sensiblen Bereich erreicht wird, zeigen erst objektbezogene Vorgaben und Nachweise: Leistungsverzeichnis,
              Kontrollplan, Prüfergebnisse, Abweichungen und Korrekturmaßnahmen.
            </p>

            <div className="not-prose my-10 rounded-2xl border border-line bg-paper p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <ShieldCheck className="mt-0.5 h-7 w-7 shrink-0 text-brand" aria-hidden="true" />
                <div>
                  <h3 className="font-headline text-xl font-bold text-navy">Die entscheidende Prüffrage</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate sm:text-base">
                    Nicht nur: „Gibt es ein Zertifikat?“, sondern: „Deckt sein Scope unsere Leistung ab – und mit
                    welchen objektbezogenen Kontrollen wird das System in unserem Auftrag wirksam?“
                  </p>
                </div>
              </div>
            </div>

            <h2 id="normen-vergleichen" className="scroll-mt-28 font-headline text-2xl font-bold text-navy sm:text-3xl">
              ISO 9001 und ISO 14001 vergleichen
            </h2>
            <p>
              ISO 9001 und ISO 14001 sind Managementsystemnormen mit unterschiedlichen Schwerpunkten. Die seit April
              2026 veröffentlichte <strong>ISO 14001:2026</strong> betrifft Umweltmanagement. Auch sie schreibt nicht
              automatisch ein bestimmtes Reinigungsmittel, Dosiersystem oder Verbrauchsergebnis vor. Entscheidend sind
              die im System bewerteten Umweltaspekte, Ziele, Maßnahmen und messbaren Ergebnisse.
            </p>

            <div
              className="not-prose my-10 overflow-x-auto rounded-2xl border border-line bg-white shadow-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              role="region"
              aria-label="Vergleich von ISO 9001 und ISO 14001"
              tabIndex={0}
            >
              <table className="w-full min-w-[760px] border-collapse text-left text-sm">
                <caption className="sr-only">
                  Vergleich von ISO 9001 und ISO 14001 aus Sicht eines Auftraggebers
                </caption>
                <thead className="bg-navy text-white">
                  <tr>
                    <th scope="col" className="px-5 py-4 font-bold">Prüfpunkt</th>
                    <th scope="col" className="px-5 py-4 font-bold">ISO 9001:2015</th>
                    <th scope="col" className="px-5 py-4 font-bold">ISO 14001:2026</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line text-slate">
                  <tr>
                    <th scope="row" className="px-5 py-4 font-bold text-navy">Gegenstand</th>
                    <td className="px-5 py-4">Qualitätsmanagementsystem</td>
                    <td className="px-5 py-4">Umweltmanagementsystem</td>
                  </tr>
                  <tr className="bg-paper">
                    <th scope="row" className="px-5 py-4 font-bold text-navy">Zertifikat unterstützt</th>
                    <td className="px-5 py-4">Einordnung definierter Prozesse und Verantwortlichkeiten im Scope</td>
                    <td className="px-5 py-4">Einordnung des systematischen Umgangs mit relevanten Umweltaspekten im Scope</td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-5 py-4 font-bold text-navy">Belegt nicht automatisch</th>
                    <td className="px-5 py-4">Mangelfreie Reinigung, feste Reaktionszeit oder Qualität jedes Objekts</td>
                    <td className="px-5 py-4">Bestimmte Mittel, konkrete Einsparungen, Emissionswerte oder vollständige Rechtskonformität</td>
                  </tr>
                  <tr className="bg-paper">
                    <th scope="row" className="px-5 py-4 font-bold text-navy">Zusätzlich objektbezogen prüfen</th>
                    <td className="px-5 py-4">Qualitätsziel, Prüfmethode, Reklamations- und Korrekturprozess</td>
                    <td className="px-5 py-4">Produkte, Dosierung, Verbräuche, Entsorgung und vereinbarte Umweltkennzahlen</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 id="beschaffung" className="scroll-mt-28 font-headline text-2xl font-bold text-navy sm:text-3xl">
              Zertifikate in der Beschaffung sinnvoll nutzen
            </h2>
            <p>
              Für eine belastbare Anbieterbewertung sollten System- und Objektnachweise getrennt betrachtet werden.
              Erst ihr Zusammenspiel beantwortet, ob der Dienstleister die ausgeschriebene Leistung nachvollziehbar
              steuern und die vereinbarte Qualität im Objekt nachweisen kann.
            </p>

            <div
              className="not-prose my-10 overflow-x-auto rounded-2xl border border-line bg-white shadow-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              role="region"
              aria-label="Aussagekraft verschiedener Nachweise"
              tabIndex={0}
            >
              <table className="w-full min-w-[820px] border-collapse text-left text-sm">
                <caption className="sr-only">
                  Aussagekraft verschiedener Nachweise bei der Auswahl eines Reinigungsdienstleisters
                </caption>
                <thead className="bg-navy text-white">
                  <tr>
                    <th scope="col" className="px-5 py-4 font-bold">Nachweis</th>
                    <th scope="col" className="px-5 py-4 font-bold">Unterstützt die Bewertung von</th>
                    <th scope="col" className="px-5 py-4 font-bold">Belegt nicht</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line text-slate">
                  <tr>
                    <th scope="row" className="px-5 py-4 font-bold text-navy">ISO-9001-Zertifikat</th>
                    <td className="px-5 py-4">Geprüftem Qualitätsmanagementsystem im genannten Scope</td>
                    <td className="px-5 py-4">Qualität jedes einzelnen Reinigungsergebnisses</td>
                  </tr>
                  <tr className="bg-paper">
                    <th scope="row" className="px-5 py-4 font-bold text-navy">ISO-14001-Zertifikat</th>
                    <td className="px-5 py-4">Geprüftem Umweltmanagementsystem im genannten Scope</td>
                    <td className="px-5 py-4">Bestimmtem Produkt oder messbarer Reduktion im Auftrag</td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-5 py-4 font-bold text-navy">LV und Qualitätsvereinbarung</th>
                    <td className="px-5 py-4">Vereinbarten Tätigkeiten, Ergebnissen, Kontrollen und Zuständigkeiten</td>
                    <td className="px-5 py-4">Dass die Vorgaben bereits wirksam ausgeführt werden</td>
                  </tr>
                  <tr className="bg-paper">
                    <th scope="row" className="px-5 py-4 font-bold text-navy">Objekt- und Abweichungsprotokolle</th>
                    <td className="px-5 py-4">Tatsächlichen Kontrollen, Feststellungen und Korrekturen im Objekt</td>
                    <td className="px-5 py-4">Unternehmensweiter Reife des Managementsystems</td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-5 py-4 font-bold text-navy">Verbrauchs- und Umweltdaten</th>
                    <td className="px-5 py-4">Messwerten innerhalb einer klar definierten Systemgrenze</td>
                    <td className="px-5 py-4">Dass eine Veränderung allein durch die Zertifizierung verursacht wurde</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="not-prose my-10 rounded-2xl border border-line bg-paper p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <CircleAlert className="mt-0.5 h-7 w-7 shrink-0 text-brand" aria-hidden="true" />
                <div>
                  <h3 className="font-headline text-xl font-bold text-navy">Hinweis für öffentliche Vergaben</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate sm:text-base">
                    § 49 VgV regelt den Nachweis von Qualitäts- und Umweltmanagementnormen, wenn ein öffentlicher
                    Auftraggeber entsprechende Bescheinigungen verlangt. Dabei können unter den gesetzlichen
                    Voraussetzungen gleichwertige Bescheinigungen oder andere gleichwertige Unterlagen anzuerkennen
                    sein. Ob ein Nachweis Eignung oder Wertung betrifft, bestimmen die Vergabeunterlagen; ein
                    Zertifikat erzeugt keine automatische Zuschlagswirkung. Diese Einordnung ersetzt keine
                    vergaberechtliche Prüfung.{' '}
                    <a
                      href="https://www.gesetze-im-internet.de/vgv_2016/__49.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-brand underline decoration-brand/30 underline-offset-4 hover:decoration-brand"
                    >
                      § 49 VgV öffnen
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <h2 id="zertifikat-pruefen" className="scroll-mt-28 font-headline text-2xl font-bold text-navy sm:text-3xl">
              Zertifikat und Objektumsetzung in sieben Schritten prüfen
            </h2>
            <p>
              Die Prüfung beginnt beim Dokument, endet aber erst bei der Umsetzung im Objekt. Offene Punkte sollten
              nicht durch Vermutungen ersetzt, sondern vor Beauftragung geklärt und vertraglich festgehalten werden.
            </p>

            <ol className="not-prose my-10 grid gap-4 sm:grid-cols-2">
              {[
                ['Organisation abgleichen', 'Firmenname, Rechtsform und die für den Auftrag relevanten Standorte mit dem Angebot vergleichen.'],
                ['Norm und Ausgabe lesen', 'Angegebene Normausgabe prüfen; bei Abweichungen Gültigkeit oder Übergangsregeln direkt klären.'],
                ['Gültigkeit prüfen', 'Zertifikatsnummer, Ausstellungs- und Ablaufdatum sowie aktuellen Zertifikatsstatus kontrollieren.'],
                ['Geltungsbereich lesen', 'Prüfen, ob der Scope die relevante Reinigungsleistung und Organisationseinheit tatsächlich umfasst.'],
                ['Stelle und Akkreditierung prüfen', 'Zertifizierungsstelle und deren Akkreditierung nachvollziehen, statt nur ein Logo zu bewerten.'],
                ['Objektumsetzung belegen', 'LV, Kontrollplan, Zuständigkeiten, Abweichungs- und Korrekturprozess für das konkrete Objekt anfordern.'],
                ['Lücken vertraglich schließen', 'Fehlende Nachweise, Berichte, Kennzahlen und Prüftermine eindeutig vereinbaren.'],
              ].map(([title, text], index) => (
                <li key={title} className="rounded-2xl border border-line bg-paper p-5">
                  <div className="flex items-start gap-3">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand text-sm font-black text-white">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="font-headline font-bold text-navy">{title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-slate">{text}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>

            <div className="not-prose rounded-2xl bg-navy p-6 text-white sm:p-8">
              <div className="flex items-start gap-4">
                <SearchCheck className="mt-0.5 h-8 w-8 shrink-0 text-mint" aria-hidden="true" />
                <div>
                  <h3 className="font-headline text-xl font-bold">Fazit für die Auswahl</h3>
                  <p className="mt-2 text-sm leading-relaxed text-blue-100 sm:text-base">
                    Ein passender, gültiger Scope ist ein sinnvoller Systemnachweis. Die Vergabeentscheidung sollte
                    zusätzlich auf der konkreten Leistungsbeschreibung, dem Kontrollkonzept und belastbaren
                    Objektnachweisen beruhen.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="iso-faq-heading" className="bg-paper py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-8">
          <div className="mb-10 text-center">
            <span className="eyebrow justify-center text-brand">Häufige Fragen</span>
            <h2 id="iso-faq-heading" className="mt-4 font-headline text-2xl font-bold text-navy sm:text-3xl lg:text-4xl">
              ISO-Zertifikate in der Gebäudereinigung
            </h2>
          </div>
          <Accordion items={faqItems} />
        </div>
      </section>

      <ArticleFooter slug={SLUG} />

      <CTABand
        title="Zertifikate und Objektnachweise sauber abgleichen"
        lead="Wir klären mit Ihnen, welche Qualitäts- und Umweltnachweise für Ihr Objekt relevant sind und wie sie in Leistungsverzeichnis, Kontrolle und Dokumentation übersetzt werden."
      />
    </article>
  );
}
