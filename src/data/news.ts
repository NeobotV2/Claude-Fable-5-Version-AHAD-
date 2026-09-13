import { SITE, ORG_REF } from '@/lib/site';

/**
 * Unternehmensmeldungen. Bewusst schlank gehalten und getrennt vom
 * Fachwissen-Register (src/data/editorial.ts): Fachartikel erklären ein Thema
 * und werden gepflegt, eine Meldung berichtet ein Ereignis zu einem Datum und
 * bleibt danach unverändert stehen.
 *
 * Jede Meldung nennt ihre Belege. Ohne belegte Quelle wird nichts
 * veröffentlicht — dieselbe Linie wie beim Claim-Register in site.ts.
 */
export interface NewsSource {
  title: string;
  publisher: string;
  /** Interner Nachweis (Dokument in der Ablage) oder öffentliche https-URL. */
  reference: string;
  date: string;
}

export interface NewsItem {
  slug: string;
  headline: string;
  /** Kurzfassung für Übersicht, Meta-Description und Teaser. */
  summary: string;
  listingTitle: string;
  datePublished: string;
  dateModified: string;
  topic: string;
  image: string;
  sources: readonly NewsSource[];
}

export const NEWS_ITEMS: readonly NewsItem[] = [
  {
    slug: 'guentzel-objekt-service-fortfuehrung',
    headline: 'AHAD Cleaning führt Güntzel Objekt-Service fort',
    summary:
      'Zum 1. September 2026 hat die AHAD Cleaning Company GmbH den Geschäftsbetrieb der Güntzel Objekt-Service GmbH & Co. KG übernommen. Alle rund 25 Mitarbeitenden wurden übernommen, der Name Güntzel bleibt, Verträge und Konditionen laufen unverändert weiter.',
    listingTitle: 'Güntzel Objekt-Service wird fortgeführt',
    datePublished: '2026-09-01',
    dateModified: '2026-09-01',
    topic: 'Unternehmensmeldung',
    image: '/images/ahad/team.webp',
    sources: [
      {
        title: 'Güntzel Objekt-Service: Zukunft für den Industrie- und Gebäudereinigungsspezialisten durch Übernahme gesichert',
        publisher: 'Schultze & Braun',
        reference: 'https://www.schultze-braun.de/newsroom',
        date: '2026-08-31',
      },
      {
        title: 'Kundenschreiben zur Fortführung des Geschäftsbetriebs',
        publisher: 'AHAD Cleaning Company GmbH / Insolvenzverwaltung',
        reference: 'ablage/guentzel/kundenschreiben-2026-08-31',
        date: '2026-08-31',
      },
    ],
  },
];

/**
 * Meldung zum Slug — wirft, wenn es sie nicht gibt. Eine Seite ohne ihre
 * Meldung wäre leer; der Prerender-Lauf soll daran scheitern, nicht die Seite
 * still ohne Inhalt ausliefern.
 */
export function requireNewsItem(slug: string): NewsItem {
  const item = NEWS_ITEMS.find((entry) => entry.slug === slug);
  if (!item) throw new Error(`Meldung "${slug}" fehlt in src/data/news.ts`);
  return item;
}

/** Neueste Meldung zuerst. */
export const NEWS_BY_DATE: readonly NewsItem[] = [...NEWS_ITEMS].sort((a, b) =>
  b.datePublished.localeCompare(a.datePublished),
);

export const newsUrl = (item: NewsItem) => `${SITE.url}/aktuelles/${item.slug}`;

/**
 * NewsArticle-Markup. Bewusst ohne `speakable` und ohne Autorenperson:
 * Absender ist das Unternehmen, nicht eine Redaktion.
 */
export function buildNewsSchema(item: NewsItem) {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: item.headline,
    description: item.summary,
    datePublished: item.datePublished,
    dateModified: item.dateModified,
    inLanguage: 'de-DE',
    articleSection: item.topic,
    image: `${SITE.url}${item.image}`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': newsUrl(item) },
    author: ORG_REF,
    publisher: ORG_REF,
  };
}

/** Formatiert ein ISO-Datum als deutsches Langdatum. */
export function formatNewsDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('de-DE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
