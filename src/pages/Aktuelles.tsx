import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SEO from '@/components/SEO';
import PageHero from '@/components/PageHero';
import CTABand from '@/components/CTABand';
import { SITE } from '@/lib/site';
import { NEWS_BY_DATE, formatNewsDate, newsUrl } from '@/data/news';

/**
 * Übersicht der Unternehmensmeldungen. Als CollectionPage ausgezeichnet, die
 * einzelnen Meldungen tragen ihr eigenes NewsArticle-Markup.
 */
const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${SITE.url}/aktuelles#collection`,
  url: `${SITE.url}/aktuelles`,
  name: 'Aktuelles von AHAD Cleaning',
  inLanguage: 'de-DE',
  isPartOf: { '@type': 'WebSite', '@id': `${SITE.url}/#website`, url: `${SITE.url}/`, name: SITE.name },
  hasPart: NEWS_BY_DATE.map((item) => ({
    '@type': 'NewsArticle',
    headline: item.headline,
    datePublished: item.datePublished,
    url: newsUrl(item),
  })),
};

export default function Aktuelles() {
  return (
    <div>
      <SEO
        title="Aktuelles aus der Gebäudereinigung | AHAD Cleaning"
        description="Unternehmensmeldungen der AHAD Cleaning Company GmbH aus Villingen-Schwenningen zu Übernahmen, Standorten und der Entwicklung des Unternehmens."
        keywords="AHAD Cleaning Neuigkeiten, Gebäudereinigung Villingen-Schwenningen aktuell, Unternehmensmeldung"
        schema={SCHEMA}
      />

      <PageHero
        eyebrow="Aktuelles"
        titleSize="lg"
        title={
          <>
            <span className="block">Meldungen aus{' '}</span>
            <span className="block">dem Unternehmen.</span>
          </>
        }
        image="/images/ahad/meeting.webp"
        crumbs={[{ label: 'Aktuelles' }]}
      />

      <section className="section-y bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-8">
          <ul className="border-t border-navy">
            {NEWS_BY_DATE.map((item) => (
              <li key={item.slug} className="border-b border-line py-8">
                <article>
                  <p className="text-sm font-semibold text-accent mb-2">
                    <time dateTime={item.datePublished}>{formatNewsDate(item.datePublished)}</time>
                    {' · '}
                    {item.topic}
                  </p>
                  <h2 className="text-xl sm:text-2xl font-bold text-navy leading-snug">
                    <Link to={`/aktuelles/${item.slug}`} className="hover:text-accent transition-colors">
                      {item.headline}
                    </Link>
                  </h2>
                  <p className="mt-3 leading-relaxed text-slate">{item.summary}</p>
                  <Link to={`/aktuelles/${item.slug}`} className="text-link mt-4">
                    Meldung lesen <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTABand
        title="Sprechen wir über Ihr Objekt"
        lead="Wir besichtigen Ihr Objekt kostenlos und erstellen danach ein Angebot. Betreut wird es von einer festen Objektleitung."
      />
    </div>
  );
}
