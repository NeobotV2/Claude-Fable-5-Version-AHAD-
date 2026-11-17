import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight } from 'lucide-react';
import SEO from '@/components/SEO';
import SectionHeading from '@/components/ui/SectionHeading';
import ButtonLink from '@/components/ui/Button';
import SmartImage from '@/components/ui/SmartImage';
import BeforeAfter from '@/components/ui/BeforeAfter';
import Accordion, { faqSchemaFrom, type FAQItem } from '@/components/ui/Accordion';
import ClientLogos from '@/components/ClientLogos';
import FeaturedTestimonial from '@/components/FeaturedTestimonial';
import CTABand from '@/components/CTABand';
import NewsTeaser from '@/components/NewsTeaser';
import Guarantee from '@/components/Guarantee';
import Reviews from '@/components/Reviews';
import TrustBand from '@/components/TrustBand';
import { IMG, srcSetFor } from '@/lib/images';
import {
  SITE,
  STATS,
  ORGANIZATION_SCHEMA,
  WEBSITE_SCHEMA,
  GOOGLE_RATING,
  CLIENT_REFERENCES,
  FEATURED_TESTIMONIAL_PUBLISHABLE,
} from '@/lib/site';
import { SERVICES } from '@/data/services';

const FEATURED_PATHS = [
  '/leistungen/unterhaltsreinigung',
  '/leistungen/industrie-produktionsreinigung',
  '/leistungen/glas-fassadenreinigung',
];

/** Die übrigen Leistungen — kompakt angeteasert, damit kein Umsatzfeld unsichtbar bleibt. */
const moreServices = SERVICES.filter((service) => !FEATURED_PATHS.includes(service.path));

const featuredServices = [
  {
    title: 'Unterhaltsreinigung',
    outcome: 'Saubere Flächen nach festem Plan. Die Steuerung übernehmen wir.',
    benefits: ['Feste Teams & Objektleitung', 'Digitale Qualitätskontrolle'],
    path: '/leistungen/unterhaltsreinigung',
    image: IMG.unterhaltsreinigung,
  },
  {
    title: 'Industrie- & Produktionsreinigung',
    outcome: 'Wir reinigen im laufenden Betrieb, ohne die Produktion zu stören.',
    benefits: ['Schichtintegrierte Ausführung', 'UVV-konform & auditfähig'],
    path: '/leistungen/industrie-produktionsreinigung',
    image: IMG.industrie,
    // Die Webadresse auf der Weste sitzt links im Bild; mittig beschnitten
    // blieb davon nur „…aning.de" übrig.
    imagePosition: 'object-left',
  },
  {
    title: 'Glas- & Fassadenreinigung',
    outcome: 'Gepflegte Glasflächen und Fassaden erhalten den Wert des Gebäudes.',
    benefits: ['Osmose-Verfahren', 'Geplante Höhenzugänge'],
    path: '/leistungen/glas-fassadenreinigung',
    image: IMG.glasfassade,
  },
];

const systemSteps = [
  {
    letter: 'A',
    title: 'Analyse',
    subtitle: 'Das Objekt erfassen',
    description: 'Wir erfassen Flächen, Nutzung, Risiken und Reinigungsbedarf. Darauf bauen Planung und Ausführung auf.',
  },
  {
    letter: 'H',
    title: 'Handling',
    subtitle: 'Feste Teams, klare Zuständigkeit',
    description: 'Eingespielte Teams arbeiten nach festgelegten Abläufen. Eine feste Objektleitung ist für Ihr Objekt zuständig.',
  },
  {
    letter: 'A',
    title: 'Audit',
    subtitle: 'Qualität regelmäßig prüfen',
    description: 'Regelmäßige Kontrollen zeigen Abweichungen, bevor es zu Reklamationen kommt.',
  },
  {
    letter: 'D',
    title: 'Dokumentation',
    subtitle: 'Nachweise zum Abrufen',
    description: 'Wir dokumentieren Checklisten, erbrachte Leistungen und Kontrollen. Diese Nachweise können Sie bei Audits vorlegen.',
  },
];

