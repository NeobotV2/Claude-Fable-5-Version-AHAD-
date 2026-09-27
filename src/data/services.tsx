import {
  LayoutDashboard,
  Factory,
  Building2,
  HardHat,
  Microscope,
  Sparkles,
  Snowflake,
  Wind,
  Flame,
  Droplets,
  Shield,
  ClipboardCheck,
  Clock,
  Users,
  FileCheck2,
  Gauge,
  BadgeCheck,
  AlarmClockCheck,
} from 'lucide-react';
import { IMG } from '@/lib/images';
import type { FAQItem } from '@/components/ui/Accordion';
import type { ReactNode } from 'react';

export interface ServiceHighlight {
  icon: ReactNode;
  title: string;
  text: string;
}

export interface ServiceData {
  slug: string;
  /** Zeigt auf der Detailseite einen Telefon-zuerst-Banner für kurzfristige Einsätze. */
  expressBanner?: boolean;
  path: string;
  name: string;
  tag: string;
  /** Ein-Zeilen-Teaser für kompakte Karten (Startseite, Menüs). */
  short: string;
  heroTitle: string;
  heroLead: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string;
  icon: ReactNode;
  image: string;
  detailImage: string;
  highlights: ServiceHighlight[];
  scopeTitle: string;
  scopeIntro: string;
  scope: string[];
  faqs: FAQItem[];
  ctaTitle: string;
  ctaLead: string;
}

