import { motion } from 'motion/react';
import { Settings2, Zap, CheckCircle2, ShieldAlert, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import Accordion from '@/components/ui/Accordion';
import CTABand from '@/components/CTABand';
import ArticleMeta from '@/components/ArticleMeta';
import { buildArticleSchema, EDITORIAL_ARTICLES } from '@/data/editorial';

export default function FachwissenIndustrieProzess() {
  const articleSchema = buildArticleSchema(
    EDITORIAL_ARTICLES['industrie-produktionsreinigung-ohne-prozessstoerung'],
  );

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
      },
      {
        "@type": "Question",
        "name": "Was muss eine professionelle Industriereinigung dokumentieren?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Eine professionelle Industriereinigung dokumentiert mindestens: die durchgeführte Gefährdungsbeurteilung, die LOTO-Freigabe und Wiederinbetriebnahme durch die Produktionsleitung, die verwendeten Reinigungs- und Gefahrstoffe inklusive Sicherheitsdatenblättern, das eingesetzte Verfahren und Equipment, Zeitfenster und Personal, einen Vorher-/Nachher-Nachweis (z. B. Fotos oder Messwerte) sowie die fachgerechte Entsorgung der Reinigungsrückstände. In hygienesensiblen Bereichen kommen Reinigungs- und Desinfektionspläne sowie ggf. Hygienekontrollen (z. B. ATP-Messung) hinzu."
        }
      },
      {
        "@type": "Question",
        "name": "Welche gesetzlichen Vorgaben gelten bei der Industriereinigung in Deutschland?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Relevant sind unter anderem das Arbeitsschutzgesetz (ArbSchG), die DGUV-Vorschrift 1 (Grundsätze der Prävention, ehemals BGV A1), die Betriebssicherheitsverordnung (BetrSichV), die Gefahrstoffverordnung (GefStoffV) mit der zugehörigen TRGS sowie die DGUV-Regeln zu persönlicher Schutzausrüstung. In der Lebensmittelproduktion gelten zusätzlich die EU-Verordnung 852/2004 und HACCP-Grundsätze. Ein seriöser Dienstleister dokumentiert die Einhaltung dieser Vorgaben nachvollziehbar."
        }
      },
      {
        "@type": "Question",
        "name": "Was kostet eine Industriereinigung im laufenden Betrieb in der Region Villingen-Schwenningen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Belastbare Kosten lassen sich nur nach einer Objektbegehung nennen, da Fläche, Verschmutzungsgrad, Verfahren (z. B. Trockeneisstrahlen), Schichtmodell und Sicherheitsanforderungen den Aufwand bestimmen. Als grobe Orientierungswerte für die Region Villingen-Schwenningen/Baden-Württemberg liegen einfache Hallen- und Unterhaltsreinigungen häufig im Bereich von etwa 0,80 bis 2,50 Euro pro Quadratmeter, Spezial- und Maschinenreinigungen werden meist im Stundensatz von rund 35 bis 70 Euro pro Fachkraft abgerechnet. Diese Spannen sind unverbindliche Richtwerte und ersetzen kein individuelles Angebot."
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
      <section className="relative pt-36 pb-20 lg:pt-44 lg:pb-28 bg-navy text-white overflow-hidden grain">
        <div className="absolute inset-0 opacity-40">
          <picture>
            <source media="(max-width: 640px)" srcSet="/images/ahad/industrie-detail-480.webp" />
            <source media="(max-width: 1200px)" srcSet="/images/ahad/industrie-detail-960.webp" />
            <img src="/images/ahad/industrie-detail.webp" alt="Industriereinigung in einer modernen Produktionshalle" className="w-full h-full object-cover" width="1600" height="900" />
          </picture>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-navy/60" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm font-bold mb-6 tracking-wider uppercase border border-white/20">
              <Settings2 className="w-4 h-4 text-[#9CDDB7]" />
              Fachwissen: Industrie-Logik
            </span>
            <h1 className="display-lg text-white mb-8">
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

      <ArticleMeta slug="industrie-produktionsreinigung-ohne-prozessstoerung" />

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

            <h2 className="text-3xl font-black text-[#0B2341] mb-6">Herausforderung &amp; Lösung im laufenden Betrieb</h2>
            <p className="mb-6">
              Die größten Reibungspunkte zwischen Reinigung und Produktion lassen sich vorab planen und
              vertraglich regeln. Die folgende Übersicht zeigt die typischen Herausforderungen einer
              Produktionsreinigung im laufenden Betrieb und die jeweils bewährte Lösung, wie wir sie bei
              Industriekunden in der Region Villingen-Schwenningen und im übrigen Baden-Württemberg umsetzen.
            </p>

            <div className="overflow-x-auto mb-12 rounded-2xl border border-gray-200 not-prose">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-[#0B2341] text-white">
                    <th className="px-4 py-3 font-bold">Herausforderung</th>
                    <th className="px-4 py-3 font-bold">Risiko ohne Konzept</th>
                    <th className="px-4 py-3 font-bold">Lösung im laufenden Betrieb</th>
                  </tr>
                </thead>
                <tbody className="text-[#424751]">
                  <tr className="border-t border-gray-200">
                    <td className="px-4 py-3 font-semibold text-[#0B2341]">Schichtbetrieb &amp; Verfügbarkeit</td>
                    <td className="px-4 py-3">Produktionsstillstand, Kollision mit Schichtwechseln</td>
                    <td className="px-4 py-3">Reinigungsfenster in Pausen, Rüst- und Wartungszeiten; Nacht- bzw. Wochenendeinsätze; abschnittsweises Vorgehen pro Linie</td>
                  </tr>
                  <tr className="border-t border-gray-200 bg-[#f7f9fb]">
                    <td className="px-4 py-3 font-semibold text-[#0B2341]">UVV &amp; Arbeitssicherheit</td>
                    <td className="px-4 py-3">Unfälle, Bußgelder, Haftungsrisiken</td>
                    <td className="px-4 py-3">Gefährdungsbeurteilung vor Arbeitsbeginn, PSA gemäß DGUV, Sicherheitsunterweisung, geschultes Fachpersonal</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="px-4 py-3 font-semibold text-[#0B2341]">Maschinenfreigabe</td>
                    <td className="px-4 py-3">Versehentliches Anlaufen, Beschädigung von Anlagen</td>
                    <td className="px-4 py-3">Lockout/Tagout (LOTO), Permit-to-Work, dokumentierte Freigabe und Wiederinbetriebnahme durch die Produktionsleitung</td>
                  </tr>
                  <tr className="border-t border-gray-200 bg-[#f7f9fb]">
                    <td className="px-4 py-3 font-semibold text-[#0B2341]">Rückstände &amp; Hygiene</td>
                    <td className="px-4 py-3">Produktkontamination, Sensorfehler, Qualitätsmängel</td>
                    <td className="px-4 py-3">Trockeneisstrahlen &amp; trockene Verfahren, definierte Reinigungs-/Desinfektionspläne, Hygienenachweise (z. B. ATP-Messung)</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="px-4 py-3 font-semibold text-[#0B2341]">Dokumentation</td>
                    <td className="px-4 py-3">Fehlende Nachweise bei Audits, kein Qualitätsbeleg</td>
                    <td className="px-4 py-3">Lückenlose Reinigungsprotokolle, Vorher-/Nachher-Nachweis, Gefahrstoff- und Entsorgungsnachweise</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-3xl font-black text-[#0B2341] mb-6">Sicherheit an erster Stelle</h2>
            <p className="mb-6">
              Industriereinigung ist immer auch Gefahrenabwehr. Wir schulen unsere Mitarbeiter
              intensiv in Arbeitssicherheit, dem Umgang mit Gefahrstoffen und
              den spezifischen Sicherheitsregeln unserer Kunden. Dazu gehört das strikte Befolgen von Lockout/Tagout (LOTO) Richtlinien, um sicherzustellen, dass Maschinen während der Reinigung nicht versehentlich anlaufen können.
            </p>

            <h3 className="text-2xl font-black text-[#0B2341] mb-4">Sicherheits- &amp; Dokumentationsanforderungen</h3>
            <p className="mb-6">
              In Deutschland ist Industriereinigung kein rein operativer Vorgang, sondern an einen klaren
              rechtlichen Rahmen gebunden. Maßgeblich sind unter anderem das Arbeitsschutzgesetz (ArbSchG),
              die DGUV-Vorschrift 1 (Grundsätze der Prävention), die Betriebssicherheitsverordnung (BetrSichV)
              sowie die Gefahrstoffverordnung (GefStoffV) mit den zugehörigen Technischen Regeln für
              Gefahrstoffe (TRGS). In der Lebensmittel- und Pharmaproduktion kommen die EU-Verordnung
              852/2004 und die HACCP-Grundsätze hinzu. Eine professionelle Dokumentation ist daher nicht
              optional, sondern Bestandteil der Auftragsqualität und Voraussetzung für bestandene Audits
              (z. B. nach IFS, BRC oder ISO 9001).
            </p>

            <h3 className="text-2xl font-black text-[#0B2341] mb-4">Checkliste: Was eine professionelle Industriereinigung dokumentieren muss</h3>
            <p className="mb-6">
              Nutzen Sie die folgende Checkliste, um die Dokumentationsqualität eines Dienstleisters zu
              prüfen. Fehlt einer dieser Punkte, drohen bei Betriebsprüfungen oder Kundenaudits
              Nachweislücken.
            </p>
            <ul className="space-y-3 list-none pl-0 mb-12">
              {[
                'Gefährdungsbeurteilung und Sicherheitsunterweisung vor Arbeitsbeginn',
                'LOTO-Freigabe sowie dokumentierte Wiederinbetriebnahme durch die Produktionsleitung',
                'Verwendete Reinigungs- und Gefahrstoffe inkl. aktueller Sicherheitsdatenblätter',
                'Eingesetztes Verfahren und Equipment (z. B. Trockeneisstrahlen, Hochdruck, manuell)',
                'Zeitfenster, Dauer und eingesetztes Reinigungspersonal',
                'Vorher-/Nachher-Nachweis (Fotos, Messwerte oder Hygiene-/ATP-Ergebnisse)',
                'Reinigungs- und Desinfektionsplan in hygienesensiblen Bereichen',
                'Nachweis der fach- und umweltgerechten Entsorgung der Reinigungsrückstände',
                'Abweichungs- bzw. Mängelmeldungen und ergriffene Korrekturmaßnahmen',
                'Unterschrift bzw. Abnahme durch eine verantwortliche Person beim Kunden'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="text-[#0D6B38] w-6 h-6 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <h2 className="text-3xl font-black text-[#0B2341] mb-6">Praxisbeispiel: Reinigungsfenster im Schichtbetrieb</h2>
            <p className="mb-6">
              Ein vereinfachtes Rechenbeispiel verdeutlicht den wirtschaftlichen Nutzen der
              Prozessintegration. Angenommen, eine Produktionslinie erwirtschaftet einen
              Deckungsbeitrag von rund 1.500 Euro pro Betriebsstunde. Wird die Linie für eine
              klassische Reinigung zwei Stunden angehalten, entstehen allein dadurch
              Opportunitätskosten von etwa 3.000 Euro &ndash; zusätzlich zu den eigentlichen
              Reinigungskosten.
            </p>
            <p className="mb-6">
              Verlagert man die Reinigung stattdessen in ein ohnehin geplantes 45-minütiges
              Rüst- oder Wartungsfenster und ergänzt sie durch staubarmes Trockeneisstrahlen an
              den benachbarten, weiterlaufenden Linien, sinkt der produktionsbedingte
              Stillstand gegen null. Selbst wenn das Spezialverfahren pro Einsatz höher
              bepreist ist, amortisiert sich der Mehraufwand bereits durch die vermiedenen
              Stillstandkosten. Die genannten Zahlen sind reine Orientierungswerte zur
              Veranschaulichung und keine garantierten Ergebnisse.
            </p>
            <p className="mb-8">
              Für produzierende Betriebe im Schwarzwald-Baar-Kreis und entlang der Achse
              Villingen-Schwenningen&ndash;Tuttlingen&ndash;Rottweil ist dieser Ansatz besonders
              relevant: Viele Zulieferer der Medizintechnik, Metallverarbeitung und
              Präzisionsfertigung arbeiten im Mehrschichtbetrieb mit hohen Hygiene- und
              Qualitätsanforderungen, bei denen ungeplante Stillstände kaum tolerierbar sind.
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
          <Accordion items={faqSchema.mainEntity.map((q) => ({ question: q.name, answer: q.acceptedAnswer.text }))} />
        </div>
      </section>

      <CTABand title="Optimieren Sie Ihre Industriereinigung?" lead="Lassen Sie uns gemeinsam ein Reinigungskonzept entwickeln, das Ihre Produktionsprozesse unterstützt und Stillstandzeiten minimiert." />
    </div>
  );
}
