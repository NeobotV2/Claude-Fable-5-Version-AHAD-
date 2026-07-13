import { SITE } from '@/lib/site';

export type EditorialArticleSlug =
  | 'reinigungsfirma-wechseln-checkliste-tipps'
  | 'checkliste-reinigungsangebot'
  | 'industrie-produktionsreinigung-ohne-prozessstoerung'
  | 'unterhaltsreinigung-unternehmen-reinigungsintervalle'
  | 'was-kostet-gebaeudereinigung-stundensatz-preise'
  | 'leistungsverzeichnis-gebaeudereinigung-erstellen'
  | 'kuechenabluftreinigung-vdi-2052-pflicht-ablauf-nachweis'
  | 'iso-9001-iso-14001-gebaeudereinigung-unternehmen';

export interface EditorialSource {
  title: string;
  publisher: string;
  url: string;
  kind: 'official-primary';
}

export interface EditorialReviewer {
  name: string;
  role: string;
  /** HTTPS-Nachweis oder interne, revisionsfeste Nachweis-ID. */
  evidence: readonly string[];
  verifiedAt: string | null;
  expiresAt: string | null;
}

export interface EditorialArticle {
  slug: EditorialArticleSlug;
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified: string;
  sources: readonly EditorialSource[];
  /** Redaktionelle Einordnung für veränderliche Werte und Einzelfallfragen. */
  orientationNote: string;
  reviewer: EditorialReviewer | null;
}

const official = (
  title: string,
  publisher: string,
  url: string,
): EditorialSource => ({ title, publisher, url, kind: 'official-primary' });

const noReviewer = null;

