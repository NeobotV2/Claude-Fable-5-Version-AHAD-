import { CheckCircle2, CircleAlert, ClipboardCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import Accordion from '@/components/ui/Accordion';
import CTABand from '@/components/CTABand';
import PageHero from '@/components/PageHero';
import ArticleMeta from '@/components/ArticleMeta';
import ArticleFooter from '@/components/ArticleFooter';
import { buildArticleSchema, EDITORIAL_ARTICLES } from '@/data/editorial';

const ARTICLE_SLUG = 'reinigungsfirma-wechseln-checkliste-tipps' as const;

export default function FachwissenAnbieterwechsel() {
  const articleSchema = buildArticleSchema(EDITORIAL_ARTICLES[ARTICLE_SLUG]);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Wann sollte man einen Wechsel der Reinigungsfirma prüfen?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ein Wechsel ist eine mögliche Option, wenn vereinbarte Qualitätsziele wiederholt verfehlt werden, Maßnahmen ohne nachhaltige Wirkung bleiben oder der aktuelle Leistungsumfang nicht mehr zum Objekt passt. Vor der Entscheidung sollten Auftraggeber Abweichungen dokumentieren, den Vertrag prüfen und bewerten, ob Nachsteuerung, eine neue Leistungsbeschreibung oder ein Anbieterwechsel den Bedarf am besten löst.',
        },
      },
      {
        '@type': 'Question',
        name: 'Worauf muss ich bei der Kündigung des Reinigungsvertrags achten?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Maßgeblich ist der konkrete Vertrag. Zu prüfen sind insbesondere Laufzeit, Kündigungsfrist, Kündigungstermin, Verlängerung, vereinbarte Form und Zugang. Bei einer außerordentlichen Kündigung oder unklaren Klauseln ist eine rechtliche Einzelfallprüfung sinnvoll. Dieser Leitfaden ersetzt keine Rechtsberatung.',
        },
      },
      {
        '@type': 'Question',
        name: 'Wie lassen sich Angebote für Gebäudereinigung vergleichen?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Alle Anbieter sollten dieselbe objektbezogene Leistungsbeschreibung erhalten. Verglichen werden sollten neben dem Gesamtpreis auch Leistungsumfang, Zeit- und Produktivitätsannahmen, Ausschlüsse, Preisänderungsregeln, Objektleitung, Vertretung, Qualitätskontrolle, Reaktionszeiten und geforderte Nachweise.',
        },
      },
      {
        '@type': 'Question',
        name: 'Welche Kündigungsfristen gelten bei Reinigungsverträgen?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Eine allgemeingültige Frist gibt es nicht. Der Zeitplan muss vom vertraglichen Kündigungstermin rückwärts aufgebaut werden und zusätzlich Auswahl, Beauftragung und Mobilisierung des neuen Dienstleisters berücksichtigen.',
        },
      },
      {
        '@type': 'Question',
        name: 'Gilt § 613a BGB beim Wechsel der Reinigungsfirma?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ein möglicher Betriebsübergang nach § 613a BGB ist ein Einzelfall-Prüfpunkt, keine automatische Folge jedes Dienstleisterwechsels. Die tatsächlichen Umstände sollten frühzeitig erhoben und bei Relevanz arbeitsrechtlich bewertet werden. Auftraggeber und beteiligte Dienstleister sollten dafür Zuständigkeiten und benötigte Informationen abstimmen.',
        },
      },
      {
        '@type': 'Question',
        name: 'Wie viel Vorlauf braucht ein Anbieterwechsel?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Der Vorlauf hängt von Kündigungstermin, Vergabeprozess, Objektgröße, Sicherheitsanforderungen, Material- und Personalplanung sowie den vereinbarten Freigaben ab. Sinnvoll ist ein rückwärts geplanter Terminplan mit Entscheidung, Beauftragung, Mobilisierung, Tag 0 sowie Kontrollen an Tag 7 und Tag 30 statt einer pauschalen Wochenangabe.',
        },
      },
    ],
  };

  return (
    <article>
      <SEO
        title="Reinigungsfirma wechseln: Checkliste für Unternehmen | AHAD"
        description="Reinigungsfirma wechseln: Bedarf prüfen, Fristen objektbezogen planen, Angebote vergleichbar bewerten und die Übergabe an Tag 0, 7 und 30 steuern."
        keywords="Reinigungsfirma wechseln, Kündigung Reinigungsvertrag, Ausschreibung Gebäudereinigung, Checkliste Reinigungswechsel"
        schema={[articleSchema, faqSchema]}
      />

      <PageHero
        compact
        titleSize="lg"
        eyebrow="Fachwissen · Anbieterwechsel"
        title="Reinigungsfirma wechseln: Übergang planbar vorbereiten"
        lead="Ein Wechsel ist nicht immer die erste oder einzige Lösung. Entscheidend sind dokumentierte Abweichungen, ein geprüfter Vertrag, vergleichbare Angebote und eine klar verantwortete Übergabe."
        image="/images/ahad/meeting.webp"
        imageAlt="Besprechung zur Planung eines Dienstleisterwechsels"
        crumbs={[{ label: 'Fachwissen', href: '/fachwissen' }, { label: 'Anbieterwechsel' }]}
      />

      <ArticleMeta slug={ARTICLE_SLUG} />

      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-8">
          <div className="prose prose-lg max-w-none leading-relaxed text-slate">
            <h2 id="wechselbedarf-pruefen" className="scroll-mt-28 font-headline text-2xl font-bold text-navy sm:text-3xl">
              Wechselbedarf prüfen: zuerst Ursache und Ziel klären
            </h2>
            <p>
              Ein Anbieterwechsel ist dann sachlich begründbar, wenn die aktuelle Leistung trotz vereinbarter
              Korrekturen nicht zum Qualitätsziel passt oder sich der Bedarf des Objekts wesentlich verändert hat.
              Die Entscheidung sollte nicht allein auf einzelnen Beschwerden beruhen. Facility Management und
              Einkauf benötigen ein gemeinsames Bild aus Leistungsverzeichnis, Kontrollergebnissen, Reklamationen,
              Reaktionszeiten und Vertragslage.
            </p>

            <div className="not-prose my-10 grid gap-4 md:grid-cols-3">
              {[
                {
                  title: 'Nachsteuern',
                  text: 'Wenn die Leistung eindeutig vereinbart ist und konkrete Korrekturmaßnahmen noch nicht geprüft wurden.',
                },
                {
                  title: 'Leistung neu ordnen',
                  text: 'Wenn Flächen, Nutzung, Intervalle oder Qualitätsziele nicht mehr zum bestehenden Vertrag passen.',
                },
                {
                  title: 'Wechsel vorbereiten',
                  text: 'Wenn relevante Abweichungen wiederholt auftreten oder die benötigte Leistung dauerhaft nicht bereitgestellt wird.',
                },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-line bg-paper p-5">
                  <h3 className="font-headline text-lg font-bold text-navy">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate">{item.text}</p>
                </div>
              ))}
            </div>

            <h3 className="font-headline text-2xl font-bold text-navy">Entscheidungsgrundlage dokumentieren</h3>
            <ul className="not-prose my-8 space-y-3">
              {[
                'Abweichung mit Datum, Bereich, vereinbartem Soll und beobachtetem Ist festhalten.',
                'Reklamationsweg, Reaktionszeit und Ergebnis der Korrektur dokumentieren.',
                'Prüfen, ob das Leistungsverzeichnis die heutige Nutzung und die Qualitätsziele noch abbildet.',
                'Laufzeit, Kündigungstermin, Frist, Form und Verlängerung aus dem konkreten Vertrag erfassen.',
                'Versorgungskritische Bereiche und eine zulässige Unterbrechung ausdrücklich benennen.',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-xl border border-line bg-white p-4 text-sm text-slate">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="not-prose my-10 rounded-2xl border border-amber-200 bg-amber-50 p-6">
              <div className="flex items-start gap-3">
                <CircleAlert className="mt-0.5 h-6 w-6 shrink-0 text-amber-700" aria-hidden="true" />
                <div>
                  <h3 className="font-headline text-lg font-bold text-navy">Vertrag vor Terminentscheidung prüfen</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate">
                    Eine allgemeine Kündigungsfrist oder sichere Standardreihenfolge gibt es nicht. Der konkrete
                    Vertrag und die Versorgungskontinuität bestimmen, wann Ausschreibung, Beauftragung und Kündigung
                    sinnvoll koordiniert werden. Bei unklaren Klauseln oder einer außerordentlichen Kündigung ist
                    rechtliche Beratung angezeigt.
                  </p>
                </div>
              </div>
            </div>

            <h2 id="wechsel-planen" className="scroll-mt-28 font-headline text-2xl font-bold text-navy sm:text-3xl">
              Wechsel vom Zieltermin rückwärts planen
            </h2>
            <p>
              Der Starttermin des neuen Dienstleisters ist der feste Bezugspunkt. Von dort wird rückwärts geplant:
              Mobilisierung braucht eine abgeschlossene Leistungsdefinition und Beauftragung; die Auswahl braucht
              vergleichbare Angebote; und die Beendigung des Altvertrags muss zu den individuell geprüften
              Vertragsterminen passen. Ein aktuelles{' '}
              <Link to="/fachwissen/leistungsverzeichnis-gebaeudereinigung-erstellen" className="font-bold text-brand hover:underline">
                Leistungsverzeichnis
              </Link>{' '}
              ist dabei die gemeinsame Datengrundlage.
            </p>

            <div
              className="not-prose my-10 overflow-x-auto rounded-2xl border border-line focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              role="region"
              aria-label="Relativer Phasenplan für den Anbieterwechsel"
              tabIndex={0}
            >
              <table className="w-full min-w-[820px] border-collapse text-left text-sm">
                <caption className="caption-top bg-paper px-4 py-3 text-left font-headline font-bold text-navy">
                  Phasen relativ zu Vertragstermin und geplantem Tag 0
                </caption>
                <thead className="bg-navy text-white">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-bold">Meilenstein</th>
                    <th scope="col" className="px-4 py-3 font-bold">Voraussetzung</th>
                    <th scope="col" className="px-4 py-3 font-bold">Ergebnis</th>
                    <th scope="col" className="px-4 py-3 font-bold">Federführung</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line text-slate">
                  <tr>
                    <th scope="row" className="bg-paper px-4 py-4 font-bold text-navy">Entscheidungspunkt</th>
                    <td className="px-4 py-4">Vertragstermine und dokumentierter Handlungsbedarf</td>
                    <td className="px-4 py-4">Ziel, Budgetrahmen und zulässige Versorgungslücke</td>
                    <td className="px-4 py-4">Geschäftsführung, FM, Einkauf</td>
                  </tr>
                  <tr>
                    <th scope="row" className="bg-paper px-4 py-4 font-bold text-navy">Auswahl vor Beauftragung</th>
                    <td className="px-4 py-4">Einheitliches LV, Bewertungskriterien und Begehungsdaten</td>
                    <td className="px-4 py-4">Nachvollziehbare Auswahlentscheidung und geklärte Ausschlüsse</td>
                    <td className="px-4 py-4">Einkauf und FM</td>
                  </tr>
                  <tr>
                    <th scope="row" className="bg-paper px-4 py-4 font-bold text-navy">Vertragskoordination</th>
                    <td className="px-4 py-4">Geprüfte Fristen, Freigaben und Entscheidungsbefugnisse</td>
                    <td className="px-4 py-4">Abgestimmtes Ende, Startdatum und Eskalationsplan</td>
                    <td className="px-4 py-4">Auftraggeber, bei Bedarf Rechtsberatung</td>
                  </tr>
                  <tr>
                    <th scope="row" className="bg-paper px-4 py-4 font-bold text-navy">Mobilisierung bis Tag 0</th>
                    <td className="px-4 py-4">Beauftragter Umfang und benannte Verantwortliche</td>
                    <td className="px-4 py-4">Personal-, Zugangs-, Material-, Sicherheits- und Kontrollplan</td>
                    <td className="px-4 py-4">Neuer Dienstleister und FM</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-headline text-2xl font-bold text-navy">§ 613a BGB als möglichen Einzelfallpunkt behandeln</h3>
            <p>
              Ein Dienstleisterwechsel löst nicht automatisch einen Betriebsübergang aus. Ob § 613a BGB relevant
              sein kann, hängt von den tatsächlichen Umständen ab und sollte bei Anhaltspunkten arbeitsrechtlich
              geprüft werden. Im Projektplan genügt dafür zunächst ein klarer Prüfpunkt: Wer erhebt welche
              Informationen, wer bewertet sie und bis wann muss das Ergebnis für Vergabe und Mobilisierung vorliegen?
            </p>

            <h2 id="angebote-vergleichen" className="scroll-mt-28 font-headline text-2xl font-bold text-navy sm:text-3xl">
              Angebote auf gleicher Grundlage vergleichen
            </h2>
            <p>
              Ein Endpreis ist erst aussagekräftig, wenn Umfang, Häufigkeit, Zeitansatz, Ausschlüsse und
              Qualitätssteuerung vergleichbar sind. Allgemeine m²-Leistungswerte reichen dafür nicht aus: Sie müssen
              zu Raumarten, Möblierung, Verfahren, Zugänglichkeit und vereinbartem Ergebnis passen.
            </p>

            <div
              className="not-prose my-10 overflow-x-auto rounded-2xl border border-line focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              role="region"
              aria-label="Kriterien zum Vergleich von Reinigungsangeboten"
              tabIndex={0}
            >
              <table className="w-full min-w-[760px] border-collapse text-left text-sm">
                <caption className="caption-top bg-paper px-4 py-3 text-left font-headline font-bold text-navy">
                  Vergleichskriterien statt pauschaler Produktivitätswertung
                </caption>
                <thead className="bg-navy text-white">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-bold">Kriterium</th>
                    <th scope="col" className="px-4 py-3 font-bold">Zu klärende Frage</th>
                    <th scope="col" className="px-4 py-3 font-bold">Geeigneter Nachweis</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line text-slate">
                  {[
                    ['Leistungsumfang', 'Sind Tätigkeiten, Intervalle, Raumgruppen und Sonderleistungen identisch?', 'Ausgefülltes LV mit Ausschlüssen'],
                    ['Kalkulationslogik', 'Welche Einsatzzeit und welche Objektannahmen liegen zugrunde?', 'Zeitansatz je Raumgruppe oder Revier'],
                    ['Gesamtkosten', 'Welche Zuschläge, Materialien und Preisänderungen sind enthalten?', 'Preisblatt über die geplante Vertragsdauer'],
                    ['Betriebsorganisation', 'Wer leitet das Objekt und wie ist Vertretung geregelt?', 'Organigramm, Erreichbarkeit und Eskalationsweg'],
                    ['Qualität', 'Wie werden Soll, Kontrolle, Abweichung und Korrektur dokumentiert?', 'Kontrollplan, Musterreport und Reaktionszeiten'],
                    ['Mobilisierung', 'Sind Personal, Zutritt, Geräte und Einweisung bis Tag 0 gesichert?', 'Verbindlicher Mobilisierungsplan'],
                  ].map(([criterion, question, evidence]) => (
                    <tr key={criterion}>
                      <th scope="row" className="bg-paper px-4 py-4 font-bold text-navy">{criterion}</th>
                      <td className="px-4 py-4">{question}</td>
                      <td className="px-4 py-4">{evidence}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="not-prose my-10 rounded-2xl border border-line bg-paper p-6">
              <h3 className="font-headline text-xl font-bold text-navy">Passende Arbeitshilfen</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">
                Nutzen Sie für alle Bieter dieselbe{' '}
                <Link to="/fachwissen/checkliste-reinigungsangebot" className="font-bold text-brand hover:underline">
                  Angebots-Checkliste
                </Link>
                . Formeln und Kostenbestandteile erläutert der{' '}
                <Link
                  to="/fachwissen/was-kostet-gebaeudereinigung-stundensatz-preise"
                  className="font-bold text-brand hover:underline"
                >
                  Kosten-Leitfaden
                </Link>
                .
              </p>
            </div>

            <h2 id="uebergabe-sichern" className="scroll-mt-28 font-headline text-2xl font-bold text-navy sm:text-3xl">
              Übergabe mit Aufgaben für Tag 0, 7 und 30 sichern
            </h2>
            <p>
              Zuständigkeiten sollten im Projekt- oder Übergabeplan ausdrücklich vereinbart werden. Die folgende
              Matrix ist ein Ausgangspunkt; vertragliche Pflichten des bisherigen und neuen Dienstleisters können
              davon abweichen.
            </p>

            <div
              className="not-prose my-10 overflow-x-auto rounded-2xl border border-line focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              role="region"
              aria-label="Verantwortungsmatrix für die Übergabe"
              tabIndex={0}
            >
              <table className="w-full min-w-[920px] border-collapse text-left text-sm">
                <caption className="caption-top bg-paper px-4 py-3 text-left font-headline font-bold text-navy">
                  Aufgabenmatrix rund um den Starttermin
                </caption>
                <thead className="bg-navy text-white">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-bold">Zeitpunkt</th>
                    <th scope="col" className="px-4 py-3 font-bold">Auftraggeber / FM</th>
                    <th scope="col" className="px-4 py-3 font-bold">Bisheriger Dienstleister</th>
                    <th scope="col" className="px-4 py-3 font-bold">Neuer Dienstleister</th>
                    <th scope="col" className="px-4 py-3 font-bold">Dokument</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line text-slate">
                  <tr>
                    <th scope="row" className="bg-paper px-4 py-4 font-bold text-navy">Vor Tag 0</th>
                    <td className="px-4 py-4">Zutritt, Regeln, Lager, Ansprechpartner und Freigaben bereitstellen</td>
                    <td className="px-4 py-4">Vertraglich geschuldete Rückgaben und Abschlussinformationen abstimmen</td>
                    <td className="px-4 py-4">Personal einweisen, Geräte und Material disponieren, Reviere planen</td>
                    <td className="px-4 py-4">Mobilisierungs- und Übergabeplan</td>
                  </tr>
                  <tr>
                    <th scope="row" className="bg-paper px-4 py-4 font-bold text-navy">Tag 0</th>
                    <td className="px-4 py-4">Start freigeben und bekannte Ausgangsmängel bestätigen</td>
                    <td className="px-4 py-4">Vereinbarte Schlüssel, Räume oder Gegenstände übergeben</td>
                    <td className="px-4 py-4">Leistung starten, Anwesenheit und Abweichungen melden</td>
                    <td className="px-4 py-4">Unterzeichnetes Startprotokoll</td>
                  </tr>
                  <tr>
                    <th scope="row" className="bg-paper px-4 py-4 font-bold text-navy">Tag 7</th>
                    <td className="px-4 py-4">Nutzerfeedback bündeln und erste Begehung durchführen</td>
                    <td className="px-4 py-4">Nur noch vereinbarte Restpunkte bearbeiten</td>
                    <td className="px-4 py-4">Revierzeiten, Material und Einweisung anhand der Befunde korrigieren</td>
                    <td className="px-4 py-4">Maßnahmenliste mit Termin und Verantwortlichen</td>
                  </tr>
                  <tr>
                    <th scope="row" className="bg-paper px-4 py-4 font-bold text-navy">Tag 30</th>
                    <td className="px-4 py-4">Soll-Ist-Bewertung und Regelbetrieb freigeben oder nachsteuern</td>
                    <td className="px-4 py-4">Keine Rolle, sofern keine offenen Vertragspunkte bestehen</td>
                    <td className="px-4 py-4">Qualitätsbericht, Trends und offene Risiken vorlegen</td>
                    <td className="px-4 py-4">30-Tage-Review und aktualisierter Kontrollplan</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-headline text-2xl font-bold text-navy">Betreuungsfähigkeit objektiv bewerten</h3>
            <p>
              Der Unternehmenssitz allein belegt weder Reaktionsgeschwindigkeit noch Vertretungssicherheit. Relevanter
              sind vertraglich messbare Kriterien: zugesagte Erreichbarkeit, Reaktions- und Wiederherstellungszeiten,
              Kapazität für Vertretungen, Befugnisse der Objektleitung, dokumentierte Eskalation und die Häufigkeit
              gemeinsamer Qualitätsbegehungen.
            </p>

            <div className="not-prose mt-10 rounded-2xl border border-brand/20 bg-brand/5 p-6">
              <div className="flex items-start gap-3">
                <ClipboardCheck className="mt-0.5 h-6 w-6 shrink-0 text-brand" aria-hidden="true" />
                <div>
                  <h3 className="font-headline text-lg font-bold text-navy">Ergebnis des Wechselprojekts</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate">
                    Am Ende stehen kein abstraktes Qualitätsversprechen, sondern ein abgestimmtes LV, ein
                    nachvollziehbarer Angebotsvergleich, ein terminierter Übergabeplan und messbare Kontrollen für
                    die ersten 30 Tage.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper py-16 lg:py-24" aria-labelledby="anbieterwechsel-faq">
        <div className="mx-auto max-w-4xl px-4 sm:px-8">
          <div className="mb-12 text-center">
            <span className="eyebrow justify-center text-brand">Häufige Fragen</span>
            <h2 id="anbieterwechsel-faq" className="mt-4 font-headline text-2xl font-bold text-navy sm:text-3xl lg:text-4xl">
              FAQs zum Anbieterwechsel
            </h2>
          </div>
          <Accordion items={faqSchema.mainEntity.map((q) => ({ question: q.name, answer: q.acceptedAnswer.text }))} />
        </div>
      </section>

      <ArticleFooter slug={ARTICLE_SLUG} />

      <CTABand
        title="Objektaufnahme für den Anbieterwechsel vereinbaren"
        lead="Bringen Sie vorhandenes Leistungsverzeichnis, Zieltermin und bekannte Qualitätsprobleme mit. Bei der Besichtigung erfassen wir den künftigen Umfang als Grundlage für ein nachvollziehbares Angebot; Vertrags- und Kündigungsfragen bleiben Ihrer rechtlichen Prüfung vorbehalten."
      />
    </article>
  );
}
