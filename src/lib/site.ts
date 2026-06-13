/**
 * Zentrale Site-Konfiguration — einzige Quelle für Kontaktdaten,
 * Vertriebsversprechen und wiederkehrende Inhalte.
 * Änderungen hier wirken auf der gesamten Website.
 */

export const SITE = {
  name: 'AHAD Cleaning',
  legalName: 'AHAD Cleaning Company GmbH',
  url: 'https://ahad-cleaning.de',
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
  // WhatsApp Business — Sofortkanal. Nummer = Festnetz im internationalen
  // Format ohne Sonderzeichen; ggf. auf die echte WhatsApp-Nummer ändern.
  whatsapp: '4977219447915',
  whatsappText: 'Hallo AHAD Cleaning, ich interessiere mich für ein Angebot zur Gebäudereinigung.',
} as const;

/** Fertiger WhatsApp-Deeplink mit vorbefülltem Text. */
export const WHATSAPP_HREF = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(SITE.whatsappText)}`;

/**
 * Vertriebsversprechen — überall identisch kommuniziert.
 * WICHTIG: Diese Zusagen stehen öffentlich auf der Website und müssen
 * operativ abgesichert sein (Erreichbarkeit, Besichtigungskapazität,
 * Angebotsdurchlaufzeit), sonst kippt das Vertrauensargument.
 */
export const PROMISES = [
  { value: '24h', label: 'Reaktionszeit garantiert' },
  { value: '48h', label: 'bis zur Objektbesichtigung' },
  { value: '100%', label: 'dokumentierte Qualität' },
] as const;

export const STATS = [
  { value: 80, suffix: '+', label: 'Qualifizierte Mitarbeitende' },
  { value: 15, suffix: '+', label: 'Jahre Erfahrung' },
  { value: 7, suffix: '', label: 'Leistungsbereiche aus einer Hand' },
  { value: 3, suffix: '', label: 'Standorte in Süddeutschland' },
] as const;

export interface ClientReference {
  name: string;
  domain: string;
  logoUrl?: string;
}

export const CLIENT_REFERENCES: ClientReference[] = [
  { name: 'Allianz', domain: 'allianz.de' },
  { name: 'GOLDBECK', domain: 'goldbeck.de' },
  { name: 'Bundesagentur für Arbeit', domain: 'arbeitsagentur.de' },
  { name: 'Bareiss', domain: 'bareiss.com' },
  { name: 'BDT', domain: 'bdt.de' },
  { name: 'Köster', domain: 'koester-bau.de' },
  { name: 'Aesthetify by Dr. Rick & Dr. Nick', domain: 'aesthetify.de' },
  { name: 'Käppelehof', domain: 'kaeppelehof.de' },
  { name: 'Kur- und Bäder GmbH Bad Dürrheim', domain: 'badduerrheim.de' },
  {
    name: 'naturenergie netze',
    domain: 'naturenergie-netze.de',
    logoUrl: 'https://www.naturenergie-netze.de/typo3conf/ext/sitecore/Resources/Public/img/naturenergie_netze-logo.svg',
  },
  {
    name: 'Schwarzwald-Baar-Kreis',
    domain: 'schwarzwald-baar-kreis.de',
    logoUrl: 'https://www.lrasbk.de/media/custom/2944_1_1_m.png',
  },
  {
    name: 'Südwest Messe',
    domain: 'suedwest-messe.de',
    logoUrl: 'https://www.suedwest-messe.de/fileadmin/data/sites/suedwest-messe-vs.de/Logo/suedwestmessevs_logo.png',
  },
];

/**
 * Das AHAD-Versprechen — benannte Risikoumkehr mit „Zähnen".
 * Bewusst nur Zusagen, die operativ haltbar sind (Nachbesserung,
 * Festpreis, faire Laufzeit, Reaktionszeit). Keine erfundenen Werte.
 */
export const GUARANTEES = [
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

/**
 * Belegbare Eckwerte (operative Zusagen, keine fabrizierten Statistiken).
 * Sobald echte Kennzahlen vorliegen (z. B. gemessene SLA-Quote), hier
 * ergänzen — bis dahin nur, wofür AHAD vertraglich einsteht.
 */
export const PROOF_POINTS = [
  { value: '24 h', label: 'Reaktionszeit', sub: 'vertraglich zugesichert' },
  { value: '48 h', label: 'bis Objektbesichtigung', sub: 'in der Regel vor Ort' },
  { value: '1', label: 'feste Objektleitung', sub: 'pro Objekt, mit Gesicht' },
  { value: '100 %', label: 'dokumentierte Leistung', sub: 'auditfähig nachweisbar' },
] as const;

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

export const TESTIMONIALS = [
  {
    quote:
      'Seit der Umstellung auf AHAD haben wir keine einzige Reklamation mehr eskalieren müssen. Die Objektleitung meldet sich, bevor wir es tun.',
    name: 'Facility Management',
    company: 'Industrieunternehmen, Schwarzwald-Baar-Kreis',
  },
  {
    quote:
      'Die Übernahme im laufenden Betrieb war geräuschlos. Nach zwei Wochen lief alles dokumentiert und planbar — genau das hatten wir gesucht.',
    name: 'Standortleitung',
    company: 'Produktionsbetrieb, Region Stuttgart',
  },
  {
    quote:
      'Audit-Nachweise auf Knopfdruck statt Zettelwirtschaft. Für unsere ISO-Zertifizierung ist AHAD ein echter Vorteil geworden.',
    name: 'QM-Beauftragte',
    company: 'Medizintechnik, Bodenseeregion',
  },
] as const;

/**
 * Echte Kundenbewertungen (z. B. von Google).
 * LEER lassen, bis verifizierte Bewertungen vorliegen — dann hier eintragen.
 * Solange leer, wird KEIN AggregateRating-Schema ausgegeben (fake Markup
 * ist gegen Google-Richtlinien und rechtlich riskant).
 */
export interface Review {
  author: string;
  role?: string;
  rating: number; // 1–5
  date: string; // ISO, z. B. '2026-05-01'
  text: string;
}

export const REVIEWS: Review[] = [];

/** Quelle/Profil-Link für „alle Bewertungen ansehen" (z. B. Google-Profil). */
export const REVIEWS_SOURCE_URL = '';

/** Baut das Review/AggregateRating-Schema — nur wenn echte Reviews da sind. */
export function reviewSchema() {
  if (REVIEWS.length === 0) return null;
  const ratingValue = (REVIEWS.reduce((s, r) => s + r.rating, 0) / REVIEWS.length).toFixed(1);
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE.url}/#organization`,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue,
      reviewCount: REVIEWS.length,
      bestRating: 5,
      worstRating: 1,
    },
    review: REVIEWS.map((r) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.author },
      datePublished: r.date,
      reviewRating: { '@type': 'Rating', ratingValue: r.rating, bestRating: 5, worstRating: 1 },
      reviewBody: r.text,
    })),
  };
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

export const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'LocalBusiness'],
  '@id': `${SITE.url}/#organization`,
  name: SITE.legalName,
  url: SITE.url,
  logo: `${SITE.url}/logo.png`,
  image: `${SITE.url}/og-image.jpg`,
  description:
    'Gebäudereinigung, Industriereinigung und Unterhaltsreinigung für Unternehmen in Villingen-Schwenningen, Stuttgart, Konstanz und Süddeutschland.',
  telephone: '+49-7721-9447915',
  email: SITE.email,
  priceRange: '€€',
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:00',
    closes: '17:00',
  },
  areaServed: [
    { '@type': 'City', name: 'Villingen-Schwenningen' },
    { '@type': 'City', name: 'Stuttgart' },
    { '@type': 'City', name: 'Konstanz' },
    { '@type': 'AdministrativeArea', name: 'Schwarzwald-Baar-Kreis' },
    { '@type': 'AdministrativeArea', name: 'Baden-Württemberg' },
  ],
  geo: { '@type': 'GeoCoordinates', latitude: 48.0626, longitude: 8.4937 },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+49-7721-9447915',
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
  sameAs: [SITE.social.instagram, SITE.social.linkedin],
};
