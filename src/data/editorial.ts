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

export type EditorialClusterKey =
  | 'planen-kalkulieren'
  | 'ausschreiben-vergleichen'
  | 'wechsel-betrieb'
  | 'qualitaet-compliance';

export type EditorialAudience = 'Facility Management' | 'Einkauf' | 'Geschäftsführung';

export interface EditorialSource {
  title: string;
  publisher: string;
  url: string;
  kind: 'official-primary' | 'industry-guidance';
  checkedAt: string;
}

export interface EditorialReviewer {
  name: string;
  role: string;
  /** HTTPS-Nachweis oder interne, revisionsfeste Nachweis-ID. */
  evidence: readonly string[];
  /** Vollständiger ISO-8601-Zeitstempel. `expiresAt` ist exklusiv. */
  verifiedAt: string | null;
  expiresAt: string | null;
}

export interface EditorialArticle {
  slug: EditorialArticleSlug;
  headline: string;
  description: string;
  listingTitle: string;
  listingDescription: string;
  cluster: EditorialClusterKey;
  topic: string;
  format: 'Leitfaden' | 'Checkliste';
  readingMinutes: number;
  audiences: readonly EditorialAudience[];
  decisionQuestion: string;
  related: readonly EditorialArticleSlug[];
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
): EditorialSource => ({ title, publisher, url, kind: 'official-primary', checkedAt: '2026-07-13' });

const guidance = (
  title: string,
  publisher: string,
  url: string,
): EditorialSource => ({ title, publisher, url, kind: 'industry-guidance', checkedAt: '2026-07-13' });

const noReviewer = null;

