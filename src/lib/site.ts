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
  // WhatsApp Business — Sofortkanal. Nummer im internationalen Format
  // ohne Sonderzeichen (+49 176 20422494 → 4917620422494).
  whatsapp: '4917620422494',
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
  { value: 8, suffix: '', label: 'Leistungsbereiche aus einer Hand' },
  { value: 3, suffix: '', label: 'Standorte in Süddeutschland' },
] as const;

/**
 * Öffentliche Google-Bewertung — nur zur Anzeige + Verlinkung. KEIN
 * self-serving AggregateRating-JSON-LD ohne On-Page-Reviews (Google-Policy).
 * `url` = euer Google-Unternehmensprofil (bitte exakt eintragen).
 */
export const GOOGLE_RATING = {
  value: 4.8,
  count: 20,
  url: '',
  searchFallback:
    'https://www.google.com/maps/search/AHAD+Cleaning+Company+GmbH+Villingen-Schwenningen',
} as const;

/**
 * Vertrauenssignale fürs Trust-Band unter dem Hero. NUR belegbare Aussagen —
 * Zertifikate erst freischalten, wenn nachweislich vorhanden (Abmahnrisiko).
 * `icon` ist ein Schlüssel, der in TrustBand.tsx auf ein Symbol gemappt wird.
 */
export const TRUST_BADGES = [
  { icon: 'badge', label: 'ISO 9001 & 14001 zertifiziert', sub: 'Qualitäts- & Umweltmanagement' },
  { icon: 'users', label: 'Nur festangestellte Teams', sub: 'sozialversichert & sicherheitsüberprüft' },
  { icon: 'shield', label: 'Umfassend versichert', sub: 'Betriebshaftpflicht' },
  { icon: 'clock', label: '15+ Jahre Erfahrung', sub: 'über 80 Objekte betreut' },
  { icon: 'user', label: 'Feste Objektleitung', sub: 'ein Gesicht je Objekt' },
] as const;

export interface ClientReference {
  name: string;
  domain: string;
  /** Lokaler Pfad zum freigegebenen Logo, z. B. '/images/clients/goldbeck.svg'.
   *  Wenn gesetzt, zeigt das Referenz-Band das Logo statt der Wortmarke. */
  logo?: string;
  /** @deprecated Externe Hotlinks vermeiden — Logos lokal unter logo ablegen. */
  logoUrl?: string;
}

