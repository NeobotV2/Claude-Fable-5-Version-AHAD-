import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import PageHero from '@/components/PageHero';
import SectionHeading from '@/components/ui/SectionHeading';
import ButtonLink from '@/components/ui/Button';
import LinkList from '@/components/ui/LinkList';
import RuleColumns from '@/components/ui/RuleColumns';
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
      <section className="section-y bg-white">
        <div className="container-page">
          <SectionHeading
            eyebrow="Ausgangslage"
            title="Drei Probleme, die in dieser Branche häufig auftreten."
            className="mb-12 max-w-3xl"
          />
          <RuleColumns ordered items={branche.pains.map(({ title, text }) => ({ title, text }))} />
        </div>
      </section>

      {/* Unser Vorgehen */}
      <section className="section-y bg-navy text-white">
        <div className="container-page grid grid-cols-1 lg:grid-cols-12 gap-x-14 gap-y-10">
          <div className="lg:col-span-5">
            <p className="eyebrow text-mint mb-3">Unser Vorgehen</p>
            <h2 className="display-lg text-white">So lösen wir das für {branche.name}</h2>
            <ButtonLink to="/ahad-system" variant="white" arrow className="mt-9">
              Mehr zum AHAD System
            </ButtonLink>
          </div>
          <ul className="lg:col-span-7 border-t border-white/30">
            {branche.solutions.map((solution) => (
              <li key={solution} className="py-4 border-b border-white/15 text-lg font-medium text-ondark">
                {solution}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Passende Leistungen */}
      <section className="section-y bg-white">
        <div className="container-page">
          <SectionHeading
            eyebrow="Passende Leistungen"
            title={`Typische Leistungspakete für ${branche.name}`}
            className="mb-10"
          />
          <LinkList
            large
            cols={3}
            items={branche.services.map((service) => ({ to: service.path, title: service.name }))}
          />
        </div>
      </section>

      {/* FAQ */}
      <section className="section-y bg-paper border-t border-line">
        <div className="container-page grid grid-cols-1 lg:grid-cols-12 gap-x-14 gap-y-10">
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
        <p className="container-page flex flex-wrap items-baseline gap-x-6 gap-y-2 text-body-sm">
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