export const EDITORIAL_ARTICLES = {
  'reinigungsfirma-wechseln-checkliste-tipps': {
    slug: 'reinigungsfirma-wechseln-checkliste-tipps',
    headline: 'Reinigungsfirma wechseln: Übergang planbar vorbereiten',
    description:
      'Orientierung zu Kündigungsfristen, Neu-Ausschreibung und einem planbaren Übergang beim Wechsel des Reinigungsdienstleisters.',
    listingTitle: 'Reinigungsfirma wechseln: Übergang planbar vorbereiten',
    listingDescription:
      'Vertrag prüfen, Bedarf neu beschreiben, Angebote vergleichen und den Start des neuen Dienstleisters strukturiert vorbereiten.',
    cluster: 'wechsel-betrieb',
    topic: 'Anbieterwechsel',
    format: 'Leitfaden',
    readingMinutes: 10,
    audiences: ['Facility Management', 'Einkauf', 'Geschäftsführung'],
    decisionQuestion: 'Wie wechseln wir den Dienstleister, ohne eine Versorgungslücke zu riskieren?',
    related: ['leistungsverzeichnis-gebaeudereinigung-erstellen', 'checkliste-reinigungsangebot'],
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
        '§ 314 BGB – Kündigung von Dauerschuldverhältnissen aus wichtigem Grund',
        'Bundesministerium der Justiz / Bundesamt für Justiz',
        'https://www.gesetze-im-internet.de/bgb/__314.html',
      ),
    ],
    orientationNote:
      'Fristen und die rechtliche Einordnung eines möglichen Betriebsübergangs hängen vom konkreten Vertrag und Einzelfall ab. Die genannten Zeiträume sind Planungshinweise, keine Rechtsberatung.',
    reviewer: noReviewer,
  },
  'checkliste-reinigungsangebot': {
    slug: 'checkliste-reinigungsangebot',
    headline: 'Die Angebots-Checkliste für Objektverantwortliche',
    description:
      'Druckbare Arbeitshilfe für Objektdaten, Leistungsdefinition, Angebotsvergleich, Anbieterprüfung und Zusammenarbeit.',
    listingTitle: 'Checkliste: Reinigungsangebote strukturiert vergleichen',
    listingDescription:
      'Eine druckbare Arbeitshilfe für Objektdaten, Leistungsumfang, Nachweise, Vertragsregeln und die spätere Zusammenarbeit.',
    cluster: 'ausschreiben-vergleichen',
    topic: 'Arbeitshilfe',
    format: 'Checkliste',
    readingMinutes: 4,
    audiences: ['Facility Management', 'Einkauf'],
    decisionQuestion: 'Welche Angaben brauchen Anbieter, damit ihre Angebote wirklich vergleichbar sind?',
    related: ['leistungsverzeichnis-gebaeudereinigung-erstellen', 'was-kostet-gebaeudereinigung-stundensatz-preise'],
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
      official(
        'Branchenmindestlohn',
        'Bundesministerium für Arbeit und Soziales',
        'https://www.bmas.de/DE/Arbeit/Arbeitsrecht/Mindestlohn/Branchenmindestlohn/branchenmindestlohn.html',
      ),
    ],
    orientationNote:
      'Die Checkliste ist eine allgemeine Beschaffungshilfe, kein vollständiges Vergabedokument und keine Rechtsberatung. Leistungswerte, Nachweise und Vertragsregeln müssen objektbezogen festgelegt und aktuell geprüft werden.',
    reviewer: noReviewer,
  },
  'industrie-produktionsreinigung-ohne-prozessstoerung': {
    slug: 'industrie-produktionsreinigung-ohne-prozessstoerung',
    headline: 'Industriereinigung im Betrieb: Was läuft weiter, was muss stehen?',
    description:
      'Praxisüberblick zur Integration von Reinigungsarbeiten in Produktionsabläufe und zu grundlegenden Schutzmaßnahmen.',
    listingTitle: 'Industriereinigung in laufende Prozesse integrieren',
    listingDescription:
      'Reinigungsfenster, Freigaben, Schutzmaßnahmen und Zuständigkeiten so planen, dass Betrieb und Reinigung zusammenpassen.',
    cluster: 'wechsel-betrieb',
    topic: 'Industrie',
    format: 'Leitfaden',
    readingMinutes: 7,
    audiences: ['Facility Management', 'Geschäftsführung'],
    decisionQuestion: 'Wie lässt sich Reinigung mit Schicht-, Rüst- und Wartungszeiten abstimmen?',
    related: ['iso-9001-iso-14001-gebaeudereinigung-unternehmen', 'leistungsverzeichnis-gebaeudereinigung-erstellen'],
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
    listingTitle: 'Reinigungsintervalle objektbezogen festlegen',
    listingDescription:
      'Nutzung, Verschmutzung und Hygieneanforderungen in belastbare Intervalle für Büro-, Sanitär- und Verkehrsflächen übersetzen.',
    cluster: 'planen-kalkulieren',
    topic: 'Unterhaltsreinigung',
    format: 'Leitfaden',
    readingMinutes: 8,
    audiences: ['Facility Management', 'Einkauf'],
    decisionQuestion: 'Welche Flächen brauchen feste Intervalle – und wo ist bedarfsorientierte Reinigung sinnvoll?',
    related: ['was-kostet-gebaeudereinigung-stundensatz-preise', 'leistungsverzeichnis-gebaeudereinigung-erstellen'],
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
      official(
        'ASR A4.1 – Sanitärräume',
        'Bundesanstalt für Arbeitsschutz und Arbeitsmedizin',
        'https://www.baua.de/DE/Angebote/Regelwerk/ASR/pdf/ASR-A4-1.pdf',
      ),
    ],
    orientationNote:
      'Die genannten Intervalle und Leistungsannahmen sind Planungswerte. Maßgeblich sind Nutzung, Gefährdungsbeurteilung, Hygieneplan und die tatsächliche Verschmutzung im Objekt.',
    reviewer: noReviewer,
  },
  'was-kostet-gebaeudereinigung-stundensatz-preise': {
    slug: 'was-kostet-gebaeudereinigung-stundensatz-preise',
    headline: 'Was kostet Gebäudereinigung? Stundensatz, m²-Preise und Beispiele',
    description:
      'Einordnung von Kostenbestandteilen, Leistungswerten und Rechenbeispielen für gewerbliche Gebäudereinigung.',
    listingTitle: 'Reinigungskosten nachvollziehbar kalkulieren',
    listingDescription:
      'Stundensatz, Leistungswert und Frequenz als Kalkulationslogik verstehen – mit offengelegten Annahmen statt pauschaler Preisversprechen.',
    cluster: 'planen-kalkulieren',
    topic: 'Kosten & Kalkulation',
    format: 'Leitfaden',
    readingMinutes: 9,
    audiences: ['Facility Management', 'Einkauf', 'Geschäftsführung'],
    decisionQuestion: 'Welche Annahmen erklären den Angebotspreis – und wie lassen sie sich prüfen?',
    related: ['unterhaltsreinigung-unternehmen-reinigungsintervalle', 'checkliste-reinigungsangebot'],
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
        '10. Verordnung über zwingende Arbeitsbedingungen in der Gebäudereinigung',
        'Bundesministerium für Arbeit und Soziales',
        'https://www.bmas.de/DE/Service/Gesetze-und-Gesetzesvorhaben/zehnte-verordnung-zwingende-arbeitsbedingungen-gebaeudereinigung.html',
      ),
      guidance(
        'Ausschreibung und Vergabe – Kalkulation und objektbezogene Leistungswerte',
        'Bundesinnungsverband des Gebäudereiniger-Handwerks',
        'https://www.die-gebaeudedienstleister.de/kunden-und-auftraggeber/ausschreibung-und-vergabe/',
      ),
    ],
    orientationNote:
      'Preis-, Produktivitäts- und Monatswerte sind Rechenbeispiele auf Basis der im Artikel genannten Annahmen. Ein verbindlicher Preis entsteht erst aus dem konkreten Leistungsumfang.',
    reviewer: noReviewer,
  },
  'leistungsverzeichnis-gebaeudereinigung-erstellen': {
    slug: 'leistungsverzeichnis-gebaeudereinigung-erstellen',
    headline: 'Leistungsverzeichnis erstellen: Reinigungsangebote besser vergleichen',
    description:
      'Aufbau und Einsatz eines objektbezogenen Leistungsverzeichnisses für vergleichbare Reinigungsangebote.',
    listingTitle: 'Leistungsverzeichnis für Gebäudereinigung erstellen',
    listingDescription:
      'Flächen, Tätigkeiten, Intervalle und Qualitätsziele so beschreiben, dass Anbieter auf derselben Grundlage kalkulieren.',
    cluster: 'ausschreiben-vergleichen',
    topic: 'Leistungsverzeichnis',
    format: 'Leitfaden',
    readingMinutes: 9,
    audiences: ['Facility Management', 'Einkauf'],
    decisionQuestion: 'Wie wird aus einem Bedarf eine eindeutige und kontrollierbare Leistungsbeschreibung?',
    related: ['checkliste-reinigungsangebot', 'reinigungsfirma-wechseln-checkliste-tipps'],
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
    headline: 'Küchenabluft nach VDI 2052 Blatt 2 prüfen und dokumentieren',
    description:
      'Orientierung zu Reinigung, Dokumentation, Brandschutz und Hygiene bei Abluftanlagen gewerblicher Küchen.',
    listingTitle: 'Küchenabluft nach VDI 2052 prüfen und dokumentieren',
    listingDescription:
      'Belastung, Anlagenzustand und Vorgaben in eine nachvollziehbare Prüfung, Reinigung und Dokumentation überführen.',
    cluster: 'qualitaet-compliance',
    topic: 'Hygiene & Brandschutz',
    format: 'Leitfaden',
    readingMinutes: 8,
    audiences: ['Facility Management', 'Geschäftsführung'],
    decisionQuestion: 'Welche Prüf- und Nachweisschritte sind für die konkrete Küchenabluftanlage relevant?',
    related: ['iso-9001-iso-14001-gebaeudereinigung-unternehmen', 'industrie-produktionsreinigung-ohne-prozessstoerung'],
    image: '/images/ahad/kuechenabluft.webp',
    datePublished: '2026-06-24',
    dateModified: '2026-07-13',
    sources: [
      official(
        'VDI 2052 Blatt 2 – Reinigung von Küchenabluftanlagen',
        'VDI Verein Deutscher Ingenieure',
        'https://www.vdi.de/mitgliedschaft/vdi-richtlinien/details/vdi-2052-blatt-2-raumlufttechnik-kuechen-reinigung-von-abluftanlagen-vdi-lueftungsregeln',
      ),
      official(
        'Lebensmittelhygiene-Verordnung',
        'Bundesministerium der Justiz / Bundesamt für Justiz',
        'https://www.gesetze-im-internet.de/lmhv_2007/',
      ),
    ],
    orientationNote:
      'VDI 2052 Blatt 2 behandelt die Reinigung von Küchenabluftanlagen. Intervalle und Betreiberpflichten sind anhand der aktuellen Richtlinien, Herstellerangaben, behördlichen Vorgaben, Versicherungsbedingungen und des Anlagenzustands zu bestimmen.',
    reviewer: noReviewer,
  },
  'iso-9001-iso-14001-gebaeudereinigung-unternehmen': {
    slug: 'iso-9001-iso-14001-gebaeudereinigung-unternehmen',
    headline: 'ISO 9001 und ISO 14001: Was Zertifikate wirklich belegen',
    description:
      'Orientierung zur Rolle von Qualitäts- und Umweltmanagementsystemen bei der Auswahl eines Reinigungsdienstleisters.',
    listingTitle: 'ISO 9001 und ISO 14001 bei Anbietern einordnen',
    listingDescription:
      'Zertifikat, Geltungsbereich und gelebte Prozesse prüfen – und Managementsysteme nicht mit dem Reinigungsergebnis verwechseln.',
    cluster: 'qualitaet-compliance',
    topic: 'Qualität & Compliance',
    format: 'Leitfaden',
    readingMinutes: 7,
    audiences: ['Einkauf', 'Geschäftsführung', 'Facility Management'],
    decisionQuestion: 'Was belegt ein Zertifikat – und welche Nachweise sollten Auftraggeber zusätzlich prüfen?',
    related: ['checkliste-reinigungsangebot', 'kuechenabluftreinigung-vdi-2052-pflicht-ablauf-nachweis'],
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
        'ISO 14001:2026 – Environmental management systems',
        'International Organization for Standardization',
        'https://www.iso.org/standard/92300.html',
      ),
      official(
        '§ 49 VgV – Qualitäts- und Umweltmanagement',
        'Bundesministerium der Justiz / Bundesamt für Justiz',
        'https://www.gesetze-im-internet.de/vgv_2016/__49.html',
      ),
    ],
    orientationNote:
      'Redaktionsstand 13. Juli 2026: ISO 9001:2015 und ISO 14001:2026 sind die veröffentlichten Ausgaben. Ein Zertifikat ist anhand von Ausgabe, Gültigkeit, Zertifizierungsstelle, Standorten und Geltungsbereich zu prüfen; es belegt nicht jedes einzelne Reinigungsergebnis.',
    reviewer: noReviewer,
  },
} as const satisfies Record<EditorialArticleSlug, EditorialArticle>;

