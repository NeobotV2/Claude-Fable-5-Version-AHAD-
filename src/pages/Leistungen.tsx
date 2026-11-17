import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SEO from '@/components/SEO';
import PageHero from '@/components/PageHero';
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
      'AHAD Cleaning übernimmt Unterhaltsreinigung für Büros, Industrie- und Produktionsreinigung, Glas- und Fassadenreinigung, Baureinigung, Medizintechnik- und Reinraumreinigung, Küchenabluftreinigung nach VDI 2052, Sonderreinigungen sowie Winterdienst und Hausmeisterservice.',
  },
  {
    question: 'Wie werden die Reinigungsintervalle festgelegt?',
    answer:
      'Nach einer Begehung vor Ort. Intervalle und Leistungsverzeichnis richten sich danach, wie Ihre Flächen genutzt werden und wie Ihr Betrieb läuft, zum Beispiel nach Ihren Schichtplänen.',
  },
  {
    question: 'Bieten Sie auch spezialisierte Reinigungen für die Industrie an?',
    answer:
      'Ja. Wir reinigen Produktionshallen, Maschinen und Anlagen fachgerecht und entfetten Industrieböden. Dabei halten wir die Arbeitssicherheitsvorschriften (UVV) ein.',
  },
  {
    question: 'Können mehrere Leistungen kombiniert werden?',
    answer:
      'Ja, das ist bei uns der Regelfall. Sie erhalten ein gemeinsames Leistungsverzeichnis, eine feste Objektleitung und eine Rechnung für alle gebuchten Leistungen.',
  },
];

export default function Leistungen() {
  return (
    <div>
      <SEO
        title="Gebäudereinigung Leistungen & Services | AHAD Cleaning"
        description="Gebäudereinigung: Unterhaltsreinigung, Industriereinigung, Glas- & Fassadenreinigung, Baureinigung, Medizintechnik, Sonderreinigung, Winterdienst."
        keywords="Gebäudereinigung Leistungen, Reinigungsservices Unternehmen, Reinigungsfirma Leistungen"
        schema={faqSchemaFrom(faqs)}
      />

      <PageHero
        eyebrow="Leistungen"
        title="Gebäudereinigung: acht Leistungen, ein Qualitätssystem"
        lead="Ob Büro, Halle oder Baustelle: Jede Leistung läuft über das AHAD System aus Analyse, Handling, Audit und Dokumentation."
        image={IMG.heroLowAngle}
        crumbs={[{ label: 'Leistungen' }]}
        cta={{ label: 'Kostenlose Besichtigung anfragen', to: '/angebot' }}
        secondaryCta={{ label: 'Das AHAD System', to: '/ahad-system' }}
      />

      {/* Verzeichnis aller Leistungen: Foto, Name, Kurzbeschreibung */}
      <section className="section-y bg-white">
        <div className="container-page">
          <ul className="border-t border-navy">
            {SERVICES.map((service) => (
              <li key={service.slug} className="border-b border-line">
                <Link
                  to={service.path}
                  className="group grid grid-cols-1 sm:grid-cols-[15rem_1fr_auto] items-center gap-x-10 gap-y-4 py-6"
                >
                  <SmartImage
                    src={service.image}
                    alt={service.name}
                    sizes="(min-width:640px) 240px, 100vw"
                    className="aspect-[3/2]"
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-accent mb-1">{service.tag}</p>
                    <h2 className="text-xl sm:text-2xl font-bold text-navy leading-tight group-hover:text-accent transition-colors">
                      {service.name}
                    </h2>
                    <p className="mt-2 text-slate leading-relaxed max-w-2xl">
                      {service.heroLead.split('—')[0].split(':')[0]}.
                    </p>
                    <p className="mt-2 text-body-sm text-slate">{service.scope.slice(0, 2).join(' · ')}</p>
                  </div>
                  <ArrowRight
                    size={20}
                    className="hidden sm:block flex-shrink-0 text-navy/40 group-hover:text-accent transition-colors"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-y bg-paper border-t border-line">
        <div className="container-page grid grid-cols-1 lg:grid-cols-12 gap-x-14 gap-y-10">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="FAQ" title="Häufige Fragen zu unseren Leistungen" />
          </div>
          <div className="lg:col-span-8">
            <Accordion items={faqs} />
          </div>
        </div>
      </section>

      <CTABand />
    </div>
  );
}
