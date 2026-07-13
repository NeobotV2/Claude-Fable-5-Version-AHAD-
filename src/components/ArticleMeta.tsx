import { BookOpenCheck, CalendarDays, ExternalLink, ShieldCheck } from 'lucide-react';
import {
  EDITORIAL_ARTICLES,
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
  const reviewer = isActiveReviewer(article.reviewer) ? article.reviewer : null;

  return (
    <section
      aria-labelledby={`${slug}-transparenz`}
      className={`bg-paper border-y border-line py-10 print:border print:rounded-xl print:p-5 ${className}`}
    >
      <div className="max-w-4xl mx-auto px-4 print:px-0">
        <div className="grid gap-7 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-brand mb-3">
              <ShieldCheck size={16} aria-hidden="true" />
              Redaktion &amp; Transparenz
            </p>
            <h2 id={`${slug}-transparenz`} className="font-headline text-xl font-bold text-navy mb-3">
              Fachlich eingeordnet, Quellen offengelegt
            </h2>
            <dl className="space-y-2 text-sm text-slate">
              <div className="flex gap-2">
                <dt className="font-bold text-navy">Redaktion:</dt>
                <dd>Fachredaktion AHAD Cleaning</dd>
              </div>
              <div className="flex gap-2">
                <CalendarDays size={16} className="mt-0.5 shrink-0 text-brand" aria-hidden="true" />
                <div>
                  <dt className="sr-only">Veröffentlichungs- und Aktualisierungsdatum</dt>
                  <dd>
                    Veröffentlicht am <time dateTime={article.datePublished}>{formatDate(article.datePublished)}</time>
                    {' · '}Aktualisiert am <time dateTime={article.dateModified}>{formatDate(article.dateModified)}</time>
                  </dd>
                </div>
              </div>
              <div className="flex gap-2">
                <dt className="font-bold text-navy">Fachprüfung:</dt>
                <dd>
                  {reviewer
                    ? `${reviewer.name}, ${reviewer.role}`
                    : 'Kein namentlicher Reviewer veröffentlicht; Personen werden erst nach dokumentierter, aktueller Prüfung genannt.'}
                </dd>
              </div>
            </dl>
            <p className="mt-4 text-sm leading-relaxed text-slate">
              <strong className="text-navy">Einordnung:</strong> {article.orientationNote}
            </p>
          </div>

          <div>
            <h3 className="flex items-center gap-2 font-headline font-bold text-navy mb-3">
              <BookOpenCheck size={18} className="text-brand" aria-hidden="true" />
              Primärquellen
            </h3>
            <ul className="space-y-3">
              {article.sources.map((source) => (
                <li key={source.url}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start justify-between gap-3 rounded-xl border border-line bg-white p-3 text-sm transition-colors hover:border-brand/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                  >
                    <span>
                      <span className="block font-bold text-navy group-hover:text-brand">{source.title}</span>
                      <span className="block mt-0.5 text-xs text-slate">{source.publisher}</span>
                    </span>
                    <ExternalLink size={15} className="mt-0.5 shrink-0 text-brand" aria-hidden="true" />
                    <span className="sr-only"> (öffnet in neuem Tab)</span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs leading-relaxed text-slate">
              Bei Gesetzen, Normen und Richtlinien gilt stets die aktuelle amtliche bzw. herausgebende Fassung.
              Verlinkte Übersichtsseiten ersetzen keinen vollständigen Normtext.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