const industries = [
  { title: 'Industrie & Produktion', path: '/branchen/industrie-produktion', image: IMG.industrieDetail, claim: 'Im Schichtbetrieb' },
  { title: 'Medizintechnik', path: '/branchen/medizintechnik', image: IMG.brancheMedizin, claim: 'Mit Nachweisen für Audits' },
  { title: 'Büro & Verwaltung', path: '/branchen/buero-verwaltung', image: IMG.brancheBuero, claim: 'Büros, Flure, Sanitärräume' },
  { title: 'Gewerbeobjekte', path: '/branchen/gewerbeobjekte', image: IMG.brancheGewerbe, claim: 'Große Flächen nach Plan' },
  { title: 'Hotellerie & Objektbetrieb', path: '/branchen/hotellerie-objektbetrieb', image: IMG.brancheHotel, claim: 'Sauber für Ihre Gäste' },
];

const REGION_LINKS = [
  {
    title: 'Villingen-Schwenningen & Schwarzwald-Baar',
    to: '/standorte/villingen-schwenningen',
    places: 'St. Georgen, Bad Dürrheim, Donaueschingen, Königsfeld, Dauchingen, Trossingen, Rottweil und Tuttlingen',
  },
  {
    title: 'Konstanz & Bodensee',
    to: '/standorte/konstanz',
    places: 'Konstanz, Radolfzell, Singen und die Bodenseeregion',
  },
  {
    title: 'Region Stuttgart',
    to: '/standorte/stuttgart',
    places: 'Stuttgart und Umgebung',
  },
];

const faqs: FAQItem[] = [
  {
    question: 'Wie setzen sich Ihre Preise zusammen?',
    answer:
      'Grundlage ist ein Leistungsverzeichnis. Wir kalkulieren nach Aufwand, Quadratmetern und Reinigungsintervallen. Sie erhalten ein verbindliches Festpreisangebot, in dem alle Kosten aufgeführt sind.',
  },
  {
    question: 'Wie läuft ein Anbieterwechsel ab?',
    answer:
      'Ohne Unterbrechung Ihres Betriebs. Wir übernehmen den gesamten Wechsel: Bestandsaufnahme, Einarbeitung des Personals und Einführung unseres Qualitätsmanagements.',
  },
  {
    question: 'Gibt es lange Mindestlaufzeiten?',
    answer:
      'Nein. Nach einer Probezeit vereinbaren wir flexible Laufzeiten, die zu Ihrem Betrieb passen.',
  },
  {
    question: 'Wie sind Haftung und Sicherheit geregelt?',
    answer:
      'Wir haben eine Betriebshaftpflichtversicherung. Alle Mitarbeiter sind fest angestellt, sozialversichert und sicherheitsüberprüft. Schlüssel und Zugangscodes verwalten wir nach festen Sicherheitsregeln.',
  },
  {
    question: 'Wie schnell ist eine Objektbesichtigung möglich?',
    answer:
      'In der Regel sind wir innerhalb von 48 Stunden vor Ort. Den genauen Termin stimmen wir mit Ihnen ab, anschließend erstellen wir ein objektbezogenes Angebot.',
  },
  {
    question: 'Arbeiten Sie mit festen Ansprechpartnern?',
    answer:
      'Ja. Jedes Objekt hat eine feste Objektleitung. Sie ist Ihr direkter Ansprechpartner für alle Anliegen.',
  },
  {
    question: 'Wie wird die Qualität dokumentiert?',
    answer:
      'Wir nutzen digitale Checklisten, und unsere Objektleiter führen regelmäßig Audits durch. Auf Wunsch erhalten Sie Berichte über alle erbrachten Leistungen.',
  },
  {
    question: 'Übernehmen Sie auch Objekte im laufenden Betrieb?',
    answer:
      'Ja. Unsere Teams sind geschult, sich nach Ihren Schichten und Abläufen zu richten, ohne den Betrieb zu stören.',
  },
];