export const EDITORIAL_CLUSTER_ORDER: readonly EditorialClusterKey[] = [
  'planen-kalkulieren',
  'ausschreiben-vergleichen',
  'wechsel-betrieb',
  'qualitaet-compliance',
];

export const EDITORIAL_CLUSTERS = {
  'planen-kalkulieren': {
    title: 'Bedarf planen & Kosten verstehen',
    shortTitle: 'Planen & kalkulieren',
    description: 'Intervalle, Leistungswerte und Kostenannahmen für die Budget- und Bedarfsplanung einordnen.',
  },
  'ausschreiben-vergleichen': {
    title: 'Leistungen ausschreiben & Angebote vergleichen',
    shortTitle: 'Ausschreiben & vergleichen',
    description: 'Eine gemeinsame Leistungsgrundlage schaffen und Angebote anhand belastbarer Kriterien prüfen.',
  },
  'wechsel-betrieb': {
    title: 'Anbieterwechsel & laufenden Betrieb sichern',
    shortTitle: 'Wechsel & Betrieb',
    description: 'Übergänge, Zuständigkeiten und betriebliche Abläufe ohne unnötige Reibungsverluste vorbereiten.',
  },
  'qualitaet-compliance': {
    title: 'Qualität, Nachweise & Compliance prüfen',
    shortTitle: 'Qualität & Compliance',
    description: 'Normen, Zertifikate und technische Anforderungen in prüfbare Nachweise übersetzen.',
  },
} as const satisfies Record<
  EditorialClusterKey,
  { title: string; shortTitle: string; description: string }