export const CLIENT_REFERENCES: ClientReference[] = [
  { name: 'Allianz', domain: 'allianz.de', logo: '/images/clients/allianz.svg' },
  { name: 'GOLDBECK', domain: 'goldbeck.de', logo: '/images/clients/goldbeck.svg' },
  { name: 'Bundesagentur für Arbeit', domain: 'arbeitsagentur.de', logo: '/images/clients/bundesagentur-fuer-arbeit.png' },
  { name: 'Bareiss', domain: 'bareiss.com', logo: '/images/clients/bareiss.png' },
  { name: 'BDT', domain: 'bdt.de', logo: '/images/clients/bdt.svg' },
  { name: 'Köster', domain: 'koester-bau.de', logo: '/images/clients/koester.png' },
  { name: 'Aesthetify by Dr. Rick & Dr. Nick', domain: 'aesthetify.de', logo: '/images/clients/aesthetify.svg' },
  { name: 'Käppelehof', domain: 'kaeppelehof.de', logo: '/images/clients/kaeppelehof.png' },
  { name: 'Kur- und Bäder GmbH Bad Dürrheim', domain: 'badduerrheim.de', logo: '/images/clients/kur-baeder-bad-duerrheim.png' },
  { name: 'naturenergie netze', domain: 'naturenergie-netze.de', logo: '/images/clients/naturenergie-netze.svg' },
  // Kein freigegebenes Logo vorhanden -> faellt automatisch auf die Wortmarke zurueck.
  { name: 'Schwarzwald-Baar-Kreis', domain: 'schwarzwald-baar-kreis.de' },
  { name: 'Südwest Messe', domain: 'suedwest-messe.de', logo: '/images/clients/suedwest-messe.png' },
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
export const REVIEWS: Review[] = [
  {
    author: 'Matthias Porsche',
    role: 'Rottweil',
    rating: 5,
    text:
      'Vom ersten Telefonat, über die Vorbesichtigung, die Angebotserstellung und Beauftragung bis hin zur Ausführung: sehr freundlich, vertrauenserweckend, kompetent, professionell, zuverlässig — mit einem erstklassigen, meine Erwartungen übersteigenden Reinigungsergebnis zu einem angemessenen Preis. Da ich am Tag der Reinigung nicht anwesend war, schickte man mir nach Beendigung der Arbeiten ein ausführliches Video vom Ergebnis. Eine nette, vertrauenserweckende Geste! Diesem Unternehmen würde ich mich jederzeit wieder anvertrauen und werde es weiterempfehlen.',
  },
  {
    author: 'Marvin Krüger',
    rating: 5,
    text: 'Kann ich nur empfehlen! Toller Service — sehr freundliche und kompetente Kommunikation. Besser geht es eigentlich nicht mehr.',
  },
  {
    author: 'Annelene Dethlefsen',
    rating: 5,
    text:
      'Tolle Dienstleistung: Fenster und Rahmen von innen und außen inkl. Carport-Überdachung — alles super sauber. Vielen Dank an das Reinigungsteam.',
  },
  {
    author: 'Inge Hauser',
    rating: 5,
    text:
      'Bin mega zufrieden, und der Mann, der unsere Fenster gereinigt hat, war so sympathisch, lieb und nett. Wir waren begeistert! Wir werden im Frühjahr den nächsten Auftrag an Sie weitergeben.',
  },
  {
    author: 'Karl-Heinz Maaß',
    rating: 5,
    text:
      'Sehr angenehmer Chef, die erste Reinigungsfirma mit Ambiente und positiver Stimmung vom ganzen Team — gut gelaunt und sehr ansprechendes Büro. 6 von 5 Sternen! 👍',
  },
];

/** Quelle/Profil-Link für „alle Bewertungen ansehen" — Google-Unternehmensprofil. */
export const REVIEWS_SOURCE_URL = GOOGLE_RATING.url || GOOGLE_RATING.searchFallback;

/**
 * Review/AggregateRating-Schema. Aggregat = ECHTE Google-Gesamtwertung
 * (GOOGLE_RATING 4,8 / 20), nicht der Schnitt der gezeigten Auswahl —
 * die Reviews sind eine repräsentative Stichprobe. Nur wenn Reviews da sind.
 */
export function reviewSchema() {
  if (REVIEWS.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE.url}/#organization`,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: GOOGLE_RATING.value,
      reviewCount: GOOGLE_RATING.count,
      bestRating: 5,
      worstRating: 1,
    },
    review: REVIEWS.map((r) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.author },
      ...(r.date ? { datePublished: r.date } : {}),
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
  '@type': ['Organization', 'LocalBusiness'],
  '@id': `${SITE.url}/#organization`,
  name: SITE.legalName,
  url: SITE.url,
  logo: `${SITE.url}/logo.png`,
  image: `${SITE.url}/og-image.jpg`,
  description:
    'Gebäudereinigung, Industriereinigung und Unterhaltsreinigung für Unternehmen in Villingen-Schwenningen, Stuttgart, Konstanz und Süddeutschland.',
  telephone: SITE.phone,
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
  hasCredential: [
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'ISO 9001',
      credentialCategory: 'Qualitätsmanagement (Zertifizierung)',
    },
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'ISO 14001',
      credentialCategory: 'Umweltmanagement (Zertifizierung)',
    },
  ],
  sameAs: [SITE.social.instagram, SITE.social.linkedin],
};
