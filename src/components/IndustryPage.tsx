import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SEO from '@/components/SEO';
import PageHero from '@/components/PageHero';
import SectionHeading from '@/components/ui/SectionHeading';
import ButtonLink from '@/components/ui/Button';
import Accordion, { faqSchemaFrom } from '@/components/ui/Accordion';
import CTABand from '@/components/CTABand';
import { BRANCHEN, type BrancheData } from '@/data/branchen';
import { SITE, ORG_REF, AREA_SERVED } from '@/lib/site';

/** Gemeinsames Layout für alle Branchen-Seiten: Problem → Lösung → Leistungen. */
export default function IndustryPage({ branche }: { branche: BrancheData }) {
  const others = BRANCHEN.filter((b) => b.slug !== branche.slug);

  // Service-Schema je Branche — vorher hatten Branchenseiten nur FAQ-Schema
  // und blieben bei "Reinigung für [Branche]"-Suchen strukturell unsichtbar.
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE.url}${branche.path}#service`,
    url: `${SITE.url}${branche.path}`,
    name: `Gebäudereinigung für ${branche.name}`,
    serviceType: 'Gebäudereinigung',
    audience: { '@type': 'BusinessAudience', name: branche.name },
    provider: ORG_REF,
    areaServed: AREA_SERVED,
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

      {/* Ausgangslage: drei Probleme als nummerierte Spalten */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <SectionHeading
            eyebrow="Ausgangslage"
            title="Drei Probleme, die in dieser Branche häufig auftreten."
            className="mb-12 max-w-3xl"
          />
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-10">
            {branche.pains.map((pain, i) => (
              <li key={pain.title} className="border-t border-navy pt-5">
                <span className="block font-accent font-semibold text-accent mb-3" aria-hidden="true">
                  {i + 1}
                </span>
                <h3 className="text-xl font-bold text-navy mb-2.5">{pain.title}</h3>
                <p className="text-slate leading-relaxed">{pain.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Unser Vorgehen */}
      <section className="py-20 lg:py-28 bg-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-x-14 gap-y-10">
          <div className="lg:col-span-5">
            <p className="eyebrow text-mint mb-3">Unser Vorgehen</p>
            <h2 className="display-lg text-white">So lösen wir das für {branche.name}</h2>
            <ButtonLink to="/ahad-system" variant="white" arrow className="mt-9">
              Mehr zum AHAD System
            </ButtonLink>
          </div>
          <ul className="lg:col-span-7 border-t border-white/30">
            {branche.solutions.map((solution) => (
              <li key={solution} className="py-4 border-b border-white/15 text-lg font-medium text-blue-50">
                {solution}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Passende Leistungen */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <SectionHeading
            eyebrow="Passende Leistungen"
            title={`Typische Leistungspakete für ${branche.name}`}
            className="mb-10"
          />
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-x-10 border-t border-navy">
            {branche.services.map((service) => (
              <li key={service.path} className="border-b border-line">
                <Link to={service.path} className="group flex items-center justify-between gap-4 py-5">
                  <span className="text-lg font-bold text-navy group-hover:text-accent transition-colors">
                    {service.name}
                  </span>
                  <ArrowRight
                    size={17}
                    className="flex-shrink-0 text-navy/40 group-hover:text-accent transition-colors"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 lg:py-28 bg-paper border-t border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-x-14 gap-y-10">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="Häufige Fragen" title="Was Entscheider uns fragen" />
          </div>
          <div className="lg:col-span-8">
            <Accordion items={branche.faqs} />
          </div>
        </div>
      </section>

      {/* Weitere Branchen */}
      <section className="py-10 bg-white border-t border-line">
        <p className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-wrap items-baseline gap-x-6 gap-y-2 text-[15px]">
          <span className="font-semibold text-navy">Weitere Branchen:</span>
          {others.map((other) => (
            <Link key={other.slug} to={other.path} className="py-2.5 -my-2.5 text-accent font-medium hover:underline underline-offset-4">
              {other.name}
            </Link>
          ))}
        </p>
      </section>

      <CTABand
        title={`Reinigung für ${branche.name} anfragen`}
        lead={`Wir besprechen mit Ihnen die Anforderungen in ${branche.name} und klären Bedarf und nächste Schritte persönlich.`}
      />
    </div>
  );
}
