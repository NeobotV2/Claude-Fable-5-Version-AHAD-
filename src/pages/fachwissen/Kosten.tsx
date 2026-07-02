import { motion } from 'motion/react';
import { BookOpen, Euro, Calculator, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import Accordion from '@/components/ui/Accordion';
import CTABand from '@/components/CTABand';
import { IMG } from '@/lib/images';

export default function FachwissenKosten() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Was kostet Gebäudereinigung? Stundensatz, m²-Preise und Rechenbeispiele',
    datePublished: '2026-07-02',
    dateModified: '2026-07-02',
    description:
      'Was kostet professionelle Gebäudereinigung? Stundensätze ab 34 €, Leistungswerte je Fläche, daraus abgeleitete m²-Preise und Monatsbeispiele — plus Warnzeichen für unseriöse Billigangebote.',
    author: { '@type': 'Organization', name: 'AHAD Cleaning Company GmbH' },
    publisher: {
      '@type': 'Organization',
      name: 'AHAD Cleaning Company GmbH',
      logo: { '@type': 'ImageObject', url: 'https://ahad-cleaning.de/logo.png' },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://ahad-cleaning.de/fachwissen/was-kostet-gebaeudereinigung-stundensatz-preise',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Was kostet Gebäudereinigung pro Stunde?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Bei AHAD Cleaning beginnt der Stundensatz für professionelle Gebäudereinigung bei 34 € pro Reinigungsstunde. Darin enthalten sind tarifgebundenes, festangestelltes Personal inklusive aller Lohnnebenkosten, Reinigungsmittel und Maschinen, eine feste Objektleitung, dokumentierte Qualitätskontrollen sowie der volle Versicherungsschutz. Marktüblich liegen seriös kalkulierte Stundensätze in der Gebäudereinigung je nach Region und Leistung meist zwischen etwa 30 und 45 €.',
        },
      },
      {
        '@type': 'Question',
        name: 'Was kostet Büroreinigung pro Quadratmeter?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Der m²-Preis ergibt sich aus Stundensatz und Leistungswert (wie viele m² eine Kraft pro Stunde schafft). Bei einem Stundensatz ab 34 € und üblichen Leistungswerten von 200 bis 300 m²/h für Büroflächen ergeben sich rund 0,11 bis 0,17 € pro m² und Reinigungsdurchgang. Bei täglicher Reinigung (ca. 21 Arbeitstage) entspricht das grob 2,40 bis 3,60 € pro m² und Monat; bei 2 bis 3 Durchgängen pro Woche entsprechend weniger. Verbindliche Preise erfordern immer eine Objektbesichtigung, da Möblierung, Bodenbelag und Sanitäranteil den Aufwand stark beeinflussen.',
        },
      },
      {
        '@type': 'Question',
        name: 'Wie setzt sich der Stundensatz in der Gebäudereinigung zusammen?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Den größten Anteil macht der Lohn aus: Der allgemeinverbindliche Branchenmindestlohn (Lohngruppe 1, Innenreinigung) plus Lohnnebenkosten (Sozialversicherung, Umlagen) ergibt bereits rund 18 bis 19 € reine Personalkosten je produktiver Stunde. Hinzu kommen bezahlte Ausfallzeiten (Urlaub, Krankheit, Feiertage), Reinigungsmittel und Maschinen, Anfahrt, Objektleitung und Qualitätskontrolle, Verwaltung, Versicherungen sowie ein angemessener Unternehmergewinn. Seriös kalkulierte Angebote liegen deshalb kaum unter etwa 28 bis 30 € pro Stunde.',
        },
      },
      {
        '@type': 'Question',
        name: 'Warum sind sehr billige Reinigungsangebote riskant?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Wer deutlich unter rund 28 € pro Stunde anbietet, kann Tariflohn, Sozialabgaben, Material und Betreuung rechnerisch kaum abdecken. In der Praxis wird dann an Reinigungszeit („Turbo-Reinigung"), an der Betreuung oder an der legalen Beschäftigung gespart — mit Folgen von schleichendem Qualitätsverfall bis zur Auftraggeberhaftung nach § 28e SGB IV, wenn der Dienstleister keine Sozialabgaben abführt. Lassen Sie sich die Kalkulationsgrundlage (Stundensatz, Leistungswert, Tariflohn) immer offenlegen.',
        },
      },
      {
        '@type': 'Question',
        name: 'Festpreis oder Abrechnung nach Stunden — was ist besser?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Für die laufende Unterhaltsreinigung ist ein monatlicher Festpreis auf Basis eines Leistungsverzeichnisses üblich und planbar: Er wird aus Fläche, Intervallen und Leistungswerten kalkuliert und ändert sich nur, wenn sich die Leistung ändert. Stundenabrechnung eignet sich für schwer planbare Einsätze wie Sonderreinigungen, Bauzwischenreinigung oder kurzfristige Zusatzarbeiten. AHAD arbeitet mit transparentem Festpreis plus ausgewiesenem Stundensatz (ab 34 €) für Zusatzleistungen.',
        },
      },
      {
        '@type': 'Question',
        name: 'Wie bekomme ich einen verbindlichen Preis für mein Objekt?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Über eine kostenlose Objektbesichtigung: Dabei werden Flächen, Bodenbeläge, Nutzung und gewünschte Intervalle aufgenommen und in einem Leistungsverzeichnis festgehalten. Auf dieser Basis erhalten Sie ein belastbares Festpreisangebot — bei AHAD in der Regel innerhalb von 24 Stunden nach der Besichtigung, die meist binnen 48 Stunden stattfindet.',
        },
      },
    ],
  };

  return (
    <div>
      <SEO
        title="Was kostet Gebäudereinigung? Stundensatz & m²-Preise | AHAD"
        description="Gebäudereinigung Kosten transparent erklärt: Stundensatz ab 34 €, Leistungswerte je Flächenart, daraus abgeleitete m²-Preise und Monatsbeispiele — plus Warnzeichen für Billigangebote."
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
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
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
                Bei AHAD <strong>ab 34 € je Reinigungsstunde</strong> — inklusive Personal mit Lohnnebenkosten,
                Material, Maschinen, Objektleitung und Versicherung.
              </p>
            </div>
            <div className="bg-[#f7f9fb] p-6 rounded-2xl border border-gray-100">
              <Calculator className="w-8 h-8 text-[#0B2341] mb-4" />
              <h3 className="font-bold text-lg mb-2 text-[#0B2341]">m²-Preis</h3>
              <p className="text-[#424751] text-sm">
                Ergibt sich aus Stundensatz ÷ Leistungswert: für Büroflächen typischerweise{' '}
                <strong>0,11–0,17 € pro m² und Durchgang</strong>.
              </p>
            </div>
            <div className="bg-[#f7f9fb] p-6 rounded-2xl border border-gray-100">
              <Clock className="w-8 h-8 text-[#0B2341] mb-4" />
              <h3 className="font-bold text-lg mb-2 text-[#0B2341]">Größter Hebel</h3>
              <p className="text-[#424751] text-sm">
                Nicht der Stundensatz, sondern das <strong>Reinigungsintervall</strong>: bedarfsorientierte Taktung
                spart oft 30–40 % gegenüber starrer täglicher Reinigung.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose prose-lg max-w-none text-[#424751] leading-relaxed">
            <h2 className="text-3xl font-black text-[#0B2341] mb-6">Der Stundensatz: ab 34 € — und was darin steckt</h2>
            <p className="mb-6">
              Bei AHAD Cleaning beginnt der Stundensatz für professionelle Gebäudereinigung bei{' '}
              <strong>34 € pro Reinigungsstunde</strong>. Marktüblich liegen seriös kalkulierte Sätze in der Branche je
              nach Region und Leistung meist zwischen etwa 30 und 45 €. Entscheidend ist, was der Satz abdeckt — denn
              genau hier unterscheiden sich Angebote:
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
                    <td className="px-4 py-3 align-top">Allgemeinverbindlicher Branchenmindestlohn (Lohngruppe 1) plus Sozialversicherung und Umlagen — bereits rund 18–19 € je produktiver Stunde.</td>
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
              Die Rechnung zeigt: <strong>Unter etwa 28–30 € je Stunde ist eine legale, tarifkonforme Reinigung kaum
              darstellbar.</strong> Angebote deutlich darunter sparen zwangsläufig an Zeit, Betreuung oder — im
              schlimmsten Fall — an der legalen Beschäftigung.
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
              *Richtwerte auf Basis des AHAD-Einstiegssatzes von 34 €/h. Formel: Stundensatz ÷ Leistungswert =
              Kosten je m² und Reinigungsdurchgang. Verbindlich ist immer die Kalkulation nach Objektbesichtigung.
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
                'Reinigungsintervall: der mit Abstand größte Hebel — bedarfsorientiert statt starr spart oft 30–40 %.',
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
                  <strong className="text-[#0B2341]">Stundensatz deutlich unter ~28 €:</strong> rechnerisch kaum mit
                  Tariflohn, Sozialabgaben und Betreuung vereinbar.
                </li>
                <li className="border-b border-gray-200 pb-3">
                  <strong className="text-[#0B2341]">Pauschalpreis ohne Leistungsverzeichnis:</strong> Sie wissen nicht,
                  welche Leistung Sie vergleichen — der „günstigste" Preis versteckt oft die geringste Leistung.
                </li>
                <li className="border-b border-gray-200 pb-3">
                  <strong className="text-[#0B2341]">Keine Nachweise:</strong> Seriöse Anbieter legen Tariflohn-Basis,
                  Versicherung und Sozialversicherungsnachweise offen. Wichtig wegen der{' '}
                  <strong>Auftraggeberhaftung (§ 28e SGB IV)</strong>: Führt Ihr Dienstleister keine Sozialabgaben ab,
                  können Sie als Auftraggeber haften.
                </li>
                <li>
                  <strong className="text-[#0B2341]">Unrealistische Leistungswerte:</strong> Wer 500 m² Büro pro Stunde
                  verspricht, reinigt nicht — er wischt drüber.
                </li>
              </ul>
            </div>

            <h2 className="text-3xl font-black text-[#0B2341] mb-6">Regionaler Bezug: Preise in Villingen-Schwenningen und Umgebung</h2>
            <p className="mb-8">
              Ob <Link to="/standorte/villingen-schwenningen" className="text-[#0B2341] font-bold hover:underline">Villingen-Schwenningen</Link>,{' '}
              <Link to="/standorte/stuttgart" className="text-[#0B2341] font-bold hover:underline">Stuttgart</Link> oder{' '}
              <Link to="/standorte/konstanz" className="text-[#0B2341] font-bold hover:underline">Konstanz</Link> — der
              allgemeinverbindliche Tariflohn gilt bundesweit, daher unterscheiden sich seriöse Angebote regional nur
              moderat (Anfahrt, Zuschläge, Marktdichte). Ein Angebot, das deutlich unter dem Marktniveau liegt, ist
              deshalb auch in der Region ein Warnsignal und kein Schnäppchen. AHAD kalkuliert mit transparentem
              Festpreis auf Basis eines Leistungsverzeichnisses — der Stundensatz ab 34 € wird für Zusatzleistungen
              offen ausgewiesen.
            </p>

            <h2 className="text-3xl font-black text-[#0B2341] mb-6">Fazit</h2>
            <p className="mb-8">
              Gebäudereinigung kostet bei seriöser Kalkulation <strong>ab etwa 34 € pro Stunde</strong> — was zählt,
              ist die Kombination aus Stundensatz, Leistungswert und vor allem dem richtigen{' '}
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
        lead="Kostenlose Besichtigung in 48 Stunden, belastbares Festpreisangebot in 24 Stunden danach — transparent kalkuliert, ohne versteckte Nachträge."
      />
    </div>
  );
}