/** Sichtbare Bildbreite des Heros: ab lg die rechte Seitenhälfte. */
const HERO_SIZES = '(min-width: 1024px) 50vw, 100vw';

export default function Home() {
  return (
    <div>
      <SEO
        title="Gebäudereinigung Villingen-Schwenningen | AHAD Cleaning"
        description="Reinigungsfirma aus Villingen-Schwenningen: Büro-, Industrie- und Fensterreinigung, Winterdienst für Unternehmen. ISO 9001 & 14001, kostenlose Besichtigung."
        keywords="Gebäudereinigung Villingen-Schwenningen, Industriereinigung Stuttgart, Unterhaltsreinigung, Glasreinigung Konstanz, Gebäudedienstleistungen"
        schema={[ORGANIZATION_SCHEMA, WEBSITE_SCHEMA, faqSchemaFrom(faqs)]}
      />
      {/* LCP: Hero-Bild schon im <head> anstoßen, bevor der Parser das <img> erreicht. */}
      <Helmet>
        <link rel="preload" as="image" href={IMG.heroMain} imageSrcSet={srcSetFor(IMG.heroMain)} imageSizes={HERO_SIZES} />
      </Helmet>

      {/* ── HERO ────────────────────────────────────────────────────────
          Zweispaltig: links die Aussage auf Weiß, rechts das echte Foto der
          Zentrale in voller Farbe, bis an den Seitenrand. Kein Text auf dem
          Bild, keine Überlagerung. pt-16 = Höhe der festen Kopfzeile. */}
      <section className="bg-white pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="flex lg:justify-end">
            <div className="w-full lg:max-w-[40rem] px-4 sm:px-8 lg:pr-14 py-10 sm:py-14 lg:py-24">
              {/* Keyword im H1 (SEO) + Schmerzpunkt der Zielgruppe (Conversion).
                  Statisch gerendert: steht im vorgerenderten HTML → schneller LCP. */}
              <h1 className="display-xl hero-title text-navy" lang="de">
                {/* Ortsbezug im H1: Die Startseite rankt für die VS-Suchanfragen
                    (Search Console). Optisch die Rubrikzeile. */}
                <span className="eyebrow text-accent flex mb-3 sm:mb-5">
                  <span>
                    Reinigungsfirma in <span className="whitespace-nowrap">Villingen-Schwenningen</span>
                  </span>
                </span>{' '}
                <span className="whitespace-nowrap">Gebäudereinigung,</span> die Sie nicht mehr nachsteuern müssen.
              </h1>

              <p className="mt-5 sm:mt-7 text-[17px] sm:text-xl text-slate leading-relaxed max-w-xl">
                Wir organisieren Ausführung, Qualitätskontrolle und Nachweise selbst. Sie müssen weder
                Reklamationen verfolgen noch intern hinterherlaufen.
              </p>

              <div className="mt-7 sm:mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
                <ButtonLink to="/angebot" size="lg" arrow className="w-full sm:w-auto sm:whitespace-nowrap">
                  Kostenlose Besichtigung anfragen
                </ButtonLink>
                <Link to="/ahad-system" className="text-link">
                  Wie das AHAD System arbeitet
                  <ArrowRight size={17} aria-hidden="true" />
                </Link>
              </div>

              {/* Belege in einer Zeile — bewusst ohne Zahlen, die die Zahlenleiste doppeln würden */}
              <ul className="mt-9 sm:mt-12 pt-5 border-t border-line flex flex-wrap gap-x-7 gap-y-2 text-[15px] text-slate">
                {GOOGLE_RATING && (
                  <li className="w-full">
                    <a
                      href={GOOGLE_RATING.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-accent transition-colors"
                    >
                      <span className="font-semibold text-navy">
                        {GOOGLE_RATING.value.toFixed(1).replace('.', ',')} von 5
                      </span>{' '}
                      bei {GOOGLE_RATING.count} Google-Bewertungen
                    </a>
                  </li>
                )}
                <li>Feste Objektleitung je Objekt</li>
                <li>Feste, geschulte Teams</li>
              </ul>
            </div>
          </div>

          <figure className="relative aspect-[3/2] lg:aspect-auto bg-navy/5">
            <img
              src={IMG.heroMain}
              srcSet={srcSetFor(IMG.heroMain)}
              sizes={HERO_SIZES}
              alt="AHAD-Fuhrpark vor der Zentrale in Villingen-Schwenningen"
              className="absolute inset-0 w-full h-full object-cover"
              loading="eager"
              // React 18 reicht nur lowercase `fetchpriority` an das DOM durch
              {...{ fetchpriority: 'high' }}
              decoding="async"
              referrerPolicy="no-referrer"
            />
            <figcaption className="absolute left-0 bottom-0 bg-navy text-white text-[13px] font-medium px-4 py-2">
              Unsere Zentrale in Villingen-Schwenningen
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ── ZAHLEN ──────────────────────────────────────────────────── */}
      {STATS.length > 0 && (
        <section className="bg-navy text-white" aria-label="AHAD in Zahlen">
          <ul className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-2 lg:grid-cols-4 lg:divide-x divide-white/15">
            {STATS.map((stat) => (
              <li key={stat.label} className="py-7 lg:py-9 pr-4 lg:px-8 lg:first:pl-0">
                <span className="block font-accent text-4xl lg:text-[2.75rem] leading-none font-semibold tracking-tight tabular-nums">
                  {stat.value}
                  {stat.suffix}
                </span>
                <span className="block mt-2.5 text-sm text-blue-100/80">{stat.label}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ── BELEGBARE SIGNALE (Zertifikate, Absicherung) ─────────────── */}
      <TrustBand />

      {/* ── AUFTRAGGEBER ─────────────────────────────────────────────── */}
      {CLIENT_REFERENCES.length > 0 && (
        <section className="py-12 lg:py-14 bg-white border-b border-line" aria-label="Referenzen">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-8 flex items-baseline justify-between gap-4">
            <p className="eyebrow text-slate">Einige unserer Auftraggeber</p>
            <Link to="/referenzen" className="text-link text-[15px] flex-shrink-0">
              Alle Referenzen
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
          <ClientLogos />
        </section>
      )}

      {/* ── AKTUELLE MELDUNG ─────────────────────────────────────────── */}
      <NewsTeaser />

      {/* ── LEISTUNGEN ───────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <SectionHeading
              eyebrow="Leistungen"
              title="Reinigung für Büro, Produktion und Fassade."
              className="max-w-2xl"
            />
            <Link to="/leistungen" className="text-link flex-shrink-0">
              Alle {SERVICES.length} Leistungen
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>

          {/* Drei Schwerpunkte: Foto in voller Farbe, Text darunter. */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
            {featuredServices.map((service) => (
              <Link key={service.title} to={service.path} className="group block">
                <SmartImage
                  src={service.image}
                  alt={service.title}
                  sizes="(min-width:768px) 33vw, 100vw"
                  className="aspect-[4/3]"
                  imgClassName={'imagePosition' in service ? service.imagePosition : ''}
                />
                <h3 className="mt-5 text-xl font-bold text-navy group-hover:text-accent transition-colors">
                  {service.title}
                </h3>
                <p className="mt-2 text-slate leading-relaxed">{service.outcome}</p>
                <p className="mt-3 text-[15px] text-slate">{service.benefits.join(' · ')}</p>
                <span className="text-link mt-4 text-[15px]">
                  Mehr erfahren
                  <ArrowRight size={15} aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>

          {/* Alle weiteren Leistungen als Liste — nichts bleibt unsichtbar. */}
          <h3 className="mt-16 pb-4 border-b border-navy font-semibold text-navy">Weitere Leistungen</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8">
            {moreServices.map((service) => (
              <li key={service.slug} className="border-b border-line">
                <Link to={service.path} className="group flex items-center justify-between gap-4 py-4">
                  <span className="min-w-0">
                    <span className="block font-semibold text-navy group-hover:text-accent transition-colors">
                      {service.name}
                    </span>
                    <span className="block text-[15px] text-slate mt-0.5">{service.short}</span>
                  </span>
                  <ArrowRight
                    size={17}
                    className="flex-shrink-0 text-navy/40 group-hover:text-accent transition-colors"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>

          {/* Strukturierte Anfrage für FM & Einkauf — führt in den Funnel */}
          <div className="mt-14 bg-paper border border-line p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-12">
            <div className="flex-grow">
              <h3 className="text-xl font-bold text-navy mb-1.5">Strukturierte Anfrage für FM &amp; Einkauf</h3>
              <p className="text-slate leading-relaxed max-w-3xl">
                Erfassen Sie Objekt, Leistungen und Anforderungen. Daraus erstellen wir Angebot und
                Leistungsverzeichnis und melden uns zur Terminabstimmung.
              </p>
            </div>
            <ButtonLink to="/angebot" variant="dark" arrow className="flex-shrink-0 self-start lg:self-auto">
              Besichtigung anfragen
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* ── VORHER / NACHHER ─────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-x-14 gap-y-10 items-center">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Vorher / Nachher"
              dark
              title="Eine Fläche nach unserer Bauendreinigung."
              lead="Ziehen Sie den Regler: links die Fläche nach dem Ausbau, rechts nach der Reinigung, übergabefertig und dokumentiert."
            />
            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
              <ButtonLink to="/angebot" variant="white" arrow className="w-full sm:w-auto sm:whitespace-nowrap">
                Kostenlose Besichtigung anfragen
              </ButtonLink>
              <Link to="/referenzen" className="text-link-light">
                Referenzen ansehen
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="lg:col-span-7">
            <BeforeAfter beforeSrc={IMG.vorher} afterSrc={IMG.nachher} beforeLabel="Vorher" afterLabel="Nachher" />
            <p className="mt-3 text-[13px] text-blue-100/80">Aufnahmen aus einem von uns betreuten Objekt.</p>
          </div>
        </div>
      </section>

      {/* ── AHAD SYSTEM ──────────────────────────────────────────────────
          Die vier Buchstaben der Wortmarke tragen den Abschnitt selbst:
          vier Spalten mit Haarlinien, keine Karten, keine Icons. */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <SectionHeading
            eyebrow="Unser Vorgehen"
            title="Das AHAD System"
            lead="Die vier Buchstaben stehen für vier Schritte: Analyse, Handling, Audit, Dokumentation. So bleibt die Reinigung planbar und die Qualität überprüfbar."
            className="max-w-3xl mb-12"
          />

          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t-2 border-navy lg:divide-x divide-line">
            {systemSteps.map((step, index) => (
              <li
                key={index}
                className="py-8 border-b border-line sm:pr-8 lg:border-b-0 lg:pr-7 lg:pl-7 lg:first:pl-0"
              >
                <span className="block font-logo font-black text-6xl leading-none text-navy" aria-hidden>
                  {step.letter}
                </span>
                <h3 className="mt-6 text-xl font-bold text-navy">{step.title}</h3>
                <p className="mt-1 text-[15px] font-semibold text-accent">{step.subtitle}</p>
                <p className="mt-3 text-[15px] text-slate leading-relaxed">{step.description}</p>
              </li>
            ))}
          </ol>

          <Link to="/ahad-system" className="text-link mt-8">
            Das System im Detail
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* ── BRANCHEN ─────────────────────────────────────────────────────
          Als Verzeichnis: links die Aussage, rechts die Liste mit Foto. */}
      <section className="py-20 lg:py-28 bg-paper border-t border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-x-14 gap-y-10">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Branchen"
              title="Für Betriebe mit hohen Anforderungen."
              lead="In diesen Branchen werden Ausfälle, Reklamationen und fehlende Nachweise schnell teuer. Wir reinigen dort im laufenden Betrieb."
            />
            <Link to="/branchen" className="text-link mt-7">
              Alle Branchen
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>

          <ul className="lg:col-span-8 border-t border-navy">
            {industries.map((industry) => (
              <li key={industry.title} className="border-b border-line">
                <Link to={industry.path} className="group flex items-center gap-5 sm:gap-7 py-4">
                  <SmartImage
                    src={industry.image}
                    alt=""
                    sizes="160px"
                    className="w-24 sm:w-36 aspect-[3/2] flex-shrink-0"
                  />
                  <span className="min-w-0 flex-grow">
                    <span className="block text-lg sm:text-xl font-bold text-navy group-hover:text-accent transition-colors">
                      {industry.title}
                    </span>
                    <span className="block text-[15px] text-slate mt-0.5">{industry.claim}</span>
                  </span>
                  <ArrowRight
                    size={18}
                    className="flex-shrink-0 text-navy/40 group-hover:text-accent transition-colors"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
            <li className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <p className="text-slate">
                <span className="font-semibold text-navy">Ihre Branche ist nicht dabei?</span> Wir sehen uns jedes
                Objekt einzeln an.
              </p>
              <Link to="/kontakt" className="text-link flex-shrink-0">
                Kontakt aufnehmen
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </li>
          </ul>
        </div>
      </section>

      {/* ── KUNDENSTIMME (echtes, namentliches Testimonial) ──────────── */}
      {FEATURED_TESTIMONIAL_PUBLISHABLE && <FeaturedTestimonial />}

      {/* ── BEWERTUNGEN (echte Google-Reviews) ───────────────────────── */}
      <Reviews limit={2} />

      {/* ── AHAD-VERSPRECHEN (Zusagen + Eckwerte + Objektleitung) ─────── */}
      <Guarantee />

      {/* ── EINSATZGEBIET (Ortsbezug + Links auf die Standortseiten) ──── */}
      <section className="py-20 lg:py-28 bg-paper border-t border-line" aria-label="Einsatzgebiet">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <SectionHeading
            eyebrow="Einsatzgebiet"
            title="Reinigungsfirma in Villingen-Schwenningen und Umgebung"
            lead="Unsere Zentrale steht in der Max-Planck-Straße in Villingen-Schwenningen. Von hier aus betreuen wir Betriebe im Schwarzwald-Baar-Kreis und in den Nachbarkreisen, dazu Objekte in den Einsatzgebieten Konstanz und Stuttgart."
            className="max-w-3xl mb-12"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-8">
            {REGION_LINKS.map((region) => (
              <Link key={region.to} to={region.to} className="group block border-t border-navy pt-5">
                <span className="flex items-start justify-between gap-3 text-xl font-bold text-navy group-hover:text-accent transition-colors">
                  {region.title}
                  <ArrowRight size={18} className="mt-1.5 flex-shrink-0" aria-hidden="true" />
                </span>
                <span className="block mt-2 text-[15px] text-slate leading-relaxed">{region.places}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-white border-t border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-x-14 gap-y-10">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="FAQ"
              title="Häufige Fragen."
              lead="Was Entscheider vor einem Anbieterwechsel klären wollen."
            />
            <p className="mt-8 pt-6 border-t border-line text-slate leading-relaxed">
              <span className="block font-semibold text-navy">Ihre Frage ist nicht dabei?</span>
              Rufen Sie uns an. Sie landen nicht in einer Warteschleife.
              <a
                href={SITE.phoneHref}
                className="block mt-2 font-accent font-semibold text-2xl text-navy hover:text-accent transition-colors"
              >
                {SITE.phone}
              </a>
            </p>
          </div>
          <div className="lg:col-span-8">
            <Accordion items={faqs} />
          </div>
        </div>
      </section>

      <CTABand />
    </div>
  );
}
