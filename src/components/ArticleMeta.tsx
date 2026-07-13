import { CalendarDays, Clock3, Compass, ShieldCheck, UserRound } from 'lucide-react';
import {
  EDITORIAL_ARTICLES,
  EDITORIAL_SECTIONS,
  isActiveReviewer,
  type EditorialArticle,
  type EditorialArticleSlug,
} from '@/data/editorial';

interface ArticleMetaProps {
  slug: EditorialArticleSlug;
  className?: string;
}

const dateFormatter = new Intl.DateTimeFormat('de-DE', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

function formatDate(value: string) {
  return dateFormatter.format(new Date(`${value}T00:00:00Z`));
}

export default function ArticleMeta({ slug, className = '' }: ArticleMetaProps) {
  const article: EditorialArticle = EDITORIAL_ARTICLES[slug];
  const sections = EDITORIAL_SECTIONS[slug];
  const reviewer = isActiveReviewer(article.reviewer) ? article.reviewer : null;

  return (
    <section
      aria-labelledby={`${slug}-einordnung`}
      className={`border-y border-line bg-paper py-9 print:border print:rounded-xl print:p-5 ${className}`}
    >
      <div className="mx-auto grid max-w-5xl gap-8 px-4 sm:px-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(19rem,0.95fr)] print:px-0">
        <div>
          <p className="mb-3 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-brand">
            <ShieldCheck size={16} aria-hidden="true" />
            Einordnung &amp; Aktualität
          </p>
          <h2 id={`${slug}-einordnung`} className="font-headline text-xl font-bold leading-snug text-navy">
            {article.decisionQuestion}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate">{article.orientationNote}</p>

          <dl className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-slate">
            <div className="inline-flex items-center gap-2">
              <UserRound size={15} className="text-brand" aria-hidden="true" />
              <dt className="sr-only">Redaktion</dt>
              <dd>Fachredaktion AHAD Cleaning</dd>
            </div>
            <div className="inline-flex items-center gap-2">
              <CalendarDays size={15} className="text-brand" aria-hidden="true" />
              <dt className="sr-only">Veröffentlicht und aktualisiert</dt>
              <dd>
                Veröffentlicht <time dateTime={article.datePublished}>{formatDate(article.datePublished)}</time>
                {' · '}aktualisiert <time dateTime={article.dateModified}>{formatDate(article.dateModified)}</time>
              </dd>
            </div>
            <div className="inline-flex items-center gap-2">
              <Clock3 size={15} className="text-brand" aria-hidden="true" />
              <dt className="sr-only">Lesezeit</dt>
              <dd>{article.readingMinutes} Min. Lesezeit</dd>
            </div>
            {reviewer && (
              <div className="inline-flex items-center gap-2">
                <ShieldCheck size={15} className="text-brand" aria-hidden="true" />
                <dt className="sr-only">Fachprüfung</dt>
                <dd>{reviewer.name}, {reviewer.role}</dd>
              </div>
            )}
          </dl>
        </div>

        <nav aria-label="Inhaltsübersicht" className="rounded-2xl border border-line bg-white p-5 print:hidden">
          <p className="mb-3 flex items-center gap-2 font-headline text-sm font-bold text-navy">
            <Compass size={17} className="text-brand" aria-hidden="true" />
            Direkt zum Thema
          </p>
          <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
            {sections.map((section, index) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="group flex min-h-10 items-center gap-3 rounded-lg px-2 py-1.5 text-sm font-semibold text-slate transition-colors hover:bg-paper hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                >
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand/8 text-[11px] font-black text-brand">
                    {index + 1}
                  </span>
                  {section.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </section>
  );
}
