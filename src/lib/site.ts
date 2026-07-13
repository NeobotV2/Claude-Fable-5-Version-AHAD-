import SITE_CONFIG from '@/site-config.json';

/**
 * Zentrale Site-Konfiguration — einzige Quelle für Kontaktdaten,
 * Vertriebsversprechen und wiederkehrende Inhalte.
 * Änderungen hier wirken auf der gesamten Website.
 */

export const SITE = {
  name: 'AHAD Cleaning',
  legalName: 'AHAD Cleaning Company GmbH',
  url: SITE_CONFIG.canonicalOrigin,
  phone: '+49 7721 944 79 15',
  phoneHref: 'tel:+4977219447915',
  email: 'info@ahad-cleaning.de',
  emailHref: 'mailto:info@ahad-cleaning.de',
  address: {
    street: 'Max-Planck-Straße 11',
    zip: '78052',
    city: 'Villingen-Schwenningen',
    country: 'DE',
  },
  hours: 'Mo–Fr · 08:00–17:00 Uhr',
  social: {
    instagram: 'https://instagram.com/ahadcleaning',
    linkedin: 'https://linkedin.com/company/ahadcleaning',
  },
  // WhatsApp Business — Sofortkanal. Nummer im internationalen Format
  // ohne Sonderzeichen (+49 176 20422494 → 4917620422494).
  /** Zweites Geschäftsfeld der AHAD Cleaning Company GmbH (eigene Website). */
  careUrl: 'https://ahad-care.de',
  whatsapp: '4917620422494',
  whatsappText: 'Hallo AHAD Cleaning, ich interessiere mich für ein Angebot zur Gebäudereinigung.',
} as const;

