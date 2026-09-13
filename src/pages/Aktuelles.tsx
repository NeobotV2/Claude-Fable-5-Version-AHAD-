import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SEO from '@/components/SEO';
import PageHero from '@/components/PageHero';
import CTABand from '@/components/CTABand';
import Reveal from '@/components/ui/Reveal';
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
  isPartOf: { '@id': `${SITE.url}/#website` },
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
        title="Aktuelles | AHAD Cleaning"
        description="Unternehmensmeldungen der AHAD Cleaning Company GmbH aus Villingen-Schwenningen — Übernahmen, Standorte und Entwicklungen im Überblick."
        keywords="AHAD Cleaning Neuigkeiten, Gebäudereinigung Villingen-Schwenningen aktuell, Unternehmensmeldung"
        schema={SCHEMA}
      />

      <PageHero
        eyebrow="Aktuelles"
        titleSize="lg"
        title={
          <>
            <span className="block">Was sich bei uns{' '}</span>
            <span className="block">bewegt.</span>
          </>
        }
        lead="Unternehmensmeldungen aus erster Hand — knapp, datiert und mit Quellen belegt."
        image="/images/ahad/meeting.webp"
        crumbs={[{ label: 'Aktuelles' }]}
      />

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-8">
          <ul className="space-y-6">
            {NEWS_BY_DATE.map((item, index) => (
              <li key={item.slug}>
                <Reveal delay={Math.min(index * 0.06, 0.2)}>
                  <article className="bg-paper rounded-3xl border border-line p-7 sm:p-9 card-lift">
                    <p className="text-[13px] font-bold uppercase tracking-wider text-accent mb-3">
                      <time dateTime={item.datePublished}>{formatNewsDate(item.datePublished)}</time>
                      {' · '}
                      {item.topic}
                    </p>
                    <h2 className="font-headline text-xl sm:text-2xl font-bold text-navy leading-snug">
                      <Link to={`/aktuelles/${item.slug}`} className="hover:text-brand transition-colors">
                        {item.headline}
                      </Link>
                    </h2>
                    <p className="mt-3 text-[15px] leading-relaxed text-slate">{item.summary}</p>
                    <Link
                      to={`/aktuelles/${item.slug}`}
                      className="mt-5 inline-flex items-center gap-2 font-bold text-brand hover:underline"
                    >
                      Meldung lesen <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTABand
        title="Sprechen wir über Ihr Objekt"
        lead="Kostenlose Besichtigung, transparentes Angebot, feste Objektleitung."
      />
    </div>
  );
}
