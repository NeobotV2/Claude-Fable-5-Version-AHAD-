import { CalendarClock, CheckCircle2, CircleAlert, Calculator, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import PageHero from '@/components/PageHero';
import Accordion from '@/components/ui/Accordion';
import CTABand from '@/components/CTABand';
import ArticleMeta from '@/components/ArticleMeta';
import ArticleFooter from '@/components/ArticleFooter';
import { buildArticleSchema, EDITORIAL_ARTICLES } from '@/data/editorial';
import { IMG } from '@/lib/images';

const SLUG = 'mindestlohn-gebaeudereinigung' as const;

const tableWrapperClass =
  'not-prose my-10 overflow-x-auto rounded-2xl border border-line focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand';

const faqItems = [
  {
    question: 'Wie hoch ist der Mindestlohn in der Gebäudereinigung 2026?',
    answer:
      'Seit dem 1. Januar 2026 beträgt das Mindeststundenentgelt in Lohngruppe 1 (Innen- und Unterhaltsreinigung) 15,00 Euro und in Lohngruppe 6 (Glas- und Fassadenreinigung) 18,40 Euro brutto. Grundlage ist die Zehnte Verordnung über zwingende Arbeitsbedingungen in der Gebäudereinigung, die bis zum 31. Dezember 2026 gilt.',
  },
  {
    question: 'Gilt der Branchenmindestlohn auch für Betriebe ohne Tarifbindung?',
    answer:
      'Ja. Die Verordnung beruht auf dem Arbeitnehmer-Entsendegesetz und erstreckt die tariflichen Mindestlöhne der Lohngruppen 1 und 6 auf alle Arbeitgeber der Branche, auch auf Arbeitgeber mit Sitz im Ausland. Für die übrigen Lohngruppen des Tarifvertrags gilt diese Erstreckung nicht.',
  },
  {
    question: 'Wie hoch ist der Mindestlohn in der Gebäudereinigung 2027?',
    answer:
      'Stand 18. Oktober 2026 steht er noch nicht fest. Die IG BAU fordert 2,00 Euro mehr pro Stunde für alle Lohngruppen bei zwölf Monaten Laufzeit, also 17,00 Euro in Lohngruppe 1 und 20,40 Euro in Lohngruppe 6. Der Bundesinnungsverband lehnt die Forderung ab. Die erste Verhandlungsrunde am 9. September 2026 endete ohne Ergebnis, die zweite ist für den 22. Oktober 2026 in Köln angesetzt.',
  },
  {
    question: 'Wie hoch ist der gesetzliche Mindestlohn 2027?',
    answer:
      'Nach der Fünften Verordnung zur Anpassung der Höhe des Mindestlohns (MiLoV5) steigt der allgemeine gesetzliche Mindestlohn zum 1. Januar 2027 von 13,90 Euro auf 14,60 Euro brutto je Zeitstunde. Liegt ein Branchenmindestlohn darüber, gilt der höhere Branchenwert.',
  },
  {
    question: 'Darf eine Reinigungsfirma bei laufendem Vertrag die Preise erhöhen?',
    answer:
      'Das hängt vom Vertrag ab. Enthält er eine Lohngleit- oder Preisanpassungsklausel, regelt diese, wann und in welchem Umfang sich der Preis ändert. Ohne vertragliche Grundlage muss eine Anpassung in der Regel neu vereinbart werden. Ob eine konkrete Klausel wirksam ist, ist im Einzelfall rechtlich zu prüfen.',
  },
  {
    question: 'Haften Auftraggeber, wenn die Reinigungsfirma den Mindestlohn nicht zahlt?',
    answer:
      'Nach § 14 AEntG, auf den auch § 13 MiLoG verweist, haftet ein Unternehmer, der einen anderen Unternehmer mit Dienstleistungen beauftragt, für das Nettomindestentgelt wie ein Bürge. Das Bundesarbeitsgericht legt den Unternehmerbegriff eng aus: Erfasst ist vor allem, wer eigene Verpflichtungen gegenüber Kunden an Nachunternehmer weitergibt. Wie Ihr Unternehmen einzuordnen ist, sollten Sie im Einzelfall prüfen lassen.',
  },
];

export default function FachwissenMindestlohn() {
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
        ogType="article"
        title="Mindestlohn Gebäudereinigung 2026 & 2027 | AHAD"
        description="Mindestlohn Gebäudereinigung: 15,00 € in Lohngruppe 1 und 18,40 € in Lohngruppe 6 seit 2026, Stand der Tarifrunde 2027, Preisanpassung und Auftraggeberhaftung."
        keywords="Mindestlohn Gebäudereinigung 2026, Mindestlohn Gebäudereinigung 2027, Tariflohn Gebäudereinigung, Lohngruppe 1 Gebäudereinigung, Tarifrunde Gebäudereinigung, Auftraggeberhaftung Mindestlohn"
        schema={[articleSchema, faqSchema]}
      />

      <PageHero
        compact
        titleSize="lg"
        eyebrow="Fachwissen · Lohn & Tarif"
        title="Mindestlohn in der Gebäudereinigung 2026 und Ausblick 2027"
        lead="Seit 1. Januar 2026 gelten in der Gebäudereinigung mindestens 15,00 Euro in Lohngruppe 1 und 18,40 Euro in Lohngruppe 6. Die Verordnung läuft Ende 2026 aus, ein Tarifergebnis für 2027 steht noch aus. Für Auftraggeber geht es um Stundensätze, Preisanpassung und Haftung."
        image={IMG.karriere}
        imageAlt=""
        crumbs={[{ label: 'Fachwissen', href: '/fachwissen' }, { label: 'Mindestlohn Gebäudereinigung' }]}
      />

      <ArticleMeta slug={SLUG} />

      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-8">
          <div className="prose prose-lg max-w-none leading-relaxed text-slate">
            <h2 id="branchenmindestlohn-2026" className="scroll-mt-28 font-headline text-2xl font-bold text-navy sm:text-3xl">
              Branchenmindestlohn 2026: Lohngruppe 1 und 6
            </h2>
            <p>
              Die Mindestlöhne der Gebäudereinigung beruhen auf dem Tarifvertrag zwischen der IG Bauen-Agrar-Umwelt und
              dem Bundesinnungsverband des Gebäudereiniger-Handwerks. Mit der Zehnten Verordnung über zwingende
              Arbeitsbedingungen in der Gebäudereinigung (10. GebäudeArbbV) hat das Bundesministerium für Arbeit und
              Soziales die
              Mindeststundenentgelte für zwei Lohngruppen auf alle Arbeitgeber der Branche erstreckt. Sie gelten
              bundesweit einheitlich für gewerbliche Beschäftigte, unabhängig von einer Tarifbindung und auch für
              Arbeitgeber mit Sitz im Ausland.
            </p>

            <div className={tableWrapperClass} role="region" aria-label="Branchenmindestlöhne Gebäudereinigung 2025 und 2026" tabIndex={0}>
              <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                <caption className="caption-top bg-paper px-4 py-3 text-left font-headline font-bold text-navy">
                  Mindeststundenentgelte nach der 10. GebäudeArbbV (brutto je Stunde)
                </caption>
                <thead className="bg-navy text-white">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-bold">Lohngruppe</th>
                    <th scope="col" className="px-4 py-3 font-bold">Tätigkeit</th>
                    <th scope="col" className="px-4 py-3 font-bold">2025</th>
                    <th scope="col" className="px-4 py-3 font-bold">Seit 1. Januar 2026</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line text-slate">
                  <tr>
                    <th scope="row" className="bg-paper px-4 py-4 font-bold text-navy">Lohngruppe 1</th>
                    <td className="px-4 py-4">Innen- und Unterhaltsreinigung</td>
                    <td className="px-4 py-4">14,25 €</td>
                    <td className="px-4 py-4 font-bold text-navy">15,00 €</td>
                  </tr>
                  <tr>
                    <th scope="row" className="bg-paper px-4 py-4 font-bold text-navy">Lohngruppe 6</th>
                    <td className="px-4 py-4">Glas- und Fassadenreinigung</td>
                    <td className="px-4 py-4">17,65 €</td>
                    <td className="px-4 py-4 font-bold text-navy">18,40 €</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              Die Verordnung ist am 1. Februar 2025 in Kraft getreten und läuft mit Ablauf des 31. Dezember 2026 aus. Sie
              erfasst nur die Lohngruppen 1 und 6; die Werte weiterer Lohngruppen ergeben sich aus dem Tarifvertrag. Zum
              Vergleich: Der allgemeine gesetzliche Mindestlohn liegt 2026 bei 13,90 Euro, Lohngruppe 1 also 1,10 Euro
              darüber.
            </p>

            <h2 id="tarifrunde-2027" className="scroll-mt-28 font-headline text-2xl font-bold text-navy sm:text-3xl">
              Tarifrunde für 2027: Stand der Verhandlungen
            </h2>

            <div className="not-prose my-8 rounded-2xl border border-brand/20 bg-brand/5 p-6">
              <div className="flex items-start gap-3">
                <CalendarClock className="mt-0.5 h-6 w-6 shrink-0 text-brand" aria-hidden="true" />
                <div>
                  <p className="font-headline text-lg font-bold text-navy">
                    Stand: <time dateTime="2026-10-18">18. Oktober 2026</time>
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-slate">
                    Ein Tarifergebnis für 2027 liegt nicht vor. Bis zu einem Abschluss und einer neuen Verordnung
                    gelten die Werte für 2026 und der gesetzliche Mindestlohn.
                  </p>
                </div>
              </div>
            </div>

            <ul className="not-prose my-8 space-y-3">
              {[
                ['Laufzeit', 'Der geltende Tarifvertrag und die Zehnte Verordnung enden am 31. Dezember 2026.'],
                [
                  'Forderung der IG BAU',
                  '2,00 Euro mehr pro Stunde für alle Lohngruppen bei zwölf Monaten Laufzeit. Das ergäbe 17,00 Euro in Lohngruppe 1 und 20,40 Euro in Lohngruppe 6; in Lohngruppe 1 entspricht das gut 13 Prozent.',
                ],
                [
                  'Position der Arbeitgeber',
                  'Der Bundesinnungsverband des Gebäudereiniger-Handwerks lehnt die Forderung ab und verweist auf die wirtschaftliche Lage der Branche.',
                ],
                [
                  '1. Verhandlungsrunde',
                  '9. September 2026 in Düsseldorf, ohne Ergebnis. Nach Angaben der IG BAU legten die Arbeitgeber kein Angebot vor.',
                ],
                ['2. Verhandlungsrunde', 'Angesetzt für den 22. Oktober 2026 in Köln.'],
              ].map(([label, text]) => (
                <li key={label} className="flex items-start gap-3 rounded-xl border border-line bg-white p-4 text-sm text-slate">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
                  <span>
                    <strong className="text-navy">{label}:</strong> {text}
                  </span>
                </li>
              ))}
            </ul>

            <p>
              Ein neuer Branchenmindestlohn wird für alle Betriebe erst verbindlich, wenn sich die Tarifparteien einigen
              und das Bundesministerium für Arbeit und Soziales eine neue Verordnung erlässt. Zwischen Abschluss und
              Inkrafttreten kann Zeit vergehen: Die Zehnte Verordnung etwa trat erst am 1. Februar 2025 in Kraft.
            </p>

            <h2 id="gesetzlicher-mindestlohn-2027" className="scroll-mt-28 font-headline text-2xl font-bold text-navy sm:text-3xl">
              Gesetzlicher Mindestlohn 2027: 14,60 Euro
            </h2>
            <p>
              Die Fünfte Mindestlohn&shy;anpassungs&shy;verordnung (MiLoV5) vom 5. November 2025 setzt den Beschluss der
              Mindestlohnkommission vom Juni 2025 um. Der allgemeine gesetzliche Mindestlohn beträgt danach 13,90 Euro
              ab dem 1. Januar 2026 und 14,60 Euro ab dem 1. Januar 2027, jeweils brutto je Zeitstunde.
            </p>
            <p>
              Liegt ein Branchenmindestlohn über dem gesetzlichen Mindestlohn, gilt der höhere Branchenwert. Tritt zum
              1. Januar 2027 keine Nachfolgeverordnung für die Gebäudereinigung in Kraft, bleibt für Arbeitgeber ohne
              Tarifbindung der gesetzliche Mindestlohn von 14,60 Euro die allgemeine Untergrenze. Für tarifgebundene
              Betriebe gelten zusätzlich die tarifvertraglichen Regeln.
            </p>

            <div className={tableWrapperClass} role="region" aria-label="Lohnuntergrenzen 2026 und 2027 im Überblick" tabIndex={0}>
              <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                <caption className="caption-top bg-paper px-4 py-3 text-left font-headline font-bold text-navy">
                  Lohnuntergrenzen im Überblick (brutto je Stunde, Stand 18. Oktober 2026)
                </caption>
                <thead className="bg-navy text-white">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-bold">Untergrenze</th>
                    <th scope="col" className="px-4 py-3 font-bold">2026</th>
                    <th scope="col" className="px-4 py-3 font-bold">2027</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line text-slate">
                  <tr>
                    <th scope="row" className="bg-paper px-4 py-4 font-bold text-navy">Gesetzlicher Mindestlohn</th>
                    <td className="px-4 py-4">13,90 €</td>
                    <td className="px-4 py-4">14,60 € (beschlossen)</td>
                  </tr>
                  <tr>
                    <th scope="row" className="bg-paper px-4 py-4 font-bold text-navy">Gebäudereinigung Lohngruppe 1</th>
                    <td className="px-4 py-4">15,00 €</td>
                    <td className="px-4 py-4">offen, Forderung IG BAU: 17,00 €</td>
                  </tr>
                  <tr>
                    <th scope="row" className="bg-paper px-4 py-4 font-bold text-navy">Gebäudereinigung Lohngruppe 6</th>
                    <td className="px-4 py-4">18,40 €</td>
                    <td className="px-4 py-4">offen, Forderung IG BAU: 20,40 €</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 id="stundensaetze-vertraege" className="scroll-mt-28 font-headline text-2xl font-bold text-navy sm:text-3xl">
              Was Lohnänderungen für Stundensätze und Verträge bedeuten
            </h2>
            <p>
              Der Lohn ist der Ausgangspunkt für den Stundensatz einer Reinigungsleistung. Arbeitgeberbeiträge zur
              Sozialversicherung, bezahlte Ausfallzeiten und Zuschläge bauen darauf auf. Steigt der Mindestlohn, steigen
              diese lohngebundenen Kosten mit; Material, Maschinen und Verwaltung folgen eigenen Entwicklungen. Wie sich
              ein Stundensatz zusammensetzt, erläutert der Leitfaden{' '}
              <Link to="/fachwissen/was-kostet-gebaeudereinigung-stundensatz-preise" className="font-bold text-brand hover:underline">
                Was kostet Gebäudereinigung?
              </Link>
            </p>

            <div className="not-prose my-10 rounded-3xl border border-line bg-paper p-6 shadow-soft sm:p-8">
              <h3 className="flex items-center gap-3 font-headline text-xl font-bold text-navy">
                <Calculator className="h-6 w-6 shrink-0 text-brand" aria-hidden="true" />
                Rechenlogik mit Annahmen
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate">
                Ausschließlich zur Veranschaulichung: Angenommen, der Lohn steigt um 4 Prozent und die lohngebundenen
                Kosten machen 75 Prozent des Stundenverrechnungssatzes aus. Dann ändert sich der Preis um rund
                4 % × 0,75 = 3 Prozent. Beide Werte sind Rechenannahmen, weder Prognose für 2027 noch Branchenwert.
                Den tatsächlichen Lohnanteil kennt nur die Kalkulation des jeweiligen Angebots.
              </p>
            </div>

            <h3 className="font-headline text-2xl font-bold text-navy">Preisanpassung im Vertrag</h3>
            <p>
              Reinigungsverträge können eine Lohngleitklausel enthalten, die den Preis an die Entwicklung der
              Lohnkosten koppelt. Klauseln, die den Preis nur insoweit anpassen, wie die Kosten des Dienstleisters unmittelbar
              betroffen sind, sind als Kostenelementeklauseln vom Preisklauselverbot ausgenommen (§ 1 Abs. 2 Nr. 3
              Preisklauselgesetz). Ob eine konkrete Klausel wirksam ist, hängt von ihrer Formulierung ab. Ohne
              vertragliche Grundlage muss eine Preisänderung in der Regel neu vereinbart werden.
            </p>
            <ul className="not-prose my-8 space-y-3">
              {[
                'Bezugsgröße: auf welchen Lohn sich die Klausel bezieht, etwa den Branchenmindestlohn einer bestimmten Lohngruppe',
                'Anteil: welcher Teil des Preises an die Lohnentwicklung gekoppelt ist',
                'Zeitpunkt: ab wann die Anpassung gilt, zum Beispiel ab Inkrafttreten einer neuen Verordnung',
                'Nachweis und Ankündigung: welche Unterlagen der Dienstleister vorlegt und mit welchem Vorlauf er die Anpassung mitteilt',
                'Richtung: ob die Klausel nur Erhöhungen oder auch Senkungen abbildet',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-xl border border-line bg-white p-4 text-sm text-slate">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p>
              Für die Budgetplanung 2027 hilft eine Spanne: ein Szenario ohne neue Branchenverordnung und eines mit einem
              Abschluss in unterschiedlicher Höhe. Bei Ausschreibungen schafft es Vergleichbarkeit, wenn alle Bieter den
              kalkulierten Lohn und ihre Regel zur Preisanpassung offenlegen.
            </p>

            <h2 id="auftraggeberhaftung" className="scroll-mt-28 font-headline text-2xl font-bold text-navy sm:text-3xl">
              Auftraggeberhaftung nach § 13 MiLoG und § 14 AEntG
            </h2>
            <p>
              Nach § 14 Arbeitnehmer-Entsendegesetz haftet ein Unternehmer, der einen anderen Unternehmer mit Werk- oder
              Dienstleistungen beauftragt, für dessen Pflicht zur Zahlung des Mindestentgelts. Die Haftung erstreckt sich
              auch auf Nachunternehmer und beauftragte Verleiher. Der Auftraggeber haftet wie ein Bürge, der auf die
              Einrede der Vorausklage verzichtet hat: Beschäftigte können ihn direkt in Anspruch nehmen, ohne zuerst
              gegen ihren Arbeitgeber vorzugehen. Ein eigenes Verschulden ist nicht erforderlich. Erfasst ist das
              Nettoentgelt nach Abzug von Steuern und Beiträgen zur Sozialversicherung. Für den Branchenmindestlohn der
              Gebäudereinigung gilt § 14 AEntG unmittelbar; für den allgemeinen Mindestlohn verweist § 13 MiLoG darauf.
            </p>
            <p>
              Das Bundesarbeitsgericht legt den Begriff des Unternehmers einschränkend aus (Urteil vom 16. Oktober 2019,
              5 AZR 241/18). Erfasst ist danach vor allem, wer eine eigene vertragliche Verpflichtung gegenüber einem
              Kunden an einen Nachunternehmer weitergibt, oder wessen Geschäftsmodell solche Beauftragungen typischerweise
              mit sich bringt. Wer eine Leistung nur für den eigenen Bedarf vergibt, fiel in dem entschiedenen Fall nicht
              darunter. Nach Angaben des Zolls geht der Gesetzgeber davon aus, dass diese Rechtsprechung auch für
              § 13 MiLoG gilt.
            </p>

            <div className={tableWrapperClass} role="region" aria-label="Typische Konstellationen der Auftraggeberhaftung" tabIndex={0}>
              <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                <caption className="caption-top bg-paper px-4 py-3 text-left font-headline font-bold text-navy">
                  Konstellationen und Einordnung nach der Rechtsprechung des BAG
                </caption>
                <thead className="bg-navy text-white">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-bold">Konstellation</th>
                    <th scope="col" className="px-4 py-3 font-bold">Einordnung</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line text-slate">
                  <tr>
                    <th scope="row" className="bg-paper px-4 py-4 font-bold text-navy">Facility-Management-Anbieter vergibt Reinigung an einen Nachunternehmer</th>
                    <td className="px-4 py-4">Gibt eine eigene Kundenverpflichtung weiter; die Haftung kommt in Betracht.</td>
                  </tr>
                  <tr>
                    <th scope="row" className="bg-paper px-4 py-4 font-bold text-navy">Reinigungsfirma setzt einen Subunternehmer ein</th>
                    <td className="px-4 py-4">Gibt eine eigene Kundenverpflichtung weiter; die Haftung kommt in Betracht.</td>
                  </tr>
                  <tr>
                    <th scope="row" className="bg-paper px-4 py-4 font-bold text-navy">Unternehmen beauftragt Reinigung nur für das eigene Gebäude</th>
                    <td className="px-4 py-4">Nach der einschränkenden Auslegung typischerweise nicht erfasst; Einzelfall prüfen lassen.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              Hinzu kommt ein Bußgeldtatbestand: Ordnungswidrig handelt nach § 21 Abs. 2 MiLoG und § 23 Abs. 2 AEntG,
              wer als Unternehmer Werk- oder Dienstleistungen in erheblichem Umfang von einem anderen Unternehmer
              ausführen lässt, von dem er weiß oder fahrlässig nicht weiß, dass dieser den Mindestlohn nicht zahlt. Das
              Gesetz sieht dafür Geldbußen bis zu 500.000 Euro vor. Auch hier wendet der Zoll den engen
              Unternehmerbegriff an.
            </p>

            <div className="not-prose my-10 rounded-2xl border border-amber-200 bg-amber-50 p-6">
              <div className="flex items-start gap-3">
                <CircleAlert className="mt-0.5 h-6 w-6 shrink-0 text-amber-700" aria-hidden="true" />
                <div>
                  <h3 className="font-headline text-lg font-bold text-navy">Prüfpunkte für den Vertrag</h3>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate">
                    <li>Zusicherung, dass mindestens der jeweils geltende Branchenmindestlohn gezahlt wird</li>
                    <li>Einsatz von Nachunternehmern nur nach vorheriger Zustimmung und mit derselben Zusicherung</li>
                    <li>Vereinbarte Nachweise, etwa eine schriftliche Bestätigung des Dienstleisters</li>
                    <li>Freistellung im Innenverhältnis und Kündigungsrecht bei Verstößen</li>
                  </ul>
                  <p className="mt-3 text-sm leading-relaxed text-slate">
                    Eine Freistellungsklausel regelt nur den Rückgriff zwischen den Vertragsparteien. Die Haftung
                    gegenüber den Beschäftigten bleibt davon unberührt. Die Prüfpunkte ersetzen keine Rechtsberatung.
                  </p>
                </div>
              </div>
            </div>

            <div className="not-prose mt-10 rounded-2xl border border-line bg-paper p-6">
              <div className="flex items-start gap-3">
                <Users className="mt-0.5 h-6 w-6 shrink-0 text-brand" aria-hidden="true" />
                <div>
                  <h3 className="font-headline text-lg font-bold text-navy">Arbeiten in der Gebäudereinigung</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate">
                    Sie suchen eine Stelle? Auf der{' '}
                    <Link to="/karriere" className="font-bold text-brand hover:underline">
                      Karriereseite
                    </Link>{' '}
                    finden Sie Einsatzgebiete, Arbeitsmodelle und den Weg zur Bewerbung bei AHAD.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper py-16 lg:py-24" aria-labelledby="mindestlohn-faq">
        <div className="mx-auto max-w-4xl px-4 sm:px-8">
          <div className="mb-12 text-center">
            <span className="eyebrow justify-center text-brand">Häufige Fragen</span>
            <h2 id="mindestlohn-faq" className="mt-4 font-headline text-2xl font-bold text-navy sm:text-3xl lg:text-4xl">
              Fragen zum Mindestlohn in der Gebäudereinigung
            </h2>
          </div>
          <Accordion items={faqItems} />
        </div>
      </section>

      <ArticleFooter slug={SLUG} />

      <CTABand
        title="Reinigungsleistung für 2027 kalkulieren"
        lead="Wir besichtigen Ihr Objekt und kalkulieren das Angebot nachvollziehbar auf Basis des vereinbarten Leistungsumfangs. Vertrags- und Haftungsfragen lassen Sie bitte rechtlich prüfen."
      />
    </article>
  );
}
