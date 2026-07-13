import { Euro, Calculator, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import Accordion from '@/components/ui/Accordion';
import CTABand from '@/components/CTABand';
import { IMG } from '@/lib/images';
import ArticleMeta from '@/components/ArticleMeta';
import ArticleFooter from '@/components/ArticleFooter';
import PageHero from '@/components/PageHero';
import { buildArticleSchema, EDITORIAL_ARTICLES } from '@/data/editorial';

export default function FachwissenKosten() {
  const articleSchema = buildArticleSchema(
    EDITORIAL_ARTICLES['was-kostet-gebaeudereinigung-stundensatz-preise'],
  );

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Was kostet Gebäudereinigung pro Stunde?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Einen allgemein gültigen Stundensatz gibt es nicht. Er hängt unter anderem von Leistungsumfang, Arbeitsbedingungen, Zeiten, Material, Maschinen und Betreuung ab. Der Artikel nutzt 34 € ausschließlich als transparente Rechenannahme; dies ist weder Marktangabe noch Preisversprechen.',
        },
      },
      {
        '@type': 'Question',
        name: 'Was kostet Büroreinigung pro Quadratmeter?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Der m²-Preis lässt sich als Stundensatz geteilt durch den objektbezogenen Leistungswert modellieren. Die Zahlen im Artikel sind illustrative Rechenwerte mit einer angenommenen Stunde zu 34 € und ersetzen keine Kalkulation für ein konkretes Objekt.',
        },
      },
      {
        '@type': 'Question',
        name: 'Wie setzt sich der Stundensatz in der Gebäudereinigung zusammen?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Zu einer Kalkulation gehören der aktuell geltende Branchenmindestlohn, Lohnneben- und Ausfallkosten sowie je nach Auftrag Material, Maschinen, Anfahrt, Objektleitung, Qualitätskontrolle, Verwaltung, Versicherung, Wagnis und Gewinn. Die aktuelle Lohnuntergrenze sollte direkt beim BMAS geprüft werden.',
        },
      },
      {
        '@type': 'Question',
        name: 'Warum sind sehr billige Reinigungsangebote riskant?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ein niedriger Preis allein belegt keinen Verstoß. Prüfen Sie stattdessen, ob Leistungsumfang, Zeitansatz, Leistungswert und relevante Nachweise nachvollziehbar sind und ob alle Angebote dieselbe Grundlage verwenden. Rechtliche Haftungsfragen sollten im Einzelfall fachlich geprüft werden.',
        },
      },
      {
        '@type': 'Question',
        name: 'Festpreis oder Abrechnung nach Stunden — was ist besser?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ein Festpreis kann bei klar definiertem Leistungsverzeichnis Planbarkeit schaffen; Stundenabrechnung kann für noch nicht sicher quantifizierbare Zusatzleistungen sinnvoll sein. Welche Form passt, hängt von Umfang, Änderungsregeln und Risikoverteilung des konkreten Auftrags ab.',
        },
      },
      {
        '@type': 'Question',
        name: 'Wie bekomme ich einen verbindlichen Preis für mein Objekt?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Über eine Objektbesichtigung: Dabei werden Flächen, Bodenbeläge, Nutzung und gewünschte Intervalle aufgenommen und in einem Leistungsverzeichnis festgehalten. Auf dieser Basis kann anschließend ein belastbares, objektspezifisches Angebot erstellt werden.',
        },
      },
    ],
  };

  return (
    <article>
      <SEO
        title="Was kostet Gebäudereinigung? Stundensatz & m²-Preise | AHAD"
        description="Gebäudereinigung kalkulieren: Kostenbestandteile, Leistungswerte, daraus abgeleitete m²-Preise und illustrative Monatsbeispiele mit offengelegten Annahmen."
        keywords="Was kostet Gebäudereinigung, Gebäudereinigung Kosten, Büroreinigung Kosten pro m², Stundensatz Gebäudereinigung, Unterhaltsreinigung Preis, Reinigung Preise Villingen-Schwenningen, AHAD Cleaning"
        schema={[articleSchema, faqSchema]}
      />

      <PageHero
        compact
        titleSize="lg"
        eyebrow="Fachwissen · Kosten & Kalkulation"
        title="Was kostet Gebäudereinigung? Stundensatz, m²-Preise & Beispiele"
        lead="Wie Kostenbestandteile, Zeitansatz und Leistungswert zusammenwirken — mit transparenten Beispielannahmen statt pauschaler Markt- oder Preisversprechen."
        image={IMG.unterhaltDetail}
        imageAlt=""
        crumbs={[
          { label: 'Fachwissen', href: '/fachwissen' },
          { label: 'Reinigungskosten kalkulieren' },
        ]}
      />

      {/* Auf einen Blick */}
      <section className="border-b border-line bg-white py-12 lg:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <h2 className="mb-8 text-center text-2xl font-black text-navy">Reinigungskosten auf einen Blick</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-line bg-paper p-6">
              <Euro className="mb-4 h-8 w-8 text-accent" aria-hidden="true" />
              <h3 className="mb-2 text-lg font-bold text-navy">Stundensatz</h3>
              <p className="text-sm text-slate">
                Im Artikel als <strong>Rechenannahme 34 € je Stunde</strong>. Das ist kein Preisversprechen; ein
                Angebot benötigt den konkreten Leistungsumfang.
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-paper p-6">
              <Calculator className="mb-4 h-8 w-8 text-brand" aria-hidden="true" />
              <h3 className="mb-2 text-lg font-bold text-navy">m²-Preis</h3>
              <p className="text-sm text-slate">
                Ergibt sich aus Stundensatz ÷ Leistungswert. Sämtliche Zahlen im Artikel sind{' '}
                <strong>hypothetische Eingaben und Rechenergebnisse</strong>, keine Markt- oder Angebotswerte.
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-paper p-6">
              <Clock className="mb-4 h-8 w-8 text-brand" aria-hidden="true" />
              <h3 className="mb-2 text-lg font-bold text-navy">Zeitansatz &amp; Turnus</h3>
              <p className="text-sm text-slate">
                Nicht nur der Stundensatz, sondern auch das <strong>Reinigungsintervall</strong>: Eine bedarfsorientierte
                Taktung verändert den Stundenbedarf, sofern feste Hygiene-, Leistungs- und Qualitätsziele eingehalten
                und adaptive Leistungen nachvollziehbar gesteuert werden.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ArticleMeta slug="was-kostet-gebaeudereinigung-stundensatz-preise" />

      {/* Content */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-8">
          <div className="prose prose-lg max-w-none leading-relaxed text-slate">
            <h2 id="kostenbestandteile" className="scroll-mt-28 text-2xl font-black text-navy sm:text-3xl">Der Stundensatz: Kostenbestandteile transparent machen</h2>
            <p className="mb-6">
              Für die folgenden Formeln verwenden wir <strong>34 € pro Reinigungsstunde als illustrative Annahme</strong>.
              Sie ist weder Marktspanne noch Preisversprechen. Entscheidend ist, welche Leistungen und Kostenbestandteile
              ein konkret angebotenes Stundenentgelt abdeckt:
            </p>
            <div
              className="mb-8 overflow-x-auto rounded-2xl border border-line shadow-soft"
              role="region"
              aria-label="Kostenbestandteile eines kalkulierten Stundensatzes"
              tabIndex={0}
            >
              <table className="min-w-[42rem] w-full border-collapse bg-white text-left text-sm">
                <caption className="sr-only">Kostenbestandteile, die ein kalkulierter Stundensatz abdecken kann</caption>
                <thead>
                  <tr className="bg-navy text-white">
                    <th scope="col" className="px-4 py-3 font-bold">Kostenbaustein</th>
                    <th scope="col" className="px-4 py-3 font-bold">Erläuterung</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  <tr>
                    <th scope="row" className="px-4 py-3 font-semibold text-navy align-top">Tariflohn + Lohnnebenkosten</th>
                    <td className="px-4 py-3 align-top">Aktuell geltender Branchenmindestlohn plus Sozialversicherung und Umlagen; den jeweils aktuellen Wert weist das BMAS aus.</td>
                  </tr>
                  <tr className="bg-paper">
                    <th scope="row" className="px-4 py-3 font-semibold text-navy align-top">Ausfallzeiten</th>
                    <td className="px-4 py-3 align-top">Urlaub, Krankheit und Feiertage werden bezahlt, sind aber nicht produktiv — sie müssen auf die geleisteten Stunden umgelegt werden.</td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-4 py-3 font-semibold text-navy align-top">Material &amp; Maschinen</th>
                    <td className="px-4 py-3 align-top">Reinigungsmittel, Verbrauchsmaterial, Maschinenabschreibung und -wartung.</td>
                  </tr>
                  <tr className="bg-paper">
                    <th scope="row" className="px-4 py-3 font-semibold text-navy align-top">Objektleitung &amp; Qualität</th>
                    <td className="px-4 py-3 align-top">Feste Ansprechperson, Einarbeitung, dokumentierte Qualitätskontrollen, Vertretungsorganisation.</td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-4 py-3 font-semibold text-navy align-top">Verwaltung, Versicherung, Gewinn</th>
                    <td className="px-4 py-3 align-top">Betriebshaftpflicht, Lohnabrechnung, Disposition — und ein angemessener Unternehmergewinn.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mb-12">
              Die Aufstellung zeigt, warum ein Stundenpreis nur zusammen mit Leistungsumfang, Zeitansatz und
              Kostenbestandteilen bewertet werden sollte. Ein Preis allein belegt weder Qualität noch einen Verstoß.
            </p>

            <h2 id="leistungswert" className="scroll-mt-28 text-2xl font-black text-navy sm:text-3xl">Vom Stundensatz zum m²-Preis: der Leistungswert</h2>
            <p className="mb-6">
              Der Stundensatz allein sagt wenig über Ihre Kosten — entscheidend ist der{' '}
              <strong>Leistungswert</strong>: der für eine konkrete Tätigkeit und Fläche angesetzte Quadratmeterumfang
              je Arbeitsstunde. Er muss aus Verfahren, Zugänglichkeit, Möblierung, Verschmutzung und Qualitätsziel
              objektbezogen begründet werden. Die folgenden Werte sind ausschließlich hypothetische Eingaben, um die
              Rechenlogik zu zeigen:
            </p>
            <div
              className="mb-8 overflow-x-auto rounded-2xl border border-line shadow-soft"
              role="region"
              aria-label="Hypothetische Leistungswerte und Rechenergebnisse"
              tabIndex={0}
            >
              <table className="min-w-[44rem] w-full border-collapse bg-white text-left text-sm">
                <caption className="sr-only">Hypothetische Leistungswerte bei einem angenommenen Stundensatz von 34 Euro</caption>
                <thead>
                  <tr className="bg-navy text-white">
                    <th scope="col" className="px-4 py-3 font-bold">Rechenszenario</th>
                    <th scope="col" className="px-4 py-3 font-bold">Hypothetischer Leistungswert</th>
                    <th scope="col" className="px-4 py-3 font-bold">Ergebnis bei 34 €/h*</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  <tr>
                    <th scope="row" className="px-4 py-3 font-semibold text-navy align-top">Beispiel A</th>
                    <td className="px-4 py-3 align-top">250 m²/h</td>
                    <td className="px-4 py-3 align-top">0,136 €/m², gerundet 0,14 €/m²</td>
                  </tr>
                  <tr className="bg-paper">
                    <th scope="row" className="px-4 py-3 font-semibold text-navy align-top">Beispiel B</th>
                    <td className="px-4 py-3 align-top">350 m²/h</td>
                    <td className="px-4 py-3 align-top">0,097 €/m², gerundet 0,10 €/m²</td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-4 py-3 font-semibold text-navy align-top">Beispiel C</th>
                    <td className="px-4 py-3 align-top">75 m²/h</td>
                    <td className="px-4 py-3 align-top">0,453 €/m², gerundet 0,45 €/m²</td>
                  </tr>
                  <tr className="bg-paper">
                    <th scope="row" className="px-4 py-3 font-semibold text-navy align-top">Beispiel D</th>
                    <td className="px-4 py-3 align-top">140 m²/h</td>
                    <td className="px-4 py-3 align-top">0,243 €/m², gerundet 0,24 €/m²</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mb-12 text-sm text-slate">
              *Reine Rechenbeispiele. Formel: Stundensatz ÷ hypothetischer Leistungswert = Kosten je m² und
              Reinigungsdurchgang. Die Werte sind weder Produktivitätsvorgaben noch Marktspannen; belastbare Eingaben
              entstehen erst aus dem konkreten Objekt und Leistungsziel.
            </p>

            <h2 id="rechenbeispiel" className="scroll-mt-28 text-2xl font-black text-navy sm:text-3xl">Rechenbeispiel: Büroetage mit 500 m²</h2>
            <div className="mb-12 rounded-3xl border border-line bg-paper p-6 shadow-soft sm:p-8">
              <p className="mb-4 text-sm">
                Ausschließlich zur Illustration nehmen wir 420 m² Büro-/Verkehrsfläche mit 250 m²/h, 80 m²
                Sanitär-/Küchenfläche mit 75 m²/h und einen kalkulierten Stundensatz von 34 € an. Diese Eingaben sind
                keine Empfehlung für ein reales Objekt.
              </p>
              <ul className="list-none space-y-2 pl-0 text-sm">
                <li className="flex flex-col justify-between gap-1 border-b border-line pb-2 sm:flex-row">
                  <span><strong>Zeitansatz Büro/Verkehr</strong>: 420 ÷ 250</span>
                  <span className="font-bold text-navy">1,68 Std.</span>
                </li>
                <li className="flex flex-col justify-between gap-1 border-b border-line pb-2 sm:flex-row">
                  <span><strong>Zeitansatz Sanitär/Küche</strong>: 80 ÷ 75</span>
                  <span className="font-bold text-navy">1,07 Std.</span>
                </li>
                <li className="flex flex-col justify-between gap-1 border-b border-line pb-2 sm:flex-row">
                  <span><strong>Gesamtzeit pro vollständigem Durchgang</strong></span>
                  <span className="font-bold text-navy">2,75 Std.</span>
                </li>
                <li className="flex flex-col justify-between gap-1 pt-1 sm:flex-row">
                  <span><strong>Rechenergebnis pro vollständigem Durchgang</strong>: 2,75 × 34 €</span>
                  <span className="font-bold text-accent">93,50 €</span>
                </li>
              </ul>
              <p className="mt-4 text-xs text-slate">
                Ein Monatswert lässt sich erst bilden, wenn der Turnus jeder Raumgruppe feststeht. Büro-, Sanitär- und
                Küchenleistungen dürfen nicht pauschal mit derselben Frequenz hochgerechnet werden. Die tatsächliche
                Kalkulation folgt dem{' '}
                <Link to="/fachwissen/leistungsverzeichnis-gebaeudereinigung-erstellen" className="font-semibold text-brand underline">
                  Leistungsverzeichnis
                </Link>{' '}
                nach Objektaufnahme.
              </p>
            </div>

            <h2 id="preistreiber" className="scroll-mt-28 text-2xl font-black text-navy sm:text-3xl">Was den Preis nach oben oder unten bewegt</h2>
            <ul className="space-y-4 mb-12 list-none pl-0">
              {[
                'Reinigungsintervall: bedarfsorientierte statt starre Taktung kann Stunden reduzieren, wenn Hygiene- und Qualitätsziele eingehalten werden.',
                'Sanitäranteil: kleinteilige Ausstattung, definierte Hygieneschritte und Verbrauchsmaterial können den Zeitansatz erhöhen.',
                'Möblierungsgrad & Bodenbelag: Teppich, viele Arbeitsplätze und Hindernisse senken den Leistungswert.',
                'Reinigungszeiten: Randzeiten mit Zuschlägen vs. Tagdienst im laufenden Betrieb.',
                'Flächenzuschnitt & Logistik: zusammenhängende Reviere können Wege- und Rüstzeiten verringern; Etagen, Zutritte und weite Wege können sie erhöhen.',
                'Zusatzleistungen: Glasreinigung, Grundreinigung und Winterdienst werden separat kalkuliert.',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-6 w-6 flex-shrink-0 text-accent" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mb-12 rounded-3xl border border-line bg-paper p-6 shadow-soft sm:p-8">
              <h3 className="mb-4 flex items-center gap-3 text-xl font-bold text-navy">
                <AlertTriangle className="h-7 w-7 text-brand" aria-hidden="true" />
                Prüffragen bei auffällig niedrigen Angeboten
              </h3>
              <ul className="space-y-3 text-sm list-none pl-0">
                <li className="border-b border-line pb-3">
                  <strong className="text-navy">Nicht erklärte Kalkulation:</strong> Preis, Zeitansatz,
                  Leistungswert und enthaltene Kostenbestandteile bleiben unklar.
                </li>
                <li className="border-b border-line pb-3">
                  <strong className="text-navy">Pauschalpreis ohne Leistungsverzeichnis:</strong> Ohne gemeinsame
                  Leistungsgrundlage bleibt unklar, welche Umfänge im Preis enthalten sind.
                </li>
                <li className="border-b border-line pb-3">
                  <strong className="text-navy">Unklare Nachweise:</strong> Relevante Entgelt-, Versicherungs-
                  und Sozialversicherungsnachweise sollten aktuell, plausibel und auf den Auftrag bezogen sein.
                </li>
                <li>
                  <strong className="text-navy">Nicht begründete Leistungswerte:</strong> Werte müssen zu Fläche,
                  Möblierung, Tätigkeit, Verfahren und Qualitätsziel passen.
                </li>
              </ul>
            </div>

            <h2 className="text-2xl font-black text-navy sm:text-3xl">Warum Angebote trotz gleicher Lohnuntergrenze abweichen</h2>
            <p className="mb-8">
              Die gesetzliche beziehungsweise tarifliche Lohnuntergrenze ist nur ein Baustein. Unterschiede entstehen
              unter anderem durch Flächenzuschnitt, Rüst- und Wegezeiten, Zutrittsregeln, Schicht- oder Randzeiten,
              Maschinen- und Materialbedarf, Vertretungsorganisation, gewünschte Qualitätskontrollen sowie klar
              abgegrenzte Sonderleistungen. Vergleichbar werden Angebote daher erst, wenn alle Anbieter dieselben
              Objektdaten, Leistungen, Turnusse und Qualitätsziele kalkulieren.
            </p>

            <h2 className="text-2xl font-black text-navy sm:text-3xl">Fazit</h2>
            <p className="mb-8">
              Eine belastbare Kalkulation verbindet Kostenbestandteile, Leistungswert und das passende{' '}
              <Link to="/fachwissen/unterhaltsreinigung-unternehmen-reinigungsintervalle" className="font-bold text-brand hover:underline">
                Reinigungsintervall
              </Link>
              . Wer Angebote auf derselben Leistungsgrundlage vergleicht, kann Zeitansätze, Leistungswerte und
              enthaltene Kostenbestandteile gezielt auf Plausibilität prüfen.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-paper py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-8">
          <div className="mb-12 text-center">
            <span className="mb-4 block text-sm font-bold uppercase tracking-wider text-brand">Häufige Fragen</span>
            <h2 className="text-2xl font-black tracking-tight text-navy sm:text-3xl lg:text-4xl">FAQs zu Reinigungskosten</h2>
          </div>
          <Accordion items={faqSchema.mainEntity.map((q) => ({ question: q.name, answer: q.acceptedAnswer.text }))} />
        </div>
      </section>

      <ArticleFooter slug="was-kostet-gebaeudereinigung-stundensatz-preise" />

      <CTABand
        title="Was kostet die Reinigung Ihres Objekts?"
        lead="Objektbesichtigung nach Abstimmung, belastbares Angebot auf Basis des vereinbarten Leistungsumfangs — transparent und nachvollziehbar kalkuliert."
      />
    </article>
  );
}
