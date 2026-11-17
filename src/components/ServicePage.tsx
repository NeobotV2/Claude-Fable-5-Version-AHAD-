import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import SEO from '@/components/SEO';
import PageHero from '@/components/PageHero';
import SectionHeading from '@/components/ui/SectionHeading';
import ButtonLink from '@/components/ui/Button';
import SmartImage from '@/components/ui/SmartImage';
import Accordion, { faqSchemaFrom } from '@/components/ui/Accordion';
import CTABand from '@/components/CTABand';
import { SERVICES, type ServiceData } from '@/data/services';
import {
  EDITORIAL_ARTICLES,
  getEditorialArticlePath,
  type EditorialArticleSlug,
} from '@/data/editorial';
import { PROMISES, SITE, ORG_REF, AREA_SERVED } from '@/lib/site';

/** Passende Fachwissen-Artikel je Leistung — interne Verlinkung in den
 *  Wissensbereich (SEO + Verweildauer). Bewusst kuratiert statt automatisch. */
const FACHWISSEN_BY_SLUG: Record<string, EditorialArticleSlug[]> = {
  unterhaltsreinigung: [
    'was-kostet-gebaeudereinigung-stundensatz-preise',
    'unterhaltsreinigung-unternehmen-reinigungsintervalle',
    'leistungsverzeichnis-gebaeudereinigung-erstellen',
    'mindestlohn-gebaeudereinigung',
  ],
  'industrie-produktionsreinigung': [
    'industrie-produktionsreinigung-ohne-prozessstoerung',
    'iso-9001-iso-14001-gebaeudereinigung-unternehmen',
  ],
  'glas-fassadenreinigung': [
    'reinigungsfirma-wechseln-checkliste-tipps',
    'mindestlohn-gebaeudereinigung',
  ],
  baureinigung: [
    'leistungsverzeichnis-gebaeudereinigung-erstellen',
  ],
  'medizintechnik-reinigung': [
    'iso-9001-iso-14001-gebaeudereinigung-unternehmen',
    'unterhaltsreinigung-unternehmen-reinigungsintervalle',
  ],
  'sonderreinigung-stillstandsservice': [
    'industrie-produktionsreinigung-ohne-prozessstoerung',
  ],
  'winterdienst-hausmeisterservice': [
    'raeum-und-streupflicht-unternehmen',
    'reinigungsfirma-wechseln-checkliste-tipps',
  ],
  'kuechenabluftreinigung-vdi-2052': [
    'kuechenabluftreinigung-vdi-2052-pflicht-ablauf-nachweis',
  ],
};

