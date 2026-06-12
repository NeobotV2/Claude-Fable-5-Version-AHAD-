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
} as const;

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
  { value: 80, suffix: '+', label: 'Betreute Objekte' },
  { value: 15, suffix: '+', label: 'Jahre Erfahrung' },
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
