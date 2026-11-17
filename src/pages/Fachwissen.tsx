import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import PageHero from '@/components/PageHero';
import CTABand from '@/components/CTABand';
import RuleColumns from '@/components/ui/RuleColumns';
import { SITE } from '@/lib/site';
import {
  EDITORIAL_ARTICLE_LIST,
  EDITORIAL_ARTICLES,
  EDITORIAL_CLUSTERS,
  EDITORIAL_CLUSTER_ORDER,
  getEditorialArticlePath,
  type EditorialArticleSlug,
} from '@/data/editorial';

const rolePaths: Array<{
  title: string;
  focus: string;
  articles: readonly EditorialArticleSlug[];
}> = [
  {
    title: 'Facility Management',
    focus: 'Bedarf, Intervalle und Qualität im Objekt steuern',
    articles: [
      'unterhaltsreinigung-unternehmen-reinigungsintervalle',
      'leistungsverzeichnis-gebaeudereinigung-erstellen',
    ],
  },
  {
    title: 'Einkauf',
    focus: 'Leistungen einheitlich beschreiben und Angebote nachvollziehbar vergleichen',
    articles: ['checkliste-reinigungsangebot', 'was-kostet-gebaeudereinigung-stundensatz-preise'],
  },
  {
    title: 'Geschäftsführung',
    focus: 'Versorgungs-, Qualitäts- und Compliance-Risiken einordnen',
    articles: [
      'reinigungsfirma-wechseln-checkliste-tipps',
      'iso-9001-iso-14001-gebaeudereinigung-unternehmen',
    ],
  },
];

const dateFormatter = new Intl.DateTimeFormat('de-DE', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  timeZone: 'UTC',
});

function formatDate(value: string) {
  return dateFormatter.format(new Date(`${value}T00:00:00Z`));
}

const knowledgeSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Fachwissen Gebäudereinigung für Auftraggeber',
  description: 'Entscheidungshilfen zu Planung, Vergabe, Anbieterwechsel, Qualität und Compliance.',
  url: `${SITE.url}/fachwissen`,
  inLanguage: 'de-DE',
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: EDITORIAL_ARTICLE_LIST.map((article, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: article.listingTitle,
      url: `${SITE.url}${getEditorialArticlePath(article.slug)}`,
    })),
  },
};