/** Fertiger WhatsApp-Deeplink mit vorbefülltem Text. */
export const WHATSAPP_HREF = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(SITE.whatsappText)}`;

/**
 * Pruefmetadaten fuer oeffentliche Tatsachenbehauptungen. Ein Eintrag wird nur
 * publiziert, wenn ein nachvollziehbarer Nachweis vorhanden, die Pruefung
 * datiert und noch nicht abgelaufen ist. Leere Platzhalter sind fail-closed.
 */
export type EvidenceReference =
  | { kind: 'url'; value: string }
  | { kind: 'id'; value: string };

export interface PublicationVerification {
  owner: string;
  evidence: readonly EvidenceReference[];
  verifiedAt: string | null;
  expiresAt: string | null;
}

export function canPublishVerification(
  verification: PublicationVerification,
  now: Date = new Date(),
): boolean {
  const verifiedAt = verification.verifiedAt ? Date.parse(verification.verifiedAt) : Number.NaN;
  const expiresAt = verification.expiresAt ? Date.parse(verification.expiresAt) : Number.NaN;
  const evidenceIsValid =
    verification.evidence.length > 0 &&
    verification.evidence.every((item) => {
      if (item.kind === 'url') {
        try {
          return new URL(item.value).protocol === 'https:';
        } catch {
          return false;
        }
      }
      return item.value.trim().length > 0;
    });

  return (
    verification.owner.trim().length > 0 &&
    evidenceIsValid &&
    Number.isFinite(verifiedAt) &&
    Number.isFinite(expiresAt) &&
    verifiedAt <= now.getTime() &&
    expiresAt > now.getTime()
  );
}

const pendingVerification = (owner: string): PublicationVerification => ({
  owner,
  evidence: [],
  verifiedAt: null,
  expiresAt: null,
});

/** Zentrales Register der noch nicht extern belegten Claims. */
export const CLAIM_VERIFICATIONS = {
  serviceLevels: pendingVerification('Operations'),
  companyStatistics: pendingVerification('Geschaeftsfuehrung'),
  googleBusinessProfile: pendingVerification('Marketing'),
  iso9001: pendingVerification('Qualitaetsmanagement'),
  iso14001: pendingVerification('Qualitaetsmanagement'),
  insurance: pendingVerification('Geschaeftsfuehrung'),
  workforce: pendingVerification('Personal'),
  clientReferences: pendingVerification('Vertrieb'),
  featuredTestimonial: pendingVerification('Marketing / Datenschutz'),
  customerReviews: pendingVerification('Marketing / Datenschutz'),
  hqGeo: pendingVerification('Operations'),
  stuttgartBranch: pendingVerification('Operations'),
  konstanzBranch: pendingVerification('Operations'),
} satisfies Record<string, PublicationVerification>;

export type LocationPublicationMode = 'legal-headquarters' | 'service-area';

export interface LocationPublication {
  name: string;
  path: string;
  mode: LocationPublicationMode;
  verification: PublicationVerification;
  publishLegalAddress: boolean;
  publishAsLocalBusiness: boolean;
  publishGeo: boolean;
}

/**
 * Rollen der Ortsseiten. Die HQ-Adresse darf als rechtliche
 * Organization-Adresse erscheinen. Filial- und Geo-Markup bleibt ohne
 * gesonderten Standortnachweis gesperrt.
 */
export const LOCATION_PUBLICATIONS = {
  villingenSchwenningen: {
    name: 'Villingen-Schwenningen',
    path: '/standorte/villingen-schwenningen',
    mode: 'legal-headquarters',
    verification: CLAIM_VERIFICATIONS.hqGeo,
    publishLegalAddress: true,
    publishAsLocalBusiness: canPublishVerification(CLAIM_VERIFICATIONS.hqGeo),
    publishGeo: canPublishVerification(CLAIM_VERIFICATIONS.hqGeo),
  },
  stuttgart: {
    name: 'Stuttgart',
    path: '/standorte/stuttgart',
    mode: 'service-area',
    verification: CLAIM_VERIFICATIONS.stuttgartBranch,
    publishLegalAddress: false,
    publishAsLocalBusiness: canPublishVerification(CLAIM_VERIFICATIONS.stuttgartBranch),
    publishGeo: canPublishVerification(CLAIM_VERIFICATIONS.stuttgartBranch),
  },
  konstanz: {
    name: 'Konstanz',
    path: '/standorte/konstanz',
    mode: 'service-area',
    verification: CLAIM_VERIFICATIONS.konstanzBranch,
    publishLegalAddress: false,
    publishAsLocalBusiness: canPublishVerification(CLAIM_VERIFICATIONS.konstanzBranch),
    publishGeo: canPublishVerification(CLAIM_VERIFICATIONS.konstanzBranch),
  },
} satisfies Record<string, LocationPublication>;

/**
 * Vertriebsversprechen — überall identisch kommuniziert.
 * WICHTIG: Diese Zusagen stehen öffentlich auf der Website und müssen
 * operativ abgesichert sein (Erreichbarkeit, Besichtigungskapazität,
 * Angebotsdurchlaufzeit), sonst kippt das Vertrauensargument.
 */
const PROMISE_CANDIDATES = [
  { value: '24h', label: 'Reaktionszeit garantiert' },
  { value: '48h', label: 'bis zur Objektbesichtigung' },
  { value: '100%', label: 'dokumentierte Qualität' },
] as const;

export const PROMISES = canPublishVerification(CLAIM_VERIFICATIONS.serviceLevels)
  ? PROMISE_CANDIDATES
  : [];

const STAT_CANDIDATES = [
  { value: 80, suffix: '+', label: 'Qualifizierte Mitarbeitende' },
  { value: 15, suffix: '+', label: 'Jahre Erfahrung' },
  { value: 8, suffix: '', label: 'Leistungsbereiche aus einer Hand' },
  { value: 3, suffix: '', label: 'Standorte in Süddeutschland' },
] as const;

export const STATS = canPublishVerification(CLAIM_VERIFICATIONS.companyStatistics)
  ? STAT_CANDIDATES
  : [];

/**
 * Öffentliche Google-Bewertung — nur zur sichtbaren Anzeige + Verlinkung.
 * Kein self-serving AggregateRating-JSON-LD für die eigene Organization.
 * `url` = euer Google-Unternehmensprofil (bitte exakt eintragen).
 */
const GOOGLE_RATING_CANDIDATE = {
  value: 4.8,
  count: 20,
  url: '',
} as const;

/** Nur mit exakt verifiziertem Unternehmensprofil; keine Suchergebnis-URL. */
export const GOOGLE_RATING =
  canPublishVerification(CLAIM_VERIFICATIONS.googleBusinessProfile) &&
  GOOGLE_RATING_CANDIDATE.url.startsWith('https://')
    ? GOOGLE_RATING_CANDIDATE
    : null;

/**
 * Vertrauenssignale fürs Trust-Band unter dem Hero. NUR belegbare Aussagen —
 * Zertifikate erst freischalten, wenn nachweislich vorhanden (Abmahnrisiko).
 * `icon` ist ein Schlüssel, der in TrustBand.tsx auf ein Symbol gemappt wird.
 */
const TRUST_BADGE_CANDIDATES = [
  { icon: 'badge', label: 'ISO 9001 zertifiziert', sub: 'Qualitätsmanagement', verification: CLAIM_VERIFICATIONS.iso9001 },
  { icon: 'badge', label: 'ISO 14001 zertifiziert', sub: 'Umweltmanagement', verification: CLAIM_VERIFICATIONS.iso14001 },
  { icon: 'users', label: 'Nur festangestellte Teams', sub: 'sozialversichert & sicherheitsüberprüft', verification: CLAIM_VERIFICATIONS.workforce },
  { icon: 'shield', label: 'Umfassend versichert', sub: 'Betriebshaftpflicht', verification: CLAIM_VERIFICATIONS.insurance },
  { icon: 'clock', label: '15+ Jahre Erfahrung', sub: 'über 80 Objekte betreut', verification: CLAIM_VERIFICATIONS.companyStatistics },
] as const;

export const TRUST_BADGES = TRUST_BADGE_CANDIDATES.filter((badge) =>
  canPublishVerification(badge.verification),
);

export interface ClientReference {
  name: string;
  domain: string;
  /** Lokaler Pfad zum freigegebenen Logo, z. B. '/images/clients/goldbeck.svg'.
   *  Wenn gesetzt, zeigt das Referenz-Band das Logo statt der Wortmarke. */
  logo?: string;
  /** @deprecated Externe Hotlinks vermeiden — Logos lokal unter logo ablegen. */
  logoUrl?: string;
  verification: PublicationVerification;
}

// Freigegebene Datensaetze erst nach dokumentierter Einzelpruefung eintragen.
// Die redaktionelle Warteschlange liegt in docs/content/verification-register.json
// und wird bewusst nicht in den Client-Bundle aufgenommen.
const CLIENT_REFERENCE_CANDIDATES: ClientReference[] = [];

export const CLIENT_REFERENCES = CLIENT_REFERENCE_CANDIDATES.filter((reference) =>
  canPublishVerification(reference.verification),
);

/**
 * Das AHAD-Versprechen — benannte Risikoumkehr mit „Zähnen".
 * Bewusst nur Zusagen, die operativ haltbar sind (Nachbesserung,
 * Festpreis, faire Laufzeit, Reaktionszeit). Keine erfundenen Werte.
 */
const GUARANTEE_CANDIDATES = [
  {
    title: 'Reaktions-Versprechen',
    promise: 'Antwort auf jede Meldung innerhalb von 24 Stunden — nachvollziehbar dokumentiert.',
  },
  {
    title: 'Qualitäts-Versprechen',
    promise: 'Zu Recht beanstandete Leistung bessern wir kostenfrei nach. Ohne Diskussion.',
  },
  {
    title: 'Festpreis-Versprechen',
    promise: 'Transparentes Leistungsverzeichnis, fester Preis — keine versteckten Nachträge.',
  },
  {
    title: 'Fairness-Versprechen',
    promise: 'Faire Laufzeiten statt Knebelverträge. Wir binden durch Leistung, nicht durch Vertrag.',
  },
] as const;

export const GUARANTEES = canPublishVerification(CLAIM_VERIFICATIONS.serviceLevels)
  ? GUARANTEE_CANDIDATES
  : [];

/**
 * Belegbare Eckwerte (operative Zusagen, keine fabrizierten Statistiken).
 * Sobald echte Kennzahlen vorliegen (z. B. gemessene SLA-Quote), hier
 * ergänzen — bis dahin nur, wofür AHAD vertraglich einsteht.
 */
const PROOF_POINT_CANDIDATES = [
  { value: '24 h', label: 'Reaktionszeit', sub: 'vertraglich zugesichert' },
  { value: '48 h', label: 'bis Objektbesichtigung', sub: 'in der Regel vor Ort' },
  { value: '1', label: 'feste Objektleitung', sub: 'pro Objekt, mit Gesicht' },
  { value: '100 %', label: 'dokumentierte Leistung', sub: 'auditfähig nachweisbar' },
] as const;

export const PROOF_POINTS = canPublishVerification(CLAIM_VERIFICATIONS.serviceLevels)
  ? PROOF_POINT_CANDIDATES
  : [];

/**
 * Feste Objektleitung mit Gesicht — der wichtigste menschliche
 * Vertrauensanker. PLATZHALTER: echten Namen + Foto nachreichen
 * (Foto nach /public/team/objektleitung.jpg legen).
 */
export const OBJEKTLEITUNG = {
  name: 'Ihre feste Objektleitung',
  role: 'Direkter Ansprechpartner für Ihr Objekt',
  photo: '', // z. B. '/team/objektleitung.jpg' — leer => gebrandeter Platzhalter
  quote:
    'Sie haben eine Nummer, die abnimmt — und einen Menschen, der Ihr Objekt kennt. Kein Ticketsystem, keine Warteschleife.',
} as const;

/**
 * Hervorgehobene, ECHTE Kundenstimme (mit Freigabe des Kunden inkl. Logo).
 * Wortlaut unverändert. Das wichtigste Vertrauenselement der Seite:
 * namentlich, detailliert, von einem langjährigen regionalen Auftraggeber.
 */
export interface FeaturedTestimonialData {
  quote: string;
  person: string;
  personRole: string;
  company: string;
  shortName: string;
  location: string;
  relationship: string;
  logo: string;
  services: readonly string[];
  verification: PublicationVerification;
}

/** Keine personenbezogenen Rohdaten im Client-Bundle vor der Freigabe. */
export const FEATURED_TESTIMONIAL: FeaturedTestimonialData | null = null;

const canPublishTestimonial = (testimonial: FeaturedTestimonialData | null): boolean =>
  testimonial !== null && canPublishVerification(testimonial.verification);

export const FEATURED_TESTIMONIAL_PUBLISHABLE = canPublishTestimonial(FEATURED_TESTIMONIAL);

/**
 * Echte Kundenbewertungen (z. B. von Google) für die sichtbare Ausgabe.
 * LEER lassen, bis verifizierte Bewertungen vorliegen. Unabhängig vom Inhalt
 * dieser Liste wird kein Organization-AggregateRating-Markup ausgegeben.
 */
export interface Review {
  author: string;
  role?: string;
  rating: number; // 1–5
  date?: string; // ISO, optional
  text: string;
}

/**
 * Echte, öffentliche Google-Rezensionen (Auswahl im Wortlaut).
 * Reihenfolge bewusst nach B2B-Aussagekraft: zuerst die Bewertung, die den
 * vollständigen Ablauf (Vorbesichtigung, Angebot, Ausführung, Dokumentation)
 * beschreibt, dann sachliche Empfehlungen; die saloppste Stimme steht zuletzt.
 * Inhalte unverändert — nur die Anordnung ist kuratiert.
 */
/** Freigegebene Stimmen erst nach dokumentierter Wiedergabefreigabe eintragen. */
const REVIEW_CANDIDATES: Review[] = [];

/** Einzelstimmen nur mit dokumentierter Wiedergabe- und Namensfreigabe. */
export const REVIEWS: Review[] = canPublishVerification(CLAIM_VERIFICATIONS.customerReviews)
  ? REVIEW_CANDIDATES
  : [];

/** Quelle/Profil-Link für „alle Bewertungen ansehen" — Google-Unternehmensprofil. */
export const REVIEWS_SOURCE_URL = GOOGLE_RATING?.url ?? null;

/**
 * Bewertungen bleiben als sichtbarer, mit der Google-Quelle verlinkter Inhalt
 * erhalten. Auf der eigenen Organization/LocalBusiness-Website wird bewusst
 * kein self-serving Review-/AggregateRating-Markup ausgegeben.
 */
export function reviewSchema() {
  return null;
}

export const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE.url}/#website`,
  url: SITE.url,
  name: SITE.name,
  inLanguage: 'de-DE',
  publisher: { '@id': `${SITE.url}/#organization` },
};