export const SERVICES: ServiceData[] = [
  {
    slug: 'unterhaltsreinigung',
    short: 'Büros & Objekte nach festem Plan',
    path: '/leistungen/unterhaltsreinigung',
    name: 'Unterhaltsreinigung',
    tag: 'Laufende Reinigung',
    heroTitle: 'Unterhaltsreinigung für Büros, Verwaltung und Gewerbe',
    heroLead:
      'Wir reinigen Ihre Räume in festen Intervallen: mit eingespieltem Team, eigener Objektleitung und dokumentierten Kontrollen. Intern muss sich niemand darum kümmern.',
    seoTitle: 'Unterhaltsreinigung für Unternehmen | AHAD Cleaning',
    seoDescription:
      'Unterhaltsreinigung für Büros, Verwaltungen und Gewerbe in Süddeutschland. Klare Zuständigkeiten, dokumentierte Qualitätskontrolle. Jetzt Besichtigung anfragen.',
    keywords: 'Unterhaltsreinigung Unternehmen, Büroreinigung, Gebäudereinigung Villingen-Schwenningen, Reinigungsfirma Büro',
    icon: <LayoutDashboard className="w-6 h-6" />,
    image: IMG.unterhaltsreinigung,
    detailImage: IMG.unterhaltDetail,
    highlights: [
      {
        icon: <Users className="w-7 h-7 text-brand" />,
        title: 'Feste Teams & Objektleitung',
        text: 'Eingespielte Reinigungsteams und eine feste Objektleitung, die Ihr Objekt kennt.',
      },
      {
        icon: <ClipboardCheck className="w-7 h-7 text-accent" />,
        title: 'Digitale Qualitätskontrolle',
        text: 'Checklisten, Kontrollen und Reports dokumentieren wir digital. Sie sehen, was erledigt wurde.',
      },
      {
        icon: <AlarmClockCheck className="w-7 h-7 text-brand" />,
        title: 'Intervalle nach Nutzung',
        text: 'Wir legen die Reinigungspläne danach fest, wie Ihre Flächen tatsächlich genutzt werden.',
      },
    ],
    scopeTitle: 'Was wir regelmäßig reinigen',
    scopeIntro:
      'Empfang, Büros, Besprechungsräume und Sanitärbereiche: Für jeden Bereich legen wir Standard und Intervall fest und weisen nach, dass beides eingehalten wird.',
    scope: [
      'Reinigungspläne & Leistungsverzeichnisse für Ihr Objekt',
      'Büro-, Empfangs- und Besprechungsbereiche',
      'Sanitär- und Sozialräume mit Hygienestandard',
      'Treppenhäuser, Verkehrsflächen & Aufzüge',
      'Versorgung mit Verbrauchsmaterial auf Wunsch',
      'Digitale Leistungsnachweise & Reports',
    ],
    faqs: [
      {
        question: 'Wie werden die Reinigungsintervalle festgelegt?',
        answer:
          'Nach einer Begehung vor Ort legen wir Intervalle und Leistungsverzeichnis danach fest, wie Ihre Flächen tatsächlich genutzt werden. Sie bezahlen nur die Leistung, die gebraucht wird.',
      },
      {
        question: 'Was passiert bei Reklamationen?',
        answer:
          'Ihre Objektleitung nimmt die Meldung auf, klärt die Zuständigkeit und dokumentiert die vereinbarte Nachbesserung.',
      },
      {
        question: 'Können Sie unser bestehendes Reinigungsteam übernehmen?',
        answer:
          'Ja. Bei einem Anbieterwechsel prüfen wir die Übernahme bestehender Kräfte nach § 613a BGB und arbeiten sie in unser Qualitätssystem ein. Ihr Betrieb läuft dabei normal weiter.',
      },
    ],
    ctaTitle: 'Unterhaltsreinigung anfragen',
    ctaLead: 'Wir besichtigen Ihr Objekt zu einem abgestimmten Termin. Danach erhalten Sie unser Angebot.',
  },
  {
    slug: 'industrie-produktionsreinigung',
    short: 'Reinigung im laufenden Betrieb',
    path: '/leistungen/industrie-produktionsreinigung',
    name: 'Industrie- & Produktionsreinigung',
    tag: 'Schichtbetrieb',
    heroTitle: 'Industriereinigung ohne Produktionsstillstand',
    heroLead:
      'Wir reinigen nach Ihrem Schichtplan: UVV-konform, auditfähig dokumentiert und mit festen Eskalationswegen. Ihre Produktion läuft weiter, während wir arbeiten.',
    seoTitle: 'Industrie- & Produktionsreinigung | AHAD Cleaning',
    seoDescription:
      'Industriereinigung im laufenden Betrieb: Maschinen- und Anlagenreinigung, Hallenreinigung, schichtbegleitende Ausführung. UVV-konform & auditfähig.',
    keywords: 'Industriereinigung, Produktionsreinigung, Maschinenreinigung, Hallenreinigung, Industriereinigung Stuttgart',
    icon: <Factory className="w-6 h-6" />,
    image: IMG.industrie,
    detailImage: IMG.industrieDetail,
    highlights: [
      {
        icon: <Gauge className="w-7 h-7 text-brand" />,
        title: 'Keine Prozessstörung',
        text: 'Schichtbegleitende Reinigung mit klarer Abstimmung auf Ihre Produktionsfenster und Taktzeiten.',
      },
      {
        icon: <Shield className="w-7 h-7 text-accent" />,
        title: 'UVV & Arbeitssicherheit',
        text: 'Geschultes Personal, dokumentierte Unterweisungen und Einhaltung der geltenden Sicherheitsvorschriften.',
      },
      {
        icon: <FileCheck2 className="w-7 h-7 text-brand" />,
        title: '100% auditfähig',
        text: 'Wir dokumentieren jede Leistung, damit Sie die Nachweise in Kunden- und Zertifizierungsaudits vorlegen können.',
      },
    ],
    scopeTitle: 'Reinigung in Produktion und Logistik',
    scopeIntro:
      'Produktionshallen, Maschinen, Anlagen und Logistikflächen reinigen wir mit Verfahren, die zum Material und zu Ihrem Prozess passen.',
    scope: [
      'Maschinen- & Anlagenreinigung nach Herstellervorgaben',
      'Hallenböden: Kehren, Schrubben, Entfetten',
      'Schichtbegleitende & Stillstandsreinigung',
      'Späne-, Öl- und Emulsionsmanagement',
      'Hochdruck- und Spezialverfahren',
      'Dokumentation für Audits & Zertifizierungen',
    ],
    faqs: [
      {
        question: 'Reinigen Sie im laufenden Betrieb?',
        answer:
          'Ja. Unsere Teams richten sich nach Ihren Schicht- und Betriebszeiten und arbeiten in produktionsfreien Fenstern oder parallel in abgegrenzten Bereichen, ohne Ihre Abläufe zu stören.',
      },
      {
        question: 'Wie stellen Sie Arbeitssicherheit sicher?',
        answer:
          'Alle Mitarbeitenden sind sicherheitsunterwiesen, mit PSA ausgestattet und für die jeweiligen Anlagen geschult. Unterweisungen und Befähigungen dokumentieren wir. Auf Wunsch erhalten Sie alle Nachweise.',
      },
      {
        question: 'Übernehmen Sie auch einmalige Grundreinigungen?',
        answer:
          'Ja, etwa nach Umbauten, vor Audits oder im geplanten Stillstand. Wir kalkulieren nach Aufwand und machen Ihnen ein verbindliches Festpreisangebot.',
      },
    ],
    ctaTitle: 'Reinigung im Schichtbetrieb besprechen',
    ctaLead: 'Im persönlichen Gespräch klären wir Ihre Anforderungen und die nächsten Schritte.',
  },
  {
    slug: 'glas-fassadenreinigung',
    short: 'Werterhalt der Gebäudehülle',
    path: '/leistungen/glas-fassadenreinigung',
    name: 'Glas- & Fassadenreinigung',
    tag: 'Werterhalt',
    heroTitle: 'Glas- und Fassadenreinigung für Gewerbeobjekte',
    heroLead:
      'Wir reinigen Glasflächen streifenfrei und erhalten den Wert Ihrer Fassade: mit Osmose-Technik und geeigneten Höhenzugängen.',
    seoTitle: 'Glas- & Fassadenreinigung für Gewerbe | AHAD Cleaning',
    seoDescription:
      'Glas- und Fassadenreinigung für Gewerbeobjekte in Süddeutschland: streifenfreie Fenster, Osmose-Technik, Hubsteiger und Industriekletterer. Jetzt anfragen.',
    keywords: 'Glasreinigung Unternehmen, Fassadenreinigung Gewerbe, Fensterreinigung Büro, Osmose Reinigung',
    icon: <Building2 className="w-6 h-6" />,
    image: IMG.glasfassade,
    detailImage: IMG.glasDetail,
    highlights: [
      {
        icon: <Sparkles className="w-7 h-7 text-brand" />,
        title: 'Streifenfreie Sicht',
        text: 'Wir reinigen Glasfronten und Fenster samt Rahmen und Einfassungen.',
      },
      {
        icon: <Droplets className="w-7 h-7 text-accent" />,
        title: 'Osmose-Technologie',
        text: 'Entmineralisiertes Wasser trocknet ohne Rückstände und kommt ohne Reinigungsmittel aus.',
      },
      {
        icon: <Shield className="w-7 h-7 text-brand" />,
        title: 'Sichere Höhenzugänge',
        text: 'Hubsteiger, Gerüst oder Industriekletterer, mit zertifiziertem Personal und nach UVV.',
      },
    ],
    scopeTitle: 'Glas, Fassade und Sonnenschutz',
    scopeIntro:
      'Glasarchitektur, Metallfassade, Eloxal oder historische Bausubstanz: Für jedes Material wählen wir ein Verfahren, das die Oberfläche nicht dauerhaft schädigt.',
    scope: [
      'Glasfronten, Fenster & Glasdächer',
      'Fassaden aus Metall, Stein, Putz & Eloxal',
      'Jalousien, Lamellen & Sonnenschutzsysteme',
      'Hubsteiger & zertifizierte Industriekletterer',
      'Umweltschonende Osmose-Verfahren',
      'Feste Intervalle oder Einzelprojekte',
    ],
    faqs: [
      {
        question: 'Wie oft sollte eine Glas- und Fassadenreinigung durchgeführt werden?',
        answer:
          'Für Bürogebäude empfehlen wir eine Glasreinigung (innen und außen) mindestens 2- bis 4-mal jährlich. Die Fassadenreinigung hängt von Material und Umweltbelastung ab, ist aber meist alle 1 bis 3 Jahre sinnvoll, um den Werterhalt zu sichern.',
      },
      {
        question: 'Was ist das Osmose-Verfahren?',
        answer:
          'Beim Osmose-Verfahren arbeiten wir mit entmineralisiertem Wasser. Es löst Schmutz gut und trocknet ohne Streifen ab, chemische Reinigungsmittel sind nicht nötig. Das schont die Umwelt und spart bei großen Glasflächen Zeit.',
      },
      {
        question: 'Können Sie auch schwer zugängliche Fassaden reinigen?',
        answer:
          'Ja. Wir setzen Hubsteiger ein und arbeiten bei Bedarf mit zertifizierten Industriekletterern. So reinigen wir auch Glasfronten, die vom Boden aus nicht erreichbar sind.',
      },
    ],
    ctaTitle: 'Glas- und Fassadenreinigung anfragen',
    ctaLead: 'Wir sehen uns Ihr Gebäude zu einem abgestimmten Termin an und schicken Ihnen danach ein Angebot. Beides ist kostenfrei und unverbindlich.',
  },
  {
    slug: 'baureinigung',
    short: 'Bezugsfertig zum Übergabetermin',
    path: '/leistungen/baureinigung',
    name: 'Baureinigung',
    tag: 'Zum Abnahmetermin',
    heroTitle: 'Baureinigung abgestimmt auf Ihren Abnahmetermin',
    heroLead:
      'Von der Baugrob- bis zur Baufeinreinigung: Wir übergeben besenrein oder bezugsfertig zum vereinbarten Termin, auch wenn es auf der Baustelle eng wird.',
    seoTitle: 'Baureinigung: Grob- & Feinreinigung | AHAD Cleaning',
    seoDescription:
      'Baureinigung in Süddeutschland: Baugrobreinigung, Baufeinreinigung und Endreinigung vor der Übergabe, abgestimmt mit Bauleitung und Bauzeitenplan.',
    keywords: 'Baureinigung, Baufeinreinigung, Baugrobreinigung, Bauendreinigung, Baustellenreinigung',
    icon: <HardHat className="w-6 h-6" />,
    image: IMG.baureinigung,
    detailImage: IMG.bauDetail,
    highlights: [
      {
        icon: <Clock className="w-7 h-7 text-brand" />,
        title: 'Terminorientierte Planung',
        text: 'Wir stimmen Kapazitäten und Übergabepunkte mit Bauleitung und Gewerken auf den vereinbarten Termin ab.',
      },
      {
        icon: <Users className="w-7 h-7 text-accent" />,
        title: 'Teamgröße nach Bedarf',
        text: 'Vom Einzelobjekt bis zum Großprojekt: Wir passen die Zahl der Kräfte kurzfristig an den Baufortschritt an.',
      },
      {
        icon: <BadgeCheck className="w-7 h-7 text-brand" />,
        title: 'Übergabefertige Qualität',
        text: 'Bezugsfertig heißt bei uns: abnahmebereit für Bauherren, Käufer und Mieter, mit Dokumentation.',
      },
    ],
    scopeTitle: 'Vom Rohbau bis zur Übergabe',
    scopeIntro:
      'Neubau, Umbau oder Sanierung: Wir übernehmen alle Reinigungsphasen und stimmen jeden Einsatz nach Baufortschritt mit Bauleitung und Gewerken ab.',
    scope: [
      'Baugrobreinigung & Entsorgung von Bauschutt',
      'Baufeinreinigung aller Oberflächen',
      'Fenster- & Rahmenreinigung inkl. Folienentfernung',
      'Endreinigung vor Übergabe & Abnahme',
      'Flexible Einsatzzeiten nach Bauplan',
      'Koordination mit Bauleitung & Gewerken',
    ],
    faqs: [
      {
        question: 'Wie kurzfristig können Sie auf der Baustelle starten?',
        answer:
          'In dringenden Fällen innerhalb weniger Tage. Durch unsere Teamstruktur können wir Kapazitäten kurzfristig bündeln. Sprechen Sie uns auch bei engen Abnahmeterminen an.',
      },
      {
        question: 'Was umfasst eine Baufeinreinigung?',
        answer:
          'Die vollständige Reinigung aller Oberflächen nach Abschluss der Gewerke: Böden, Fenster inklusive Rahmen und Folienentfernung, Sanitärobjekte, Einbauten und Beleuchtung, bis das Objekt bezugsfertig übergeben werden kann.',
      },
      {
        question: 'Arbeiten Sie mit Generalunternehmern zusammen?',
        answer:
          'Ja. Leistungsumfang, Sicherheitsanforderungen, Bauzeitenplan und Übergabepunkte stimmen wir direkt mit Bauleitung und Gewerken ab.',
      },
    ],
    ctaTitle: 'Baureinigung anfragen',
    ctaLead: 'Schicken Sie uns Eckdaten und Abnahmetermin. Nach der Prüfung besprechen wir Machbarkeit und nächste Schritte.',
  },
  {
    slug: 'medizintechnik-reinigung',
    short: 'Dokumentiert & auditfähig',
    path: '/leistungen/medizintechnik-reinigung',
    name: 'Medizintechnik & Reinraum',
    tag: 'Dokumentiert',
    heroTitle: 'Reinigung für Medizintechnik und sensible Bereiche',
    heroLead:
      'Wo Hygiene über die Produktqualität entscheidet, braucht es geschultes Personal und vollständige Nachweise. Wir reinigen nach Ihren Standards und SOPs: mit festem Team und dokumentierter Ausführung.',
    seoTitle: 'Medizintechnik-Reinigung & Reinraum | AHAD Cleaning',
    seoDescription:
      'Reinigung für Medizintechnik, Labore und sensible Produktionsbereiche: Prozesse nach Ihren QM-Vorgaben, geschultes Personal, nachvollziehbare Dokumentation.',
    keywords: 'Medizintechnik Reinigung, Reinraumreinigung, ISO Reinigung, Hygienereinigung Produktion',
    icon: <Microscope className="w-6 h-6" />,
    image: IMG.medizintechnik,
    detailImage: IMG.medizinDetail,
    highlights: [
      {
        icon: <FileCheck2 className="w-7 h-7 text-brand" />,
        title: 'ISO-konforme Prozesse',
        text: 'Abläufe nach ISO 9001/14001-Logik, abgestimmt auf Ihre QM-Vorgaben und SOPs.',
      },
      {
        icon: <Users className="w-7 h-7 text-accent" />,
        title: 'Geschultes Fachpersonal',
        text: 'Feste, speziell unterwiesene Mitarbeitende mit Hygieneschulung und Einweisung in Ihre Verhaltensregeln.',
      },
      {
        icon: <ClipboardCheck className="w-7 h-7 text-brand" />,
        title: 'Vollständige Dokumentation',
        text: 'Jede Leistung wird nachvollziehbar protokolliert. Die Nachweise liegen für Ihre Audits vor.',
      },
    ],
    scopeTitle: 'Reinigung nach Hygieneplan und SOP',
    scopeIntro:
      'In Medizintechnik-Produktion, Laboren und sensiblen Fertigungsbereichen arbeiten wir mit definierten Verfahren und geeigneten Mitteln und dokumentieren jede Ausführung.',
    scope: [
      'Reinigung nach Hygieneplan & Ihren SOPs',
      'Produktions- & Laborflächen',
      'Schleusen-, Umkleide- & Nebenbereiche',
      'Geeignete, freigegebene Reinigungsmittel',
      'Personalschulung & dokumentierte Unterweisung',
      'Audit-Reports & Leistungsnachweise',
    ],
    faqs: [
      {
        question: 'Arbeiten Sie nach unseren internen Hygienevorgaben?',
        answer:
          'Ja. Ihre SOPs und Hygienepläne sind für uns verbindlich. Wir übernehmen sie in unsere Checklisten und schulen unser festes Team auf Ihre Anforderungen.',
      },
      {
        question: 'Wie unterstützen Sie uns bei Audits?',
        answer:
          'Leistungsnachweise, Schulungsprotokolle und Kontrollberichte liegen vollständig vor und sind abrufbar, wenn Sie sie brauchen. Auf Wunsch nimmt Ihre AHAD-Objektleitung am Audit teil.',
      },
      {
        question: 'Setzen Sie wechselndes Personal ein?',
        answer:
          'Nein. Gerade in sensiblen Bereichen arbeiten wir mit festen, geschulten Teams. Jeder Personalwechsel wird angekündigt und neue Kräfte werden dokumentiert eingewiesen.',
      },
    ],
    ctaTitle: 'Hygieneanforderungen besprechen',
    ctaLead: 'Wir besprechen Ihre Vorgaben und Bereiche vertraulich und unverbindlich.',
  },
  {
    slug: 'sonderreinigung-stillstandsservice',
    expressBanner: true,
    short: 'Grundreinigung & Stillstandsservice',
    path: '/leistungen/sonderreinigung-stillstandsservice',
    name: 'Sonderreinigung & Stillstandsservice',
    tag: 'Außer der Reihe',
    heroTitle: 'Sonderreinigung und Stillstandsservice',
    heroLead:
      'Grundreinigung, Teppich- und Polsterreinigung oder geplanter Stillstandsservice: Wir übernehmen die Arbeiten, die über die laufende Reinigung hinausgehen.',
    seoTitle: 'Sonderreinigung & Stillstandsservice | AHAD Cleaning',
    seoDescription:
      'Sonderreinigungen für Gewerbe und Industrie: Grundreinigung, Teppich- und Polsterreinigung, Stillstandsservice in Betriebsferien. Kalkuliert zum Festpreis.',
    keywords: 'Sonderreinigung, Grundreinigung, Teppichreinigung Büro, Stillstandsreinigung, Spezialreinigung',
    icon: <Sparkles className="w-6 h-6" />,
    image: IMG.sonderreinigung,
    detailImage: IMG.sonderDetail,
    highlights: [
      {
        icon: <Clock className="w-7 h-7 text-brand" />,
        title: 'Planbar im Stillstand',
        text: 'Wir reinigen in Betriebsferien, Wartungsfenstern und an Wochenenden, wenn bei Ihnen nichts läuft.',
      },
      {
        icon: <Sparkles className="w-7 h-7 text-accent" />,
        title: 'Grundreinigung von Böden',
        text: 'Strapazierte Böden und Flächen werden gründlich gereinigt und wieder aufbereitet.',
      },
      {
        icon: <BadgeCheck className="w-7 h-7 text-brand" />,
        title: 'Festpreis-Kalkulation',
        text: 'Wir kalkulieren nach Aufwand und nennen Ihnen einen verbindlichen Preis ohne Nachträge.',
      },
    ],
    scopeTitle: 'Arbeiten außerhalb der Routine',
    scopeIntro:
      'Starke Verschmutzungen, empfindliche Materialien oder eine gründliche Auffrischung: Wir wählen das Verfahren nach der Aufgabe und setzen dafür geschulte Kräfte ein.',
    scope: [
      'Grundreinigung & Beschichtung von Böden',
      'Teppich-, Polster- & Stuhlreinigung',
      'Stillstandsservice in Betriebsferien',
      'Reinigung nach Wasserschaden oder Umbau',
      'Graffiti-Entfernung & Spezialverfahren',
      'Einmalige Projekte & feste Intervalle',
    ],
    faqs: [
      {
        question: 'Was ist ein Stillstandsservice?',
        answer:
          'Die gründliche Reinigung Ihrer Flächen und Anlagen während geplanter Betriebsruhen, etwa in Betriebsferien oder Wartungsfenstern. Ihr laufender Betrieb wird dadurch nicht gestört.',
      },
      {
        question: 'Wie schnell können Sie bei akuten Fällen helfen?',
        answer:
          'Bei akuten Verschmutzungen prüfen wir verfügbare Kapazitäten und den sicheren Einsatzrahmen direkt mit Ihnen. Rufen Sie uns dafür bitte an.',
      },
      {
        question: 'Lohnt sich eine regelmäßige Grundreinigung?',
        answer:
          'Ja. Eine Grundreinigung ein- bis zweimal im Jahr verlängert die Lebensdauer von Bodenbelägen erheblich und senkt langfristig Ihre Instandhaltungskosten. Welches Intervall sinnvoll ist, besprechen wir mit Ihnen.',
      },
    ],
    ctaTitle: 'Sonderreinigung anfragen',
    ctaLead: 'Beschreiben Sie uns die Aufgabe. Wir prüfen den Bedarf und stimmen das weitere Vorgehen mit Ihnen ab.',
  },
  {
    slug: 'winterdienst-hausmeisterservice',
    short: 'Verkehrssicher durchs ganze Jahr',
    path: '/leistungen/winterdienst-hausmeisterservice',
    name: 'Winterdienst & Hausmeisterservice',
    tag: 'Verkehrssicher',
    heroTitle: 'Winterdienst und Hausmeisterservice aus einer Hand',
    heroLead:
      'Wir räumen und streuen Ihre Flächen und dokumentieren jeden Einsatz: So erfüllen Sie Ihre Verkehrssicherungspflicht. Das ganze Jahr über übernimmt unser Hausmeisterservice die technische Objektbetreuung.',
    seoTitle: 'Winterdienst & Hausmeisterservice | AHAD Cleaning',
    seoDescription:
      'Winterdienst mit Einsatzdokumentation und Hausmeisterservice für Gewerbeobjekte in Süddeutschland. So erfüllen Sie Ihre Verkehrssicherungspflicht.',
    keywords: 'Winterdienst Gewerbe, Hausmeisterservice, Verkehrssicherungspflicht, Räumdienst, Objektbetreuung',
    icon: <Snowflake className="w-6 h-6" />,
    image: IMG.winterdienst,
    detailImage: IMG.hausmeister,
    highlights: [
      {
        icon: <Shield className="w-7 h-7 text-brand" />,
        title: 'Haftungsrisiko ausgelagert',
        text: 'Wir übernehmen Ihre Verkehrssicherungspflicht und dokumentieren jeden Einsatz als Nachweis.',
      },
      {
        icon: <AlarmClockCheck className="w-7 h-7 text-accent" />,
        title: 'Einsatzbereit ab 4 Uhr',
        text: 'Wetterüberwachung und frühe Räumzeiten: Ihre Flächen sind geräumt und gestreut, bevor der Betrieb startet.',
      },
      {
        icon: <ClipboardCheck className="w-7 h-7 text-brand" />,
        title: 'Ganzjährige Objektbetreuung',
        text: 'Kontrollgänge, Kleinreparaturen und Grünpflege übernehmen wir ebenfalls, mit einem Ansprechpartner für alles.',
      },
    ],
    scopeTitle: 'Sicherheit und Ordnung bei jedem Wetter',
    scopeIntro:
      'Vom Schneeräumen vor Betriebsbeginn bis zur Kleinreparatur zwischendurch: Wir halten Ihr Objekt das ganze Jahr sicher und in Ordnung.',
    scope: [
      'Räum- & Streudienst mit Wetterüberwachung',
      'Dokumentierte Einsatzprotokolle (Haftungsnachweis)',
      'Kontrollgänge & technische Sichtprüfungen',
      'Kleinreparaturen & Lampentausch',
      'Grünpflege & Außenanlagenbetreuung',
      'Rufbereitschaft für Notfälle',
    ],
    faqs: [
      {
        question: 'Übernehmen Sie die volle Verkehrssicherungspflicht?',
        answer:
          'Ja, vertraglich. Jeder Einsatz wird mit Zeit, Fläche und Maßnahme dokumentiert. Im Schadensfall haben Sie damit den rechtssicheren Nachweis, dass ordnungsgemäß geräumt wurde.',
      },
      {
        question: 'Ab wann sind die Flächen geräumt?',
        answer:
          'Wir überwachen die Wetterlage und beginnen bei Bedarf ab 4 Uhr morgens. Verkehrswege, Zufahrten und Parkflächen sind sicher begehbar, bevor Ihre Mitarbeitenden und Kunden eintreffen.',
      },
      {
        question: 'Was umfasst der Hausmeisterservice?',
        answer:
          'Regelmäßige Kontrollgänge, Kleinreparaturen, Lampen- und Leuchtmitteltausch, Grünpflege sowie die Koordination von Fachfirmen. Den Umfang stellen wir nach Ihrem Objekt zusammen.',
      },
    ],
    ctaTitle: 'Winterdienst für die nächste Saison',
    ctaLead: 'Reservieren Sie Ihre Räumkapazität vor Saisonbeginn. Das Angebot erstellen wir nach Bedarfsklärung und Besichtigung.',
  },
  {
    slug: 'kuechenabluftreinigung-vdi-2052',
    short: 'Brandschutzkonform nach VDI 2052',
    path: '/leistungen/kuechenabluftreinigung-vdi-2052',
    name: 'Küchenabluftreinigung (VDI 2052)',
    tag: 'Brandschutz & Hygiene',
    heroTitle: 'Küchenabluftreinigung nach VDI 2052 mit prüffähigem Nachweis',
    heroLead:
      'Fett in Hauben, Kanälen und Ventilatoren ist Brandlast und Hygienerisiko. Wir reinigen die gesamte Abluftanlage nach VDI 2052: mit Protokoll und Fotos als Nachweis für Versicherung und Behörde.',
    seoTitle: 'Küchenabluftreinigung nach VDI 2052 | AHAD Cleaning',
    seoDescription:
      'Küchenabluftreinigung nach VDI 2052 für Gastronomie, Hotellerie, Kantinen und Großküchen in Süddeutschland. Brandschutzkonform, mit prüffähigem Nachweis.',
    keywords:
      'Küchenabluftreinigung VDI 2052, Abluftreinigung Gastronomie, Dunstabzug reinigen, Lüftungsreinigung Großküche, Fettfilter Reinigung',
    icon: <Wind className="w-6 h-6" />,
    image: IMG.kuechenabluft,
    detailImage: IMG.sonderDetail,
    highlights: [
      {
        icon: <Flame className="w-7 h-7 text-accent" />,
        title: 'Brandlast nachweisbar gesenkt',
        text: 'Fett in Abluftkanälen ist eine der häufigsten Brandursachen in Großküchen. Wir entfernen die Ablagerungen.',
      },
      {
        icon: <BadgeCheck className="w-7 h-7 text-brand" />,
        title: 'Nach VDI 2052',
        text: 'Wir reinigen Hauben, Filter, Kanäle und Ventilatoren nach der anerkannten Richtlinie.',
      },
      {
        icon: <FileCheck2 className="w-7 h-7 text-accent" />,
        title: 'Prüffähiger Nachweis',
        text: 'Foto-Dokumentation und Protokoll für Versicherung, Hygieneaudit und Behörde.',
      },
    ],
    scopeTitle: 'Die komplette Abluftstrecke, nicht nur die Haube',
    scopeIntro:
      'Versicherer und Hygienevorgaben verlangen die regelmäßige Reinigung der gesamten Anlage. Wir übernehmen sie vollständig, dokumentiert und außerhalb Ihrer Betriebszeiten.',
    scope: [
      'Abzugshauben und Fettfangfilter',
      'Komplette Abluftkanäle bis zum Ventilator',
      'Ventilatoren, Motoren und Brandschutzklappen',
      'Zu- und Abluftgitter, Lüftungsdecken',
      'Reinigung oder Austausch der Filtermedien',
      'Foto-Dokumentation vorher/nachher',
      'Reinigungsprotokoll mit Datum und Intervallempfehlung',
    ],
    faqs: [
      {
        question: 'Wie oft muss die Küchenabluft gereinigt werden?',
        answer:
          'Die VDI 2052 empfiehlt das Intervall je nach Nutzung: von vierteljährlich bei Dauer-/Fettbetrieb bis jährlich bei geringer Auslastung. Das genaue Intervall legen wir nach einer Begehung fest.',
      },
      {
        question: 'Warum ist das für meine Versicherung wichtig?',
        answer:
          'Verfettete Abluftanlagen zählen zu den größten Brandrisiken in Küchen. Viele Versicherer setzen eine dokumentierte Reinigung nach VDI 2052 voraus. Fehlt der Nachweis, drohen im Schadensfall Leistungskürzungen.',
      },
      {
        question: 'Stören Sie meinen Betrieb?',
        answer:
          'Nein. Wir reinigen außerhalb Ihrer Öffnungs- und Produktionszeiten, auf Wunsch nachts. Ihre Küche ist zum nächsten Service wieder einsatzbereit.',
      },
    ],
    ctaTitle: 'Abluftanlage prüfen lassen',
    ctaLead: 'Wir prüfen Verschmutzungsgrad und Intervall und liefern den Nachweis, den Ihre Versicherung verlangt.',
  },
];

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug)!;
