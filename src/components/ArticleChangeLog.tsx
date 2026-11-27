import { EDITORIAL_ARTICLES, type EditorialArticle, type EditorialArticleSlug } from '@/data/editorial';

const dateFormatter = new Intl.DateTimeFormat('de-DE', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

const formatDate = (value: string) => dateFormatter.format(new Date(`${value}T00:00:00Z`));

/**
 * Datierte Änderungen eines Beitrags mit laufendem Stand, neueste zuerst.
 * Wiederkehrende Leser sehen so auf einen Blick, was seit ihrem letzten Besuch neu ist.
 */
export default function ArticleChangeLog({ slug }: { slug: EditorialArticleSlug }) {
  const article: EditorialArticle = EDITORIAL_ARTICLES[slug];
  const changes = article.changeLog;
  if (!changes?.length) return null;

  return (
    <section aria-labelledby={`${slug}-aenderungen`} className="not-prose mb-12 border-y border-line py-6">
      <h2 id={`${slug}-aenderungen`} className="eyebrow text-brand">
        Letzte Änderungen
      </h2>
      <ol className="mt-3 divide-y divide-line">
        {changes.map((change) => (
          <li key={change.date} className="grid gap-1 py-3.5 text-body-sm leading-relaxed sm:grid-cols-[10.5rem_1fr] sm:gap-6">
            <time dateTime={change.date} className="font-semibold text-navy tabular-nums">
              {formatDate(change.date)}
            </time>
            <p className="text-slate">
              {change.text}
              {change.sectionId && (
                <>
                  {' '}
                  <a href={`#${change.sectionId}`} className="text-link whitespace-nowrap">
                    Zum Abschnitt
                  </a>
                </>
              )}
            </p>
          </li>
        ))}
      </ol>
      <p className="mt-4 text-caption text-slate">
        Diese Seite bleibt der aktuelle Stand: Gibt es ein Ergebnis, steht es zuerst hier.
      </p>
    </section>
  );
}
