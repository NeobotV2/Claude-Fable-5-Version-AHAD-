import { motion } from 'motion/react';
import { BookOpen, Euro, Calculator, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import Accordion from '@/components/ui/Accordion';
import CTABand from '@/components/CTABand';
import { IMG } from '@/lib/images';
import ArticleMeta from '@/components/ArticleMeta';
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
    <div>
      <SEO
        title="Was kostet Gebäudereinigung? Stundensatz & m²-Preise | AHAD"
        description="Gebäudereinigung kalkulieren: Kostenbestandteile, Leistungswerte, daraus abgeleitete m²-Preise und illustrative Monatsbeispiele mit offengelegten Annahmen."
        keywords="Was kostet Gebäudereinigung, Gebäudereinigung Kosten, Büroreinigung Kosten pro m², Stundensatz Gebäudereinigung, Unterhaltsreinigung Preis, Reinigung Preise Villingen-Schwenningen, AHAD Cleaning"
        schema={[articleSchema, faqSchema]}
      />

      {/* Hero */}
      <section className="relative pt-36 pb-20 lg:pt-44 lg:pb-28 bg-navy text-white overflow-hidden grain">
        <div className="absolute inset-0 opacity-40">
          <img
            src={IMG.unterhaltDetail}
            alt="Professionelle Gebäudereinigung — was kostet sie?"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-navy/60" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div initial={false} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <span className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm font-bold mb-6 tracking-wider uppercase border border-white/20">
              <BookOpen className="w-4 h-4 text-[#9CDDB7]" />
              Fachwissen: Kosten &amp; Kalkulation
            </span>
            <h1 className="display-lg text-white mb-8">Was kostet Gebäudereinigung? Stundensatz, m²-Preise &amp; Beispiele</h1>
            <p className="text-xl text-blue-100 leading-relaxed mb-10 font-medium">
              Transparent statt Blackbox: Wie sich Reinigungskosten wirklich zusammensetzen, was hinter dem
              Stundensatz steckt — und wie Sie daraus den Preis für Ihr Objekt ableiten.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Auf einen Blick */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-black text-[#0B2341] mb-8 text-center">Reinigungskosten auf einen Blick</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#f7f9fb] p-6 rounded-2xl border border-gray-100">
              <Euro className="w-8 h-8 text-[#0D6B38] mb-4" />
              <h3 className="font-bold text-lg mb-2 text-[#0B2341]">Stundensatz</h3>
              <p className="text-[#424751] text-sm">
                Im Artikel als <strong>Rechenannahme 34 € je Stunde</strong>. Das ist kein Preisversprechen; ein
                Angebot benötigt den konkreten Leistungsumfang.
              </p>
            </div>
            <div className="bg-[#f7f9fb] p-6 rounded-2xl border border-gray-100">
              <Calculator className="w-8 h-8 text-[#0B2341] mb-4" />
              <h3 className="font-bold text-lg mb-2 text-[#0B2341]">m²-Preis</h3>
              <p className="text-[#424751] text-sm">
                Ergibt sich aus Stundensatz ÷ Leistungswert. Die Spannen im Artikel sind{' '}
                <strong>illustrative Rechenwerte</strong>, keine Markt- oder Angebotswerte.
              </p>
            </div>
            <div className="bg-[#f7f9fb] p-6 rounded-2xl border border-gray-100">
              <Clock className="w-8 h-8 text-[#0B2341] mb-4" />
              <h3 className="font-bold text-lg mb-2 text-[#0B2341]">Größter Hebel</h3>
              <p className="text-[#424751] text-sm">
                Nicht nur der Stundensatz, sondern auch das <strong>Reinigungsintervall</strong>: Eine bedarfsorientierte
                Taktung kann Stunden reduzieren, sofern Hygiene- und Qualitätsziele eingehalten werden.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ArticleMeta slug="was-kostet-gebaeudereinigung-stundensatz-preise" />

      {/* Content */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose prose-lg max-w-none text-[#424751] leading-relaxed">
            <h2 className="text-3xl font-black text-[#0B2341] mb-6">Der Stundensatz: Kostenbestandteile transparent machen</h2>
            <p className="mb-6">
              Für die folgenden Formeln verwenden wir <strong>34 € pro Reinigungsstunde als illustrative Annahme</strong>.
              Sie ist weder Marktspanne noch Preisversprechen. Entscheidend ist, welche Leistungen und Kostenbestandteile
              ein konkret angebotenes Stundenentgelt abdeckt:
            </p>
            <div className="overflow-x-auto mb-8 rounded-2xl border border-gray-200 shadow-sm">
              <table className="w-full text-left text-sm border-collapse bg-white">
                <thead>
                  <tr className="bg-[#0B2341] text-white">
                    <th className="px-4 py-3 font-bold">Kostenbaustein</th>
                    <th className="px-4 py-3 font-bold">Erläuterung</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[#0B2341] align-top">Tariflohn + Lohnnebenkosten</td>
                    <td className="px-4 py-3 align-top">Aktuell geltender Branchenmindestlohn plus Sozialversicherung und Umlagen; den jeweils aktuellen Wert weist das BMAS aus.</td>
                  </tr>
                  <tr className="bg-[#f7f9fb]">
                    <td className="px-4 py-3 font-semibold text-[#0B2341] align-top">Ausfallzeiten</td>
                    <td className="px-4 py-3 align-top">Urlaub, Krankheit und Feiertage werden bezahlt, sind aber nicht produktiv — sie müssen auf die geleisteten Stunden umgelegt werden.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[#0B2341] align-top">Material &amp; Maschinen</td>
                    <td className="px-4 py-3 align-top">Reinigungsmittel, Verbrauchsmaterial, Maschinenabschreibung und -wartung.</td>
                  </tr>
                  <tr className="bg-[#f7f9fb]">
                    <td className="px-4 py-3 font-semibold text-[#0B2341] align-top">Objektleitung &amp; Qualität</td>
                    <td className="px-4 py-3 align-top">Feste Ansprechperson, Einarbeitung, dokumentierte Qualitätskontrollen, Vertretungsorganisation.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[#0B2341] align-top">Verwaltung, Versicherung, Gewinn</td>
                    <td className="px-4 py-3 align-top">Betriebshaftpflicht, Lohnabrechnung, Disposition — und ein angemessener Unternehmergewinn.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mb-12">
              Die Aufstellung zeigt, warum ein Stundenpreis nur zusammen mit Leistungsumfang, Zeitansatz und
              Kostenbestandteilen bewertet werden sollte. Ein Preis allein belegt weder Qualität noch einen Verstoß.
            </p>

            <h2 className="text-3xl font-black text-[#0B2341] mb-6">Vom Stundensatz zum m²-Preis: der Leistungswert</h2>
            <p className="mb-6">
              Der Stundensatz allein sagt wenig über Ihre Kosten — entscheidend ist der{' '}
              <strong>Leistungswert</strong>: wie viele Quadratmeter eine Reinigungskraft pro Stunde fachgerecht
              schafft. Er hängt von Flächenart, Möblierung und Verschmutzung ab:
            </p>
            <div className="overflow-x-auto mb-8 rounded-2xl border border-gray-200 shadow-sm">
              <table className="w-full text-left text-sm border-collapse bg-white">
                <thead>
                  <tr className="bg-[#0B2341] text-white">
                    <th className="px-4 py-3 font-bold">Flächenart</th>
                    <th className="px-4 py-3 font-bold">Üblicher Leistungswert</th>
                    <th className="px-4 py-3 font-bold">≈ Kosten je m² und Durchgang*</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[#0B2341] align-top">Büroflächen (normal möbliert)</td>
                    <td className="px-4 py-3 align-top">200–300 m²/h</td>
                    <td className="px-4 py-3 align-top">0,11–0,17 €</td>
                  </tr>
                  <tr className="bg-[#f7f9fb]">
                    <td className="px-4 py-3 font-semibold text-[#0B2341] align-top">Verkehrsflächen, Flure, Hallen</td>
                    <td className="px-4 py-3 align-top">300–400 m²/h (maschinell deutlich mehr)</td>
                    <td className="px-4 py-3 align-top">0,09–0,11 €</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[#0B2341] align-top">Sanitärräume</td>
                    <td className="px-4 py-3 align-top">60–90 m²/h</td>
                    <td className="px-4 py-3 align-top">0,38–0,57 €</td>
                  </tr>
                  <tr className="bg-[#f7f9fb]">
                    <td className="px-4 py-3 font-semibold text-[#0B2341] align-top">Stark möblierte / sensible Bereiche</td>
                    <td className="px-4 py-3 align-top">100–180 m²/h</td>
                    <td className="px-4 py-3 align-top">0,19–0,34 €</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mb-12 text-sm text-[#6b7280]">
              *Illustrative Rechenwerte auf Basis einer angenommenen Stunde zu 34 €. Formel: Stundensatz ÷ Leistungswert =
              Kosten je m² und Reinigungsdurchgang. Verbindlich ist ausschließlich das konkrete Angebot.
            </p>

            <h2 className="text-3xl font-black text-[#0B2341] mb-6">Rechenbeispiel: Büroetage mit 500 m²</h2>
            <div className="bg-[#f7f9fb] p-8 rounded-3xl mb-12 border border-gray-100 shadow-sm">
              <p className="mb-4 text-sm">
                Annahmen: 420 m² Büro-/Verkehrsfläche (Leistungswert ~250 m²/h) + 80 m² Sanitär/Küche (~75 m²/h),
                Stundensatz 34 €. Zeit pro Durchgang: 420 ÷ 250 + 80 ÷ 75 ≈ <strong>2,75 Std.</strong> ≈{' '}
                <strong>94 € pro Durchgang</strong>.
              </p>
              <ul className="space-y-2 text-sm list-none pl-0">
                <li className="flex justify-between border-b border-gray-200 pb-2">
                  <span><strong>Tägliche Reinigung</strong> (5×/Woche, ~21 Termine/Monat)</span>
                  <span className="font-bold text-[#0B2341]">≈ 1.970 €/Monat</span>
                </li>
                <li className="flex justify-between border-b border-gray-200 pb-2">
                  <span><strong>3×/Woche</strong> (Sanitär täglich empfohlen — hier vereinfacht)</span>
                  <span className="font-bold text-[#0B2341]">≈ 1.220 €/Monat</span>
                </li>
                <li className="flex justify-between pt-1">
                  <span><strong>Ersparnis durch bedarfsorientierte Taktung</strong></span>
                  <span className="font-bold text-[#0D6B38]">≈ 38 %</span>
                </li>
              </ul>
              <p className="mt-4 text-xs text-[#6b7280]">
                Illustrative Richtwerte, keine Preisgarantie. Die tatsächliche Kalkulation folgt dem{' '}
                <Link to="/fachwissen/leistungsverzeichnis-gebaeudereinigung-erstellen" className="underline">Leistungsverzeichnis</Link>{' '}
                nach Besichtigung.
              </p>
            </div>

            <h2 className="text-3xl font-black text-[#0B2341] mb-6">Was den Preis nach oben oder unten bewegt</h2>
            <ul className="space-y-4 mb-12 list-none pl-0">
              {[
                'Reinigungsintervall: bedarfsorientierte statt starre Taktung kann Stunden reduzieren, wenn Hygiene- und Qualitätsziele eingehalten werden.',
                'Sanitäranteil: hygienekritische Flächen brauchen ein Mehrfaches der Zeit pro m².',
                'Möblierungsgrad & Bodenbelag: Teppich, viele Arbeitsplätze und Hindernisse senken den Leistungswert.',
                'Reinigungszeiten: Randzeiten mit Zuschlägen vs. Tagdienst im laufenden Betrieb.',
                'Objektgröße & Anfahrt: größere zusammenhängende Flächen sind je m² günstiger.',
                'Zusatzleistungen: Glasreinigung, Grundreinigung und Winterdienst werden separat kalkuliert.',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="text-[#0D6B38] w-6 h-6 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="bg-[#f7f9fb] p-8 rounded-3xl mb-12 border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold text-[#0B2341] mb-4 flex items-center gap-3">
                <AlertTriangle className="text-[#0B2341] w-7 h-7" />
                Warnzeichen bei Billigangeboten
              </h3>
              <ul className="space-y-3 text-sm list-none pl-0">
                <li className="border-b border-gray-200 pb-3">
                  <strong className="text-[#0B2341]">Nicht erklärte Kalkulation:</strong> Preis, Zeitansatz,
                  Leistungswert und enthaltene Kostenbestandteile bleiben unklar.
                </li>
                <li className="border-b border-gray-200 pb-3">
                  <strong className="text-[#0B2341]">Pauschalpreis ohne Leistungsverzeichnis:</strong> Sie wissen nicht,
                  welche Leistung Sie vergleichen — der „günstigste" Preis versteckt oft die geringste Leistung.
                </li>
                <li className="border-b border-gray-200 pb-3">
                  <strong className="text-[#0B2341]">Unklare Nachweise:</strong> Relevante Entgelt-, Versicherungs-
                  und Sozialversicherungsnachweise sollten aktuell, plausibel und auf den Auftrag bezogen sein.
                </li>
                <li>
                  <strong className="text-[#0B2341]">Nicht begründete Leistungswerte:</strong> Werte müssen zu Fläche,
                  Möblierung, Tätigkeit, Verfahren und Qualitätsziel passen.
                </li>
              </ul>
            </div>

            <h2 className="text-3xl font-black text-[#0B2341] mb-6">Regionaler Bezug: Preise in Villingen-Schwenningen und Umgebung</h2>
            <p className="mb-8">
              Ob <Link to="/standorte/villingen-schwenningen" className="text-[#0B2341] font-bold hover:underline">Villingen-Schwenningen</Link>,{' '}
              <Link to="/standorte/stuttgart" className="text-[#0B2341] font-bold hover:underline">Stuttgart</Link> oder{' '}
              <Link to="/standorte/konstanz" className="text-[#0B2341] font-bold hover:underline">Konstanz</Link> — der
              Branchenmindestlohn gilt bundesweit. Konkrete Angebote können sich dennoch durch Leistungsumfang,
              Zuschläge, Anfahrt, Objektbedingungen, Verfahren und Risikoverteilung unterscheiden. Vergleichen Sie
              deshalb einheitliche Leistungsverzeichnisse statt isolierter Stunden- oder Quadratmeterpreise.
            </p>

            <h2 className="text-3xl font-black text-[#0B2341] mb-6">Fazit</h2>
            <p className="mb-8">
              Eine belastbare Kalkulation verbindet Kostenbestandteile, Leistungswert und das passende{' '}
              <Link to="/fachwissen/unterhaltsreinigung-unternehmen-reinigungsintervalle" className="text-[#0B2341] font-bold hover:underline">
                Reinigungsintervall
              </Link>
              . Wer Angebote auf Basis eines sauberen Leistungsverzeichnisses vergleicht, zahlt nicht für Blackboxen —
              und erkennt Dumping-Angebote, bevor sie teuer werden.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 lg:py-32 bg-[#f7f9fb]">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-[#0B2341] font-bold tracking-wider uppercase text-sm mb-4 block">Häufige Fragen</span>
            <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-[#0B2341]">FAQs zu Reinigungskosten</h2>
          </div>
          <Accordion items={faqSchema.mainEntity.map((q) => ({ question: q.name, answer: q.acceptedAnswer.text }))} />
        </div>
      </section>

      <CTABand
        title="Was kostet die Reinigung Ihres Objekts?"
        lead="Objektbesichtigung nach Abstimmung, belastbares Angebot auf Basis des vereinbarten Leistungsumfangs — transparent und nachvollziehbar kalkuliert."
      />
    </div>
  );
}
