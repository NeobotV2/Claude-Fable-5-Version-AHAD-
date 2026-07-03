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
    short: 'Planbar saubere Büros & Objekte',
    path: '/leistungen/unterhaltsreinigung',
    name: 'Unterhaltsreinigung',
    tag: 'Null Beschwerden',
    heroTitle: 'Unterhaltsreinigung, die niemand mehr steuern muss',
    heroLead:
      'Systematische, kontinuierliche Pflege Ihrer Räumlichkeiten mit festen Teams, klaren Intervallen und dokumentierter Qualität — damit Sauberkeit bei Ihnen kein Thema mehr ist.',
    seoTitle: 'Unterhaltsreinigung für Unternehmen | AHAD Cleaning',
    seoDescription:
      'Professionelle Unterhaltsreinigung für Büros, Verwaltungen und Gewerbe in Süddeutschland. Feste Teams, digitale Qualitätskontrolle, 24h Reaktionszeit. Jetzt Angebot anfordern.',
    keywords: 'Unterhaltsreinigung Unternehmen, Büroreinigung, Gebäudereinigung Villingen-Schwenningen, Reinigungsfirma Büro',
    icon: <LayoutDashboard className="w-6 h-6" />,
    image: IMG.unterhaltsreinigung,
    detailImage: IMG.unterhaltDetail,
    highlights: [
      {
        icon: <Users className="w-7 h-7 text-brand" />,
        title: 'Feste Teams & Objektleitung',
        text: 'Eingespielte Reinigungsteams mit fester Objektleitung — ein Ansprechpartner, der Ihr Objekt wirklich kennt.',
      },
      {
        icon: <ClipboardCheck className="w-7 h-7 text-accent" />,
        title: 'Digitale Qualitätskontrolle',
        text: 'Checklisten, Kontrollen und Reports digital dokumentiert — Leistung wird messbar statt gefühlt.',
      },
      {
        icon: <AlarmClockCheck className="w-7 h-7 text-brand" />,
        title: 'Intervalle nach Nutzung',
        text: 'Reinigungspläne exakt nach tatsächlicher Flächennutzung — kein starres Standardpaket.',
      },
    ],
    scopeTitle: 'Verlässliche Routine für jede Fläche',
    scopeIntro:
      'Vom Empfang über Büros und Besprechungsräume bis zu Sanitärbereichen: Wir definieren Standards und Intervalle exakt nach der Nutzung Ihrer Flächen — und halten sie nachweisbar ein.',
    scope: [
      'Individuelle Reinigungspläne & Leistungsverzeichnisse',
      'Büro-, Empfangs- und Besprechungsbereiche',
      'Sanitär- und Sozialräume mit Hygienestandard',
      'Treppenhäuser, Verkehrsflächen & Aufzüge',
      'Verbrauchsmaterial-Management auf Wunsch',
      'Digitale Leistungsnachweise & Reports',
    ],
    faqs: [
      {
        question: 'Wie werden die Reinigungsintervalle festgelegt?',
        answer:
          'Nicht nach Schema F: Nach einer Vor-Ort-Analyse legen wir Intervalle und Leistungsverzeichnis nach tatsächlicher Nutzung Ihrer Flächen fest. So zahlen Sie nur für Leistung, die wirklich gebraucht wird.',
      },
      {
        question: 'Was passiert bei Reklamationen?',
        answer:
          'Ihre feste Objektleitung reagiert garantiert innerhalb von 24 Stunden. Durch unsere dokumentierten Kontrollen erkennen wir Abweichungen meist, bevor sie Ihnen auffallen.',
      },
      {
        question: 'Können Sie unser bestehendes Reinigungsteam übernehmen?',
        answer:
          'Ja. Bei einem Anbieterwechsel prüfen wir die Übernahme bestehender Kräfte nach § 613a BGB und integrieren sie in unser Qualitätssystem — geräuschlos und ohne Unterbrechung Ihres Betriebs.',
      },
    ],
    ctaTitle: 'Saubere Flächen, null Steuerungsaufwand',
    ctaLead: 'Lassen Sie uns Ihr Objekt besichtigen — in 48h vor Ort, Angebot in 24h danach.',
  },
  {
    slug: 'industrie-produktionsreinigung',
    short: 'Reinigung im laufenden Betrieb',
    path: '/leistungen/industrie-produktionsreinigung',
    name: 'Industrie- & Produktionsreinigung',
    tag: 'Prozessintegriert',
    heroTitle: 'Industriereinigung ohne Produktionsstillstand',
    heroLead:
      'Technische Reinigung, die sich nahtlos in Ihre Schichtlogik einfügt: UVV-konform, auditfähig und mit festen Eskalationswegen — damit Ihre Produktion läuft, während wir arbeiten.',
    seoTitle: 'Industriereinigung & Produktionsreinigung | AHAD Cleaning',
    seoDescription:
      'Industriereinigung im laufenden Betrieb: Maschinen- und Anlagenreinigung, Hallenreinigung, schichtbegleitende Ausführung. UVV-konform & auditfähig. Süddeutschland.',
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
        text: 'Geschultes Personal, dokumentierte Unterweisungen und strikte Einhaltung aller Sicherheitsvorschriften.',
      },
      {
        icon: <FileCheck2 className="w-7 h-7 text-brand" />,
        title: '100% auditfähig',
        text: 'Lückenlose Dokumentation aller Leistungen — bereit für jedes Kunden- und Zertifizierungsaudit.',
      },
    ],
    scopeTitle: 'Technische Sauberkeit für anspruchsvolle Umgebungen',
    scopeIntro:
      'Produktionshallen, Maschinen, Anlagen und Logistikflächen: Wir reinigen dort, wo Standardfirmen an ihre Grenzen kommen — mit Verfahren, die zu Material und Prozess passen.',
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
          'Ja — das ist unsere Kernkompetenz. Unsere Teams fügen sich in Ihre Schicht- und Betriebslogik ein, arbeiten in produktionsfreien Fenstern oder parallel in abgegrenzten Bereichen, ohne Ihre Abläufe zu stören.',
      },
      {
        question: 'Wie stellen Sie Arbeitssicherheit sicher?',
        answer:
          'Alle Mitarbeitenden sind sicherheitsunterwiesen, mit PSA ausgestattet und für die jeweiligen Anlagen geschult. Unterweisungen und Befähigungen dokumentieren wir lückenlos — auf Wunsch erhalten Sie alle Nachweise.',
      },
      {
        question: 'Übernehmen Sie auch einmalige Grundreinigungen?',
        answer:
          'Ja, etwa nach Umbauten, vor Audits oder im geplanten Stillstand. Wir kalkulieren transparent nach Aufwand und liefern ein verbindliches Festpreisangebot.',
      },
    ],
    ctaTitle: 'Produktion läuft. Reinigung auch.',
    ctaLead: 'Sprechen Sie mit uns über schichtintegrierte Reinigung — Ersteinschätzung innerhalb von 24h.',
  },
  {
    slug: 'glas-fassadenreinigung',
    short: 'Werterhalt der Gebäudehülle',
    path: '/leistungen/glas-fassadenreinigung',
    name: 'Glas- & Fassadenreinigung',
    tag: 'Werterhalt garantiert',
    heroTitle: 'Glas- und Fassadenreinigung für Gewerbeobjekte',
    heroLead:
      'Die Gebäudehülle ist die Visitenkarte Ihres Unternehmens. Wir sorgen für streifenfreie Ergebnisse und langfristigen Werterhalt — mit Osmose-Technik und zertifizierten Höhenzugängen.',
    seoTitle: 'Glasreinigung & Fassadenreinigung für Gewerbe | AHAD Cleaning',
    seoDescription:
      'Professionelle Glas- und Fassadenreinigung für Gewerbeobjekte in Süddeutschland. Streifenfreie Sauberkeit, Osmose-Technik und Werterhalt. Jetzt anfragen!',
    keywords: 'Glasreinigung Unternehmen, Fassadenreinigung Gewerbe, Fensterreinigung Büro, Osmose Reinigung',
    icon: <Building2 className="w-6 h-6" />,
    image: IMG.glasfassade,
    detailImage: IMG.glasDetail,
    highlights: [
      {
        icon: <Sparkles className="w-7 h-7 text-brand" />,
        title: 'Streifenfreie Sicht',
        text: 'Glasfronten, Fenster, Rahmen und Einfassungen — maximale Lichtausbeute und Repräsentativität.',
      },
      {
        icon: <Droplets className="w-7 h-7 text-accent" />,
        title: 'Osmose-Technologie',
        text: 'Entmineralisiertes Wasser reinigt kraftvoll, trocknet rückstandsfrei und schont die Umwelt.',
      },
      {
        icon: <Shield className="w-7 h-7 text-brand" />,
        title: 'Sichere Höhenzugänge',
        text: 'Hubsteiger, Gerüste oder Industriekletterer — zertifiziertes Personal unter Einhaltung aller UVV.',
      },
    ],
    scopeTitle: 'Präzision in der Höhe, Werterhalt im Blick',
    scopeIntro:
      'Ob moderne Glasarchitektur, Metallfassade, Eloxal oder historische Bausubstanz — wir wählen das exakt passende Verfahren für jedes Material und schützen Ihre Gebäudehülle vor dauerhaften Schäden.',
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
          'Beim Osmose-Verfahren verwenden wir entmineralisiertes Wasser mit hoher Reinigungskraft, das völlig streifenfrei abtrocknet — ganz ohne chemische Reinigungsmittel. Besonders umweltschonend und effizient bei großen Glasflächen.',
      },
      {
        question: 'Können Sie auch schwer zugängliche Fassaden reinigen?',
        answer:
          'Ja. Wir verfügen über moderne Höhenzugangstechnik wie Hubsteiger und arbeiten bei Bedarf mit zertifizierten Industriekletterern, um auch schwer erreichbare Glasfronten sicher und professionell zu reinigen.',
      },
    ],
    ctaTitle: 'Glänzende Aussichten für Ihr Gebäude',
    ctaLead: 'Objektbesichtigung in 48h, verbindliches Angebot in 24h — kostenfrei und unverbindlich.',
  },
  {
    slug: 'baureinigung',
    short: 'Termingerechte, bezugsfertige Übergaben',
    path: '/leistungen/baureinigung',
    name: 'Baureinigung',
    tag: 'Terminfest',
    heroTitle: 'Baureinigung mit garantierter Termintreue',
    heroLead:
      'Von der Baugrob- bis zur Baufeinreinigung: Wir liefern besenreine bis bezugsfertige Übergaben — pünktlich zum Abnahmetermin, auch wenn es auf der Baustelle eng wird.',
    seoTitle: 'Baureinigung: Grob- & Feinreinigung termingerecht | AHAD Cleaning',
    seoDescription:
      'Professionelle Baureinigung in Süddeutschland: Baugrobreinigung, Baufeinreinigung und Endreinigung vor Übergabe. Termintreu, flexibel, zuverlässig.',
    keywords: 'Baureinigung, Baufeinreinigung, Baugrobreinigung, Bauendreinigung, Baustellenreinigung',
    icon: <HardHat className="w-6 h-6" />,
    image: IMG.baureinigung,
    detailImage: IMG.bauDetail,
    highlights: [
      {
        icon: <Clock className="w-7 h-7 text-brand" />,
        title: 'Absolute Termintreue',
        text: 'Abnahmen verschieben sich nicht — wir planen Kapazitäten mit Puffer und liefern zum vereinbarten Termin.',
      },
      {
        icon: <Users className="w-7 h-7 text-accent" />,
        title: 'Skalierbare Teams',
        text: 'Vom Einzelobjekt bis zum Großprojekt: Wir skalieren Personal kurzfristig nach Baufortschritt.',
      },
      {
        icon: <BadgeCheck className="w-7 h-7 text-brand" />,
        title: 'Übergabefertige Qualität',
        text: 'Bezugsfertig heißt bei uns: abnahmebereit für Bauherren, Käufer und Mieter — dokumentiert.',
      },
    ],
    scopeTitle: 'Vom Rohbau zur repräsentativen Übergabe',
    scopeIntro:
      'Neubau, Umbau oder Sanierung: Wir begleiten Ihr Projekt durch alle Reinigungsphasen und arbeiten Hand in Hand mit Bauleitung und Gewerken — flexibel nach Baufortschritt.',
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
          'In dringenden Fällen innerhalb weniger Tage. Durch unsere Teamstruktur können wir Kapazitäten kurzfristig bündeln — sprechen Sie uns auch bei engen Abnahmeterminen an.',
      },
      {
        question: 'Was umfasst eine Baufeinreinigung?',
        answer:
          'Die vollständige Reinigung aller Oberflächen nach Abschluss der Gewerke: Böden, Fenster inklusive Rahmen und Folienentfernung, Sanitärobjekte, Einbauten und Beleuchtung — bis zur bezugsfertigen Übergabe.',
      },
      {
        question: 'Arbeiten Sie mit Generalunternehmern zusammen?',
        answer:
          'Ja, wir sind eingespielter Partner von Bauunternehmen und Generalunternehmern wie GOLDBECK oder Köster und kennen die Abläufe, Sicherheitsanforderungen und den Termindruck auf Großbaustellen.',
      },
    ],
    ctaTitle: 'Ihr Abnahmetermin steht? Wir auch.',
    ctaLead: 'Senden Sie uns Eckdaten und Termin — wir melden uns innerhalb von 24h mit einer belastbaren Zusage.',
  },
  {
    slug: 'medizintechnik-reinigung',
    short: 'Dokumentiert & auditfähig',
    path: '/leistungen/medizintechnik-reinigung',
    name: 'Medizintechnik & Reinraum',
    tag: 'Dokumentiert',
    heroTitle: 'Reinigung für Medizintechnik und sensible Bereiche',
    heroLead:
      'Wo Hygiene über Produktqualität entscheidet, zählen Disziplin, Schulung und lückenlose Nachweise. Wir reinigen auditnah — nach Ihren Standards und SOPs.',
    seoTitle: 'Medizintechnik-Reinigung & Reinraum | AHAD Cleaning',
    seoDescription:
      'Spezialisierte Reinigung für Medizintechnik, Labore und sensible Produktionsbereiche. ISO-konforme Prozesse, geschultes Personal, lückenlose Dokumentation.',
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
        text: 'Speziell unterwiesene, feste Mitarbeitende — Hygieneschulung und Verhaltensregeln inklusive.',
      },
      {
        icon: <ClipboardCheck className="w-7 h-7 text-brand" />,
        title: 'Lückenlose Dokumentation',
        text: 'Jede Leistung nachvollziehbar protokolliert — bereit für jedes Audit, jederzeit.',
      },
    ],
    scopeTitle: 'Hygiene, die Audits standhält',
    scopeIntro:
      'Medizintechnik-Produktion, Labore und sensible Fertigungsbereiche stellen besondere Anforderungen. Wir erfüllen sie mit System: definierte Verfahren, geeignete Mittel, dokumentierte Ausführung.',
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
          'Ja — Ihre SOPs und Hygienepläne sind für uns bindend. Wir integrieren sie in unsere Checklisten und schulen unser festes Team gezielt auf Ihre Anforderungen.',
      },
      {
        question: 'Wie unterstützen Sie uns bei Audits?',
        answer:
          'Mit lückenloser Dokumentation: Leistungsnachweise, Schulungsprotokolle und Kontrollberichte liegen jederzeit abrufbar vor. Auf Wunsch nimmt Ihre AHAD-Objektleitung am Audit teil.',
      },
      {
        question: 'Setzen Sie wechselndes Personal ein?',
        answer:
          'Nein. Gerade in sensiblen Bereichen arbeiten wir mit festen, geschulten Teams. Jeder Personalwechsel wird angekündigt und neue Kräfte werden dokumentiert eingewiesen.',
      },
    ],
    ctaTitle: 'Auditfähige Sauberkeit, planbar geliefert',
    ctaLead: 'Lassen Sie uns über Ihre Hygieneanforderungen sprechen — vertraulich und unverbindlich.',
  },
  {
    slug: 'sonderreinigung-stillstandsservice',
    expressBanner: true,
    short: 'Grundreinigung & Stillstandsservice',
    path: '/leistungen/sonderreinigung-stillstandsservice',
    name: 'Sonderreinigung & Stillstandsservice',
    tag: 'Planbar',
    heroTitle: 'Sonderreinigung für besondere Anforderungen',
    heroLead:
      'Grundreinigung, Teppich- und Polsterreinigung oder geplanter Stillstandsservice: maßgeschneiderte Lösungen für alles, was über die Routine hinausgeht.',
    seoTitle: 'Sonderreinigung & Stillstandsservice | AHAD Cleaning',
    seoDescription:
      'Sonderreinigungen für Gewerbe und Industrie: Grundreinigung, Teppichreinigung, Stillstandsservice. Planbar, transparent kalkuliert, professionell ausgeführt.',
    keywords: 'Sonderreinigung, Grundreinigung, Teppichreinigung Büro, Stillstandsreinigung, Spezialreinigung',
    icon: <Sparkles className="w-6 h-6" />,
    image: IMG.sonderreinigung,
    detailImage: IMG.sonderDetail,
    highlights: [
      {
        icon: <Clock className="w-7 h-7 text-brand" />,
        title: 'Planbar im Stillstand',
        text: 'Betriebsferien, Wartungsfenster, Wochenenden — wir nutzen Ihre Stillstandszeiten optimal.',
      },
      {
        icon: <Sparkles className="w-7 h-7 text-accent" />,
        title: 'Tiefenwirkung statt Oberfläche',
        text: 'Grundreinigung bringt strapazierte Böden und Flächen zurück auf Neuzustand.',
      },
      {
        icon: <BadgeCheck className="w-7 h-7 text-brand" />,
        title: 'Festpreis-Kalkulation',
        text: 'Transparente Kalkulation nach Aufwand — verbindlich, ohne Nachträge.',
      },
    ],
    scopeTitle: 'Spezialisten für das Außerplanmäßige',
    scopeIntro:
      'Außergewöhnliche Verschmutzungen, besondere Materialien oder intensive Auffrischung: Wir bieten das passende Verfahren und das geschulte Team für jede Sonderaufgabe.',
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
          'Die intensive Reinigung Ihrer Flächen und Anlagen während geplanter Betriebsruhen — etwa in Betriebsferien oder Wartungsfenstern. So entsteht Tiefenreinigung ohne jede Störung Ihres Betriebs.',
      },
      {
        question: 'Wie schnell können Sie bei akuten Fällen helfen?',
        answer:
          'Bei akuten Verschmutzungen — etwa nach einem Wasserschaden — sind wir in der Regel innerhalb von 24 bis 48 Stunden einsatzbereit. Rufen Sie uns direkt an.',
      },
      {
        question: 'Lohnt sich eine regelmäßige Grundreinigung?',
        answer:
          'Ja: Eine ein- bis zweimal jährliche Grundreinigung verlängert die Lebensdauer von Bodenbelägen erheblich und senkt langfristig Ihre Instandhaltungskosten — wir beraten Sie zum sinnvollen Intervall.',
      },
    ],
    ctaTitle: 'Ein Sonderfall? Unser Normalfall.',
    ctaLead: 'Beschreiben Sie uns Ihre Aufgabe — wir melden uns innerhalb von 24h mit Lösung und Festpreis.',
  },
  {
    slug: 'winterdienst-hausmeisterservice',
    short: 'Verkehrssicher durchs ganze Jahr',
    path: '/leistungen/winterdienst-hausmeisterservice',
    name: 'Winterdienst & Hausmeisterservice',
    tag: 'Verkehrssicher',
    heroTitle: 'Winterdienst und Hausmeisterservice aus einer Hand',
    heroLead:
      'Verkehrssicherungspflicht erfüllt, Objekt im Griff: Räum- und Streudienst mit Einsatzdokumentation plus technische Objektbetreuung übers ganze Jahr.',
    seoTitle: 'Winterdienst & Hausmeisterservice für Gewerbe | AHAD Cleaning',
    seoDescription:
      'Zuverlässiger Winterdienst mit Einsatzdokumentation und professioneller Hausmeisterservice für Gewerbeobjekte in Süddeutschland. Verkehrssicherungspflicht erfüllt.',
    keywords: 'Winterdienst Gewerbe, Hausmeisterservice, Verkehrssicherungspflicht, Räumdienst, Objektbetreuung',
    icon: <Snowflake className="w-6 h-6" />,
    image: IMG.winterdienst,
    detailImage: IMG.hausmeister,
    highlights: [
      {
        icon: <Shield className="w-7 h-7 text-brand" />,
        title: 'Haftungsrisiko ausgelagert',
        text: 'Wir übernehmen Ihre Verkehrssicherungspflicht — mit dokumentierten Einsätzen als Nachweis.',
      },
      {
        icon: <AlarmClockCheck className="w-7 h-7 text-accent" />,
        title: 'Einsatzbereit ab 4 Uhr',
        text: 'Wetterüberwachung und frühe Räumzeiten: Ihre Flächen sind sicher, bevor der Betrieb startet.',
      },
      {
        icon: <ClipboardCheck className="w-7 h-7 text-brand" />,
        title: 'Objekt ganzjährig im Griff',
        text: 'Kontrollgänge, Kleinreparaturen, Grünpflege — ein Partner für den kompletten Objektbetrieb.',
      },
    ],
    scopeTitle: 'Sicherheit und Ordnung — bei jedem Wetter',
    scopeIntro:
      'Vom Schneeräumen vor Betriebsbeginn bis zur Kleinreparatur zwischendurch: Wir halten Ihr Objekt sicher, funktionsfähig und repräsentativ — das ganze Jahr.',
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
          'Ja, vertraglich. Jeder Einsatz wird mit Zeit, Fläche und Maßnahme dokumentiert — im Schadensfall haben Sie damit den rechtssicheren Nachweis ordnungsgemäßer Räumung.',
      },
      {
        question: 'Ab wann sind die Flächen geräumt?',
        answer:
          'Wir überwachen die Wetterlage aktiv und beginnen bei Bedarf ab 4 Uhr morgens. Verkehrswege, Zufahrten und Parkflächen sind sicher begehbar, bevor Ihre Mitarbeitenden und Kunden eintreffen.',
      },
      {
        question: 'Was umfasst der Hausmeisterservice?',
        answer:
          'Regelmäßige Kontrollgänge, Kleinreparaturen, Lampen- und Leuchtmitteltausch, Grünpflege sowie die Koordination von Fachfirmen — individuell zusammengestellt nach Ihrem Objekt.',
      },
    ],
    ctaTitle: 'Der nächste Winter kommt sicher',
    ctaLead: 'Sichern Sie sich Ihre Räumkapazität rechtzeitig — Angebot innerhalb von 24h.',
  },
  {
    slug: 'kuechenabluftreinigung-vdi-2052',
    short: 'Brandschutzkonform nach VDI 2052',
    path: '/leistungen/kuechenabluftreinigung-vdi-2052',
    name: 'Küchenabluftreinigung (VDI 2052)',
    tag: 'Brandschutz & Hygiene',
    heroTitle: 'Küchenabluftreinigung nach VDI 2052 — prüffähig dokumentiert',
    heroLead:
      'Fett in Hauben, Kanälen und Ventilatoren ist Brandlast und Hygienerisiko. Wir reinigen Ihre komplette Abluftanlage nach VDI 2052 — mit lückenlosem Nachweis für Versicherung und Behörde.',
    seoTitle: 'Küchenabluftreinigung nach VDI 2052 | AHAD Cleaning',
    seoDescription:
      'Professionelle Küchenabluftreinigung nach VDI 2052 für Gastronomie, Hotellerie, Kantinen und Großküchen in Süddeutschland. Brandschutzkonform, hygienisch, mit prüffähigem Nachweis.',
    keywords:
      'Küchenabluftreinigung VDI 2052, Abluftreinigung Gastronomie, Dunstabzug reinigen, Lüftungsreinigung Großküche, Fettfilter Reinigung',
    icon: <Wind className="w-6 h-6" />,
    image: IMG.kuechenabluft,
    detailImage: IMG.sonderDetail,
    highlights: [
      {
        icon: <Flame className="w-7 h-7 text-accent" />,
        title: 'Brandlast nachweisbar gesenkt',
        text: 'Fett in Abluftkanälen ist eine der häufigsten Brandursachen in Großküchen — wir entfernen es zuverlässig.',
      },
      {
        icon: <BadgeCheck className="w-7 h-7 text-brand" />,
        title: 'Nach VDI 2052',
        text: 'Die gesamte Anlage — Hauben, Filter, Kanäle, Ventilatoren — nach anerkannter Richtlinie gereinigt.',
      },
      {
        icon: <FileCheck2 className="w-7 h-7 text-accent" />,
        title: 'Prüffähiger Nachweis',
        text: 'Foto-Dokumentation und Protokoll für Versicherung, Hygieneaudit und Behörde — auf Knopfdruck.',
      },
    ],
    scopeTitle: 'Die komplette Abluftstrecke — nicht nur die Haube',
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
          'Die VDI 2052 empfiehlt das Intervall je nach Nutzung — von vierteljährlich bei Dauer-/Fettbetrieb bis jährlich bei geringer Auslastung. Das genaue Intervall legen wir nach einer Begehung fest.',
      },
      {
        question: 'Warum ist das für meine Versicherung wichtig?',
        answer:
          'Verfettete Abluftanlagen zählen zu den größten Brandrisiken in Küchen. Viele Versicherer setzen eine dokumentierte Reinigung nach VDI 2052 voraus — fehlt der Nachweis, drohen im Schadensfall Leistungskürzungen.',
      },
      {
        question: 'Stören Sie meinen Betrieb?',
        answer:
          'Nein. Wir reinigen außerhalb Ihrer Öffnungs- und Produktionszeiten, auf Wunsch nachts. Ihre Küche ist zum nächsten Service wieder voll einsatzbereit.',
      },
    ],
    ctaTitle: 'Abluftanlage prüfen lassen',
    ctaLead: 'Wir bewerten Verschmutzungsgrad und Intervall — und liefern den Nachweis, den Ihre Versicherung sehen will.',
  },
];

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug)!;
