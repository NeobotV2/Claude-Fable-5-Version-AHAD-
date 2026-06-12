import { motion } from 'motion/react';
import { BookOpen, Clock, Calendar, ArrowRight, CheckCircle2, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';

export default function FachwissenIntervalle() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Reinigungsintervalle in Unternehmen: Ein Leitfaden",
    "description": "Wie oft muss ein Büro gereinigt werden? Erfahren Sie alles über optimale Reinigungsintervalle für Unterhaltsreinigung, Sanitäranlagen und Büroräume.",
    "author": {
      "@type": "Organization",
      "name": "AHAD Cleaning Company GmbH"
    },
    "publisher": {
      "@type": "Organization",
      "name": "AHAD Cleaning Company GmbH",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.ahad-cleaning.de/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://www.ahad-cleaning.de/fachwissen/reinigungsintervalle"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Wie oft sollte ein Büro gereinigt werden?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Die optimale Reinigungshäufigkeit für Büros hängt von der Nutzung ab. Stark frequentierte Bereiche wie Sanitäranlagen und Küchen sollten täglich gereinigt werden. Normale Büroarbeitsplätze werden meist 2 bis 3 Mal pro Woche gereinigt, während Aufgaben wie Fensterputzen oder Grundreinigungen in größeren Abständen (z.B. monatlich oder quartalsweise) erfolgen."
        }
      },
      {
        "@type": "Question",
        "name": "Was bedeutet bedarfsorientierte Reinigung?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Bedarfsorientierte Reinigung (auch dynamische Reinigung genannt) bedeutet, dass nicht starr nach einem festen Plan geputzt wird, sondern nach tatsächlichem Verschmutzungsgrad und Nutzung. Wenn beispielsweise ein Konferenzraum nicht genutzt wurde, wird er auch nicht gereinigt. Das spart Kosten und schont die Umwelt."
        }
      },
      {
        "@type": "Question",
        "name": "Welche Faktoren beeinflussen das Reinigungsintervall?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Wichtige Faktoren sind die Anzahl der Mitarbeiter, die Besucherfrequenz, die Art der Bodenbeläge (Teppich vs. Hartboden), die Jahreszeit (im Winter wird mehr Schmutz hereingetragen) und der Repräsentationsanspruch des Unternehmens."
        }
      }
    ]
  };

  return (
    <div>
      <SEO 
        title="Reinigungsintervalle im Büro: Wie oft putzen? | AHAD" 
        description="Wie oft sollte ein Büro gereinigt werden? Unser Leitfaden zu Reinigungsintervallen hilft Ihnen, die optimale Taktung für Ihr Unternehmen zu finden."
        keywords="Reinigungsintervalle, Unterhaltsreinigung Intervalle, Büroreinigung Taktung, wie oft Büro reinigen, Reinigungsplan Büro, AHAD Cleaning"
        schema={[articleSchema, faqSchema]}
      />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-[#0B2341] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&q=80&w=1600" 
            alt="Reinigungsintervalle im modernen Büro" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm font-bold mb-6 tracking-wider uppercase border border-white/20">
              <BookOpen className="w-4 h-4 text-[#A9DCBE]" />
              Fachwissen: Unterhaltsreinigung
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tight">
              Reinigungsintervalle in Unternehmen: Ein Leitfaden
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed mb-10 font-medium">
              Wie oft muss was gereinigt werden? Wir erklären die Logik hinter 
              effizienten Reinigungsintervallen für moderne Büro- und Verwaltungsflächen.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Auf einen Blick (At a glance) - Good for AEO/GEO */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-black text-[#0B2341] mb-8 text-center">Reinigungsintervalle auf einen Blick</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#f7f9fb] p-6 rounded-2xl border border-gray-100">
              <Clock className="w-8 h-8 text-[#0B2341] mb-4" />
              <h3 className="font-bold text-lg mb-2 text-[#0B2341]">Tägliche Reinigung</h3>
              <p className="text-[#424751] text-sm">Fokus auf Hygiene und stark frequentierte Bereiche: Sanitäranlagen, Teeküchen, Empfangsbereiche und Müllentsorgung.</p>
            </div>
            <div className="bg-[#f7f9fb] p-6 rounded-2xl border border-gray-100">
              <Calendar className="w-8 h-8 text-[#0D6B38] mb-4" />
              <h3 className="font-bold text-lg mb-2 text-[#0B2341]">Wöchentliche Reinigung</h3>
              <p className="text-[#424751] text-sm">Regelmäßige Pflege: Büroarbeitsplätze (2-3x pro Woche), Staubsaugen, Bodenwischen und Abstauben freier Flächen.</p>
            </div>
            <div className="bg-[#f7f9fb] p-6 rounded-2xl border border-gray-100">
              <BookOpen className="w-8 h-8 text-[#0B2341] mb-4" />
              <h3 className="font-bold text-lg mb-2 text-[#0B2341]">Monatliche Reinigung</h3>
              <p className="text-[#424751] text-sm">Tiefenpflege: Reinigung von Fußleisten, Heizkörpern, Glastüren und das Entfernen von Spinnweben.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose prose-lg max-w-none text-[#424751] leading-relaxed">
            <h2 className="text-3xl font-black text-[#0B2341] mb-6">Die Bedeutung der richtigen Taktung in der Unterhaltsreinigung</h2>
            <p className="mb-8">
              In der <Link to="/leistungen/unterhaltsreinigung" className="text-[#0B2341] font-bold hover:underline">Unterhaltsreinigung</Link> ist das Intervall der entscheidende Hebel für 
              Wirtschaftlichkeit und Ergebnisqualität. Zu seltene Reinigung führt zu 
              sichtbarem Schmutz, Unzufriedenheit der Mitarbeiter und langfristigem Wertverlust der Immobilie. Zu häufige Reinigung hingegen verursacht unnötige Kosten. Das Ziel ist es, die perfekte Balance zu finden.
            </p>

            <div className="bg-[#f7f9fb] p-8 rounded-3xl mb-12 border border-gray-100 shadow-sm">
              <h3 className="text-2xl font-bold text-[#0B2341] mb-6 flex items-center gap-3">
                <Calendar className="text-[#0B2341] w-8 h-8" />
                Typische Reinigungsintervalle im Überblick
              </h3>
              <ul className="space-y-4 list-none pl-0">
                <li className="flex flex-col sm:flex-row gap-2 sm:gap-4 border-b border-gray-200 pb-4">
                  <span className="font-bold text-[#0B2341] min-w-[120px]">Täglich:</span>
                  <span>Sanitärräume, Küchenbereiche, stark frequentierte Flure, Empfang, Müllentsorgung.</span>
                </li>
                <li className="flex flex-col sm:flex-row gap-2 sm:gap-4 border-b border-gray-200 pb-4">
                  <span className="font-bold text-[#0B2341] min-w-[120px]">2-3x pro Woche:</span>
                  <span>Büroarbeitsplätze (Schreibtische), Staubsaugen in weniger genutzten Bereichen, Besprechungsräume.</span>
                </li>
                <li className="flex flex-col sm:flex-row gap-2 sm:gap-4 border-b border-gray-200 pb-4">
                  <span className="font-bold text-[#0B2341] min-w-[120px]">Wöchentlich:</span>
                  <span>Abstauben von freien Flächen, Reinigung von Glastüren, Treppenhäuser.</span>
                </li>
                <li className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                  <span className="font-bold text-[#0B2341] min-w-[120px]">Monatlich:</span>
                  <span>Spinnweben entfernen, Reinigung von Fußleisten, Heizkörpern, Polstermöbelpflege.</span>
                </li>
              </ul>
            </div>

            <h2 className="text-3xl font-black text-[#0B2341] mb-6">Welche Faktoren beeinflussen die Intervallplanung?</h2>
            <p className="mb-6">
              Ein professionelles Reinigungsunternehmen erstellt nicht einfach einen Standardplan. Bei der Erstellung eines Leistungsverzeichnisses für die <Link to="/branchen/buero-verwaltung" className="text-[#0B2341] font-bold hover:underline">Büroreinigung</Link> berücksichtigen wir 
              folgende individuelle Faktoren:
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
                  <CheckCircle2 className="text-[#0D6B38] w-6 h-6 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <h2 className="text-3xl font-black text-[#0B2341] mb-6">Fazit: Dynamik schlägt Statik</h2>
            <p className="mb-8">
              Moderne Reinigungskonzepte verabschieden sich zunehmend von starren Intervallen. Die <strong>bedarfsorientierte Reinigung</strong> rückt in den Fokus. Das bedeutet: Es wird dort gereinigt, wo es tatsächlich nötig ist. Wenn ein Büro wegen Homeoffice tagelang leer steht, muss dort auch nicht gesaugt werden. Das AHAD System setzt auf intelligente Revierplanung und geschultes Personal, das Verschmutzungen erkennt und flexibel reagiert.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 lg:py-32 bg-[#f7f9fb]">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-[#0B2341] font-bold tracking-wider uppercase text-sm mb-4 block">Häufige Fragen</span>
            <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-[#0B2341]">FAQs zu Reinigungsintervallen</h2>
          </div>
          <div className="space-y-4">
            {faqSchema.mainEntity.map((faq, i) => (
              <details key={i} className="group bg-white rounded-2xl overflow-hidden border border-gray-100 [&_summary::-webkit-details-marker]:hidden shadow-sm">
                <summary className="w-full flex justify-between items-center p-6 text-left cursor-pointer hover:bg-gray-50 transition-colors">
                  <span className="font-bold text-lg text-[#0B2341] pr-8">{faq.name}</span>
                  <span className="transition group-open:rotate-180 bg-[#f7f9fb] p-2 rounded-full text-[#0B2341]">
                    <ChevronDown size={20} />
                  </span>
                </summary>
                <div className="p-6 pt-0 text-[#424751] leading-relaxed border-t border-gray-100 mt-2">
                  <p className="pt-4">{faq.acceptedAnswer.text}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-[#0B2341] text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-black mb-6">Benötigen Sie ein maßgeschneidertes Reinigungskonzept?</h2>
          <p className="text-blue-100 mb-10 text-lg">
            Wir analysieren Ihren Bedarf und erstellen ein Leistungsverzeichnis mit optimalen Reinigungsintervallen für Ihr Unternehmen.
          </p>
          <Link
            to="/kontakt"
            className="inline-flex items-center px-8 py-4 bg-[#0D6B38] text-white font-bold rounded-xl hover:bg-[#0A552C] transition-all shadow-sm hover:shadow-md hover:-translate-y-[1px]"
          >
            Jetzt beraten lassen
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