export const EDITORIAL_ARTICLES = {
  'reinigungsfirma-wechseln-checkliste-tipps': {
    slug: 'reinigungsfirma-wechseln-checkliste-tipps',
    headline: 'Reinigungsfirma wechseln: Checkliste & Tipps für Unternehmen',
    description:
      'Orientierung zu Kündigungsfristen, Neu-Ausschreibung und einem planbaren Übergang beim Wechsel des Reinigungsdienstleisters.',
    image: '/images/ahad/meeting.webp',
    datePublished: '2026-06-12',
    dateModified: '2026-07-13',
    sources: [
      official(
        '§ 613a BGB – Rechte und Pflichten bei Betriebsübergang',
        'Bundesministerium der Justiz / Bundesamt für Justiz',
        'https://www.gesetze-im-internet.de/bgb/__613a.html',
      ),
      official(
        'Bürgerliches Gesetzbuch – amtliche Inhaltsübersicht',
        'Bundesministerium der Justiz / Bundesamt für Justiz',
        'https://www.gesetze-im-internet.de/bgb/',
      ),
    ],
    orientationNote:
      'Fristen und die rechtliche Einordnung eines möglichen Betriebsübergangs hängen vom konkreten Vertrag und Einzelfall ab. Die genannten Zeiträume sind Planungshinweise, keine Rechtsberatung.',
    reviewer: noReviewer,
  },
  'checkliste-reinigungsangebot': {
    slug: 'checkliste-reinigungsangebot',
    headline: 'Checkliste: Reinigungsangebot einholen und vergleichen',
    description:
      'Druckbare Arbeitshilfe für Objektdaten, Leistungsdefinition, Angebotsvergleich, Anbieterprüfung und Zusammenarbeit.',
    image: '/og-image.jpg',
    datePublished: '2026-07-02',
    dateModified: '2026-07-13',
    sources: [
      official(
        'Branche Gebäudereinigung – DGUV Regel 101-605',
        'Deutsche Gesetzliche Unfallversicherung',
        'https://publikationen.dguv.de/regelwerk/dguv-regeln/3365/branche-gebaeudereinigung',
      ),
      official(
        'Reinigungsdienstleistungen und -mittel',
        'Umweltbundesamt',
        'https://www.umweltbundesamt.de/reinigungsdienstleistungen-mittel',
      ),
    ],
    orientationNote:
      'Die Checkliste ist eine allgemeine Beschaffungshilfe. Leistungswerte, Nachweise und Vertragsregeln müssen objektbezogen festgelegt und aktuell geprüft werden.',
    reviewer: noReviewer,
  },
  'industrie-produktionsreinigung-ohne-prozessstoerung': {
    slug: 'industrie-produktionsreinigung-ohne-prozessstoerung',
    headline: 'Industriereinigung ohne Prozessstörung: Strategien für den laufenden Betrieb',
    description:
      'Praxisüberblick zur Integration von Reinigungsarbeiten in Produktionsabläufe und zu grundlegenden Schutzmaßnahmen.',
    image: '/images/ahad/industrie-detail.webp',
    datePublished: '2026-06-12',
    dateModified: '2026-07-13',
    sources: [
      official(
        'DGUV Information 214-022 – Industriereinigung',
        'Deutsche Gesetzliche Unfallversicherung',
        'https://publikationen.dguv.de/widgets/pdf/download/article/228',
      ),
      official(
        'Betriebssicherheitsverordnung',
        'Bundesministerium der Justiz / Bundesamt für Justiz',
        'https://www.gesetze-im-internet.de/betrsichv_2015/',
      ),
      official(
        'Gefahrstoffverordnung',
        'Bundesministerium der Justiz / Bundesamt für Justiz',
        'https://www.gesetze-im-internet.de/gefstoffv_2010/',
      ),
    ],
    orientationNote:
      'Verfahren, Freigaben und Schutzmaßnahmen sind aus der Gefährdungsbeurteilung des konkreten Betriebs abzuleiten. Preis- und Zeitangaben sind unverbindliche Orientierung.',
    reviewer: noReviewer,
  },
  'unterhaltsreinigung-unternehmen-reinigungsintervalle': {
    slug: 'unterhaltsreinigung-unternehmen-reinigungsintervalle',
    headline: 'Reinigungsintervalle in Unternehmen: Ein Leitfaden',
    description:
      'Orientierung für nutzungs- und bedarfsabhängige Intervalle in Büro-, Sanitär- und Verkehrsflächen.',
    image: '/images/ahad/unterhalt-detail.webp',
    datePublished: '2026-06-12',
    dateModified: '2026-07-13',
    sources: [
      official(
        'Branche Gebäudereinigung – DGUV Regel 101-605',
        'Deutsche Gesetzliche Unfallversicherung',
        'https://publikationen.dguv.de/regelwerk/dguv-regeln/3365/branche-gebaeudereinigung',
      ),
      official(
        'Reinigungsdienstleistungen und -mittel',
        'Umweltbundesamt',
        'https://www.umweltbundesamt.de/reinigungsdienstleistungen-mittel',
      ),
      official(
        'Branchenmindestlohn',
        'Bundesministerium für Arbeit und Soziales',
        'https://www.bmas.de/DE/Arbeit/Arbeitsrecht/Mindestlohn/Branchenmindestlohn/branchenmindestlohn.html',
      ),
    ],
    orientationNote:
      'Die genannten Intervalle und Leistungsannahmen sind Planungswerte. Maßgeblich sind Nutzung, Gefährdungsbeurteilung, Hygieneplan und die tatsächliche Verschmutzung im Objekt.',
    reviewer: noReviewer,
  },
  'was-kostet-gebaeudereinigung-stundensatz-preise': {
    slug: 'was-kostet-gebaeudereinigung-stundensatz-preise',
    headline: 'Was kostet Gebäudereinigung? Stundensatz, m²-Preise und Rechenbeispiele',
    description:
      'Einordnung von Kostenbestandteilen, Leistungswerten und Rechenbeispielen für gewerbliche Gebäudereinigung.',
    image: '/images/ahad/unterhalt-detail.webp',
    datePublished: '2026-07-02',
    dateModified: '2026-07-13',
    sources: [
      official(
        'Branchenmindestlohn',
        'Bundesministerium für Arbeit und Soziales',
        'https://www.bmas.de/DE/Arbeit/Arbeitsrecht/Mindestlohn/Branchenmindestlohn/branchenmindestlohn.html',
      ),
      official(
        'Zehnte Gebäudereinigungsarbeitsbedingungenverordnung',
        'Bundesministerium für Arbeit und Soziales',
        'https://www.bmas.de/DE/Service/Gesetze-und-Gesetzesvorhaben/zehnte-verordnung-zwingende-arbeitsbedingungen-gebaeudereinigung.html',
      ),
    ],
    orientationNote:
      'Preis-, Produktivitäts- und Monatswerte sind Rechenbeispiele auf Basis der im Artikel genannten Annahmen. Ein verbindlicher Preis entsteht erst aus dem konkreten Leistungsumfang.',
    reviewer: noReviewer,
  },
  'leistungsverzeichnis-gebaeudereinigung-erstellen': {
    slug: 'leistungsverzeichnis-gebaeudereinigung-erstellen',
    headline: 'Leistungsverzeichnis für die Gebäudereinigung erstellen: Anleitung & Vorlage',
    description:
      'Aufbau und Einsatz eines objektbezogenen Leistungsverzeichnisses für vergleichbare Reinigungsangebote.',
    image: '/images/ahad/meeting.webp',
    datePublished: '2026-06-24',
    dateModified: '2026-07-13',
    sources: [
      official(
        'DIN EN 13549 – Reinigungsdienstleistungen und Qualitätsmesssysteme',
        'DIN Media',
        'https://www.dinmedia.de/de/norm/din-en-13549/42885168',
      ),
      official(
        'Reinigungsdienstleistungen und -mittel',
        'Umweltbundesamt',
        'https://www.umweltbundesamt.de/reinigungsdienstleistungen-mittel',
      ),
    ],
    orientationNote:
      'Die Anleitung ist eine Beschaffungshilfe. Sie ersetzt weder den aktuellen Normtext noch eine objektbezogene fachliche oder vergaberechtliche Prüfung.',
    reviewer: noReviewer,
  },
  'kuechenabluftreinigung-vdi-2052-pflicht-ablauf-nachweis': {
    slug: 'kuechenabluftreinigung-vdi-2052-pflicht-ablauf-nachweis',
    headline: 'Küchenabluftreinigung nach VDI 2052: Einordnung, Ablauf & Nachweis',
    description:
      'Orientierung zu Reinigung, Dokumentation, Brandschutz und Hygiene bei Abluftanlagen gewerblicher Küchen.',
    image: '/images/ahad/kuechenabluft.webp',
    datePublished: '2026-06-24',
    dateModified: '2026-07-13',
    sources: [
      official(
        'VDI 2052 – Raumlufttechnische Anlagen für Küchen',
        'VDI Verein Deutscher Ingenieure',
        'https://www.vdi.de/mitgliedschaft/vdi-richtlinien/unsere-richtlinien-highlights/vdi-2052',
      ),
      official(
        'Lebensmittelhygiene-Verordnung',
        'Bundesministerium der Justiz / Bundesamt für Justiz',
        'https://www.gesetze-im-internet.de/lmhv_2007/',
      ),
    ],
    orientationNote:
      'Intervalle und Betreiberpflichten sind anhand der aktuellen Richtlinien, Herstellerangaben, behördlichen Vorgaben, Versicherungsbedingungen und des Anlagenzustands zu bestimmen. Der Artikel ersetzt diese Prüfung nicht.',
    reviewer: noReviewer,
  },
  'iso-9001-iso-14001-gebaeudereinigung-unternehmen': {
    slug: 'iso-9001-iso-14001-gebaeudereinigung-unternehmen',
    headline: 'ISO 9001 & ISO 14001 in der Gebäudereinigung: Einordnung für Auftraggeber',
    description:
      'Orientierung zur Rolle von Qualitäts- und Umweltmanagementsystemen bei der Auswahl eines Reinigungsdienstleisters.',
    image: '/images/ahad/medizin-detail.webp',
    datePublished: '2026-06-12',
    dateModified: '2026-07-13',
    sources: [
      official(
        'ISO 9001 – Quality management systems',
        'International Organization for Standardization',
        'https://www.iso.org/standard/62085.html',
      ),
      official(
        'ISO 14001 – Environmental management systems',
        'International Organization for Standardization',
        'https://www.iso.org/standard/60857.html',
      ),
    ],
    orientationNote:
      'Die Normübersichten erklären den Gegenstand der Standards. Ob ein Unternehmen gültig zertifiziert ist, muss über ein aktuelles Zertifikat und dessen Geltungsbereich geprüft werden.',
    reviewer: noReviewer,
  },
} as const satisfies Record<EditorialArticleSlug, EditorialArticle>;

