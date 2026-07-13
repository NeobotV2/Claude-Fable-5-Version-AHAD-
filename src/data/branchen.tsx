import { Factory, Microscope, Building2, Warehouse, ConciergeBell } from 'lucide-react';
import { IMG } from '@/lib/images';
import type { FAQItem } from '@/components/ui/Accordion';
import type { ReactNode } from 'react';

export interface BrancheData {
  slug: string;
  path: string;
  name: string;
  claim: string;
  heroTitle: string;
  heroLead: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string;
  icon: ReactNode;
  image: string;
  /** Typische Schmerzpunkte der Branche — Problem zuerst, dann die Lösung. */
  pains: { title: string; text: string }[];
  solutions: string[];
  services: { name: string; path: string }[];
  faqs: FAQItem[];
}

export const BRANCHEN: BrancheData[] = [
  {
    slug: 'industrie-produktion',
    path: '/branchen/industrie-produktion',
    name: 'Industrie & Produktion',
    claim: 'Störungsfrei im Schichtbetrieb',
    heroTitle: 'Reinigung, die Ihre Produktion respektiert',
    heroLead:
      'Schichtpläne, Taktzeiten, Arbeitssicherheit: Wir integrieren Reinigung so in Ihren Betrieb, dass nichts stillsteht — mit festen Teams, klaren Eskalationswegen und auditfähiger Dokumentation.',
    seoTitle: 'Gebäudereinigung für Industrie & Produktion | AHAD Cleaning',
    seoDescription:
      'Industriereinigung im laufenden Betrieb: schichtintegriert, UVV-konform, auditfähig dokumentiert. Für Produktionsbetriebe in Süddeutschland.',
    keywords: 'Reinigung Industrie, Produktionsreinigung, Hallenreinigung, Industriereinigung Schichtbetrieb',
    icon: <Factory className="w-6 h-6" />,
    image: IMG.brancheIndustrie,
    pains: [
      {
        title: 'Reinigung stört die Produktion',
        text: 'Standard-Dienstleister arbeiten nach eigenem Plan — und stehen dann mitten in Ihrer Schicht im Weg.',
      },
      {
        title: 'Sicherheitsauflagen werden unterschätzt',
        text: 'Unterweisungen fehlen, PSA sitzt nicht, im Audit fehlen die Nachweise — das Risiko liegt bei Ihnen.',
      },
      {
        title: 'Qualität schwankt mit dem Personal',
        text: 'Ständig wechselnde Kräfte kennen weder Anlagen noch Abläufe und müssen immer neu eingewiesen werden.',
      },
    ],
    solutions: [
      'Schichtbegleitende Reinigung in abgestimmten Fenstern',
      'Feste, sicherheitsunterwiesene Teams je Objekt',
      'Maschinen- & Anlagenreinigung nach Herstellervorgabe',
      'Dokumentierte Unterweisungen & UVV-Konformität',
      'Eskalationswege mit fester Objektleitung',
      'Auditfähige Leistungsnachweise auf Knopfdruck',
    ],
    services: [
      { name: 'Industrie- & Produktionsreinigung', path: '/leistungen/industrie-produktionsreinigung' },
      { name: 'Unterhaltsreinigung', path: '/leistungen/unterhaltsreinigung' },
      { name: 'Sonderreinigung & Stillstand', path: '/leistungen/sonderreinigung-stillstandsservice' },
    ],
    faqs: [
      {
        question: 'Wie stimmen Sie sich mit unserer Produktionsplanung ab?',
        answer:
          'Ihre AHAD-Objektleitung plant Reinigungsfenster gemeinsam mit Ihrer Schicht- oder Produktionsleitung — wöchentlich oder nach Bedarf. Änderungen fließen direkt in die Einsatzplanung ein.',
      },
      {
        question: 'Sind Ihre Mitarbeitenden für Industrieumgebungen geschult?',
        answer:
          'Ja. Alle Kräfte erhalten dokumentierte Sicherheitsunterweisungen, tragen vorgeschriebene PSA und werden objektspezifisch eingearbeitet — inklusive Verhaltensregeln an Maschinen und Anlagen.',
      },
    ],
  },
  {
    slug: 'medizintechnik',
    path: '/branchen/medizintechnik',
    name: 'Medizintechnik',
    claim: 'Auditnah & dokumentiert',
    heroTitle: 'Hygiene-Standards, die Audits bestehen',
    heroLead:
      'In der Medizintechnik entscheidet dokumentierte Sauberkeit über Zertifikate und Kundenvertrauen. Wir liefern auditnahe Reinigung nach Ihren SOPs — mit festem, geschultem Personal.',
    seoTitle: 'Reinigung für Medizintechnik-Unternehmen | AHAD Cleaning',
    seoDescription:
      'Auditfähige Reinigung für Medizintechnik und sensible Produktionsbereiche: ISO-konform, nach SOP, lückenlos dokumentiert. Süddeutschland.',
    keywords: 'Reinigung Medizintechnik, Reinraumreinigung, ISO 13485 Reinigung, Hygienereinigung',
    icon: <Microscope className="w-6 h-6" />,
    image: IMG.brancheMedizin,
    pains: [
      {
        title: 'Audits decken Lücken auf',
        text: 'Fehlende Reinigungsnachweise werden im Zertifizierungsaudit schnell zur Abweichung mit Folgekosten.',
      },
      {
        title: 'SOPs werden ignoriert',
        text: 'Standard-Reinigungskräfte kennen weder Hygieneschleusen noch Verhaltensregeln in sensiblen Zonen.',
      },
      {
        title: 'Personalwechsel ohne Einweisung',
        text: 'Jede neue, nicht eingewiesene Kraft ist in sensiblen Bereichen ein unkalkulierbares Risiko.',
      },
    ],
    solutions: [
      'Reinigung strikt nach Ihren SOPs & Hygieneplänen',
      'Festes, hygienegeschultes Stammpersonal',
      'Dokumentierte Einweisungen & Schulungsnachweise',
      'Freigegebene Reinigungsmittel & Verfahren',
      'Lückenlose Leistungsdokumentation je Zone',
      'Audit-Begleitung durch Ihre Objektleitung',
    ],
    services: [
      { name: 'Medizintechnik & Reinraum', path: '/leistungen/medizintechnik-reinigung' },
      { name: 'Unterhaltsreinigung', path: '/leistungen/unterhaltsreinigung' },
      { name: 'Glas- & Fassadenreinigung', path: '/leistungen/glas-fassadenreinigung' },
    ],
    faqs: [
      {
        question: 'Unterstützen Sie uns bei ISO-Audits?',
        answer:
          'Ja. Alle Leistungen, Schulungen und Kontrollen sind lückenlos dokumentiert und jederzeit abrufbar. Auf Wunsch nimmt Ihre AHAD-Objektleitung persönlich am Audit teil und beantwortet Fragen der Auditoren.',
      },
      {
        question: 'Wie gehen Sie mit unseren Hygienezonen um?',
        answer:
          'Wir übernehmen Ihre Zonenlogik in unsere Reinigungspläne: getrennte Ausrüstung je Zone, definierte Wege, dokumentierte Schleusenprozesse — exakt nach Ihren Vorgaben.',
      },
    ],
  },
  {
    slug: 'buero-verwaltung',
    path: '/branchen/buero-verwaltung',
    name: 'Büro & Verwaltung',
    claim: 'Repräsentativ, jeden Tag',
    heroTitle: 'Büros, die jeden Tag einen guten Eindruck machen',
    heroLead:
      'Empfang, Meetingräume, Arbeitsplätze, Sanitär: Wir halten Ihre Verwaltung verlässlich repräsentativ — ohne dass sich intern jemand darum kümmern muss.',
    seoTitle: 'Büroreinigung & Verwaltungsgebäude | AHAD Cleaning',
    seoDescription:
      'Zuverlässige Büroreinigung für Unternehmen und Verwaltungen: feste Teams, planbare Qualität, digitale Nachweise. Villingen-Schwenningen, Stuttgart, Konstanz.',
    keywords: 'Büroreinigung, Reinigung Verwaltung, Unterhaltsreinigung Büro, Reinigungsfirma Büro Stuttgart',
    icon: <Building2 className="w-6 h-6" />,
    image: IMG.brancheBuero,
    pains: [
      {
        title: 'Beschwerden landen bei Ihnen',
        text: 'Volle Papierkörbe, fleckige Tische — und Ihre Mitarbeitenden beschweren sich beim Office-Management.',
      },
      {
        title: 'Niemand fühlt sich zuständig',
        text: 'Beim Dienstleister wechseln Ansprechpartner und Ausreden — nur das Problem bleibt.',
      },
      {
        title: 'Qualität ist Glückssache',
        text: 'Mal top, mal schlampig: Ohne Kontrollen und Nachweise bleibt Reinigung ein Blindflug.',
      },
    ],
    solutions: [
      'Feste Reinigungsteams mit Objektleitung',
      'Reinigungszeiten passend zu Ihren Bürozeiten',
      'Empfang & Meetingräume mit Prioritätenlogik',
      'Sanitär-Hygiene mit definierten Standards',
      'Digitale Checklisten & Qualitätsreports',
      'Klare Zuständigkeit bei jedem Anliegen',
    ],
    services: [
      { name: 'Unterhaltsreinigung', path: '/leistungen/unterhaltsreinigung' },
      { name: 'Glas- & Fassadenreinigung', path: '/leistungen/glas-fassadenreinigung' },
      { name: 'Sonderreinigung', path: '/leistungen/sonderreinigung-stillstandsservice' },
    ],
    faqs: [
      {
        question: 'Reinigen Sie vor oder nach unseren Bürozeiten?',
        answer:
          'Wie es für Sie passt: früh morgens, abends oder tagsüber in gering frequentierten Zeiten. Gemeinsam definieren wir Zeitfenster, die Ihren Betrieb nicht stören.',
      },
      {
        question: 'Wie schnell reagieren Sie auf Sonderwünsche?',
        answer:
          'Ihre Objektleitung klärt den Bedarf und stimmt die nächsten Schritte mit Ihnen ab — ob Zusatzreinigung nach einem Event oder Änderung der Intervalle.',
      },
    ],
  },
  {
    slug: 'gewerbeobjekte',
    path: '/branchen/gewerbeobjekte',
    name: 'Gewerbeobjekte',
    claim: 'Großflächen im Griff',
    heroTitle: 'Gewerbeflächen sauber und verkehrssicher betreiben',
    heroLead:
      'Logistikhallen, Handelsflächen, Mischobjekte: Wir betreuen großflächige Gewerbeimmobilien wirtschaftlich — von der Routine bis zum Winterdienst, alles aus einer Hand.',
    seoTitle: 'Reinigung für Gewerbeobjekte & Logistik | AHAD Cleaning',
    seoDescription:
      'Professionelle Reinigung für Gewerbeimmobilien, Logistik- und Handelsflächen: wirtschaftlich, zuverlässig, mit Objektbetreuung aus einer Hand.',
    keywords: 'Reinigung Gewerbe, Hallenreinigung Logistik, Gewerbeimmobilien Reinigung, Objektbetreuung',
    icon: <Warehouse className="w-6 h-6" />,
    image: IMG.brancheGewerbe,
    pains: [
      {
        title: 'Viele Dienstleister, viel Koordination',
        text: 'Reinigung, Winterdienst, Hausmeister — drei Verträge, drei Ansprechpartner, dreifacher Aufwand.',
      },
      {
        title: 'Großflächen sprengen das Budget',
        text: 'Ohne effiziente Maschinen- und Intervalllogik werden große Flächen unnötig teuer.',
      },
      {
        title: 'Verkehrssicherung wird zum Risiko',
        text: 'Ungeräumte Wege oder fehlende Nachweise können im Schadensfall richtig teuer werden.',
      },
    ],
    solutions: [
      'Objektbetreuung aus einer Hand — ein Vertrag',
      'Maschinelle Reinigung für Großflächen',
      'Intervalle nach Frequenz & Nutzung',
      'Winterdienst mit dokumentierter Verkehrssicherung',
      'Hausmeisterservice & Kontrollgänge',
      'Transparente Kosten je Fläche',
    ],
    services: [
      { name: 'Unterhaltsreinigung', path: '/leistungen/unterhaltsreinigung' },
      { name: 'Winterdienst & Hausmeister', path: '/leistungen/winterdienst-hausmeisterservice' },
      { name: 'Industrie- & Produktionsreinigung', path: '/leistungen/industrie-produktionsreinigung' },
    ],
    faqs: [
      {
        question: 'Können Sie mehrere Standorte gleichzeitig betreuen?',
        answer:
          'Ja. Wir betreuen Portfolios mit mehreren Objekten in ganz Süddeutschland — mit einheitlichen Standards, zentraler Ansprechperson und konsolidierter Abrechnung.',
      },
      {
        question: 'Lohnt sich maschinelle Reinigung für unsere Flächen?',
        answer:
          'Bei großen Hart- und Industrieböden fast immer: Aufsitz- und Scheuersaugmaschinen senken die Kosten pro Quadratmeter deutlich. Wir kalkulieren beide Varianten transparent für Sie.',
      },
    ],
  },
  {
    slug: 'hotellerie-objektbetrieb',
    path: '/branchen/hotellerie-objektbetrieb',
    name: 'Hotellerie & Objektbetrieb',
    claim: 'Gastgeberqualität sichern',
    heroTitle: 'Sauberkeit, die Ihre Gäste spüren — und bewerten',
    heroLead:
      'In Hotellerie und Objektbetrieb ist Sauberkeit Teil des Produkts. Wir liefern Housekeeping-Unterstützung und Objektreinigung in konstanter Qualität — auch bei Personalspitzen.',
    seoTitle: 'Reinigung für Hotellerie & Objektbetrieb | AHAD Cleaning',
    seoDescription:
      'Professionelle Reinigung für Hotels, Kur- und Freizeitbetriebe: Housekeeping-Support, öffentliche Bereiche, Wellness. Konstante Qualität, flexible Kapazität.',
    keywords: 'Hotelreinigung, Housekeeping Dienstleister, Reinigung Hotellerie, Wellnessbereich Reinigung',
    icon: <ConciergeBell className="w-6 h-6" />,
    image: IMG.brancheHotel,
    pains: [
      {
        title: 'Personalmangel im Housekeeping',
        text: 'Offene Stellen und Krankheitswellen gefährden Check-in-Zeiten und Gästezufriedenheit.',
      },
      {
        title: 'Schwankende Auslastung',
        text: 'Messen, Saison, Events: Starre Personalmodelle passen nie zur realen Belegung.',
      },
      {
        title: 'Eine schlechte Bewertung kostet',
        text: 'Ein Haar im Bad reicht — und die Online-Bewertung beschädigt Ihr Geschäft nachhaltig.',
      },
    ],
    solutions: [
      'Housekeeping-Unterstützung mit eingespielten Teams',
      'Flexible Kapazität nach Belegung & Saison',
      'Öffentliche Bereiche, Wellness & Gastronomie',
      'Qualitätskontrollen nach Hotelstandard',
      'Diskretes, geschultes Personal',
      'Kurzfristige Verstärkung bei Spitzen',
    ],
    services: [
      { name: 'Unterhaltsreinigung', path: '/leistungen/unterhaltsreinigung' },
      { name: 'Sonderreinigung', path: '/leistungen/sonderreinigung-stillstandsservice' },
      { name: 'Glas- & Fassadenreinigung', path: '/leistungen/glas-fassadenreinigung' },
    ],
    faqs: [
      {
        question: 'Können Sie kurzfristig bei Belegungsspitzen unterstützen?',
        answer:
          'Ja — genau dafür sind wir aufgestellt. Mit unserem Personalpool verstärken wir Ihr Housekeeping kurzfristig, eingearbeitet nach Ihren Standards und Abläufen.',
      },
      {
        question: 'Arbeiten Ihre Teams nach unseren Hotelstandards?',
        answer:
          'Selbstverständlich. Wir übernehmen Ihre Zimmer- und Reinigungsstandards in unsere Checklisten und sichern sie über eigene Qualitätskontrollen — konstant, auch bei Personalwechsel.',
      },
    ],
  },
];

export const getBranche = (slug: string) => BRANCHEN.find((b) => b.slug === slug)!;
