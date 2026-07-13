import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  BookOpenCheck,
  Building2,
  Calculator,
  ClipboardList,
  Factory,
  Scale,
  ShieldCheck,
  ShoppingCart,
  UsersRound,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/ui/Reveal';
import CTABand from '@/components/CTABand';
import { SITE } from '@/lib/site';
import {
  EDITORIAL_ARTICLE_LIST,
  EDITORIAL_ARTICLES,
  EDITORIAL_CLUSTERS,
  EDITORIAL_CLUSTER_ORDER,
  getEditorialArticlePath,
  type EditorialArticleSlug,
  type EditorialClusterKey,
} from '@/data/editorial';

const clusterIcons: Record<EditorialClusterKey, LucideIcon> = {
  'planen-kalkulieren': Calculator,
  'ausschreiben-vergleichen': ClipboardList,
  'wechsel-betrieb': Factory,
  'qualitaet-compliance': ShieldCheck,
};

const rolePaths: Array<{
  title: string;
  focus: string;
  icon: LucideIcon;
  articles: readonly EditorialArticleSlug[];
}> = [
  {
    title: 'Facility Management',
    focus: 'Bedarf, Intervalle und Qualität im Objekt steuern',
    icon: Building2,
    articles: [
      'unterhaltsreinigung-unternehmen-reinigungsintervalle',
      'leistungsverzeichnis-gebaeudereinigung-erstellen',
    ],
  },
  {
    title: 'Einkauf',
    focus: 'Leistungen normalisieren und Angebote nachvollziehbar vergleichen',
    icon: ShoppingCart,
    articles: ['checkliste-reinigungsangebot', 'was-kostet-gebaeudereinigung-stundensatz-preise'],
  },
  {
    title: 'Geschäftsführung',
    focus: 'Versorgungs-, Qualitäts- und Compliance-Risiken einordnen',
    icon: UsersRound,
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
        title="Fachwissen Gebäudereinigung: Leitfäden für Entscheider | AHAD Cleaning"
        description="Entscheidungshilfen für Facility Management, Einkauf und Geschäftsführung: Kosten planen, Leistungen ausschreiben, Anbieter wechseln und Nachweise prüfen."
        keywords="Fachwissen Gebäudereinigung, Reinigungskosten kalkulieren, Reinigungsangebot vergleichen, Leistungsverzeichnis Reinigung, Anbieterwechsel"
        schema={knowledgeSchema}
      />

      <PageHero
        compact
        titleSize="lg"
        eyebrow="Fachwissen für Auftraggeber"
        title="Gebäudereinigung sicher entscheiden"
        lead="Praxisnahe Leitfäden für Facility Management, Einkauf und Geschäftsführung – nach Aufgaben geordnet, mit transparenten Annahmen, Aktualisierungsstand und nachvollziehbaren Quellen."
        crumbs={[{ label: 'Fachwissen' }]}
      />

      <div>
        <section aria-labelledby="aufgabe-waehlen" className="bg-white py-14 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-8">
            <Reveal>
              <div className="max-w-3xl">
                <p className="eyebrow mb-4 text-brand">
                  <span className="h-px w-8 bg-brand/40" />
                  Nach Aufgabe einsteigen
                </p>
                <h2 id="aufgabe-waehlen" className="display-md text-navy">Womit möchten Sie weiterkommen?</h2>
                <p className="mt-4 text-base leading-relaxed text-slate sm:text-lg">
                  Wählen Sie nicht nach Fachbegriff, sondern nach der Entscheidung, die als Nächstes ansteht.
                </p>
              </div>
            </Reveal>

            <nav aria-label="Themenpfade" className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {EDITORIAL_CLUSTER_ORDER.map((clusterKey, index) => {
                const cluster = EDITORIAL_CLUSTERS[clusterKey];
                const Icon = clusterIcons[clusterKey];
                return (
                  <Reveal key={clusterKey} delay={Math.min(index * 0.06, 0.18)}>
                    <a
                      href={`#${clusterKey}`}
                      className="group flex h-full min-h-28 items-start gap-4 rounded-2xl border border-line bg-paper p-5 transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                    >
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand/8 text-brand">
                        <Icon size={20} aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block font-headline font-bold leading-snug text-navy">{cluster.shortTitle}</span>
                        <span className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-brand">
                          Beiträge ansehen <ArrowRight size={13} aria-hidden="true" />
                        </span>
                      </span>
                    </a>
                  </Reveal>
                );
              })}
            </nav>
          </div>
        </section>

        <section aria-labelledby="rollen-einstieg" className="border-y border-line bg-paper py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-8">
            <div className="grid gap-6 lg:grid-cols-[0.72fr_2.28fr] lg:items-start">
              <Reveal>
                <p className="eyebrow mb-3 text-brand">
                  <span className="h-px w-8 bg-brand/40" />
                  Nach Rolle
                </p>
                <h2 id="rollen-einstieg" className="font-headline text-2xl font-bold text-navy">
                  Empfohlene Einstiege für Ihre Rolle
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate">
                  Eine kuratierte Auswahl; weitere passende Leitfäden finden Sie in den Themenpfaden.
                </p>
              </Reveal>

              <div className="grid gap-4 md:grid-cols-3">
                {rolePaths.map((role, index) => {
                  const Icon = role.icon;
                  return (
                    <Reveal key={role.title} delay={Math.min(index * 0.07, 0.14)} className="h-full">
                      <section className="h-full rounded-2xl border border-line bg-white p-5" aria-labelledby={`rolle-${index}`}>
                        <div className="flex items-center gap-3">
                          <span className="grid h-9 w-9 place-items-center rounded-lg bg-navy text-mint">
                            <Icon size={18} aria-hidden="true" />
                          </span>
                          <h3 id={`rolle-${index}`} className="font-headline font-bold text-navy">{role.title}</h3>
                        </div>
                        <p className="mt-3 text-sm leading-relaxed text-slate">{role.focus}</p>
                        <ul className="mt-4 space-y-2 border-t border-line pt-4">
                          {role.articles.map((slug) => {
                            const article = EDITORIAL_ARTICLES[slug];
                            return (
                              <li key={slug}>
                                <Link
                                  to={getEditorialArticlePath(slug)}
                                  className="group flex items-start gap-2 text-sm font-semibold leading-snug text-navy hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                                >
                                  <ArrowRight size={14} className="mt-0.5 shrink-0 text-brand transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                                  {article.listingTitle}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </section>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="alle-leitfaeden" className="bg-white py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-8">
            <Reveal>
              <div className="max-w-3xl">
                <p className="eyebrow mb-4 text-brand">
                  <span className="h-px w-8 bg-brand/40" />
                  Alle Entscheidungshilfen
                </p>
                <h2 id="alle-leitfaeden" className="display-md text-navy">Vom Planungswert zum nächsten Schritt</h2>
                <p className="mt-4 text-base leading-relaxed text-slate sm:text-lg">
                  Jeder Beitrag beantwortet eine konkrete Prüffrage und verweist auf die passende Folgeentscheidung.
                </p>
              </div>
            </Reveal>

            <div className="mt-14 space-y-16">
              {EDITORIAL_CLUSTER_ORDER.map((clusterKey) => {
                const cluster = EDITORIAL_CLUSTERS[clusterKey];
                const Icon = clusterIcons[clusterKey];
                const articles = EDITORIAL_ARTICLE_LIST.filter((article) => article.cluster === clusterKey);

                return (
                  <section key={clusterKey} id={clusterKey} aria-labelledby={`${clusterKey}-titel`} className="scroll-mt-28">
                    <Reveal>
                      <div className="grid gap-4 border-b border-line pb-6 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:items-end">
                        <div className="flex items-start gap-4">
                          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand/8 text-brand">
                            <Icon size={21} aria-hidden="true" />
                          </span>
                          <h3 id={`${clusterKey}-titel`} className="font-headline text-2xl font-bold leading-tight text-navy">
                            {cluster.title}
                          </h3>
                        </div>
                        <p className="text-sm leading-relaxed text-slate md:text-right">{cluster.description}</p>
                      </div>
                    </Reveal>

                    <div className="mt-6 grid gap-5 lg:grid-cols-2">
                      {articles.map((article, index) => (
                        <Reveal key={article.slug} delay={Math.min(index * 0.07, 0.14)} className="h-full">
                          <Link
                            to={getEditorialArticlePath(article.slug)}
                            className="group flex h-full flex-col rounded-2xl border border-line bg-paper p-6 transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:p-7"
                          >
                            <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] font-black uppercase tracking-[0.14em] text-brand">
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
                        </Reveal>
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
            <Reveal>
              <div>
                <p className="eyebrow mb-3 text-brand">
                  <span className="h-px w-8 bg-brand/40" />
                  Transparent arbeiten
                </p>
                <h2 id="redaktionsstandard" className="font-headline text-2xl font-bold text-navy">Unser Redaktionsstandard</h2>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex gap-3">
                  <BookOpenCheck size={20} className="mt-0.5 shrink-0 text-brand" aria-hidden="true" />
                  <p className="text-sm leading-relaxed text-slate">
                    <strong className="block text-navy">Quellen am Beitrag</strong>
                    Ausgangsquellen, Herausgeber und Prüfdatum werden sichtbar genannt.
                  </p>
                </div>
                <div className="flex gap-3">
                  <Scale size={20} className="mt-0.5 shrink-0 text-brand" aria-hidden="true" />
                  <p className="text-sm leading-relaxed text-slate">
                    <strong className="block text-navy">Annahmen klar begrenzt</strong>
                    Preise, Intervalle und Fristen sind Orientierung und müssen objektbezogen geprüft werden.
                  </p>
                </div>
                <div className="flex gap-3">
                  <ShieldCheck size={20} className="mt-0.5 shrink-0 text-brand" aria-hidden="true" />
                  <p className="text-sm leading-relaxed text-slate">
                    <strong className="block text-navy">Keine erfundenen Prüfer</strong>
                    Namentliche Fachprüfung erscheint nur mit dokumentiertem, aktuellem Nachweis.
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
            </Reveal>
          </div>
        </section>
      </div>

      <CTABand
        title="Die Entscheidung betrifft ein konkretes Objekt?"
        lead="Wir klären Flächen, Nutzung, Qualitätsziel und Rahmenbedingungen vor Ort – als Grundlage für ein nachvollziehbares Konzept und Angebot."
      />
    </div>
  );
}