/** Gemeinsames Layout für alle Leistungs-Detailseiten. */
export default function ServicePage({ service }: { service: ServiceData }) {
  const related = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 3);
  const articles = (FACHWISSEN_BY_SLUG[service.slug] ?? []).map((slug) => ({
    title: EDITORIAL_ARTICLES[slug].listingTitle,
    to: getEditorialArticlePath(slug),
  }));

  const serviceUrl = `${SITE.url}/leistungen/${service.slug}`;
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${serviceUrl}#service`,
    url: serviceUrl,
    name: service.name,
    serviceType: service.name,
    provider: ORG_REF,
    areaServed: AREA_SERVED,
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
        cta={{ label: 'Kostenlose Besichtigung anfragen', to: '/angebot' }}
        secondaryCta={{ label: SITE.phone, href: SITE.phoneHref }}
      />

      {/* Express-Banner: Telefon zuerst — für kurzfristige/dringende Einsätze */}
      {service.expressBanner && (
        <section className="bg-accent text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <p className="font-semibold text-[15px]">
              Kurzfristige oder dringende Einsätze: Rufen Sie direkt an, wir disponieren noch heute.
            </p>
            <a
              href={SITE.phoneHref}
              className="inline-flex items-center justify-center gap-2 bg-white text-navy px-5 py-2.5 rounded-md font-semibold hover:bg-mint transition-colors flex-shrink-0"
            >
              <Phone size={16} aria-hidden="true" />
              {SITE.phone}
            </a>
          </div>
        </section>
      )}

      {/* Versprechen-Leiste — nur, wenn das Claim-Register Servicelevel freigibt
          (sonst bliebe ein leerer weißer Streifen mit Trennlinie). */}
      {PROMISES.length > 0 && (
        <section className="bg-white border-b border-line">
          <ul className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 sm:grid-cols-3 sm:divide-x divide-line">
            {PROMISES.map((promise) => (
              <li key={promise.label} className="py-5 sm:py-6 flex items-baseline gap-3 sm:px-8 sm:first:pl-0">
                <span className="font-accent text-3xl font-semibold text-navy tabular-nums">{promise.value}</span>
                <span className="text-[15px] text-slate leading-snug">{promise.label}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Schwerpunkte: drei Spalten mit Haarlinie, ohne Karten und Icons */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <SectionHeading eyebrow="Schwerpunkte" title={`${service.name} mit AHAD`} className="mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-10">
            {service.highlights.map((highlight) => (
              <div key={highlight.title} className="border-t border-navy pt-5">
                <h3 className="text-xl font-bold text-navy mb-2.5">{highlight.title}</h3>
                <p className="text-slate leading-relaxed">{highlight.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leistungsumfang */}
      <section className="py-20 lg:py-28 bg-paper border-y border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12 items-start">
          <div>
            <SectionHeading eyebrow="Leistungsumfang" title={service.scopeTitle} lead={service.scopeIntro} />
            <ul className="mt-9 border-t border-navy">
              {service.scope.map((item) => (
                <li key={item} className="py-3 border-b border-line text-navy font-medium">
                  {item}
                </li>
              ))}
            </ul>
            {service.detailLinks && (
              <p className="mt-6 text-[15px] text-slate">
                Mehr dazu:{' '}
                {service.detailLinks.map((link, i) => (
                  <span key={link.to}>
                    {i > 0 && ', '}
                    <Link to={link.to} className="font-semibold text-accent underline underline-offset-4 hover:text-accent-dark">
                      {link.label}
                    </Link>
                  </span>
                ))}
              </p>
            )}
            <div className="mt-9 flex flex-wrap items-center gap-x-4 gap-y-3">
              <ButtonLink to="/angebot" arrow>
                Unverbindlich anfragen
              </ButtonLink>
              <ButtonLink to="/ahad-system" variant="outline">
                So sichern wir Qualität
              </ButtonLink>
            </div>
          </div>

          <figure>
            <SmartImage
              src={service.detailImage}
              alt={`${service.name}: Ausführung durch AHAD Cleaning`}
              sizes="(min-width:1024px) 50vw, 100vw"
              className="aspect-[4/3]"
            />
            <figcaption className="mt-4 border-l-2 border-accent pl-4 text-[15px] text-slate leading-relaxed">
              <span className="font-semibold text-navy">Feste Objektleitung.</span> Eine feste Ansprechperson, die Ihr
              Objekt kennt und für die Ausführung verantwortlich ist.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-x-14 gap-y-10">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="Häufige Fragen" title={`Fragen und Antworten: ${service.name}`} />
            <a href={SITE.phoneHref} className="text-link mt-7">
              <Phone size={17} aria-hidden="true" />
              Direkt fragen: {SITE.phone}
            </a>
          </div>
          <div className="lg:col-span-8">
            <Accordion items={service.faqs} />
          </div>
        </div>
      </section>

      {/* Verwandte Leistungen */}
      <section className="py-20 lg:py-28 bg-white border-t border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex items-end justify-between gap-6 mb-10">
            <h2 className="display-md text-navy">Verwandte Leistungen</h2>
            <Link to="/leistungen" className="text-link hidden sm:inline-flex flex-shrink-0">
              Alle Leistungen <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-10">
            {related.map((rel) => (
              <Link key={rel.slug} to={rel.path} className="group block">
                <SmartImage src={rel.image} alt="" sizes="(min-width:640px) 33vw, 100vw" className="aspect-[3/2]" />
                <h3 className="mt-4 flex items-center justify-between gap-3 text-lg font-bold text-navy group-hover:text-accent transition-colors">
                  {rel.name}
                  <ArrowRight size={17} className="flex-shrink-0" aria-hidden="true" />
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Passende Fachwissen-Artikel — interne Verlinkung Leistung -> Wissensbereich */}
      {articles.length > 0 && (
        <section className="py-14 lg:py-16 bg-paper border-t border-line">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <h2 className="pb-4 border-b border-navy font-semibold text-navy">Fachbeiträge zum Thema</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
              {articles.map((a) => (
                <li key={a.to} className="border-b border-line">
                  <Link to={a.to} className="group flex items-center justify-between gap-4 py-4">
                    <span className="font-medium text-navy leading-snug group-hover:text-accent transition-colors">
                      {a.title}
                    </span>
                    <ArrowRight
                      size={16}
                      className="flex-shrink-0 text-navy/40 group-hover:text-accent transition-colors"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CTABand title={service.ctaTitle} lead={service.ctaLead} />
    </div>
  );
}
