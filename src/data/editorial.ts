import { SITE } from '@/lib/site';

export type EditorialArticleSlug =
  | 'reinigungsfirma-wechseln-checkliste-tipps'
  | 'checkliste-reinigungsangebot'
  | 'industrie-produktionsreinigung-ohne-prozessstoerung'
  | 'unterhaltsreinigung-unternehmen-reinigungsintervalle'
  | 'was-kostet-gebaeudereinigung-stundensatz-preise'
  | 'leistungsverzeichnis-gebaeudereinigung-erstellen'
  | 'kuechenabluftreinigung-vdi-2052-pflicht-ablauf-nachweis'
  | 'iso-9001-iso-14001-gebaeudereinigung-unternehmen'
  | 'raeum-und-streupflicht-unternehmen'
  | 'mindestlohn-gebaeudereinigung';

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
  checkedAt = '2026-07-13',
): EditorialSource => ({ title, publisher, url, kind: 'official-primary', checkedAt });

const guidance = (
  title: string,
  publisher: string,
  url: string,
  checkedAt = '2026-07-13',
): EditorialSource => ({ title, publisher, url, kind: 'industry-guidance', checkedAt });

/** Prüfdatum der Quellen, die für die Beiträge vom Oktober 2026 erhoben wurden. */
const CHECKED_2026_10 = '2026-10-18';

const noReviewer = null;

