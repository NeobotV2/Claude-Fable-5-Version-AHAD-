import { ArrowRight, BookOpenCheck, Scale, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import PageHero from '@/components/PageHero';
import CTABand from '@/components/CTABand';
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

      <div>
        <section aria-labelledby="aufgabe-waehlen" className="bg-white section-y-sm">
          <div className="container-page">
            <div>
              <div className="max-w-3xl">
                <p className="eyebrow mb-4 text-brand">
                  <span className="h-px w-8 bg-brand/40" />
                  Nach Aufgabe einsteigen
                </p>
                <h2 id="aufgabe-waehlen" className="display-md text-navy">Welche Entscheidung steht an?</h2>
                <p className="mt-4 text-base leading-relaxed text-slate sm:text-lg">
                  Wählen Sie den Themenpfad, der zu Ihrer nächsten Entscheidung passt.
                </p>
              </div>
            </div>

            <nav aria-label="Themenpfade" className="mt-9 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
              {EDITORIAL_CLUSTER_ORDER.map((clusterKey) => {
                const cluster = EDITORIAL_CLUSTERS[clusterKey];
                return (
                  <div key={clusterKey}>
                    <a
                      href={`#${clusterKey}`}
                      className="group flex h-full items-start border-t border-navy pt-4 pb-2 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                    >
                      <span>
                        <span className="block font-headline font-bold leading-snug text-navy">{cluster.shortTitle}</span>
                        <span className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-brand">
                          Beiträge ansehen <ArrowRight size={13} aria-hidden="true" />
                        </span>
                      </span>
                    </a>
                  </div>
                );
              })}
            </nav>
          </div>
        </section>

        <section aria-labelledby="rollen-einstieg" className="border-y border-line bg-paper py-12">
          <div className="container-page">
            <div className="grid gap-6 lg:grid-cols-[0.72fr_2.28fr] lg:items-start">
              <div>
                <p className="eyebrow mb-3 text-brand">
                  <span className="h-px w-8 bg-brand/40" />
                  Nach Rolle
                </p>
                <h2 id="rollen-einstieg" className="font-headline text-2xl font-bold text-navy">
                  Empfohlene Einstiege für Ihre Rolle
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate">
                  Je Rolle zwei Leitfäden für den Anfang. Die übrigen stehen in den Themenpfaden.
                </p>
              </div>

              <div className="grid gap-x-8 gap-y-8 md:grid-cols-3">
                {rolePaths.map((role, index) => {
                  return (
                    <div key={role.title} className="h-full">
                      <section className="h-full border-t border-navy pt-5" aria-labelledby={`rolle-${index}`}>
                        <div>
                          <h3 id={`rolle-${index}`} className="font-headline font-bold text-navy">{role.title}</h3>
                        </div>
                        <p className="mt-3 text-sm leading-relaxed text-slate">{role.focus}</p>
                        <ul className="mt-4 border-t border-line pt-2">
                          {role.articles.map((slug) => {
                            const article = EDITORIAL_ARTICLES[slug];
                            return (
                              <li key={slug}>
                                <Link
                                  to={getEditorialArticlePath(slug)}
                                  className="group flex items-start gap-2 py-2.5 text-sm font-semibold leading-snug text-navy hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                                >
                                  <ArrowRight size={14} className="mt-0.5 shrink-0 text-brand transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                                  {article.listingTitle}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </section>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="alle-leitfaeden" className="bg-white section-y">
          <div className="container-page">
            <div>
              <div className="max-w-3xl">
                <p className="eyebrow mb-4 text-brand">
                  <span className="h-px w-8 bg-brand/40" />
                  Alle Entscheidungshilfen
                </p>
                <h2 id="alle-leitfaeden" className="display-md text-navy">Leitfäden nach Thema</h2>
                <p className="mt-4 text-base leading-relaxed text-slate sm:text-lg">
                  Jeder Beitrag behandelt eine Prüffrage und nennt am Ende zwei passende Folgethemen.
                </p>
              </div>
            </div>

            <div className="mt-14 space-y-16">
              {EDITORIAL_CLUSTER_ORDER.map((clusterKey) => {
                const cluster = EDITORIAL_CLUSTERS[clusterKey];
                const articles = EDITORIAL_ARTICLE_LIST.filter((article) => article.cluster === clusterKey);

                return (
                  <section key={clusterKey} id={clusterKey} aria-labelledby={`${clusterKey}-titel`} className="scroll-mt-28">
                    <div>
                      <div className="grid gap-4 border-b border-line pb-6 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:items-end">
                        <div>
                          <h3 id={`${clusterKey}-titel`} className="font-headline text-2xl font-bold leading-tight text-navy">
                            {cluster.title}
                          </h3>
                        </div>
                        <p className="text-sm leading-relaxed text-slate md:text-right">{cluster.description}</p>
                      </div>
                    </div>

                    <div className="mt-8 grid gap-x-10 gap-y-10 lg:grid-cols-2">
                      {articles.map((article) => (
                        <div key={article.slug} className="h-full">
                          <Link
                            to={getEditorialArticlePath(article.slug)}
                            className="group flex h-full flex-col border-t border-navy pt-5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:p-7"
                          >
                            <div className="flex flex-wrap items-center justify-between gap-3 text-caption font-semibold text-brand">
                              <span>{article.format} · {article.topic}</span>
                              <span className="text-slate">{article.readingMinutes} Min.</span>
                            </div>
                            <h4 className="mt-4 font-headline text-xl font-bold leading-snug text-navy transition-colors group-hover:text-brand sm:text-2xl">
                              {article.listingTitle}
                            </h4>
                            <p className="mt-3 text-sm font-semibold leading-relaxed text-navy">{article.decisionQuestion}</p>
                            <p className="mt-3 flex-grow text-sm leading-relaxed text-slate">{article.listingDescription}</p>
                            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4 text-xs font-semibold text-slate">
                              <span>Aktualisiert {formatDate(article.dateModified)}</span>
                              <span className="inline-flex items-center gap-2 font-bold text-brand">
                                Leitfaden öffnen
                                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
                              </span>
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          </div>
        </section>

        <section aria-labelledby="redaktionsstandard" className="border-t border-line bg-paper py-14">
          <div className="mx-auto grid max-w-5xl gap-8 px-4 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <div>
                <p className="eyebrow mb-3 text-brand">
                  <span className="h-px w-8 bg-brand/40" />
                  Quellen und Prüfung
                </p>
                <h2 id="redaktionsstandard" className="font-headline text-2xl font-bold text-navy">Unser Redaktionsstandard</h2>
              </div>
            </div>
            <div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex gap-3">
                  <BookOpenCheck size={20} className="mt-0.5 shrink-0 text-brand" aria-hidden="true" />
                  <p className="text-sm leading-relaxed text-slate">
                    <strong className="block text-navy">Quellen am Beitrag</strong>
                    Jeder Beitrag nennt Quellen, Herausgeber und Prüfdatum.
                  </p>
                </div>
                <div className="flex gap-3">
                  <Scale size={20} className="mt-0.5 shrink-0 text-brand" aria-hidden="true" />
                  <p className="text-sm leading-relaxed text-slate">
                    <strong className="block text-navy">Annahmen gekennzeichnet</strong>
                    Preise, Intervalle und Fristen sind Orientierungswerte und müssen für das Objekt geprüft werden.
                  </p>
                </div>
                <div className="flex gap-3">
                  <ShieldCheck size={20} className="mt-0.5 shrink-0 text-brand" aria-hidden="true" />
                  <p className="text-sm leading-relaxed text-slate">
                    <strong className="block text-navy">Fachprüfung nur mit Nachweis</strong>
                    Eine namentliche Fachprüfung nennen wir nur, wenn ein aktueller Nachweis dokumentiert ist.
                  </p>
                </div>
                <div className="flex gap-3">
                  <ArrowRight size={20} className="mt-0.5 shrink-0 text-brand" aria-hidden="true" />
                  <p className="text-sm leading-relaxed text-slate">
                    <strong className="block text-navy">Ihr Thema fehlt?</strong>
                    <Link to="/kontakt" className="font-bold text-brand hover:underline">Praxisfrage an die Redaktion senden</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <CTABand
        title="Beratung für Ihr Objekt"
        lead="Wir klären Flächen, Nutzung, Qualitätsziel und Rahmenbedingungen vor Ort. Darauf bauen Konzept und Angebot auf."
      />
    </div>
  );
}