export default function Fachwissen() {
  return (
    <div>
      <SEO
        title="Fachwissen Gebäudereinigung für Entscheider | AHAD Cleaning"
        description="Entscheidungshilfen für Facility Management, Einkauf und Geschäftsführung: Kosten planen, Leistungen ausschreiben, Anbieter wechseln und Nachweise prüfen."
        keywords="Fachwissen Gebäudereinigung, Reinigungskosten kalkulieren, Reinigungsangebot vergleichen, Leistungsverzeichnis Reinigung, Anbieterwechsel"
        schema={knowledgeSchema}
      />

      <PageHero
        compact
        titleSize="lg"
        eyebrow="Fachwissen für Auftraggeber"
        title="Gebäudereinigung sicher entscheiden"
        lead="Leitfäden für Facility Management, Einkauf und Geschäftsführung zu Kalkulation, Ausschreibung, Anbieterwechsel und Nachweisen."
        crumbs={[{ label: 'Fachwissen' }]}
      />

      {/* Alle Leitfäden, nach Thema gegliedert: links das Thema, rechts die Beiträge als Liste. */}
      <section aria-labelledby="alle-leitfaeden" className="bg-white section-y">
        <div className="container-page">
          <div className="max-w-3xl">
            <p className="eyebrow mb-3 text-accent">Alle Entscheidungshilfen</p>
            <h2 id="alle-leitfaeden" className="display-lg text-navy">Leitfäden nach Thema</h2>
            <p className="mt-4 text-lg leading-relaxed text-slate">
              Jeder Beitrag behandelt eine Prüffrage und nennt am Ende zwei passende Folgethemen.
            </p>
          </div>

          <nav aria-label="Themenpfade" className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-1 border-y border-line py-2">
            <span className="text-caption font-semibold text-slate">Direkt zum Thema</span>
            {EDITORIAL_CLUSTER_ORDER.map((clusterKey) => (
              <a key={clusterKey} href={`#${clusterKey}`} className="text-link text-body-sm my-0">
                {EDITORIAL_CLUSTERS[clusterKey].shortTitle}
              </a>
            ))}
          </nav>

          <div>
            {EDITORIAL_CLUSTER_ORDER.map((clusterKey) => {
              const cluster = EDITORIAL_CLUSTERS[clusterKey];
              const articles = EDITORIAL_ARTICLE_LIST.filter((article) => article.cluster === clusterKey);

              return (
                <section
                  key={clusterKey}
                  id={clusterKey}
                  aria-labelledby={`${clusterKey}-titel`}
                  className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-12 gap-x-14 gap-y-6 pt-14 lg:pt-16"
                >
                  <div className="lg:col-span-4">
                    <h3 id={`${clusterKey}-titel`} className="text-2xl font-bold leading-tight text-navy">
                      {cluster.title}
                    </h3>
                    <p className="mt-3 text-slate leading-relaxed">{cluster.description}</p>
                  </div>

                  <ul className="lg:col-span-8 border-t border-navy">
                    {articles.map((article) => (
                      <li key={article.slug} className="border-b border-line">
                        <Link
                          to={getEditorialArticlePath(article.slug)}
                          className="group flex items-start justify-between gap-6 py-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                        >
                          <span>
                            <span className="block text-caption text-slate">
                              {article.topic} · {article.readingMinutes} Min. Lesezeit · aktualisiert {formatDate(article.dateModified)}
                            </span>
                            <h4 className="mt-1.5 text-xl font-bold leading-snug text-navy transition-colors group-hover:text-accent">
                              {article.listingTitle}
                            </h4>
                            <span className="mt-1.5 block text-slate leading-relaxed">{article.decisionQuestion}</span>
                          </span>
                          <ArrowRight
                            size={20}
                            className="mt-7 shrink-0 text-accent transition-transform group-hover:translate-x-1"
                            aria-hidden="true"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}
          </div>
        </div>
      </section>

      {/* Einstieg nach Rolle */}
      <section aria-labelledby="rollen-einstieg" className="section-y bg-paper border-t border-line">
        <div className="container-page">
          <div className="max-w-3xl mb-10">
            <p className="eyebrow mb-3 text-accent">Nach Rolle</p>
            <h2 id="rollen-einstieg" className="display-lg text-navy">Empfohlene Einstiege für Ihre Rolle</h2>
            <p className="mt-4 text-lg leading-relaxed text-slate">
              Je Rolle zwei Leitfäden für den Anfang. Die übrigen stehen oben nach Thema.
            </p>
          </div>

          <div className="grid gap-x-10 gap-y-10 md:grid-cols-3">
            {rolePaths.map((role, index) => (
              <section key={role.title} className="border-t border-navy pt-5" aria-labelledby={`rolle-${index}`}>
                <h3 id={`rolle-${index}`} className="text-xl font-bold text-navy">{role.title}</h3>
                <p className="mt-2 text-slate leading-relaxed">{role.focus}</p>
                <ul className="mt-4">
                  {role.articles.map((slug) => (
                    <li key={slug} className="border-t border-line">
                      <Link
                        to={getEditorialArticlePath(slug)}
                        className="group flex items-start justify-between gap-3 py-3 font-semibold leading-snug text-navy hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                      >
                        {EDITORIAL_ARTICLES[slug].listingTitle}
                        <ArrowRight size={16} className="mt-1 shrink-0 text-accent" aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </section>

      {/* Redaktionsstandard */}
      <section aria-labelledby="redaktionsstandard" className="section-y-sm bg-white border-t border-line">
        <div className="container-page">
          <p className="eyebrow mb-3 text-accent">Quellen und Prüfung</p>
          <h2 id="redaktionsstandard" className="display-md text-navy mb-8">Unser Redaktionsstandard</h2>
          <RuleColumns
            cols={4}
            items={[
              { title: 'Quellen am Beitrag', text: 'Jeder Beitrag nennt Quellen, Herausgeber und Prüfdatum.' },
              {
                title: 'Annahmen gekennzeichnet',
                text: 'Preise, Intervalle und Fristen sind Orientierungswerte und müssen für das Objekt geprüft werden.',
              },
              {
                title: 'Fachprüfung nur mit Nachweis',
                text: 'Eine namentliche Fachprüfung nennen wir nur, wenn ein aktueller Nachweis dokumentiert ist.',
              },
              { title: 'Ihr Thema fehlt?', text: '', link: { label: 'Praxisfrage an die Redaktion senden', to: '/kontakt' } },
            ]}
          />
        </div>
      </section>

      <CTABand
        title="Beratung für Ihr Objekt"
        lead="Wir klären Flächen, Nutzung, Qualitätsziel und Rahmenbedingungen vor Ort. Darauf bauen Konzept und Angebot auf."
      />
    </div>
  );
}
