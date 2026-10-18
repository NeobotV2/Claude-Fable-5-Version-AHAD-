import { CheckCircle2, CircleAlert, ClipboardCheck, Snowflake } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import PageHero from '@/components/PageHero';
import Accordion from '@/components/ui/Accordion';
import CTABand from '@/components/CTABand';
import ArticleMeta from '@/components/ArticleMeta';
import ArticleFooter from '@/components/ArticleFooter';
import { buildArticleSchema, EDITORIAL_ARTICLES } from '@/data/editorial';
import { IMG } from '@/lib/images';

const SLUG = 'raeum-und-streupflicht-unternehmen' as const;

const tableWrapperClass =
  'not-prose my-10 overflow-x-auto rounded-2xl border border-line focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand';

const faqItems = [
  {
    question: 'Muss ein Unternehmen den öffentlichen Gehweg vor dem Gebäude räumen und streuen?',
    answer:
      'In Baden-Württemberg liegt die Räum- und Streupflicht auf öffentlichen Straßen zunächst bei der Gemeinde. Nach § 41 Abs. 2 Straßengesetz kann sie diese Pflicht für Gehwege per Satzung ganz oder teilweise den Straßenanliegern auferlegen. Ob Ihr Unternehmen als Anlieger verpflichtet ist, in welchem Umfang und zu welchen Zeiten, ergibt sich aus der Satzung Ihrer Gemeinde.',
  },
  {
    question: 'Bis wann müssen Gehwege in Villingen-Schwenningen geräumt und gestreut sein?',
    answer:
      'Nach der Streupflichtsatzung der Stadt in der Fassung vom 4. Dezember 2002 werktags bis 7.00 Uhr und an Sonn- und Feiertagen bis 8.30 Uhr. Die Pflicht endet um 20.00 Uhr. Prüfen Sie vor jeder Saison, ob die Satzung inzwischen geändert wurde. Für Objekte in anderen Gemeinden gelten deren eigene Zeiten.',
  },
  {
    question: 'Kann ich die Räum- und Streupflicht vollständig an einen Winterdienst abgeben?',
    answer:
      'Die Pflicht lässt sich nach der Rechtsprechung des Bundesgerichtshofs durch eine klare und eindeutige Vereinbarung übertragen. Der Dienstleister haftet dann selbst. Beim ursprünglich Verpflichteten bleibt eine Kontroll- und Überwachungspflicht. Für Vermieter hat der BGH 2025 zudem entschieden, dass ein beauftragter Dienstleister im Verhältnis zum Mieter als Erfüllungsgehilfe gilt.',
  },
  {
    question: 'Muss ein Firmen- oder Kundenparkplatz vollständig gestreut werden?',
    answer:
      'Nach einem Urteil des BGH vom 2. Juli 2019 (VI ZR 184/18) muss der Betreiber eines Parkplatzes im Rahmen des Zumutbaren streuen. Die Flächen zwischen abgestellten Fahrzeugen gehören in der Regel nicht dazu. Gesichert sein müssen die Hauptwege und Zugänge. Kurze Strecken über nicht gestreute Flächen sind den Nutzern zuzumuten.',
  },
  {
    question: 'Besteht die Streupflicht schon bei einzelnen glatten Stellen?',
    answer:
      'Grundvoraussetzung ist nach dem BGH eine allgemeine Glätte. Vereinzelte Glättestellen begründen eine Pflicht nur, wenn erkennbare Anhaltspunkte für eine ernsthaft drohende Gefahr bestehen (Urteil vom 12. Juni 2012, VI ZR 138/11). Die Pflicht steht zudem unter dem Vorbehalt des Zumutbaren.',
  },
  {
    question: 'Darf auf Gehwegen Streusalz verwendet werden?',
    answer:
      'Das regelt die Satzung der Gemeinde. § 41 Abs. 4 Straßengesetz Baden-Württemberg erlaubt den Gemeinden, Auftausalze und andere umweltschädliche Mittel einzuschränken oder auszuschließen. Legen Sie im Winterdienstvertrag fest, welche Streumittel auf welchen Flächen eingesetzt werden.',
  },
  {
    question: 'Was gehört in ein Einsatzprotokoll?',
    answer:
      'Mindestens Datum, Beginn und Ende des Einsatzes, Wetterlage, die bearbeiteten Flächen laut Lageplan, die Maßnahme mit Streumittel, Nachkontrollen, Besonderheiten wie zugeparkte Flächen sowie die ausführende Person. Das Protokoll sollte zeitnah geführt und für den Auftraggeber abrufbar sein.',
  },
];

