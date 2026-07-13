import { BookOpen, Clock, Calendar, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import Accordion from '@/components/ui/Accordion';
import CTABand from '@/components/CTABand';
import ArticleMeta from '@/components/ArticleMeta';
import ArticleFooter from '@/components/ArticleFooter';
import PageHero from '@/components/PageHero';
import { IMG } from '@/lib/images';
import { buildArticleSchema, EDITORIAL_ARTICLES } from '@/data/editorial';

export default function FachwissenIntervalle() {
  const articleSchema = buildArticleSchema(
    EDITORIAL_ARTICLES['unterhaltsreinigung-unternehmen-reinigungsintervalle'],
  );

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Wie oft sollte ein Büro gereinigt werden?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Eine allgemeingültige Häufigkeit gibt es nicht. Der Plan sollte Nutzung, Verschmutzung, Bodenbelag, betriebliche Hygienevorgaben und das vereinbarte Qualitätsziel je Raumgruppe berücksichtigen. Feste Aufgaben können mit dokumentierten Bedarfsprüfungen für geeignete, weniger sensible Flächen kombiniert werden."
        }
      },
      {
        "@type": "Question",
        "name": "Was bedeutet bedarfsorientierte Reinigung?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Bedarfsorientierte Reinigung ergänzt einen definierten Basisplan. Geeignete Leistungen werden anhand vereinbarter Kriterien wie Belegung, Sichtkontrolle oder dokumentierter Verschmutzung ausgelöst. Hygiene- oder vertraglich festgelegte Aufgaben bleiben davon unberührt; Abweichungen sollten nachvollziehbar dokumentiert werden."
        }
      },
      {
        "@type": "Question",
        "name": "Welche Faktoren beeinflussen das Reinigungsintervall?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Wichtige Faktoren sind die Anzahl der Mitarbeiter, die Besucherfrequenz, die Art der Bodenbeläge (Teppich vs. Hartboden), die Jahreszeit (im Winter wird mehr Schmutz hereingetragen) und der Repräsentationsanspruch des Unternehmens."
        }
      },
      {
        "@type": "Question",
        "name": "Wie oft sollten Sanitäranlagen im Unternehmen gereinigt werden?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Für Sanitäranlagen sollte der Betreiber ein objektbezogenes Reinigungs- und Kontrollintervall aus Nutzung, Öffnungs- oder Schichtzeiten, Verschmutzung und betrieblichen Hygienevorgaben ableiten. Zwischenreinigungen können bei hoher Nutzung sinnvoll sein. Eine routinemäßige Desinfektion ist nicht automatisch erforderlich, sondern richtet sich nach Hygieneplan, Gefährdung und konkretem Anlass."
        }
      },
      {
        "@type": "Question",
        "name": "Wie wirkt sich der Tariflohn auf die Reinigungskosten aus?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Der jeweils geltende Branchenmindestlohn ist ein wichtiger Kalkulationsbestandteil, aber nicht der einzige. Zum Angebot gehören unter anderem Lohnneben- und Ausfallkosten, Objektleitung, Material, Maschinen, Anfahrt und Wagnis. Veränderte Intervalle wirken zunächst auf die geplanten Arbeitsstunden; ihre Wirkung auf den Gesamtpreis muss für den konkreten Leistungsumfang berechnet werden."
        }
      },
      {
        "@type": "Question",
        "name": "Was ist der Unterschied zwischen starrer und dynamischer (bedarfsorientierter) Reinigung?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Bei einer festen Logik werden Tätigkeit und Turnus vorab vereinbart. Eine adaptive Logik löst geeignete Leistungen anhand definierter Bedarfskriterien aus. Welche Raumgruppen fest oder adaptiv gesteuert werden können, ergibt sich aus Nutzung, Hygieneplan, Qualitätsziel und Vertrag. Ein belastbares Konzept benennt außerdem Kontrolle, Dokumentation und Eskalation bei Abweichungen."
        }
      }
    ]
  };

  return (
    <article>
      <SEO 
        title="Reinigungsintervalle im Büro: Wie oft putzen? | AHAD" 
        description="Wie oft sollte ein Büro gereinigt werden? Unser Leitfaden zu Reinigungsintervallen hilft Ihnen, die optimale Taktung für Ihr Unternehmen zu finden."
        keywords="Reinigungsintervalle, Unterhaltsreinigung Intervalle, Büroreinigung Taktung, wie oft Büro reinigen, Reinigungsplan Büro, AHAD Cleaning"
        schema={[articleSchema, faqSchema]}
      />
      
      <PageHero
        compact
        titleSize="lg"
        eyebrow="Fachwissen · Unterhaltsreinigung"
        title="Reinigungsintervalle in Unternehmen: Ein Leitfaden"
        lead="Wie feste Basisleistungen, objektbezogene Bedarfskriterien und dokumentierte Kontrollen zu einem belastbaren Reinigungsplan werden."
        image={IMG.unterhaltDetail}
        imageAlt=""
        crumbs={[
          { label: 'Fachwissen', href: '/fachwissen' },
          { label: 'Reinigungsintervalle' },
        ]}
      />

      <section className="border-b border-line bg-white py-12 lg:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <h2 className="mb-8 text-center text-2xl font-black text-navy">Intervallplanung auf einen Blick</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-line bg-paper p-6">
              <Clock className="mb-4 h-8 w-8 text-brand" aria-hidden="true" />
              <h3 className="mb-2 text-lg font-bold text-navy">Fixe Basis</h3>
              <p className="text-sm text-slate">
                Tätigkeiten mit festem Turnus dort definieren, wo Hygieneplan, Nutzung, Vertrag oder Qualitätsziel
                eine verlässliche Ausführung verlangen.
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-paper p-6">
              <Calendar className="mb-4 h-8 w-8 text-accent" aria-hidden="true" />
              <h3 className="mb-2 text-lg font-bold text-navy">Adaptive Ergänzung</h3>
              <p className="text-sm text-slate">
                Geeignete Leistungen anhand vereinbarter Kriterien wie Belegung, Sichtkontrolle oder saisonalem
                Schmutzeintrag auslösen.
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-paper p-6">
              <BookOpen className="mb-4 h-8 w-8 text-brand" aria-hidden="true" />
              <h3 className="mb-2 text-lg font-bold text-navy">Kontrolle &amp; Anpassung</h3>
              <p className="text-sm text-slate">
                Ergebnis, Auslösung und Abweichungen dokumentieren und den Plan bei veränderter Nutzung oder Qualität
                nachvollziehbar anpassen.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ArticleMeta slug="unterhaltsreinigung-unternehmen-reinigungsintervalle" />

      {/* Content Section */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-8">
          <div className="prose prose-lg max-w-none leading-relaxed text-slate">
            <h2 id="intervalllogik" className="scroll-mt-28 text-2xl font-black text-navy sm:text-3xl">Fixe und adaptive Leistungen sachlich kombinieren</h2>
            <p className="mb-8">
              In der <Link to="/leistungen/unterhaltsreinigung" className="font-bold text-brand hover:underline">Unterhaltsreinigung</Link>{' '}
              verbindet ein belastbarer Plan definierte Basisleistungen mit objektbezogenen Bedarfskriterien. Feste
              Turnusse schaffen Verlässlichkeit; adaptive Leistungen können für geeignete Flächen auf tatsächliche
              Nutzung oder Verschmutzung reagieren. Welche Logik passt, muss je Raumgruppe und Tätigkeit festgelegt
              werden — einschließlich Kontrolle und Vorgehen bei Abweichungen.
            </p>

            <div className="mb-12 rounded-3xl border border-line bg-paper p-6 shadow-soft sm:p-8">
              <h3 className="mb-6 flex items-center gap-3 text-2xl font-bold text-navy">
                <Calendar className="h-8 w-8 text-brand" aria-hidden="true" />
                Vier Entscheidungen pro Raumgruppe
              </h3>
              <ul className="space-y-4 list-none pl-0">
                <li className="flex flex-col gap-2 border-b border-line pb-4 sm:flex-row sm:gap-4">
                  <span className="min-w-[140px] font-bold text-navy">Leistungsziel:</span>
                  <span>Welcher Zustand beziehungsweise welche konkrete Tätigkeit ist vereinbart?</span>
                </li>
                <li className="flex flex-col gap-2 border-b border-line pb-4 sm:flex-row sm:gap-4">
                  <span className="min-w-[140px] font-bold text-navy">Auslöser:</span>
                  <span>Gilt ein fester Turnus oder ein dokumentiertes Bedarfskriterium?</span>
                </li>
                <li className="flex flex-col gap-2 border-b border-line pb-4 sm:flex-row sm:gap-4">
                  <span className="min-w-[140px] font-bold text-navy">Kontrolle:</span>
                  <span>Wer prüft Bedarf und Ergebnis, in welchem Rhythmus und mit welchem Nachweis?</span>
                </li>
                <li className="flex flex-col gap-2 sm:flex-row sm:gap-4">
                  <span className="min-w-[140px] font-bold text-navy">Eskalation:</span>
                  <span>Wann wird zusätzlich gereinigt oder der Grundturnus angepasst?</span>
                </li>
              </ul>
            </div>

            <h2 id="orientierungswerte" className="scroll-mt-28 text-2xl font-black text-navy sm:text-3xl">Planungsansätze nach Bereich</h2>
            <p className="mb-6">
              Die Tabelle nennt keine allgemeingültigen Kalenderfristen. Sie zeigt, welche Fragen bei typischen
              Raumgruppen zu klären sind und wo eine feste beziehungsweise adaptive Steuerung grundsätzlich geprüft
              werden kann. Maßgeblich bleiben Objekt, Hygieneplan, Nutzung und vereinbartes Qualitätsziel.
            </p>
            <div
              className="mb-12 overflow-x-auto rounded-2xl border border-line shadow-soft"
              role="region"
              aria-label="Planungsansätze für Reinigungsintervalle nach Bereich"
              tabIndex={0}
            >
              <table className="min-w-[48rem] w-full border-collapse bg-white text-left text-sm">
                <caption className="sr-only">Objektbezogene Planungsansätze für verschiedene Raumgruppen</caption>
                <thead>
                  <tr className="bg-navy text-white">
                    <th scope="col" className="px-4 py-3 font-bold">Bereich</th>
                    <th scope="col" className="px-4 py-3 font-bold">Mögliche Planungslogik</th>
                    <th scope="col" className="px-4 py-3 font-bold">Objektbezogen zu prüfen</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  <tr>
                    <th scope="row" className="px-4 py-3 font-semibold text-navy align-top">Sanitäranlagen</th>
                    <td className="px-4 py-3 align-top">Definierter Grundturnus plus Kontroll- oder Zwischenreinigung nach Bedarf</td>
                    <td className="px-4 py-3 align-top">Nutzung, Öffnungs-/Schichtzeiten, Hygieneplan und Ausstattung; Desinfektion nur bei entsprechender Vorgabe oder Anlass</td>
                  </tr>
                  <tr className="bg-paper">
                    <th scope="row" className="px-4 py-3 font-semibold text-navy align-top">Büro &amp; Arbeitsplätze</th>
                    <td className="px-4 py-3 align-top">Fester Basisplan oder adaptive Auslösung für eindeutig definierte Tätigkeiten</td>
                    <td className="px-4 py-3 align-top">Belegung, Desk-Sharing, Bodenbelag, Papierkörbe, freie beziehungsweise belegte Oberflächen</td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-4 py-3 font-semibold text-navy align-top">Verkehrsflächen &amp; Eingänge</th>
                    <td className="px-4 py-3 align-top">Basisplan mit saisonalen oder ereignisbezogenen Zusatzleistungen</td>
                    <td className="px-4 py-3 align-top">Laufverkehr, Wetter, Sauberlaufzone, Sicherheitsrisiken durch Nässe und repräsentative Anforderungen</td>
                  </tr>
                  <tr className="bg-paper">
                    <th scope="row" className="px-4 py-3 font-semibold text-navy align-top">Küche / Teeküche</th>
                    <td className="px-4 py-3 align-top">Definierte Basisleistungen; Zusatzreinigung nach Nutzung oder Ereignis</td>
                    <td className="px-4 py-3 align-top">Nutzungsart, Lebensmittelkontakt, Müllkonzept, Betreiberpflichten und Zuständigkeitsgrenzen</td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-4 py-3 font-semibold text-navy align-top">Glasflächen innen</th>
                    <td className="px-4 py-3 align-top">Grundturnus plus bedarfsabhängige Griffspurenentfernung</td>
                    <td className="px-4 py-3 align-top">Kontaktintensität, Sichtbarkeit, Repräsentationsziel und Zugänglichkeit</td>
                  </tr>
                  <tr className="bg-paper">
                    <th scope="row" className="px-4 py-3 font-semibold text-navy align-top">Grund- und Intensivreinigung</th>
                    <td className="px-4 py-3 align-top">Separater, zustands- oder kalenderbezogener Leistungsbaustein</td>
                    <td className="px-4 py-3 align-top">Belag, Herstellerangaben, Zustand, Nutzung und vereinbartes Pflegeziel</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mb-12 text-sm text-slate">
              Verbindlich ist das objektbezogene{' '}
              <Link to="/fachwissen/leistungsverzeichnis-gebaeudereinigung-erstellen" className="font-bold text-brand hover:underline">
                Leistungsverzeichnis
              </Link>{' '}
              mit klarer Leistungs-, Kontroll- und Anpassungslogik.
            </p>

            <h2 className="text-2xl font-black text-navy sm:text-3xl">Welche Faktoren beeinflussen die Intervallplanung?</h2>
            <p className="mb-6">
              Ein Plan sollte nicht aus einer unveränderten Standardvorlage übernommen werden. Für die{' '}
              <Link to="/branchen/buero-verwaltung" className="font-bold text-brand hover:underline">Büroreinigung</Link>{' '}
              sind unter anderem folgende Faktoren relevant:
            </p>
            <ul className="space-y-4 mb-12 list-none pl-0">
              {[
                'Besucherfrequenz & Mitarbeiteranzahl (Wie viele Menschen nutzen die Fläche?)',
                'Bodenbelagsart (Teppichboden benötigt andere Intervalle als Hartboden)',
                'Nutzungsart der Räume (Ein Konferenzraum verschmutzt anders als ein Einzelbüro)',
                'Jahreszeitliche Einflüsse (Im Winter wird mehr Schmutz und Nässe hereingetragen)',
                'Repräsentationsanspruch des Unternehmens (Kundenbereiche erfordern höhere Taktung)'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-6 w-6 flex-shrink-0 text-accent" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <h2 id="kostenwirkung" className="scroll-mt-28 text-2xl font-black text-navy sm:text-3xl">Wie Turnusse den Stundenbedarf verändern</h2>
            <p className="mb-6">
              Der Turnus beeinflusst unmittelbar die geplanten Ausführungsstunden einer Tätigkeit. Daraus folgt jedoch
              kein pauschaler Prozentsatz für den Gesamtpreis: feste Basisleistungen, Lohnneben- und Ausfallkosten,
              Objektleitung, Material, Maschinen und weitere Auftragsbedingungen bleiben separat zu kalkulieren. Das
              folgende Beispiel zeigt deshalb nur die Stundenlogik einer abgegrenzten Büroflächenleistung.
            </p>
            <div className="mb-12 rounded-3xl border border-line bg-paper p-6 shadow-soft sm:p-8">
              <h3 className="mb-4 text-xl font-bold text-navy">Hypothetisches Beispiel: klar abgegrenzte Büroflächenleistung</h3>
              <p className="mb-4 text-sm">
                Angenommen, eine definierte Tätigkeit benötigt pro Auslösung 1,5 Stunden. Wird sie fünfmal pro Woche
                fest ausgelöst, ergeben sich 7,5 Stunden. Bei einer zulässigen adaptiven Steuerung mit drei
                dokumentierten Auslösungen wären es 4,5 Stunden. Ob drei Auslösungen fachlich und vertraglich genügen,
                ist vorab festzulegen und anschließend zu kontrollieren.
              </p>
              <ul className="space-y-2 text-sm list-none pl-0">
                <li className="flex flex-col justify-between gap-1 border-b border-line pb-2 sm:flex-row">
                  <span><strong>Fünf Auslösungen</strong>: 5 × 1,5 Std.</span>
                  <span className="font-bold text-navy">7,5 Std./Woche</span>
                </li>
                <li className="flex flex-col justify-between gap-1 border-b border-line pb-2 sm:flex-row">
                  <span><strong>Drei dokumentierte Auslösungen</strong>: 3 × 1,5 Std.</span>
                  <span className="font-bold text-navy">4,5 Std./Woche</span>
                </li>
                <li className="flex flex-col justify-between gap-1 pt-1 sm:flex-row">
                  <span><strong>Differenz nur für diese Tätigkeit</strong></span>
                  <span className="font-bold text-accent">3,0 Std./Woche</span>
                </li>
              </ul>
              <p className="mt-4 text-xs text-slate">
                Das Beispiel enthält weder einen Stundenpreis noch eine Aussage zur prozentualen Veränderung des
                Gesamtangebots. Andere Raumgruppen und fest vereinbarte Leistungen bleiben unberührt.
              </p>
            </div>

            <h2 id="reinigungsplan" className="scroll-mt-28 text-2xl font-black text-navy sm:text-3xl">Checkliste: Reinigungsplan und Leistungsverzeichnis erstellen</h2>
            <p className="mb-6">
              Ein belastbares Leistungsverzeichnis (LV) ist die Grundlage für vergleichbare Angebote und eine nachvollziehbare Qualitätskontrolle. Die folgende Checkliste hilft Ihnen, alle relevanten Punkte zu erfassen, bevor Sie ein Reinigungskonzept ausschreiben oder beauftragen:
            </p>
            <ul className="space-y-4 mb-12 list-none pl-0">
              {[
                'Flächenaufmaß erstellen: Quadratmeter je Raum-/Nutzungsart (Büro, Sanitär, Verkehrsfläche, Küche) dokumentieren.',
                'Bodenbeläge erfassen: Hartboden, Teppich, Elastikbelag, Naturstein, Glas - je Belag eigene Pflegeintervalle.',
                'Nutzungsprofil festlegen: Mitarbeiterzahl, Besucherfrequenz, Öffnungs-/Schichtzeiten, Homeoffice-Quote.',
                'Intervall je Bereich definieren: Was wird täglich, wöchentlich, monatlich oder quartalsweise gereinigt?',
                'Hygiene- und Nutzungsanforderungen festlegen: Grundturnus, Kontrollen und mögliche Zwischenreinigungen je Bereich definieren.',
                'Grundreinigung und Sonderleistungen planen: Glasreinigung, Teppich-Intensiv, Bauschluss separat ausweisen.',
                'Reinigungszeiten abstimmen: Tagdienst, Randzeiten oder außerhalb der Betriebszeiten festlegen.',
                'Qualitätssicherung definieren: Sichtkontrollen, Begehungsprotokolle, Ansprechpartner und Eskalationsweg.',
                'Dokumentationsfähigkeit sicherstellen: Nachweise zu Tariflohn, Sozialversicherung und Mindestlohn einfordern.'
              ].map((item, i) => (
                <li key={`lv-${i}`} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-6 w-6 flex-shrink-0 text-accent" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <h2 className="text-2xl font-black text-navy sm:text-3xl">Saison und Nutzung als Anpassungssignale</h2>
            <p className="mb-8">
              Nässe, Laub oder Streumittel können den Schmutzeintrag in Eingangs- und Verkehrsflächen zeitweise erhöhen;
              Belegungswechsel, Veranstaltungen oder Schichtpläne verändern die Nutzung. Ein anpassbares Konzept
              definiert solche Signale, die zuständige Entscheidung und die Dauer einer engeren oder reduzierten
              Taktung. So bleibt die Änderung prüfbar, statt allein vom spontanen Eindruck abzuhängen.
            </p>

            <h2 className="text-2xl font-black text-navy sm:text-3xl">Fazit: fixe Basis, adaptive Steuerung</h2>
            <p className="mb-8">
              Feste und adaptive Logik sind keine Gegensätze. Ein belastbarer Reinigungsplan sichert notwendige
              Basisleistungen und erlaubt Flexibilität nur dort, wo Auslöser, Ergebnis, Kontrolle und Dokumentation
              klar vereinbart sind. Regelmäßige Auswertung zeigt anschließend, ob der Plan Qualität und Nutzung
              tatsächlich zusammenführt.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-paper py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-8">
          <div className="mb-12 text-center">
            <span className="mb-4 block text-sm font-bold uppercase tracking-wider text-brand">Häufige Fragen</span>
            <h2 className="text-2xl font-black tracking-tight text-navy sm:text-3xl lg:text-4xl">FAQs zu Reinigungsintervallen</h2>
          </div>
          <Accordion items={faqSchema.mainEntity.map((q) => ({ question: q.name, answer: q.acceptedAnswer.text }))} />
        </div>
      </section>

      <ArticleFooter slug="unterhaltsreinigung-unternehmen-reinigungsintervalle" />

      <CTABand title="Benötigen Sie ein maßgeschneidertes Reinigungskonzept?" lead="Wir analysieren Ihren Bedarf und erstellen ein Leistungsverzeichnis mit optimalen Reinigungsintervallen für Ihr Unternehmen." />
    </article>
  );
}
