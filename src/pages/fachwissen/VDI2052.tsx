import { motion } from 'motion/react';
import { BookOpen, Flame, ClipboardCheck, CalendarClock, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import Accordion from '@/components/ui/Accordion';
import CTABand from '@/components/CTABand';
import { IMG } from '@/lib/images';

export default function FachwissenVDI2052() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Küchenabluftreinigung nach VDI 2052: Pflicht, Intervalle, Ablauf & Nachweis',
    datePublished: '2026-06-24',
    dateModified: '2026-06-24',
    description:
      'Was schreibt die VDI 2052 für die Reinigung von Küchenlüftungsanlagen vor? Reinigungsintervalle nach Betriebsstunden, Brandschutz, Versicherungsschutz, Ablauf und Dokumentationspflicht.',
    author: { '@type': 'Organization', name: 'AHAD Cleaning Company GmbH' },
    publisher: {
      '@type': 'Organization',
      name: 'AHAD Cleaning Company GmbH',
      logo: { '@type': 'ImageObject', url: 'https://ahad-cleaning.de/logo.png' },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://ahad-cleaning.de/fachwissen/kuechenabluftreinigung-vdi-2052-pflicht-ablauf-nachweis',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Was regelt die VDI 2052 bei Küchenlüftungsanlagen?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Die Richtlinie VDI 2052 (Raumlufttechnik in Küchen) beschreibt Planung, Betrieb und Instandhaltung von raumlufttechnischen Anlagen in gewerblichen Küchen. Sie definiert unter anderem Hygiene- und Reinigungsanforderungen für Dunstabzugshauben, Aerosolabscheider (Filter), Abluftkanäle und Ventilatoren. Ziel ist es, Fettablagerungen zu begrenzen, die Hygiene sicherzustellen und die Brandgefahr durch Fettbrände zu reduzieren.',
        },
      },
      {
        '@type': 'Question',
        name: 'Wie oft muss eine Küchenabluftanlage gereinigt werden?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Das Reinigungsintervall richtet sich nach den jährlichen Betriebsstunden der Küche. Als verbreitete Orientierungswerte gelten: bis 2.000 Betriebsstunden pro Jahr eine Reinigung alle 12 Monate, bei 2.000 bis 4.000 Betriebsstunden alle 6 Monate und bei mehr als 4.000 Betriebsstunden alle 3 Monate. Maßgeblich ist immer der tatsächliche Verschmutzungsgrad; bei starker Fettbelastung (z. B. Frittieren, Grillen, Wok) können kürzere Intervalle nötig sein. Verantwortlich für die Festlegung und Einhaltung ist der Betreiber.',
        },
      },
      {
        '@type': 'Question',
        name: 'Warum ist die Küchenabluftreinigung für den Brandschutz wichtig?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'In Dunstabzugshauben, Filtern und Abluftkanälen lagern sich mit der Zeit Fette und Aerosole ab. Diese Fettablagerungen sind leicht entzündlich und stellen eine erhebliche Brandlast dar. Entzündet sich Fett im Kanalsystem, kann sich ein Brand schnell über die gesamte Lüftungsanlage ausbreiten. Regelmäßige, fachgerechte Reinigung entfernt diese Brandlast und ist damit eine zentrale Brandschutzmaßnahme in jeder gewerblichen Küche.',
        },
      },
      {
        '@type': 'Question',
        name: 'Welche Rolle spielt der Versicherungsschutz?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sachversicherer setzen die regelmäßige, nachweisbare Reinigung der Küchenlüftung häufig als Obliegenheit voraus. Kommt es zu einem Fettbrand und kann der Betreiber keine ordnungsgemäße, dokumentierte Reinigung nachweisen, kann der Versicherungsschutz im Schadensfall gefährdet sein oder gekürzt werden. Ein lückenloses Reinigungsprotokoll ist daher nicht nur Hygiene-, sondern auch Versicherungsnachweis.',
        },
      },
      {
        '@type': 'Question',
        name: 'Wie wird die Reinigung der Küchenabluft nachgewiesen?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Der Nachweis erfolgt über ein Reinigungsprotokoll, das den gereinigten Anlagenumfang, das Datum, den Zustand vor und nach der Reinigung (Fotodokumentation) sowie den nächsten empfohlenen Termin festhält. Seriöse Dienstleister dokumentieren Hauben, Filter, Kanäle und Ventilatoren getrennt und übergeben einen prüffähigen Bericht, den der Betreiber für Behörden, Sachversicherer und die eigene Hygieneorganisation aufbewahrt.',
        },
      },
      {
        '@type': 'Question',
        name: 'Wer ist für die Reinigung der Küchenlüftung verantwortlich?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Verantwortlich ist der Betreiber der Küche (z. B. Gastronom, Hotel, Kantinen- oder Klinikbetreiber). Er muss sicherstellen, dass die Anlage in den richtigen Intervallen fachgerecht gereinigt und dies dokumentiert wird. Die Durchführung wird in der Regel an einen spezialisierten Dienstleister vergeben, die Verantwortung für die Einhaltung verbleibt jedoch beim Betreiber.',
        },
      },
    ],
  };

  return (
    <div>
      <SEO
        title="Küchenabluftreinigung nach VDI 2052: Pflicht & Intervalle | AHAD"
        description="Was schreibt die VDI 2052 für Küchenlüftungsanlagen vor? Reinigungsintervalle nach Betriebsstunden, Brandschutz, Versicherungsschutz, Ablauf und Nachweispflicht — der Leitfaden für Betreiber."
        keywords="Küchenabluftreinigung VDI 2052, Lüftungsreinigung Küche, Dunstabzug reinigen Pflicht, Reinigungsintervall Küchenabluft, Brandschutz Küchenlüftung, Fettbrand, AHAD Cleaning"
        schema={[articleSchema, faqSchema]}
      />

      {/* Hero */}
      <section className="relative pt-36 pb-20 lg:pt-44 lg:pb-28 bg-navy text-white overflow-hidden grain">
        <div className="absolute inset-0 opacity-40">
          <img
            src={IMG.kuechenabluft}
            alt="Reinigung einer Küchenabluftanlage nach VDI 2052"
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
              Fachwissen: Hygiene &amp; Brandschutz
            </span>
            <h1 className="display-lg text-white mb-8">Küchenabluftreinigung nach VDI 2052: Pflicht, Intervalle &amp; Nachweis</h1>
            <p className="text-xl text-blue-100 leading-relaxed mb-10 font-medium">
              Fettablagerungen in der Küchenlüftung sind Brandlast und Hygienerisiko zugleich. Was die VDI 2052 für
              Betreiber gewerblicher Küchen bedeutet — und wie Sie auf der sicheren Seite sind.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Auf einen Blick */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-black text-[#0B2341] mb-8 text-center">Küchenabluftreinigung auf einen Blick</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#f7f9fb] p-6 rounded-2xl border border-gray-100">
              <CalendarClock className="w-8 h-8 text-[#0B2341] mb-4" />
              <h3 className="font-bold text-lg mb-2 text-[#0B2341]">Intervall</h3>
              <p className="text-[#424751] text-sm">
                Nach Betriebsstunden: jährlich, halbjährlich oder vierteljährlich — je nach Nutzung und Fettbelastung.
              </p>
            </div>
            <div className="bg-[#f7f9fb] p-6 rounded-2xl border border-gray-100">
              <Flame className="w-8 h-8 text-[#0D6B38] mb-4" />
              <h3 className="font-bold text-lg mb-2 text-[#0B2341]">Warum</h3>
              <p className="text-[#424751] text-sm">
                Fett im Kanal ist Brandlast. Reinigung senkt die Brandgefahr und sichert Hygiene und Versicherungsschutz.
              </p>
            </div>
            <div className="bg-[#f7f9fb] p-6 rounded-2xl border border-gray-100">
              <ClipboardCheck className="w-8 h-8 text-[#0B2341] mb-4" />
              <h3 className="font-bold text-lg mb-2 text-[#0B2341]">Nachweis</h3>
              <p className="text-[#424751] text-sm">
                Reinigungsprotokoll mit Foto-Dokumentation und Folgetermin — prüffähig für Behörde und Sachversicherer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose prose-lg max-w-none text-[#424751] leading-relaxed">
            <h2 className="text-3xl font-black text-[#0B2341] mb-6">Was die VDI 2052 regelt</h2>
            <p className="mb-8">
              Die Richtlinie <strong>VDI 2052 „Raumlufttechnik in Küchen"</strong> beschreibt Planung, Betrieb und
              Instandhaltung raumlufttechnischer Anlagen in gewerblichen Küchen — von der Großküche über Hotellerie und
              Gastronomie bis zu Kantinen und Kliniken. Für den Reinigungsalltag entscheidend sind die Hygiene- und
              Instandhaltungsanforderungen: Dunstabzugshauben, Aerosolabscheider (Fettfilter), Abluftkanäle und
              Ventilatoren müssen so gepflegt werden, dass sich keine kritischen Fettablagerungen bilden. Damit greift
              die VDI 2052 ineinander mit dem Lebensmittelhygienerecht und den Anforderungen des baulichen wie
              betrieblichen Brandschutzes.
            </p>

            <h2 className="text-3xl font-black text-[#0B2341] mb-6">Reinigungsintervalle nach Betriebsstunden</h2>
            <p className="mb-6">
              Die VDI 2052 koppelt das Reinigungsintervall an die <strong>jährlichen Betriebsstunden</strong> der Küche.
              Je länger und intensiver gekocht wird, desto schneller lagert sich Fett ab — und desto kürzer muss das
              Intervall sein. Die folgenden, in der Praxis verbreiteten Orientierungswerte fassen das zusammen:
            </p>
            <div className="overflow-x-auto mb-8 rounded-2xl border border-gray-200 shadow-sm">
              <table className="w-full text-left text-sm border-collapse bg-white">
                <thead>
                  <tr className="bg-[#0B2341] text-white">
                    <th className="px-4 py-3 font-bold">Betriebsstunden pro Jahr</th>
                    <th className="px-4 py-3 font-bold">Empfohlenes Reinigungsintervall</th>
                    <th className="px-4 py-3 font-bold">Typische Nutzung</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[#0B2341] align-top">bis 2.000 h</td>
                    <td className="px-4 py-3 align-top">jährlich (alle 12 Monate)</td>
                    <td className="px-4 py-3 align-top">Saison- oder Teilzeitbetrieb, kleine Küchen</td>
                  </tr>
                  <tr className="bg-[#f7f9fb]">
                    <td className="px-4 py-3 font-semibold text-[#0B2341] align-top">2.000 – 4.000 h</td>
                    <td className="px-4 py-3 align-top">halbjährlich (alle 6 Monate)</td>
                    <td className="px-4 py-3 align-top">Restaurants, Hotels, Kantinen im Regelbetrieb</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[#0B2341] align-top">über 4.000 h</td>
                    <td className="px-4 py-3 align-top">vierteljährlich (alle 3 Monate)</td>
                    <td className="px-4 py-3 align-top">Großküchen, Durchlauf-/Schichtbetrieb, hohe Fettlast</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mb-12 text-sm text-[#6b7280]">
              Hinweis: Die Werte sind verbreitete Orientierungsgrößen. Maßgeblich ist der tatsächliche
              Verschmutzungsgrad — bei starkem Frittier-, Grill- oder Wok-Betrieb sind kürzere Intervalle nötig. Die
              verbindliche Festlegung und der Nachweis liegen beim Betreiber.
            </p>

            <h2 className="text-3xl font-black text-[#0B2341] mb-6">Warum die Reinigung Pflicht ist: Brandschutz, Hygiene, Versicherung</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12">
              <div className="bg-[#f7f9fb] p-6 rounded-2xl border border-gray-100">
                <Flame className="w-7 h-7 text-[#0B2341] mb-3" />
                <h3 className="font-bold text-[#0B2341] mb-2">Brandschutz</h3>
                <p className="text-sm">
                  Fett in Hauben und Kanälen ist leicht entzündlich. Ein Fettbrand breitet sich über das Kanalsystem
                  rasend aus. Reinigung entfernt diese Brandlast.
                </p>
              </div>
              <div className="bg-[#f7f9fb] p-6 rounded-2xl border border-gray-100">
                <ShieldCheck className="w-7 h-7 text-[#0D6B38] mb-3" />
                <h3 className="font-bold text-[#0B2341] mb-2">Versicherung</h3>
                <p className="text-sm">
                  Sachversicherer fordern die nachweisbare Reinigung als Obliegenheit. Ohne Nachweis droht im Brandfall
                  die Kürzung des Versicherungsschutzes.
                </p>
              </div>
              <div className="bg-[#f7f9fb] p-6 rounded-2xl border border-gray-100">
                <ClipboardCheck className="w-7 h-7 text-[#0B2341] mb-3" />
                <h3 className="font-bold text-[#0B2341] mb-2">Hygiene</h3>
                <p className="text-sm">
                  Verfettete Abluft begünstigt Gerüche und Keime. Saubere Anlagen sichern Lebensmittelhygiene und ein
                  gesundes Raumklima.
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-black text-[#0B2341] mb-6">Ablauf einer fachgerechten Küchenabluftreinigung</h2>
            <ul className="space-y-4 mb-12 list-none pl-0">
              {[
                'Bestandsaufnahme: Anlage sichten, Verschmutzungsgrad und Zugänglichkeit (Revisionsöffnungen) prüfen.',
                'Schutz & Abschottung: Küche und Arbeitsflächen abdecken, Anlage außer Betrieb nehmen und sichern.',
                'Hauben & Aerosolabscheider: Dunstabzugshauben und Fettfilter demontieren und gründlich entfetten.',
                'Abluftkanäle: erreichbare Kanalabschnitte über Revisionsöffnungen reinigen; fehlende Öffnungen dokumentieren/ergänzen.',
                'Ventilatoren: Abluftventilatoren von Fettablagerungen befreien, Funktion prüfen.',
                'Endkontrolle & Montage: Bauteile wieder einsetzen, Dichtigkeit und Funktion kontrollieren.',
                'Dokumentation: Reinigungsprotokoll mit Vorher-/Nachher-Fotos, Umfang und Folgetermin übergeben.',
              ].map((item, i) => (
                <li key={`vdi-step-${i}`} className="flex items-start gap-3">
                  <ClipboardCheck className="text-[#0D6B38] w-6 h-6 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <h2 className="text-3xl font-black text-[#0B2341] mb-6">Der Nachweis: Ihr Reinigungsprotokoll</h2>
            <p className="mb-8">
              Erst die Dokumentation macht die Reinigung zum belastbaren Nachweis. Ein prüffähiges Protokoll hält
              gereinigten Anlagenumfang, Datum, Zustand vor und nach der Reinigung (Foto-Dokumentation) und den nächsten
              empfohlenen Termin fest. Bewahren Sie diese Nachweise lückenlos auf — sie sind Ihr Beleg gegenüber
              Behörden, Sachversicherer und der eigenen Hygieneorganisation. Genau so dokumentieren wir unsere{' '}
              <Link to="/leistungen/kuechenabluftreinigung-vdi-2052" className="text-[#0B2341] font-bold hover:underline">
                Küchenabluftreinigung nach VDI 2052
              </Link>
              .
            </p>

            <h2 className="text-3xl font-black text-[#0B2341] mb-6">Regionaler Bezug: Gastronomie &amp; Hotellerie in der Region</h2>
            <p className="mb-8">
              Hotellerie, Gastronomie und Kantinen prägen die Nachfrage in{' '}
              <Link to="/standorte/villingen-schwenningen" className="text-[#0B2341] font-bold hover:underline">
                Villingen-Schwenningen
              </Link>{' '}
              und am{' '}
              <Link to="/standorte/konstanz" className="text-[#0B2341] font-bold hover:underline">
                Bodensee
              </Link>
              . Gerade im{' '}
              <Link to="/branchen/hotellerie-objektbetrieb" className="text-[#0B2341] font-bold hover:underline">
                Hotel- und Objektbetrieb
              </Link>{' '}
              sind verlässliche Reinigungsintervalle und eine saubere Dokumentation Pflicht — wir übernehmen beides aus
              einer Hand und planbar im laufenden Betrieb.
            </p>

            <h2 className="text-3xl font-black text-[#0B2341] mb-6">Fazit</h2>
            <p className="mb-8">
              Die Reinigung der Küchenabluft nach VDI 2052 ist keine Kür, sondern Betreiberpflicht mit handfesten
              Folgen für Brandschutz, Hygiene und Versicherungsschutz. Wer Intervalle nach Betriebsstunden einhält,
              fachgerecht reinigen lässt und lückenlos dokumentiert, schützt Menschen, Betrieb und Versicherungsanspruch
              zugleich.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 lg:py-32 bg-[#f7f9fb]">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-[#0B2341] font-bold tracking-wider uppercase text-sm mb-4 block">Häufige Fragen</span>
            <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-[#0B2341]">FAQs zur Küchenabluftreinigung</h2>
          </div>
          <Accordion items={faqSchema.mainEntity.map((q) => ({ question: q.name, answer: q.acceptedAnswer.text }))} />
        </div>
      </section>

      <CTABand
        title="Küchenlüftung fällig oder unklar, welches Intervall gilt?"
        lead="Wir prüfen Ihre Anlage, empfehlen das richtige Intervall nach VDI 2052 und reinigen fachgerecht inklusive prüffähiger Dokumentation."
      />
    </div>
  );
}