/**
 * Kompakter Organization-Knoten fuer Unterseiten-Schemas (Service/Article):
 * loest die @id-Referenz AUF DERSELBEN SEITE auf — Schema-Parser lesen nur die
 * aktuelle Seite, eine reine @id-Referenz auf die Startseite bliebe haengend.
 */
export const ORG_REF = {
  '@type': 'Organization',
  '@id': `${SITE.url}/#organization`,
  name: 'AHAD Cleaning Company GmbH',
  url: SITE.url,
  telephone: SITE.phone,
} as const;

export const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE.url}/#organization`,
  name: SITE.legalName,
  url: SITE.url,
  logo: `${SITE.url}/logo.png`,
  image: `${SITE.url}/og-image.jpg`,
  description:
    'Gebäudereinigung, Industriereinigung und Unterhaltsreinigung für Unternehmen in Villingen-Schwenningen, Stuttgart, Konstanz und Süddeutschland.',
  telephone: SITE.phone,
  email: SITE.email,
  areaServed: [
    { '@type': 'City', name: 'Villingen-Schwenningen' },
    { '@type': 'City', name: 'Stuttgart' },
    { '@type': 'City', name: 'Konstanz' },
    { '@type': 'AdministrativeArea', name: 'Schwarzwald-Baar-Kreis' },
    { '@type': 'AdministrativeArea', name: 'Baden-Württemberg' },
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: SITE.phone,
    contactType: 'customer service',
    areaServed: 'DE',
    availableLanguage: 'German',
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.city,
    postalCode: SITE.address.zip,
    addressCountry: SITE.address.country,
  },
  // ahad-care.de gehört zur selben GmbH (zweites Geschäftsfeld) -> selbe Entität.
  sameAs: [SITE.social.instagram, SITE.social.linkedin, SITE.careUrl],
};
