import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Phone } from 'lucide-react';
import SEO from '@/components/SEO';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import ButtonLink from '@/components/ui/Button';
import SmartImage from '@/components/ui/SmartImage';
import Accordion, { faqSchemaFrom } from '@/components/ui/Accordion';
import CTABand from '@/components/CTABand';
import { SERVICES, type ServiceData } from '@/data/services';
import { PROMISES, SITE } from '@/lib/site';

/** Gemeinsames Premium-Layout für alle Leistungs-Detailseiten. */
export default function ServicePage({ service }: { service: ServiceData }) {
  const related = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 3);

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    provider: { '@id': `${SITE.url}/#organization` },
    areaServed: 'Süddeutschland',
    description: service.seoDescription,
  };

  return (
    <div>
      <SEO
        title={service.seoTitle}
        description={service.seoDescription}
        keywords={service.keywords}
        schema={[faqSchemaFrom(service.faqs), serviceSchema]}
      />

      <PageHero
        eyebrow={service.tag}
        title={service.heroTitle}
        lead={service.heroLead}
        image={service.image}
        imageAlt={service.name}
        crumbs={[{ label: 'Leistungen', href: '/leistungen' }, { label: service.name }]}
        cta={{ label: 'Angebot in 24h anfordern', to: '/angebot' }}
        secondaryCta={{ label: SITE.phone, href: SITE.phoneHref }}
      />

      {/* Versprechen-Leiste */}
      <section className="bg-white border-b border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {PROMISES.map((promise, i) => (
            <Reveal key={promise.label} delay={i * 0.08} y={16}>
              <div className="flex items-center gap-4">
                <span className="font-accent text-3xl font-bold text-brand">{promise.value}</span>
                <span className="text-sm font-semibold text-slate leading-snug">{promise.label}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Auf einen Blick */}
      <section className="py-20 lg:py-28 bg-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <SectionHeading
            eyebrow="Auf einen Blick"
            title={`${service.name} mit AHAD`}
            className="mb-12 lg:mb-16"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {service.highlights.map((highlight, i) => (
              <Reveal key={highlight.title} delay={i * 0.1} className="h-full">
                <div className="bg-white h-full p-8 rounded-3xl border border-line shadow-soft card-lift">
                  <span className="inline-flex w-14 h-14 rounded-2xl bg-paper items-center justify-center mb-6">
                    {highlight.icon}
                  </span>
                  <h3 className="font-headline font-bold text-xl text-navy mb-3">{highlight.title}</h3>
                  <p className="text-slate text-sm leading-relaxed">{highlight.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Leistungsumfang */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <div>
            <SectionHeading eyebrow="Leistungsumfang" title={service.scopeTitle} lead={service.scopeIntro} />
            <Reveal delay={0.15}>
              <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                {service.scope.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[15px] font-medium text-navy">
                    <CheckCircle2 className="text-accent w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.25} className="mt-10">
              <div className="flex flex-col sm:flex-row gap-4">
                <ButtonLink to="/angebot" arrow>
                  Unverbindlich anfragen
                </ButtonLink>
                <ButtonLink to="/ahad-system" variant="outline">
                  So sichern wir Qualität
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className="relative">
              <SmartImage
                src={service.detailImage}
                alt={`${service.name} — Ausführung durch AHAD Cleaning`}
                className="rounded-3xl shadow-lifted aspect-[4/3]"
              />
              <div className="absolute -bottom-6 -left-6 hidden sm:block bg-navy text-white rounded-2xl p-6 shadow-lifted max-w-[16rem] grain overflow-hidden">
                <p className="relative z-10 font-headline font-bold text-lg leading-snug mb-1.5">Feste Objektleitung</p>
                <p className="relative z-10 text-blue-100/80 text-[13px] leading-relaxed">
                  Ein Ansprechpartner, der Ihr Objekt kennt — erreichbar, verantwortlich, verbindlich.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 lg:py-28 bg-paper">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          <SectionHeading
            eyebrow="Häufige Fragen"
            title={`FAQs zur ${service.name}`}
            align="center"
            className="mb-12"
          />
          <Accordion items={service.faqs} />
          <Reveal delay={0.2} className="mt-8 text-center">
            <a
              href={SITE.phoneHref}
              className="inline-flex items-center gap-2 text-brand font-bold hover:text-brand-light transition-colors"
            >
              <Phone size={17} />
              Direkt fragen: {SITE.phone}
            </a>
          </Reveal>
        </div>
      </section>

      {/* Verwandte Leistungen */}
      <section className="py-20 lg:py-28 bg-white border-t border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex items-end justify-between gap-6 mb-10">
            <h2 className="display-md text-navy">Verwandte Leistungen</h2>
            <Link to="/leistungen" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-bold text-brand hover:text-brand-light transition-colors flex-shrink-0">
              Alle Leistungen <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {related.map((rel, i) => (
              <Reveal key={rel.slug} delay={i * 0.08}>
                <Link
                  to={rel.path}
                  className="group relative flex min-h-[13rem] rounded-3xl overflow-hidden bg-navy shadow-soft card-lift"
                >
                  <SmartImage
                    src={rel.image}
                    alt={rel.name}
                    className="absolute inset-0"
                    imgClassName="opacity-60 transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/40 to-transparent" />
                  <div className="relative z-10 mt-auto p-6 text-white flex items-center justify-between gap-3 w-full">
                    <h3 className="font-headline font-bold text-lg leading-snug">{rel.name}</h3>
                    <span className="w-8 h-8 rounded-full bg-white/15 backdrop-blur grid place-items-center flex-shrink-0 transition-colors group-hover:bg-accent">
                      <ArrowRight size={15} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand title={service.ctaTitle} lead={service.ctaLead} />
    </div>
  );
}
