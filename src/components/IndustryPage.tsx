import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, X } from 'lucide-react';
import SEO from '@/components/SEO';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import ButtonLink from '@/components/ui/Button';
import Accordion, { faqSchemaFrom } from '@/components/ui/Accordion';
import CTABand from '@/components/CTABand';
import { BRANCHEN, type BrancheData } from '@/data/branchen';
import { SITE, ORG_REF } from '@/lib/site';

/** Gemeinsames Layout für alle Branchen-Seiten: Problem → Lösung → Leistungen. */
export default function IndustryPage({ branche }: { branche: BrancheData }) {
  const others = BRANCHEN.filter((b) => b.slug !== branche.slug);

  // Service-Schema je Branche — vorher hatten Branchenseiten nur FAQ-Schema
  // und blieben bei "Reinigung für [Branche]"-Suchen strukturell unsichtbar.
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Gebäudereinigung für ${branche.name}`,
    serviceType: 'Gebäudereinigung',
    audience: { '@type': 'BusinessAudience', name: branche.name },
    provider: ORG_REF,
    areaServed: 'Süddeutschland',
    description: branche.seoDescription,
  };

  return (
    <div>
      <SEO
        title={branche.seoTitle}
        description={branche.seoDescription}
        keywords={branche.keywords}
        schema={[serviceSchema, faqSchemaFrom(branche.faqs)]}
      />

      <PageHero
        eyebrow={branche.claim}
        title={branche.heroTitle}
        lead={branche.heroLead}
        image={branche.image}
        imageAlt={branche.name}
        crumbs={[{ label: 'Branchen', href: '/branchen' }, { label: branche.name }]}
        cta={{ label: 'Kostenlose Besichtigung anfragen', to: '/angebot' }}
        secondaryCta={{ label: SITE.phone, href: SITE.phoneHref }}
      />

      {/* Problem → Lösung */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <SectionHeading
            eyebrow="Kennen Sie das?"
            title="Drei Probleme, die Sie kein zweites Mal haben sollten."
            className="mb-12 lg:mb-16 max-w-3xl"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {branche.pains.map((pain, i) => (
              <Reveal key={pain.title} delay={i * 0.1} className="h-full">
                <div className="h-full bg-paper rounded-3xl border border-line p-8">
                  <span className="inline-flex w-10 h-10 rounded-xl bg-red-50 text-red-500 items-center justify-center mb-5">
                    <X size={20} />
                  </span>
                  <h3 className="font-headline font-bold text-lg text-navy mb-3">{pain.title}</h3>
                  <p className="text-sm text-slate leading-relaxed">{pain.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="relative bg-navy text-white rounded-[2rem] p-8 sm:p-12 lg:p-16 overflow-hidden grain">
              <div className="absolute inset-0 blueprint-grid" />
              <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-accent/25 blur-[100px]" />
              <div className="relative z-10">
                <span className="eyebrow text-mint mb-5">
                  <span className="h-px w-8 bg-mint/50" />
                  Die AHAD-Antwort
                </span>
                <h3 className="display-md text-white mb-10 max-w-2xl">
                  So lösen wir das für {branche.name}:
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4 mb-10">
                  {branche.solutions.map((solution) => (
                    <li key={solution} className="flex items-start gap-3 font-semibold text-blue-50">
                      <CheckCircle2 className="w-5 h-5 text-mint flex-shrink-0 mt-0.5" />
                      <span>{solution}</span>
                    </li>
                  ))}
                </ul>
                <ButtonLink to="/ahad-system" variant="white" arrow>
                  Das System dahinter verstehen
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Passende Leistungen */}
      <section className="py-20 lg:py-28 bg-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <SectionHeading
            eyebrow="Passende Leistungen"
            title={`Typische Leistungspakete für ${branche.name}`}
            className="mb-12"
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {branche.services.map((service, i) => (
              <Reveal key={service.path} delay={i * 0.08}>
                <Link
                  to={service.path}
                  className="group flex items-center justify-between gap-4 bg-white rounded-2xl border border-line p-6 card-lift"
                >
                  <span className="font-headline font-bold text-navy">{service.name}</span>
                  <span className="w-9 h-9 rounded-full bg-paper grid place-items-center text-brand transition-colors group-hover:bg-accent group-hover:text-white flex-shrink-0">
                    <ArrowRight size={16} />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 lg:py-28 bg-white border-t border-line">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          <SectionHeading eyebrow="Häufige Fragen" title="Was Entscheider uns fragen" align="center" className="mb-12" />
          <Accordion items={branche.faqs} />
        </div>
      </section>

      {/* Weitere Branchen */}
      <section className="py-16 bg-paper border-t border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-bold text-slate mr-2">Weitere Branchen:</span>
            {others.map((other) => (
              <Link
                key={other.slug}
                to={other.path}
                className="text-[13px] font-semibold bg-white border border-line hover:border-brand hover:text-brand px-4 py-2 rounded-full transition-colors"
              >
                {other.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title={`Ihr Objekt in besten Händen`}
        lead={`Lassen Sie uns über die Anforderungen in ${branche.name} sprechen — wir klären Bedarf und nächste Schritte persönlich.`}
      />
    </div>
  );
}
