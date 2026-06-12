import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import SEO from '@/components/SEO';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import SmartImage from '@/components/ui/SmartImage';
import Accordion, { faqSchemaFrom, type FAQItem } from '@/components/ui/Accordion';
import CTABand from '@/components/CTABand';
import { SERVICES } from '@/data/services';
import { IMG } from '@/lib/images';

const faqs: FAQItem[] = [
  {
    question: 'Welche Reinigungsleistungen bietet AHAD Cleaning an?',
    answer:
      'AHAD Cleaning bietet ein umfassendes Portfolio an Gebäudedienstleistungen: Unterhaltsreinigung für Büros, spezialisierte Industrie- und Produktionsreinigung, Glas- und Fassadenreinigung, Baureinigung, Medizintechnik- und Reinraumreinigung, Sonderreinigungen sowie Winterdienst und Hausmeisterservice.',
  },
  {
    question: 'Wie werden die Reinigungsintervalle festgelegt?',
    answer:
      'Wir setzen nicht auf starre Standardpakete. Die Reinigungsintervalle und Leistungsverzeichnisse werden individuell nach einer Vor-Ort-Analyse, der tatsächlichen Nutzung Ihrer Flächen und Ihrer spezifischen Betriebslogik (z.B. Schichtpläne) entwickelt.',
  },
  {
    question: 'Bieten Sie auch spezialisierte Reinigungen für die Industrie an?',
    answer:
      'Ja, wir sind Experten für Industriereinigung. Dies umfasst die Reinigung von Produktionshallen, die fachgerechte Maschinen- und Anlagenreinigung sowie die Entfettung von Industrieböden – alles unter strenger Einhaltung von Arbeitssicherheitsvorschriften (UVV).',
  },
  {
    question: 'Können mehrere Leistungen kombiniert werden?',
    answer:
      'Selbstverständlich — das ist sogar der Regelfall. Sie erhalten ein konsolidiertes Leistungsverzeichnis, eine feste Objektleitung und eine Rechnung für alle gebuchten Leistungen.',
  },
];

export default function Leistungen() {
  return (
    <div>
      <SEO
        title="Gebäudereinigung Leistungen & Services | AHAD Cleaning"
        description="Alle Leistungen von AHAD Cleaning im Überblick: Unterhaltsreinigung, Industriereinigung, Glas- & Fassadenreinigung, Baureinigung, Medizintechnik, Sonderreinigung und Winterdienst."
        keywords="Gebäudereinigung Leistungen, Reinigungsservices Unternehmen, Reinigungsfirma Leistungen"
        schema={faqSchemaFrom(faqs)}
      />

      <PageHero
        eyebrow="Leistungen"
        title={
          <>
            Sieben Leistungen.
            <br />
            Ein Qualitätssystem.
          </>
        }
        lead="Wir verkaufen keine Reinigungsstunden, sondern stabile Prozesse, Werterhalt und Rechtssicherheit — jede Leistung läuft über dasselbe AHAD-System aus Analyse, Handling, Audit und Dokumentation."
        image={IMG.heroLowAngle}
        crumbs={[{ label: 'Leistungen' }]}
        cta={{ label: 'Angebot in 24h anfordern', to: '/angebot' }}
        secondaryCta={{ label: 'Das AHAD System', to: '/ahad-system' }}
      />

      {/* Leistungs-Liste: editorial, nummeriert */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="space-y-5">
            {SERVICES.map((service, i) => (
              <Reveal key={service.slug} delay={Math.min(i * 0.06, 0.2)}>
                <Link
                  to={service.path}
                  className="group grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center bg-paper hover:bg-white border border-line rounded-3xl p-6 lg:p-8 card-lift"
                >
                  <div className="lg:col-span-4 order-2 lg:order-1 flex items-start gap-5">
                    <span className="font-headline text-4xl font-bold text-navy/15 group-hover:text-accent transition-colors leading-none pt-1">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <span className="eyebrow text-brand mb-2">{service.tag}</span>
                      <h2 className="font-headline text-2xl font-bold text-navy leading-tight">{service.name}</h2>
                    </div>
                  </div>

                  <div className="lg:col-span-4 order-3 lg:order-2">
                    <p className="text-slate text-[15px] leading-relaxed">{service.heroLead.split('—')[0].split(':')[0]}.</p>
                    <ul className="mt-4 space-y-1.5">
                      {service.scope.slice(0, 2).map((item) => (
                        <li key={item} className="flex items-center gap-2 text-[13.5px] font-semibold text-navy">
                          <CheckCircle2 size={14} className="text-accent flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="lg:col-span-3 order-1 lg:order-3">
                    <SmartImage
                      src={service.image}
                      alt={service.name}
                      className="rounded-2xl aspect-[16/9] lg:aspect-[4/3]"
                      imgClassName="transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  <div className="lg:col-span-1 order-4 hidden lg:flex justify-end">
                    <span className="w-11 h-11 rounded-full bg-white border border-line grid place-items-center text-brand transition-all duration-300 group-hover:bg-accent group-hover:border-accent group-hover:text-white group-hover:translate-x-1">
                      <ArrowRight size={18} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 lg:py-28 bg-paper border-t border-line">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          <SectionHeading eyebrow="Gut zu wissen" title="Häufige Fragen zu unseren Leistungen" align="center" className="mb-12" />
          <Accordion items={faqs} />
        </div>
      </section>

      <CTABand />
    </div>
  );
}