export const EDITORIAL_ARTICLES = {
  'reinigungsfirma-wechseln-checkliste-tipps': {
    slug: 'reinigungsfirma-wechseln-checkliste-tipps',
    headline: 'Reinigungsfirma wechseln: den Übergang vorbereiten',
    description:
      'Orientierung zu Kündigungsfristen, Neu-Ausschreibung und Übergabe beim Wechsel des Reinigungsdienstleisters.',
    listingTitle: 'Reinigungsfirma wechseln: den Übergang vorbereiten',
    listingDescription:
      'Vertrag prüfen, Bedarf neu beschreiben, Angebote vergleichen und den Start des neuen Dienstleisters vorbereiten.',
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
      'Druckbare Arbeitshilfe für Objektdaten, Leistungsumfang, Nachweise, Vertragsregeln und die spätere Zusammenarbeit.',
    cluster: 'ausschreiben-vergleichen',
    topic: 'Arbeitshilfe',
    format: 'Checkliste',
    readingMinutes: 4,
    audiences: ['Facility Management', 'Einkauf'],
    decisionQuestion: 'Welche Angaben brauchen Anbieter, damit sich ihre Angebote vergleichen lassen?',
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
      'Wie sich Reinigungsarbeiten in Produktionsabläufe einplanen lassen und welche grundlegenden Schutzmaßnahmen gelten.',
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
    headline: 'Reinigungsintervalle in Unternehmen festlegen',
    description:
      'Orientierung für nutzungs- und bedarfsabhängige Intervalle in Büro-, Sanitär- und Verkehrsflächen.',
    listingTitle: 'Reinigungsintervalle objektbezogen festlegen',
    listingDescription:
      'Nutzung, Verschmutzung und Hygieneanforderungen in nachvollziehbare Intervalle für Büro-, Sanitär- und Verkehrsflächen übersetzen.',
    cluster: 'planen-kalkulieren',
    topic: 'Unterhaltsreinigung',
    format: 'Leitfaden',
    readingMinutes: 8,
    audiences: ['Facility Management', 'Einkauf'],
    decisionQuestion: 'Welche Flächen brauchen feste Intervalle, und wo ist bedarfsorientierte Reinigung sinnvoll?',
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
      'Wie Stundensatz, Leistungswert und Frequenz den Preis bestimmen. Mit Rechenbeispielen und offengelegten Annahmen.',
    cluster: 'planen-kalkulieren',
    topic: 'Kosten & Kalkulation',
    format: 'Leitfaden',
    readingMinutes: 9,
    audiences: ['Facility Management', 'Einkauf', 'Geschäftsführung'],
    decisionQuestion: 'Welche Annahmen erklären den Angebotspreis, und wie lassen sie sich prüfen?',
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
    headline: 'ISO 9001 und ISO 14001: Was Zertifikate belegen',
    description:
      'Orientierung zur Rolle von Qualitäts- und Umweltmanagementsystemen bei der Auswahl eines Reinigungsdienstleisters.',
    listingTitle: 'ISO 9001 und ISO 14001 bei Anbietern einordnen',
    listingDescription:
      'Zertifikat, Geltungsbereich und gelebte Prozesse prüfen. Ein Managementsystem belegt noch kein Reinigungsergebnis.',
    cluster: 'qualitaet-compliance',
    topic: 'Qualität & Compliance',
    format: 'Leitfaden',
    readingMinutes: 7,
    audiences: ['Einkauf', 'Geschäftsführung', 'Facility Management'],
    decisionQuestion: 'Was belegt ein Zertifikat, und welche Nachweise sollten Auftraggeber zusätzlich prüfen?',
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
  'raeum-und-streupflicht-unternehmen': {
    slug: 'raeum-und-streupflicht-unternehmen',
    headline: 'Räum- und Streupflicht für Unternehmen: Was gilt, wer haftet?',
    description:
      'Orientierung zu Rechtsgrundlagen in Baden-Württemberg, Verkehrssicherung auf Gehweg, Zufahrt und Parkplatz sowie zur Übertragung an einen Winterdienst.',
    listingTitle: 'Räum- und Streupflicht auf Betriebsflächen organisieren',
    listingDescription:
      'Gehweg, Zufahrt und Parkplatz zuordnen, den Winterdienst vertraglich beauftragen, Kontrollen einplanen und jeden Einsatz nachvollziehbar dokumentieren.',
    cluster: 'qualitaet-compliance',
    topic: 'Winterdienst & Haftung',
    format: 'Leitfaden',
    readingMinutes: 9,
    audiences: ['Facility Management', 'Geschäftsführung'],
    decisionQuestion:
      'Welche Flächen müssen wir im Winter sichern, und was bleibt nach der Übertragung an einen Winterdienst bei uns?',
    related: ['leistungsverzeichnis-gebaeudereinigung-erstellen', 'checkliste-reinigungsangebot'],
    image: '/images/ahad/brand-back.webp',
    datePublished: '2026-10-18',
    dateModified: '2026-10-18',
    sources: [
      official(
        '§ 41 StrG BW – Beleuchtungs-, Reinigungs-, Räum- und Streupflicht',
        'Land Baden-Württemberg (Landesrecht BW)',
        'https://www.landesrecht-bw.de/jportal/?quelle=jlink&query=StrG+BW+%C2%A7+41&psml=bsbawueprod.psml&max=true',
        CHECKED_2026_10,
      ),
      official(
        'Streupflichtsatzung der Großen Kreisstadt Villingen-Schwenningen (Fassung vom 4. Dezember 2002)',
        'Stadt Villingen-Schwenningen',
        'https://www.villingen-schwenningen.de/fileadmin/VS/01_Rathaus_Leben/Unsere_Stadt/Ortsrecht/streupflichtsatzung_04_12_2002.pdf',
        CHECKED_2026_10,
      ),
      official(
        'ASR A1.8 – Verkehrswege',
        'Bundesanstalt für Arbeitsschutz und Arbeitsmedizin',
        'https://www.baua.de/DE/Angebote/Regelwerk/ASR/pdf/ASR-A1-8.pdf',
        CHECKED_2026_10,
      ),
      official(
        'BGH, Urteil vom 22. Januar 2008 – VI ZR 126/07 (Übertragung der Streupflicht)',
        'Bundesgerichtshof',
        'https://juris.bundesgerichtshof.de/cgi-bin/bgh_notp/document.py?Gericht=bgh&Art=en&Datum=2008&Sort=2051&Seite=93&nr=1419&anz=2952&pos=2818',
        CHECKED_2026_10,
      ),
      official(
        'BGH, Urteil vom 12. Juni 2012 – VI ZR 138/11 (allgemeine Glätte)',
        'Bundesgerichtshof',
        'https://juris.bundesgerichtshof.de/cgi-bin/rechtsprechung/document.py?Gericht=bgh&Art=en&nr=60839&pos=0&anz=1',
        CHECKED_2026_10,
      ),
      official(
        'BGH, Urteil vom 2. Juli 2019 – VI ZR 184/18 (Streupflicht auf Parkplätzen)',
        'Bundesgerichtshof',
        'https://juris.bundesgerichtshof.de/cgi-bin/rechtsprechung/document.py?Gericht=bgh&Art=en&nr=98764',
        CHECKED_2026_10,
      ),
      official(
        'Räum- und Streupflicht des Vermieters an der Grundstücksgrenze (VIII ZR 255/16)',
        'Bundesgerichtshof, Pressemitteilung',
        'https://www.bundesgerichtshof.de/SharedDocs/Pressemitteilungen/DE/2018/2018036.html',
        CHECKED_2026_10,
      ),
      official(
        'Haftung des Vermieters bei Eisglätte trotz beauftragtem Dienstleister (VIII ZR 250/23)',
        'Bundesgerichtshof, Pressemitteilung',
        'https://www.bundesgerichtshof.de/SharedDocs/Pressemitteilungen/DE/2025/2025187.html',
        CHECKED_2026_10,
      ),
    ],
    orientationNote:
      'Keine Rechtsberatung. Umfang, Uhrzeiten und zulässige Streumittel regelt die Satzung der jeweiligen Gemeinde in ihrer aktuellen Fassung. Ob und wie weit eine Haftung besteht, hängt vom Einzelfall, von den Verträgen und von der Rechtsprechung ab. Redaktionsstand 18. Oktober 2026.',
    reviewer: noReviewer,
  },
  'mindestlohn-gebaeudereinigung': {
    slug: 'mindestlohn-gebaeudereinigung',
    headline: 'Mindestlohn in der Gebäudereinigung 2026 und Ausblick 2027',
    description:
      'Branchenmindestlöhne seit 1. Januar 2026, Stand der Tarifrunde, gesetzlicher Mindestlohn 2027 und die Folgen für Stundensätze, Verträge und Auftraggeber.',
    listingTitle: 'Mindestlohn Gebäudereinigung 2026 und Ausblick 2027',
    listingDescription:
      'Was Lohngruppe 1 und 6 seit Januar 2026 vorschreiben, wo die Tarifrunde steht und wie Auftraggeber Preisanpassung und Haftung einordnen.',
    cluster: 'planen-kalkulieren',
    topic: 'Lohn & Tarif',
    format: 'Leitfaden',
    readingMinutes: 8,
    audiences: ['Einkauf', 'Geschäftsführung'],
    decisionQuestion:
      'Welche Lohnuntergrenzen gelten, und wie wirken sich Änderungen 2027 auf laufende Reinigungsverträge aus?',
    related: ['was-kostet-gebaeudereinigung-stundensatz-preise', 'checkliste-reinigungsangebot'],
    image: '/images/ahad/karriere.webp',
    datePublished: '2026-10-18',
    dateModified: '2026-10-18',
    sources: [
      official(
        'Zehnte Verordnung über zwingende Arbeitsbedingungen in der Gebäudereinigung (10. GebäudeArbbV)',
        'Bundesministerium für Arbeit und Soziales',
        'https://www.bmas.de/DE/Service/Gesetze-und-Gesetzesvorhaben/zehnte-verordnung-zwingende-arbeitsbedingungen-gebaeudereinigung.html',
        CHECKED_2026_10,
      ),
      official(
        '§ 1 MiLoV5 – Höhe des Mindestlohns ab 1. Januar 2026 und 1. Januar 2027',
        'Bundesministerium der Justiz / Bundesamt für Justiz',
        'https://www.gesetze-im-internet.de/milov5/__1.html',
        CHECKED_2026_10,
      ),
      official(
        '§ 13 MiLoG – Haftung des Auftraggebers',
        'Bundesministerium der Justiz / Bundesamt für Justiz',
        'https://www.gesetze-im-internet.de/milog/__13.html',
        CHECKED_2026_10,
      ),
      official(
        '§ 14 AEntG – Haftung des Auftraggebers',
        'Bundesministerium der Justiz / Bundesamt für Justiz',
        'https://www.gesetze-im-internet.de/aentg_2009/__14.html',
        CHECKED_2026_10,
      ),
      official(
        '§ 21 MiLoG – Bußgeldvorschriften',
        'Bundesministerium der Justiz / Bundesamt für Justiz',
        'https://www.gesetze-im-internet.de/milog/__21.html',
        CHECKED_2026_10,
      ),
      official(
        'Haftung des Auftraggebers bei Mindestarbeitsbedingungen',
        'Zoll online, Generalzolldirektion',
        'https://www.zoll.de/DE/Fachthemen/Arbeit/Mindestarbeitsbedingungen/Haftung-Auftraggebers/haftung-auftraggebers_node.html',
        CHECKED_2026_10,
      ),
      official(
        'BAG, Urteil vom 16. Oktober 2019 – 5 AZR 241/18 (Unternehmerbegriff der Auftraggeberhaftung)',
        'Bundesarbeitsgericht',
        'https://www.bundesarbeitsgericht.de/entscheidung/5-azr-241-18/',
        CHECKED_2026_10,
      ),
      official(
        '§ 1 PrKG – Preisklauselverbot und Kostenelementeklauseln',
        'Bundesministerium der Justiz / Bundesamt für Justiz',
        'https://www.gesetze-im-internet.de/prkg/__1.html',
        CHECKED_2026_10,
      ),
      guidance(
        'Reinigungsarbeit wird unter Wert verkauft (erste Verhandlungsrunde 2026)',
        'IG Bauen-Agrar-Umwelt',
        'https://igbau.de/Reinigungsarbeit-wird-unter-Wert-verkauft.html',
        CHECKED_2026_10,
      ),
      guidance(
        'Gebäudereiniger: Arbeitgeber lehnen 13-Prozent-Forderung ab',
        'Deutsche Handwerks Zeitung',
        'https://www.deutsche-handwerks-zeitung.de/gebaeudereiniger-arbeitgeber-lehnen-13-prozent-forderung-ab-383375/',
        CHECKED_2026_10,
      ),
    ],
    orientationNote:
      'Redaktionsstand 18. Oktober 2026: Die Werte für 2026 beruhen auf der Zehnten Verordnung über zwingende Arbeitsbedingungen in der Gebäudereinigung, die am 31. Dezember 2026 ausläuft. Ein Tarifergebnis für 2027 lag zu diesem Zeitpunkt nicht vor. Vertrags- und Haftungsfragen sind im Einzelfall rechtlich zu prüfen; der Beitrag ist keine Rechtsberatung.',
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
    description: 'Eine gemeinsame Leistungsgrundlage schaffen und Angebote nach festen Kriterien prüfen.',
  },
  'wechsel-betrieb': {
    title: 'Anbieterwechsel & laufenden Betrieb sichern',
    shortTitle: 'Wechsel & Betrieb',
    description: 'Übergänge, Zuständigkeiten und Reinigung im laufenden Betrieb planen.',
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
  'raeum-und-streupflicht-unternehmen': [
    { id: 'rechtsgrundlagen-bw', label: 'Rechtsgrundlagen in Baden-Württemberg' },
    { id: 'flaechen-zuordnen', label: 'Gehweg, Zufahrt, Parkplatz' },
    { id: 'zeiten-streumittel', label: 'Zeiten und Streumittel' },
    { id: 'winterdienst-beauftragen', label: 'Pflicht übertragen' },
    { id: 'einsatzprotokoll-vertrag', label: 'Einsatzprotokoll & Vertrag' },
  ],
  'mindestlohn-gebaeudereinigung': [
    { id: 'branchenmindestlohn-2026', label: 'Branchenmindestlohn 2026' },
    { id: 'tarifrunde-2027', label: 'Tarifrunde für 2027' },
    { id: 'gesetzlicher-mindestlohn-2027', label: 'Gesetzlicher Mindestlohn 2027' },
    { id: 'stundensaetze-vertraege', label: 'Stundensätze & Verträge' },
    { id: 'auftraggeberhaftung', label: 'Auftraggeberhaftung' },
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
