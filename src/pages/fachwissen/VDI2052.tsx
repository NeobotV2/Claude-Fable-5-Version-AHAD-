import { motion } from 'motion/react';
import { BookOpen, Flame, ClipboardCheck, CalendarClock, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import Accordion from '@/components/ui/Accordion';
import CTABand from '@/components/CTABand';
import { IMG } from '@/lib/images';
import ArticleMeta from '@/components/ArticleMeta';
import { buildArticleSchema, EDITORIAL_ARTICLES } from '@/data/editorial';

export default function FachwissenVDI2052() {
  const articleSchema = buildArticleSchema(
    EDITORIAL_ARTICLES['kuechenabluftreinigung-vdi-2052-pflicht-ablauf-nachweis'],
  );

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
        name: 'Wie wird das Reinigungsintervall einer Küchenabluftanlage festgelegt?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ein belastbares Intervall wird anhand der Belastung, des Anlagenzustands, der Nutzung, der Herstellerangaben und der für den Betrieb geltenden aktuellen Vorgaben festgelegt. Pauschale Kalenderfristen auf einer Website ersetzen diese objektbezogene Prüfung nicht.',
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
          text: 'Welche Nachweise und Obliegenheiten gelten, ergibt sich aus dem konkreten Versicherungsvertrag. Betreiber sollten die Anforderungen direkt mit ihrem Versicherer klären und Reinigung, Anlagenzustand sowie festgelegte Folgetermine nachvollziehbar dokumentieren.',
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
          text: 'Zuständigkeiten sollten Betreiber, Eigentümer, Wartungsunternehmen und gegebenenfalls Versicherer objektbezogen klären und dokumentieren. Welche Pflichten im Einzelfall bestehen, ergibt sich aus den aktuellen gesetzlichen, behördlichen, vertraglichen und technischen Vorgaben.',
        },
      },
    ],
  };

  return (
    <div>
      <SEO
        title="Küchenabluftreinigung nach VDI 2052: Einordnung & Ablauf | AHAD"
        description="Orientierung zur Küchenabluftreinigung: VDI-Übersicht, objektbezogene Intervalle, Brandschutz, Hygiene, Ablauf und nachvollziehbare Dokumentation."
        keywords="Küchenabluftreinigung VDI 2052, Lüftungsreinigung Küche, Reinigungsintervall Küchenabluft, Brandschutz Küchenlüftung, Fettbrand, AHAD Cleaning"
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
          <motion.div initial={false} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <span className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm font-bold mb-6 tracking-wider uppercase border border-white/20">
              <BookOpen className="w-4 h-4 text-[#9CDDB7]" />
              Fachwissen: Hygiene &amp; Brandschutz
            </span>
            <h1 className="display-lg text-white mb-8">Küchenabluftreinigung nach VDI 2052: Einordnung, Ablauf &amp; Nachweis</h1>
            <p className="text-xl text-blue-100 leading-relaxed mb-10 font-medium">
              Fettablagerungen in der Küchenlüftung können Brandschutz und Hygiene beeinträchtigen. Wir ordnen ein,
              welche Faktoren bei Prüfung, Intervallplanung und Dokumentation zu berücksichtigen sind.
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
                Objektbezogen nach Nutzung, Belastung, Anlagenzustand, Herstellerangaben und geltenden Vorgaben.
              </p>
            </div>
            <div className="bg-[#f7f9fb] p-6 rounded-2xl border border-gray-100">
              <Flame className="w-8 h-8 text-[#0D6B38] mb-4" />
              <h3 className="font-bold text-lg mb-2 text-[#0B2341]">Warum</h3>
              <p className="text-[#424751] text-sm">
                Reinigung entfernt Fettablagerungen und unterstützt Brandschutz, Hygiene und einen sicheren Anlagenbetrieb.
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

      <ArticleMeta slug="kuechenabluftreinigung-vdi-2052-pflicht-ablauf-nachweis" />

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

            <h2 className="text-3xl font-black text-[#0B2341] mb-6">Reinigungsintervalle objektbezogen festlegen</h2>
            <p className="mb-6">
              Ein belastbarer Reinigungsplan lässt sich nicht allein aus einer pauschalen Kalenderfrist ableiten.
              Entscheidend sind unter anderem Nutzungsdauer, Art der Speisenzubereitung, Fett- und Aerosolbelastung,
              Anlagenzustand, Herstellerangaben und die für den konkreten Betrieb geltenden Vorgaben. Die aktuelle
              Richtlinienfassung und der tatsächliche Zustand der Anlage sind gemeinsam zu prüfen.
            </p>
            <div className="not-prose mb-12 rounded-2xl border border-line bg-paper p-6">
              <p className="font-bold text-navy">Für die Intervallentscheidung dokumentieren</p>
              <ul className="mt-3 grid gap-2 text-sm text-slate sm:grid-cols-2">
                <li>• Nutzung und Belastungsprofil</li>
                <li>• sichtbarer Anlagenzustand</li>
                <li>• Hersteller- und Wartungsangaben</li>
                <li>• betriebliche, behördliche und vertragliche Vorgaben</li>
              </ul>
            </div>

            <h2 className="text-3xl font-black text-[#0B2341] mb-6">Warum regelmäßige Prüfung und Reinigung wichtig sind</h2>
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
                  Anforderungen unterscheiden sich je Versicherungsvertrag. Klären Sie Obliegenheiten und erforderliche
                  Nachweise direkt mit Ihrem Versicherer.
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
              sind belastbar festgelegte Reinigungsintervalle und eine saubere Dokumentation besonders relevant. Wir
              unterstützen bei Bestandsaufnahme, Reinigung und nachvollziehbarem Protokoll.
            </p>

            <h2 className="text-3xl font-black text-[#0B2341] mb-6">Fazit</h2>
            <p className="mb-8">
              Belastung und Zustand einer Küchenabluftanlage müssen regelmäßig betrachtet werden. Objektbezogene
              Intervalle, fachgerechte Reinigung und eine nachvollziehbare Dokumentation unterstützen Brandschutz,
              Hygiene und sicheren Anlagenbetrieb. Maßgeblich bleiben die aktuell geltenden Vorgaben für das konkrete
              Objekt.
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
        lead="Wir erfassen Zustand und Nutzung Ihrer Anlage, unterstützen bei der Intervallplanung und dokumentieren die ausgeführten Arbeiten nachvollziehbar."
      />
    </div>
  );
}