>;

export const EDITORIAL_ARTICLE_LIST: readonly EditorialArticle[] = Object.values(EDITORIAL_ARTICLES);

export function getEditorialArticlePath(slug: EditorialArticleSlug) {
  return `/fachwissen/${slug}`;
}

export interface EditorialSectionLink {
  id: string;
  label: string;
}

export const EDITORIAL_SECTIONS = {
  'reinigungsfirma-wechseln-checkliste-tipps': [
    { id: 'wechselbedarf-pruefen', label: 'Wechselbedarf prüfen' },
    { id: 'wechsel-planen', label: 'Wechsel planen' },
    { id: 'angebote-vergleichen', label: 'Angebote vergleichen' },
    { id: 'uebergabe-sichern', label: 'Übergabe sichern' },
  ],
  'checkliste-reinigungsangebot': [
    { id: 'objektdaten', label: 'Objektdaten' },
    { id: 'leistung-definieren', label: 'Leistung definieren' },
    { id: 'angebote-vergleichen', label: 'Angebote vergleichen' },
    { id: 'anbieter-pruefen', label: 'Anbieter prüfen' },
    { id: 'zusammenarbeit-regeln', label: 'Zusammenarbeit regeln' },
  ],
  'industrie-produktionsreinigung-ohne-prozessstoerung': [
    { id: 'prozessabstimmung', label: 'Prozesse abstimmen' },
    { id: 'schutzmassnahmen', label: 'Schutzmaßnahmen' },
    { id: 'reinigungsfenster', label: 'Reinigungsfenster planen' },
    { id: 'verfahren-auswaehlen', label: 'Verfahren auswählen' },
  ],
  'unterhaltsreinigung-unternehmen-reinigungsintervalle': [
    { id: 'intervalllogik', label: 'Intervalllogik' },
    { id: 'orientierungswerte', label: 'Orientierungswerte' },
    { id: 'kostenwirkung', label: 'Kostenwirkung' },
    { id: 'reinigungsplan', label: 'Reinigungsplan erstellen' },
  ],
  'was-kostet-gebaeudereinigung-stundensatz-preise': [
    { id: 'kostenbestandteile', label: 'Kostenbestandteile' },
    { id: 'leistungswert', label: 'Leistungswert & m²-Preis' },
    { id: 'rechenbeispiel', label: 'Rechenbeispiel' },
    { id: 'preistreiber', label: 'Preistreiber' },
  ],
  'leistungsverzeichnis-gebaeudereinigung-erstellen': [
    { id: 'lv-grundlagen', label: 'Grundlagen' },
    { id: 'leistungsmodelle', label: 'Leistungsmodelle' },
    { id: 'lv-bestandteile', label: 'Bestandteile' },
    { id: 'lv-erstellen', label: 'Schritt für Schritt' },
  ],
  'kuechenabluftreinigung-vdi-2052-pflicht-ablauf-nachweis': [
    { id: 'vdi-einordnung', label: 'VDI 2052 einordnen' },
    { id: 'intervall-festlegen', label: 'Intervall festlegen' },
    { id: 'reinigungsablauf', label: 'Reinigungsablauf' },
    { id: 'nachweis', label: 'Nachweis dokumentieren' },
  ],
  'iso-9001-iso-14001-gebaeudereinigung-unternehmen': [
    { id: 'iso-9001-einordnen', label: 'ISO 9001 einordnen' },
    { id: 'normen-vergleichen', label: 'Normen vergleichen' },
    { id: 'beschaffung', label: 'In der Beschaffung nutzen' },
    { id: 'zertifikat-pruefen', label: 'Zertifikat prüfen' },
  ],
} as const satisfies Record<EditorialArticleSlug, readonly EditorialSectionLink[]>;

function isIsoTimestamp(value: string | null): value is string {
  return Boolean(value && /^\d{4}-\d{2}-\d{2}T/.test(value) && Number.isFinite(Date.parse(value)));
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
  if (!isIsoTimestamp(reviewer.verifiedAt) || !isIsoTimestamp(reviewer.expiresAt)) return false;

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
    inLanguage: 'de-DE',
    articleSection: article.topic,
    timeRequired: `PT${article.readingMinutes}M`,
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