function isIsoDate(value: string | null): value is string {
  return Boolean(value && Number.isFinite(Date.parse(value)));
}

function isValidEvidence(value: string): boolean {
  const evidence = value.trim();
  if (!evidence) return false;
  if (!evidence.startsWith('https://')) {
    if (evidence.includes('://')) return false;
    return /^[A-Z][A-Z0-9_-]{5,}$/.test(evidence);
  }
  try {
    return new URL(evidence).protocol === 'https:';
  } catch {
    return false;
  }
}

/** Fail-closed: Ohne Identität, Rolle, Evidenz und aktive Prüffrist kein Person-Markup. */
export function isActiveReviewer(
  reviewer: EditorialReviewer | null,
  now: Date = new Date(),
): reviewer is EditorialReviewer {
  if (!reviewer) return false;
  if (!reviewer.name.trim() || !reviewer.role.trim() || reviewer.evidence.length === 0) return false;
  if (!reviewer.evidence.every(isValidEvidence)) return false;
  if (!isIsoDate(reviewer.verifiedAt) || !isIsoDate(reviewer.expiresAt)) return false;

  const verifiedAt = Date.parse(reviewer.verifiedAt);
  const expiresAt = Date.parse(reviewer.expiresAt);
  return verifiedAt <= now.getTime() && expiresAt > now.getTime() && expiresAt > verifiedAt;
}

export function buildArticleSchema(article: EditorialArticle, now: Date = new Date()) {
  const activeReviewer = isActiveReviewer(article.reviewer, now) ? article.reviewer : null;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.headline,
    description: article.description,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    image: `${SITE.url}${article.image}`,
    author: {
      '@type': 'Organization',
      name: 'Fachredaktion AHAD Cleaning',
      url: `${SITE.url}/fachwissen`,
      parentOrganization: { '@id': `${SITE.url}/#organization` },
    },
    ...(activeReviewer
      ? {
          reviewedBy: {
            '@type': 'Person',
            name: activeReviewer.name,
            jobTitle: activeReviewer.role,
          },
        }
      : {}),
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE.url}/#organization`,
      name: SITE.legalName,
      logo: { '@type': 'ImageObject', url: `${SITE.url}/logo.png` },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE.url}/fachwissen/${article.slug}`,
    },
    citation: article.sources.map((source) => source.url),
  };
}
