import { motion } from 'motion/react';
import { BookOpen, Settings2, Zap, ArrowRight, CheckCircle2, ChevronDown, ShieldAlert, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';

export default function FachwissenIndustrieProzess() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Industriereinigung ohne Prozessstörung: Strategien für den laufenden Betrieb",
    "description": "Wie integriert man Industriereinigung in laufende Produktionsprozesse? Erfahren Sie, wie Stillstandzeiten vermieden und die Arbeitssicherheit erhöht werden.",
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
      "@id": "https://www.ahad-cleaning.de/fachwissen/industriereinigung-prozesse"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Wie kann Industriereinigung ohne Produktionsstillstand erfolgen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Eine Reinigung ohne Stillstand erfordert eine exakte Synchronisation mit den Produktionsplänen. Dies geschieht durch Reinigung in den Pausenzeiten, während Schichtwechseln oder durch den Einsatz spezieller, emissionsarmer Reinigungstechniken (wie Trockeneisstrahlen), die parallel zum Betrieb in angrenzenden Bereichen durchgeführt werden können."
        }
      },
      {
        "@type": "Question",
        "name": "Welche Sicherheitsvorkehrungen sind bei der Industriereinigung wichtig?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sicherheit hat oberste Priorität. Dazu gehören: Gefährdungsbeurteilungen vor Arbeitsbeginn, das Tragen spezifischer PSA (Persönliche Schutzausrüstung), Schulungen im Umgang mit Gefahrstoffen, Lockout/Tagout-Verfahren (LOTO) zur sicheren Abschaltung von Maschinen sowie klare Freigabeprozesse durch die Produktionsleitung."
        }
      },
      {
        "@type": "Question",
        "name": "Warum ist regelmäßige Maschinenreinigung wirtschaftlich sinnvoll?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Regelmäßige Reinigung verhindert den Aufbau von Schmutz, Spänen oder Ölen, die zu Maschinenverschleiß, Überhitzung oder Sensorfehlern führen können. Sie reduziert ungeplante Ausfallzeiten, verlängert die Lebensdauer der Anlagen und sichert eine konstant hohe Produktqualität."
        }
      }
    ]
  };

  return (
    <div>
      <SEO 
        title="Industriereinigung ohne Stillstand | Fachwissen | AHAD" 
        description="Wie integriert man Industriereinigung in laufende Prozesse? Erfahren Sie mehr über unsere Strategien zur Vermeidung von Stillstandzeiten in der Produktion."
        keywords="Industriereinigung Prozess, Reinigung ohne Stillstand, Produktionsreinigung Strategie, Maschinenreinigung laufender Betrieb, AHAD Cleaning"
        schema={[articleSchema, faqSchema]}
      />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-[#0B2341] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1600" 
            alt="Industriereinigung in einer modernen Produktionshalle" 
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
              <Settings2 className="w-4 h-4 text-[#9CDDB7]" />
              Fachwissen: Industrie-Logik
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tight">
              Industriereinigung ohne Prozessstörung
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed mb-10 font-medium">
              Wie wir professionelle Reinigung in hochsensible Produktionsumfelder integrieren, 
              ohne den laufenden Betrieb zu stören oder Stillstandzeiten zu verursachen.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Auf einen Blick (At a glance) - Good for AEO/GEO */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-black text-[#0B2341] mb-8 text-center">Prozessintegration auf einen Blick</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#f7f9fb] p-6 rounded-2xl border border-gray-100">
              <Clock className="w-8 h-8 text-[#0B2341] mb-4" />
              <h3 className="font-bold text-lg mb-2 text-[#0B2341]">Perfektes Timing</h3>
              <p className="text-[#424751] text-sm">Synchronisation der Reinigungsarbeiten mit Schichtplänen, Rüstzeiten und geplanten Wartungsintervallen zur Vermeidung von Ausfällen.</p>
            </div>
            <div className="bg-[#f7f9fb] p-6 rounded-2xl border border-gray-100">
              <ShieldAlert className="w-8 h-8 text-[#0D6B38] mb-4" />
              <h3 className="font-bold text-lg mb-2 text-[#0B2341]">Maximale Sicherheit</h3>
              <p className="text-[#424751] text-sm">Strikte Einhaltung von Sicherheitsvorschriften, Lockout/Tagout-Verfahren und Einsatz von speziell geschultem Fachpersonal.</p>
            </div>
            <div className="bg-[#f7f9fb] p-6 rounded-2xl border border-gray-100">
              <Zap className="w-8 h-8 text-[#0B2341] mb-4" />
              <h3 className="font-bold text-lg mb-2 text-[#0B2341]">Spezialverfahren</h3>
              <p className="text-[#424751] text-sm">Nutzung emissionsarmer und trockener Reinigungsverfahren (z.B. Trockeneis), die auch in der Nähe laufender Anlagen sicher sind.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose prose-lg max-w-none text-[#424751] leading-relaxed">
            <h2 className="text-3xl font-black text-[#0B2341] mb-6">Die Herausforderung: Reinigung vs. Produktion</h2>
            <p className="mb-8">
              In der <Link to="/branchen/industrie-produktion" className="text-[#0B2341] font-bold hover:underline">Industrie und Produktion</Link> ist Zeit Geld. Jede Minute Stillstand kostet. 
              Gleichzeitig ist Sauberkeit oft die Grundvoraussetzung für Produktqualität, Maschineneffizienz 
              und Arbeitssicherheit. Die Lösung für diesen scheinbaren Widerspruch liegt in der perfekten Integration der <Link to="/leistungen/industrie-produktionsreinigung" className="text-[#0B2341] font-bold hover:underline">Industriereinigung</Link> in die bestehenden Betriebsabläufe.
            </p>

            <div className="bg-[#0B2341] text-white p-8 rounded-3xl mb-12 shadow-xl">
              <h3 className="text-2xl font-bold text-[#9CDDB7] mb-6 flex items-center gap-3">
                <Zap className="text-[#9CDDB7] w-8 h-8" />
                Unsere Integrations-Strategie
              </h3>
              <ul className="space-y-4 list-none pl-0">
                {[
                  'Exakte Synchronisation mit Schichtplänen, Pausenzeiten und Wartungsfenstern',
                  'Einsatz von spezialisiertem, sicherheitsgeschultem Personal',
                  'Klare Freigabeprozesse (Permit to Work) für sensible Maschinenbereiche',
                  'Einsatz von geräuscharmen, staubfreien & emissionsfreien Reinigungsverfahren',
                  'Proaktive und kontinuierliche Abstimmung mit der Produktionsleitung'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="text-[#0D6B38] w-6 h-6 mt-1 flex-shrink-0" />
                    <span className="text-blue-50">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <h2 className="text-3xl font-black text-[#0B2341] mb-6">Sicherheit an erster Stelle</h2>
            <p className="mb-6">
              Industriereinigung ist immer auch Gefahrenabwehr. Wir schulen unsere Mitarbeiter 
              intensiv in Arbeitssicherheit, dem Umgang mit Gefahrstoffen und 
              den spezifischen Sicherheitsregeln unserer Kunden. Dazu gehört das strikte Befolgen von Lockout/Tagout (LOTO) Richtlinien, um sicherzustellen, dass Maschinen während der Reinigung nicht versehentlich anlaufen können.
            </p>

            <h2 className="text-3xl font-black text-[#0B2341] mb-6">Technik & Know-how für den laufenden Betrieb</h2>
            <p className="mb-6">
              Wir nutzen moderne Reinigungstechnik, die speziell für den 
              industriellen Einsatz konzipiert ist. Verfahren wie das Trockeneisstrahlen ermöglichen eine rückstandsfreie Reinigung ohne Wasser, was besonders in der Nähe von Elektronik oder in der Lebensmittelproduktion entscheidend ist. So können oft Anlagenteile gereinigt werden, während benachbarte Linien weiterproduzieren.
            </p>

            <h2 className="text-3xl font-black text-[#0B2341] mb-6">Fazit: Reinigung als Wertschöpfung</h2>
            <p className="mb-8">
              Erfolgreiche Industriereinigung ist kein isolierter, störender Vorgang, 
              sondern ein integraler Bestandteil der Produktionslogik. Durch intelligente Planung und spezialisierte Verfahren wird die Reinigung zu einem Faktor, der die Anlagenverfügbarkeit erhöht und somit direkt zur Wertschöpfung beiträgt.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 lg:py-32 bg-[#f7f9fb]">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-[#0B2341] font-bold tracking-wider uppercase text-sm mb-4 block">Häufige Fragen</span>
            <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-[#0B2341]">FAQs zur Industriereinigung</h2>
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
          <h2 className="text-3xl lg:text-4xl font-black mb-6">Optimieren Sie Ihre Industriereinigung?</h2>
          <p className="text-blue-100 mb-10 text-lg">
            Lassen Sie uns gemeinsam ein Reinigungskonzept entwickeln, das Ihre Produktionsprozesse unterstützt und Stillstandzeiten minimiert.
          </p>
          <Link
            to="/kontakt"
            className="inline-flex items-center px-8 py-4 bg-[#0D6B38] text-white font-bold rounded-xl hover:bg-[#0A552C] transition-all shadow-sm hover:shadow-md hover:-translate-y-[1px]"
          >
            Beratungsgespräch anfragen
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
