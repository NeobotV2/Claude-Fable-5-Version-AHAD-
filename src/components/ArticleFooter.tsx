import { ArrowRight, BookOpenCheck, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  EDITORIAL_ARTICLES,
  getEditorialArticlePath,
  type EditorialArticleSlug,
} from '@/data/editorial';

interface ArticleFooterProps {
  slug: EditorialArticleSlug;
  className?: string;
}

const dateFormatter = new Intl.DateTimeFormat('de-DE', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  timeZone: 'UTC',
});

function formatDate(value: string) {
  return dateFormatter.format(new Date(`${value}T00:00:00Z`));
}

export default function ArticleFooter({ slug, className = '' }: ArticleFooterProps) {
  const article = EDITORIAL_ARTICLES[slug];
  const related = article.related.map((relatedSlug) => EDITORIAL_ARTICLES[relatedSlug]);

  return (
    <div className={`border-y border-line bg-paper py-14 print:border print:rounded-xl print:p-5 ${className}`}>
      <div className="mx-auto grid max-w-5xl gap-10 px-4 sm:px-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(18rem,0.95fr)] print:px-0">
        <section aria-labelledby={`${slug}-quellen`} className="min-w-0">
          <p className="mb-3 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-brand">
            <BookOpenCheck size={16} aria-hidden="true" />
            Redaktionelle Grundlage
          </p>
          <h2 id={`${slug}-quellen`} className="font-headline text-2xl font-bold text-navy">
            Quellen &amp; Prüfstand
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate">
            Diese Ausgangsquellen wurden für die fachliche Einordnung herangezogen. Gesetze, Normen und Richtlinien
            sind für den konkreten Auftrag in ihrer aktuellen Fassung und ihrem vollständigen Wortlaut zu prüfen.
          </p>
          <ul className="mt-5 space-y-3">
            {article.sources.map((source) => (
              <li key={source.url}>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start justify-between gap-4 rounded-xl border border-line bg-white p-4 text-sm transition-colors hover:border-brand/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                >
                  <span className="min-w-0">
                    <span className="block font-bold leading-snug text-navy group-hover:text-brand">{source.title}</span>
                    <span className="mt-1 block text-xs text-slate">
                      {source.publisher} · {source.kind === 'industry-guidance' ? 'Branchenleitfaden' : 'Amtliche/Herausgeberquelle'}
                      {' · '}geprüft am {formatDate(source.checkedAt)}
                    </span>
                  </span>
                  <ExternalLink size={16} className="mt-0.5 shrink-0 text-brand" aria-hidden="true" />
                  <span className="sr-only"> (öffnet in neuem Tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <nav aria-labelledby={`${slug}-weiterlesen`} className="min-w-0 print:hidden">
          <p className="mb-2 text-xs font-black uppercase tracking-[0.16em] text-brand">Nächster sinnvoller Schritt</p>
          <h2 id={`${slug}-weiterlesen`} className="font-headline text-xl font-bold text-navy">
            Passend weiterarbeiten
          </h2>
          <div className="mt-4 space-y-3">
            {related.map((relatedArticle) => (
              <Link
                key={relatedArticle.slug}
                to={getEditorialArticlePath(relatedArticle.slug)}
                className="group block rounded-2xl border border-line bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                <span className="text-[11px] font-black uppercase tracking-[0.14em] text-brand">
                  {relatedArticle.format} · {relatedArticle.topic}
                </span>
                <span className="mt-2 block font-headline font-bold leading-snug text-navy">
                  {relatedArticle.listingTitle}
                </span>
                <span className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-brand">
                  Weiterarbeiten
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}