export default function FachwissenStreupflicht() {
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
        title="Räum- und Streupflicht für Unternehmen | AHAD"
        description="Räum- und Streupflicht in Baden-Württemberg: Satzung, Gehweg, Zufahrt und Parkplatz, Übertragung an den Winterdienst, Kontrollpflicht und Einsatzprotokoll."
        keywords="Räumpflicht Unternehmen, Streupflicht Gewerbe, Streupflichtsatzung Villingen-Schwenningen, Verkehrssicherungspflicht Winterdienst, Winterdienst übertragen Haftung, Einsatzprotokoll Winterdienst"
        schema={[articleSchema, faqSchema]}
      />

      <PageHero
        compact
        titleSize="lg"
        eyebrow="Fachwissen · Winterdienst & Haftung"
        title="Räum- und Streupflicht für Unternehmen: Was gilt, wer haftet?"
        lead="Wer Flächen für Beschäftigte, Kunden oder Lieferverkehr öffnet, muss sie bei Schnee und Glätte im zumutbaren Umfang sichern. Die Pflicht lässt sich an einen Winterdienst übertragen. Kontrolle und Überwachung bleiben beim Unternehmen."
        image={IMG.winterdienst}
        imageAlt=""
        crumbs={[{ label: 'Fachwissen', href: '/fachwissen' }, { label: 'Räum- und Streupflicht' }]}
      />

      <ArticleMeta slug={SLUG} />

      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-8">
          <div className="prose prose-lg max-w-none leading-relaxed text-slate">
            <div className="not-prose mb-12 rounded-2xl border border-amber-200 bg-amber-50 p-6">
              <div className="flex items-start gap-3">
                <CircleAlert className="mt-0.5 h-6 w-6 shrink-0 text-amber-700" aria-hidden="true" />
                <div>
                  <h2 className="font-headline text-lg font-bold text-navy">Hinweis: keine Rechtsberatung</h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate">
                    Die folgenden Angaben ordnen Gesetz, Satzung und Rechtsprechung allgemein ein. Sie ersetzen keine
                    anwaltliche Prüfung. Maßgeblich sind die Satzung Ihrer Gemeinde in der aktuellen Fassung, Ihre
                    Verträge und die Umstände des Einzelfalls.
                  </p>
                </div>
              </div>
            </div>

            <h2 id="rechtsgrundlagen-bw" className="scroll-mt-28 font-headline text-2xl font-bold text-navy sm:text-3xl">
              Rechtsgrundlagen in Baden-Württemberg: Gesetz, Satzung, Verkehrssicherung
            </h2>
            <p>
              Für öffentliche Straßen innerhalb der geschlossenen Ortslage weist § 41 Abs. 1 des Straßengesetzes für
              Baden-Württemberg (StrG BW) die Pflicht zum Reinigen, Schneeräumen und Streuen den Gemeinden zu. Sie gilt
              im Rahmen des Zumutbaren und soweit polizeiliche Gründe es erfordern. Nach § 41 Abs. 2 StrG BW können die
              Gemeinden diese Pflichten für Gehwege durch Satzung ganz oder teilweise den Straßenanliegern auferlegen.
              Viele Gemeinden, darunter Villingen-Schwenningen, haben dafür eine Streupflichtsatzung erlassen. Wer im
              Einzelnen verpflichtet ist, etwa Eigentümer oder auch Besitzer eines Grundstücks, regelt die Satzung.
            </p>
            <p>
              Für nicht öffentliche Flächen auf dem Betriebsgelände gilt die Satzung nicht. Hier greift die allgemeine Verkehrssicherungspflicht:
              Wer einen Verkehr eröffnet, muss die zumutbaren Vorkehrungen gegen Gefahren treffen. Für Beschäftigte kommt
              das Arbeitsschutzrecht hinzu. Nach der Technischen Regel für Arbeitsstätten ASR A1.8 müssen Verkehrswege im
              Freien, insbesondere Treppen, Laderampen sowie Gebäudeein- und -ausgänge, sicher benutzbar sein; als
              Schutzmaßnahme nennt die Regel ausdrücklich einen Winterdienst. Welche Maßnahmen nötig sind, legt der
              Arbeitgeber in der Gefährdungsbeurteilung fest.
            </p>
            <p>
              Auslöser der Pflicht ist nach der Rechtsprechung des Bundesgerichtshofs eine allgemeine Glätte. Einzelne
              glatte Stellen genügen nur, wenn erkennbare Anhaltspunkte für eine ernsthaft drohende Gefahr bestehen
              (BGH, Urteil vom 12. Juni 2012, VI ZR 138/11).
            </p>

            <div className={tableWrapperClass} role="region" aria-label="Zuständigkeiten nach Flächenart" tabIndex={0}>
              <table className="w-full min-w-[760px] border-collapse text-left text-sm">
                <caption className="caption-top bg-paper px-4 py-3 text-left font-headline font-bold text-navy">
                  Welche Regel gilt für welche Fläche?
                </caption>
                <thead className="bg-navy text-white">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-bold">Fläche</th>
                    <th scope="col" className="px-4 py-3 font-bold">Grundlage</th>
                    <th scope="col" className="px-4 py-3 font-bold">Verantwortlich</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line text-slate">
                  {[
                    [
                      'Öffentlicher Gehweg vor dem Grundstück',
                      '§ 41 StrG BW und Streupflichtsatzung der Gemeinde',
                      'Straßenanlieger, soweit die Satzung die Pflicht überträgt; Umfang, Zeiten und Streumittel laut Satzung',
                    ],
                    [
                      'Fahrbahn der öffentlichen Straße',
                      '§ 41 Abs. 1 StrG BW',
                      'Gemeinde im Rahmen des Zumutbaren',
                    ],
                    [
                      'Zufahrt, Werksweg, Eingang, Treppe, Rampe',
                      'Verkehrssicherungspflicht; für Beschäftigte zusätzlich ASR A1.8',
                      'Eigentümer oder Betreiber, je nach Miet- oder Nutzungsvertrag',
                    ],
                    [
                      'Firmen- oder Kundenparkplatz',
                      'Verkehrssicherungspflicht im Rahmen des Zumutbaren',
                      'Betreiber des Parkplatzes',
                    ],
                  ].map(([area, basis, responsible]) => (
                    <tr key={area}>
                      <th scope="row" className="bg-paper px-4 py-4 font-bold text-navy">{area}</th>
                      <td className="px-4 py-4">{basis}</td>
                      <td className="px-4 py-4">{responsible}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 id="flaechen-zuordnen" className="scroll-mt-28 font-headline text-2xl font-bold text-navy sm:text-3xl">
              Gehweg, Zufahrt und Parkplatz eindeutig zuordnen
            </h2>
            <p>
              Für jede Fläche sollte feststehen, wer sie räumt und streut. Ein Lageplan mit allen Wegen, Zufahrten und
              Stellflächen, der Grundstücksgrenze und der Zuständigkeit je Fläche hält das fest. Er ist zugleich die
              Grundlage für den Winterdienstvertrag.
            </p>

            <h3 className="font-headline text-2xl font-bold text-navy">Gehweg</h3>
            <p>
              Für den öffentlichen Gehweg ist die Satzung maßgeblich. Das Straßengesetz erlaubt den Gemeinden, auch
              Flächen am Fahrbahnrand ohne Gehweg und gemeinsame Rad- und Gehwege einzubeziehen. Hat die Gemeinde die
              Pflicht für den öffentlichen Gehweg nicht übertragen, muss ein Vermieter nach einem Urteil des BGH vom
              21. Februar 2018 (VIII ZR 255/16) in der Regel keine Teile des öffentlichen Gehwegs jenseits der
              Grundstücksgrenze räumen und streuen. Ausnahmen kommen nur unter außergewöhnlichen Umständen in Betracht.
            </p>

            <h3 className="font-headline text-2xl font-bold text-navy">Zufahrt, Eingänge und Wege</h3>
            <p>
              Auf dem Betriebsgelände sind die Wege zu sichern, die Beschäftigte, Besucher und Lieferanten erkennbar
              nutzen: Zufahrten, Hauptwege, Gebäudeeingänge, Treppen und Rampen. Wie weit die Pflicht reicht, richtet
              sich nach Verkehrsbedeutung und Zumutbarkeit.
            </p>

            <h3 className="font-headline text-2xl font-bold text-navy">Parkplatz</h3>
            <p>
              Für einen Supermarktparkplatz hat der BGH am 2. Juli 2019 (VI ZR 184/18) entschieden, dass die Flächen
              zwischen abgestellten Fahrzeugen nicht gestreut werden müssen. Es genügt, die Hauptwege und Zugänge zu
              sichern; kurze Wege über nicht gestreute Flächen sind den Nutzern zuzumuten. Diese Grundsätze gelten nach
              dem Urteil auch für private Parkplätze, wenn die örtlichen Verhältnisse vergleichbar sind.
            </p>

            <h3 className="font-headline text-2xl font-bold text-navy">Mögliche Reihenfolge im Einsatzplan</h3>
            <ol className="not-prose my-8 space-y-3">
              {[
                'Gebäudeein- und -ausgänge, Treppen, Rampen und Laderampen',
                'Öffentlicher Gehweg im Umfang der Satzung, mit Blick auf deren Uhrzeiten',
                'Zufahrten und Hauptwege, einschließlich der Wege über den Parkplatz zum Eingang',
                'Weitere Fahr- und Stellflächen nach Bedarf und Vereinbarung',
              ].map((item, index) => (
                <li key={item} className="flex items-start gap-3 rounded-xl border border-line bg-white p-4 text-sm text-slate">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand/10 text-xs font-black text-brand">
                    {index + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>

            <h2 id="zeiten-streumittel" className="scroll-mt-28 font-headline text-2xl font-bold text-navy sm:text-3xl">
              Zeiten und Streumittel: was die Satzung festlegt
            </h2>
            <p>
              Die Uhrzeiten für öffentliche Gehwege legt jede Gemeinde in ihrer Satzung selbst fest. Für
              Villingen-Schwenningen gelten nach der Streupflichtsatzung in der Fassung vom 4. Dezember 2002 die
              folgenden Zeiten. Prüfen Sie vor jeder Saison, ob die Stadt die Satzung geändert hat. Umliegende Gemeinden
              können abweichende Uhrzeiten festlegen.
            </p>

            <div className={tableWrapperClass} role="region" aria-label="Zeiten der Streupflichtsatzung Villingen-Schwenningen" tabIndex={0}>
              <table className="w-full min-w-[560px] border-collapse text-left text-sm">
                <caption className="caption-top bg-paper px-4 py-3 text-left font-headline font-bold text-navy">
                  Villingen-Schwenningen: Zeiten für Gehwege (Satzung, Fassung 4. Dezember 2002)
                </caption>
                <thead className="bg-navy text-white">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-bold">Tag</th>
                    <th scope="col" className="px-4 py-3 font-bold">Geräumt und gestreut bis</th>
                    <th scope="col" className="px-4 py-3 font-bold">Pflicht endet</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line text-slate">
                  <tr>
                    <th scope="row" className="bg-paper px-4 py-4 font-bold text-navy">Werktags</th>
                    <td className="px-4 py-4">7.00 Uhr</td>
                    <td className="px-4 py-4">20.00 Uhr</td>
                  </tr>
                  <tr>
                    <th scope="row" className="bg-paper px-4 py-4 font-bold text-navy">Sonn- und Feiertage</th>
                    <td className="px-4 py-4">8.30 Uhr</td>
                    <td className="px-4 py-4">20.00 Uhr</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              Innerhalb dieses Zeitfensters ist bei neuem Schneefall oder erneuter Glätte nachzuarbeiten. Für nicht öffentliche
              Betriebsflächen gibt es keine Satzungszeiten. Der Einsatzplan richtet sich dort nach der Nutzung, also nach
              Schichtbeginn, Öffnungszeiten und Anlieferungen.
            </p>

            <h3 className="font-headline text-2xl font-bold text-navy">Streumittel</h3>
            <p>
              Abstumpfende Mittel wie Splitt, Sand oder Granulat erhöhen die Griffigkeit. Auftauende Mittel wie Streusalz
              lösen Eis und Schnee. § 41 Abs. 4 StrG BW erlaubt den Gemeinden, Auftausalze und andere Mittel mit
              möglichen Umweltschäden in der Satzung einzuschränken oder auszuschließen. Welches Mittel auf dem
              öffentlichen Gehweg zulässig ist, steht deshalb in der örtlichen Satzung. Für Betriebsflächen sollte der
              Vertrag je Fläche festlegen, welches Streumittel eingesetzt wird und wer es nach dem Winter wieder aufnimmt.
            </p>

            <h2 id="winterdienst-beauftragen" className="scroll-mt-28 font-headline text-2xl font-bold text-navy sm:text-3xl">
              Pflicht an einen Winterdienst übertragen: was beim Unternehmen bleibt
            </h2>
            <p>
              Die Verkehrssicherungspflicht lässt sich vertraglich auf einen Dienstleister übertragen. Nach dem Urteil
              des BGH vom 22. Januar 2008 (VI ZR 126/07) muss die Übertragung klar und eindeutig vereinbart sein. Der
              Dienstleister haftet dann selbst. Beim ursprünglich Verpflichteten verkürzt sich die Pflicht auf Kontrolle
              und Überwachung; sie entfällt nicht.
            </p>
            <p>
              Was die Kontrollpflicht konkret verlangt, hängt vom Einzelfall ab. In der Praxis gehören dazu die Auswahl
              eines geeigneten Dienstleisters, Stichproben an Einsatztagen, die regelmäßige Durchsicht der
              Einsatzprotokolle und eine Reaktion auf gemeldete Mängel.
            </p>

            <div className="not-prose my-10 rounded-2xl border border-amber-200 bg-amber-50 p-6">
              <div className="flex items-start gap-3">
                <CircleAlert className="mt-0.5 h-6 w-6 shrink-0 text-amber-700" aria-hidden="true" />
                <div>
                  <h3 className="font-headline text-lg font-bold text-navy">Sonderfall Vermietung</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate">
                    Mit Urteil vom 6. August 2025 (VIII ZR 250/23) hat der BGH entschieden, dass ein vermietender
                    Wohnungseigentümer für einen Sturz seines Mieters auf vereistem Gemeinschaftsgrund haftet, wenn die
                    Räum- und Streupflicht verletzt wurde. Der beauftragte Dienstleister gilt im Verhältnis zum Mieter
                    als Erfüllungsgehilfe; sein Verschulden wird dem Vermieter zugerechnet. Eine Beschränkung auf
                    Überwachungspflichten reichte hier nicht. Die Entscheidung betrifft eine Wohnungsmiete. Ob sie auf
                    gewerbliche Mietverhältnisse übertragbar ist, sollten Vermieter rechtlich prüfen lassen.
                  </p>
                </div>
              </div>
            </div>

            <h2 id="einsatzprotokoll-vertrag" className="scroll-mt-28 font-headline text-2xl font-bold text-navy sm:text-3xl">
              Einsatzprotokoll und Vertrag: Nachweise und Checkliste
            </h2>
            <p>
              Nach einem Sturz geht es meist um die Frage, wann welche Fläche geräumt und gestreut wurde. Ein zeitnah
              geführtes Einsatzprotokoll macht das nachvollziehbar und dient dem Auftraggeber zugleich als Grundlage für
              seine Kontrolle.
            </p>

            <div className={tableWrapperClass} role="region" aria-label="Inhalte eines Einsatzprotokolls" tabIndex={0}>
              <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                <caption className="caption-top bg-paper px-4 py-3 text-left font-headline font-bold text-navy">
                  Inhalte eines Einsatzprotokolls im Winterdienst
                </caption>
                <thead className="bg-navy text-white">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-bold">Angabe</th>
                    <th scope="col" className="px-4 py-3 font-bold">Inhalt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line text-slate">
                  {[
                    ['Zeit', 'Datum, Beginn und Ende des Einsatzes'],
                    ['Wetterlage', 'Schneefall, Eisregen, Reifglätte oder überfrierende Nässe, soweit beobachtet'],
                    ['Flächen', 'Bearbeitete Flächen mit Bezug zum Lageplan'],
                    ['Maßnahme', 'Geräumt, gestreut oder beides; eingesetztes Streumittel'],
                    ['Nacharbeit', 'Kontrollgänge und wiederholte Einsätze mit Uhrzeit'],
                    ['Besonderheiten', 'Nicht zugängliche Flächen, etwa durch abgestellte Fahrzeuge, und gemeldete Mängel'],
                    ['Ausführung', 'Name der ausführenden Person oder Kolonne'],
                  ].map(([label, content]) => (
                    <tr key={label}>
                      <th scope="row" className="bg-paper px-4 py-4 font-bold text-navy">{label}</th>
                      <td className="px-4 py-4">{content}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className="font-headline text-2xl font-bold text-navy">Checkliste für den Winterdienstvertrag</h3>
            <ul className="not-prose my-8 space-y-3">
              {[
                'Flächen mit Lageplan, Grundstücksgrenze und Reihenfolge der Bearbeitung',
                'Ausdrückliche Übertragung der Räum- und Streupflicht für genau diese Flächen, einschließlich des Gehwegs nach Satzung',
                'Zeitfenster je Fläche: Satzungszeiten für den Gehweg, Schicht- und Öffnungszeiten für das Betriebsgelände',
                'Einsatzauslöser, Wetterbeobachtung und Bereitschaft, auch an Sonn- und Feiertagen',
                'Zulässige Streumittel je Fläche und die Aufnahme abstumpfender Mittel nach der Saison',
                'Ablageflächen für geräumten Schnee, die keine Wege, Ausgänge oder Stellflächen blockieren',
                'Form, Inhalt und Abruf der Einsatzprotokolle',
                'Ansprechpartner, Meldeweg für Mängel und vereinbarte Reaktion',
                'Nachweis der Haftpflichtversicherung des Dienstleisters',
                'Einsatz von Nachunternehmern nur nach vorheriger Zustimmung',
                'Saisonbeginn und -ende, Laufzeit und Vergütungsmodell',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-xl border border-line bg-white p-4 text-sm text-slate">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="not-prose my-10 rounded-2xl border border-line bg-paper p-6">
              <div className="flex items-start gap-3">
                <ClipboardCheck className="mt-0.5 h-6 w-6 shrink-0 text-brand" aria-hidden="true" />
                <div>
                  <h3 className="font-headline text-lg font-bold text-navy">Kontrolle beim Auftraggeber</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate">
                    Benennen Sie intern eine verantwortliche Person, sehen Sie die Protokolle regelmäßig durch und
                    halten Sie Stichproben und Mängelmeldungen schriftlich fest. Diese Unterlagen zeigen, dass die
                    verbleibende Überwachungspflicht wahrgenommen wurde.
                  </p>
                </div>
              </div>
            </div>

            <div className="not-prose mt-10 rounded-2xl border border-brand/20 bg-brand/5 p-6">
              <div className="flex items-start gap-3">
                <Snowflake className="mt-0.5 h-6 w-6 shrink-0 text-brand" aria-hidden="true" />
                <div>
                  <h3 className="font-headline text-lg font-bold text-navy">Winterdienst durch AHAD</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate">
                    Im{' '}
                    <Link to="/leistungen/winterdienst-hausmeisterservice" className="font-bold text-brand hover:underline">
                      Winterdienst und Hausmeisterservice
                    </Link>{' '}
                    übernehmen wir die Räum- und Streupflicht für die vereinbarten Flächen vertraglich. Wir beobachten die
                    Wetterlage, beginnen bei Bedarf ab 4 Uhr und protokollieren jeden Einsatz mit Zeit, Fläche und
                    Maßnahme. Die Kontroll- und Überwachungspflicht bleibt beim Eigentümer oder Betreiber; die
                    Protokolle unterstützen ihn dabei.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper py-16 lg:py-24" aria-labelledby="streupflicht-faq">
        <div className="mx-auto max-w-4xl px-4 sm:px-8">
          <div className="mb-12 text-center">
            <span className="eyebrow justify-center text-brand">Häufige Fragen</span>
            <h2 id="streupflicht-faq" className="mt-4 font-headline text-2xl font-bold text-navy sm:text-3xl lg:text-4xl">
              Fragen zur Räum- und Streupflicht
            </h2>
          </div>
          <Accordion items={faqItems} />
        </div>
      </section>

      <ArticleFooter slug={SLUG} />

      <CTABand
        title="Winterdienst für Ihre Betriebsflächen planen"
        lead="Wir nehmen Gehwege, Zufahrten und Parkflächen mit Ihnen auf und stimmen Reihenfolge, Zeitfenster und Protokollierung ab. Rechtliche Einzelfragen lassen Sie bitte anwaltlich prüfen."
      />
    </article>
  );
}
