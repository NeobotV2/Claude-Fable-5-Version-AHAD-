import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  Star,
  Building2,
  Factory,
  Microscope,
  LayoutDashboard,
  Search,
  Settings2,
  ClipboardCheck,
  Shield,
  PhoneCall,
  CalendarCheck,
  FileCheck2,
  ClipboardList,
} from 'lucide-react';
import SEO from '@/components/SEO';
import Reveal, { RevealWords } from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import ButtonLink from '@/components/ui/Button';
import Stat from '@/components/ui/Stat';
import SmartImage from '@/components/ui/SmartImage';
import BeforeAfter from '@/components/ui/BeforeAfter';
import Accordion, { faqSchemaFrom, type FAQItem } from '@/components/ui/Accordion';
import LogoMarquee from '@/components/LogoMarquee';
import CTABand from '@/components/CTABand';
import Guarantee from '@/components/Guarantee';
import Reviews from '@/components/Reviews';
import TrustBand from '@/components/TrustBand';
import { IMG, unsplashSrcSet } from '@/lib/images';
import { SITE, STATS, REVIEWS, ORGANIZATION_SCHEMA, WEBSITE_SCHEMA, GOOGLE_RATING } from '@/lib/site';
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
    outcome: 'Planbar saubere Flächen — ohne internen Steuerungsaufwand.',
    benefits: ['Feste Teams & Objektleitung', 'Digitale Qualitätskontrolle'],
    tag: 'Null Beschwerden',
    icon: <LayoutDashboard className="w-6 h-6" />,
    path: '/leistungen/unterhaltsreinigung',
    image: IMG.unterhaltsreinigung,
  },
  {
    title: 'Industrie- & Produktionsreinigung',
    outcome: 'Reinigung im laufenden Betrieb — ohne Prozessstörung.',
    benefits: ['Schichtintegrierte Ausführung', 'UVV-konform & auditfähig'],
    tag: 'Prozessintegriert',
    icon: <Factory className="w-6 h-6" />,
    path: '/leistungen/industrie-produktionsreinigung',
    image: IMG.industrie,
  },
  {
    title: 'Glas- & Fassadenreinigung',
    outcome: 'Repräsentative Gebäudehülle und langfristiger Werterhalt.',
    benefits: ['Osmose-Verfahren', 'Zertifizierte Höhenzugänge'],
    tag: 'Werterhalt garantiert',
    icon: <Building2 className="w-6 h-6" />,
    path: '/leistungen/glas-fassadenreinigung',
    image: IMG.glasfassade,
  },
];

const systemSteps = [
  {
    letter: 'A',
    title: 'Analyse',
    subtitle: 'Objektlogik sauber erfassen',
    description: 'Flächen, Nutzung, Risiken und Reinigungsbedarf werden als belastbare Grundlage für Planung und Ausführung erfasst.',
    icon: <Search className="w-7 h-7" />,
  },
  {
    letter: 'H',
    title: 'Handling',
    subtitle: 'Feste Teams, klare Zuständigkeit',
    description: 'Eingespielte Teams, definierte Abläufe und eine feste Objektleitung sichern die Ausführung ohne ständiges Nachsteuern.',
    icon: <Settings2 className="w-7 h-7" />,
  },
  {
    letter: 'A',
    title: 'Audit',
    subtitle: 'Qualität regelmäßig prüfen',
    description: 'Regelmäßige Kontrollen machen Leistung messbar und Abweichungen sichtbar, bevor Reklamationen entstehen.',
    icon: <ClipboardCheck className="w-7 h-7" />,
  },
  {
    letter: 'D',
    title: 'Dokumentation',
    subtitle: 'Nachweise auf Knopfdruck',
    description: 'Checklisten, Leistungen und Kontrollen werden nachvollziehbar dokumentiert — Transparenz und Auditfähigkeit inklusive.',
    icon: <Shield className="w-7 h-7" />,
    highlight: true,
  },
];

const industries = [
  { title: 'Industrie & Produktion', path: '/branchen/industrie-produktion', image: IMG.brancheIndustrie, claim: 'Störungsfrei im Schichtbetrieb' },
  { title: 'Medizintechnik', path: '/branchen/medizintechnik', image: IMG.brancheMedizin, claim: 'Auditnah & dokumentiert' },
  { title: 'Büro & Verwaltung', path: '/branchen/buero-verwaltung', image: IMG.brancheBuero, claim: 'Repräsentativ, jeden Tag' },
  { title: 'Gewerbeobjekte', path: '/branchen/gewerbeobjekte', image: IMG.brancheGewerbe, claim: 'Großflächen im Griff' },
  { title: 'Hotellerie & Objektbetrieb', path: '/branchen/hotellerie-objektbetrieb', image: IMG.brancheHotel, claim: 'Gastgeberqualität sichern' },
];

const processSteps = [
  {
    icon: <PhoneCall className="w-6 h-6" />,
    title: 'Anfrage stellen',
    duration: '60 Sekunden',
    description: 'Vier kurze Fragen im Express-Funnel oder ein Anruf — mehr braucht es nicht für den Start.',
  },
  {
    icon: <CalendarCheck className="w-6 h-6" />,
    title: 'Objektbesichtigung',
    duration: 'Innerhalb von 48h',
    description: 'Wir erfassen Flächen, Nutzung und Risiken vor Ort und beraten Sie zu sinnvollen Intervallen.',
  },
  {
    icon: <FileCheck2 className="w-6 h-6" />,
    title: 'Verbindliches Angebot',
    duration: 'Innerhalb von 24h',
    description: 'Transparentes Leistungsverzeichnis mit Festpreis — keine versteckten Kosten, keine Knebelverträge.',
  },
];

const faqs: FAQItem[] = [
  {
    question: 'Wie setzen sich Ihre Preise zusammen?',
    answer:
      'Unsere Preise basieren auf einem transparenten Leistungsverzeichnis. Wir berechnen nach tatsächlichem Aufwand, Quadratmetern und Reinigungsintervallen – ohne versteckte Kosten. Sie erhalten ein verbindliches Festpreisangebot.',
  },
  {
    question: 'Wie läuft ein Anbieterwechsel ab?',
    answer:
      'Geräuschlos und ohne Betriebsunterbrechung. Wir übernehmen die komplette Transition: Von der Bestandsaufnahme über die Einarbeitung des Personals bis zur Implementierung unseres Qualitätsmanagements.',
  },
  {
    question: 'Gibt es lange Mindestlaufzeiten?',
    answer:
      'Wir binden Kunden durch Leistung, nicht durch Knebelverträge. Nach einer fairen Probezeit bieten wir flexible Laufzeiten, die sich an Ihren unternehmerischen Bedürfnissen orientieren.',
  },
  {
    question: 'Wie sind Haftung und Sicherheit geregelt?',
    answer:
      'Wir sind umfassend betriebshaftpflichtversichert. Alle Mitarbeiter sind fest angestellt, sozialversichert und sicherheitsüberprüft. Schlüssel und Zugangscodes werden nach strengsten Sicherheitsprotokollen verwaltet.',
  },
  {
    question: 'Wie schnell ist eine Objektbesichtigung möglich?',
    answer:
      'In der Regel können wir innerhalb von 48 Stunden einen Vor-Ort-Termin vereinbaren, um Ihr Objekt zu besichtigen und ein maßgeschneidertes Angebot zu erstellen.',
  },
  {
    question: 'Arbeiten Sie mit festen Ansprechpartnern?',
    answer:
      'Ja. Jedes Objekt wird von einer festen Objektleitung betreut. Sie haben immer einen direkten, kompetenten Ansprechpartner für alle Anliegen.',
  },
  {
    question: 'Wie wird die Qualität dokumentiert?',
    answer:
      'Wir nutzen digitale Checklisten und regelmäßige Audits durch unsere Objektleiter. Sie erhalten auf Wunsch lückenlose Reports über alle erbrachten Leistungen.',
  },
  {
    question: 'Übernehmen Sie auch Objekte im laufenden Betrieb?',
    answer:
      'Absolut. Unsere Teams sind darauf geschult, sich geräuschlos in Ihre Schicht- und Betriebslogik einzufügen, ohne Ihre Abläufe zu stören.',
  },
];

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroImageY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '18%']);
  const heroFade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="overflow-hidden">
      <SEO
        title="Gebäudereinigung & Industriereinigung Villingen-Schwenningen | AHAD Cleaning"
        description="AHAD Cleaning ist Ihr Partner für professionelle Gebäudereinigung, Industriereinigung und Unterhaltsreinigung in Villingen-Schwenningen, Stuttgart und Süddeutschland. Angebot in 24h."
        keywords="Gebäudereinigung Villingen-Schwenningen, Industriereinigung Stuttgart, Unterhaltsreinigung, Glasreinigung Konstanz, Gebäudedienstleistungen"
        schema={[ORGANIZATION_SCHEMA, WEBSITE_SCHEMA, faqSchemaFrom(faqs)]}
      />

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-[92svh] flex flex-col bg-navy text-white overflow-hidden grain">
        {/* Parallax-Bild mit Navy-Duotone — rechts bewusst heller,
            damit die Bildhälfte trägt statt schwarz abzusaufen */}
        <motion.div className="absolute inset-0" style={{ y: heroImageY }}>
          <img
            src={IMG.heroMain}
            srcSet={unsplashSrcSet(IMG.heroMain)}
            sizes="100vw"
            alt="AHAD-Fuhrpark vor der Zentrale in Villingen-Schwenningen"
            className="w-full h-[115%] object-cover opacity-65"
            loading="eager"
            decoding="async"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/10 to-navy/60" />
        <div className="absolute inset-0 blueprint-grid opacity-40" />

        <motion.div
          style={{ opacity: heroFade }}
          className="relative z-10 flex-grow flex items-center max-w-7xl mx-auto px-4 sm:px-8 w-full pt-32 pb-14 gap-12"
        >
          <div className="max-w-3xl min-w-0 flex-1">
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="eyebrow text-mint mb-7"
            >
              <span className="h-px w-8 bg-mint/50" />
              Für Industrie, Verwaltung & Mittelstand in Süddeutschland
            </motion.span>

            {/* Keyword im H1 (SEO) + Schmerzpunkt der Zielgruppe (Conversion) */}
            <h1 className="display-xl text-white mb-8" lang="de">
              <RevealWords text="Gebäudereinigung," delay={0.15} />
              <br />
              <RevealWords text="die Sie nicht mehr" delay={0.4} />
              <br />
              <RevealWords text="nachsteuern" className="text-mint" delay={0.6} />{' '}
              <RevealWords text="müssen." delay={0.8} />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.7 }}
              className="text-lg sm:text-xl text-blue-50 max-w-2xl font-medium leading-relaxed mb-10"
            >
              Schluss mit Reklamationen und internem Hinterherlaufen: Wir steuern Ausführung, Qualität und
              Nachweise als System — damit Ihr Betrieb einfach sauber läuft.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <ButtonLink to="/angebot" size="lg" arrow>
                In 60 Sekunden zum Angebot
              </ButtonLink>
              <ButtonLink to="/ahad-system" variant="outline-light" size="lg">
                Wie das AHAD System arbeitet
              </ButtonLink>
            </motion.div>

            {/* Trust-Chips — bewusst ohne Zahlen, die die Stats-Leiste doppeln würden */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.25, duration: 0.8 }}
              className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[13px] font-semibold text-blue-100/80"
            >
              <span className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-mint" />
                Feste Objektleitung je Objekt
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-mint" />
                Festangestellte, geschulte Teams
              </span>
              <a
                href={GOOGLE_RATING.url || GOOGLE_RATING.searchFallback}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Star size={15} className="fill-amber-400 text-amber-400" />
                {GOOGLE_RATING.value.toFixed(1).replace('.', ',')} von 5 · {GOOGLE_RATING.count} Google-Bewertungen
              </a>
            </motion.div>
          </div>

          {/* Proof-Karte: verankert die rechte Bildhälfte mit neuem Inhalt
              (Social Proof) statt einer CTA-Dopplung — nur auf großen Screens */}
          <motion.aside
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.15, duration: 0.8, ease: [0.2, 0.65, 0.3, 1] }}
            className="hidden xl:block w-[23rem] flex-shrink-0 self-center"
          >
            <figure className="glass-dark border border-white/15 rounded-3xl p-7 shadow-lifted">
              <div className="flex gap-0.5 mb-4" aria-hidden>
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={16} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <blockquote className="text-[15px] leading-relaxed text-blue-50 font-medium">
                „{REVIEWS[2].text}“
              </blockquote>
              <figcaption className="mt-5 pt-5 border-t border-white/10">
                <div className="font-bold text-white text-sm">{REVIEWS[2].author}</div>
                <div className="text-[13px] text-blue-100/70 mt-0.5">
                  Google-Bewertung · ★ {GOOGLE_RATING.value.toFixed(1).replace('.', ',')}
                </div>
              </figcaption>
              <a
                href={GOOGLE_RATING.url || GOOGLE_RATING.searchFallback}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-bold text-mint hover:text-white transition-colors"
              >
                Alle {GOOGLE_RATING.count} Bewertungen <ArrowRight size={14} />
              </a>
            </figure>
          </motion.aside>
        </motion.div>

        {/* Statistik-Leiste */}
        <div className="relative z-10 border-t border-white/10 glass-dark">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-7 grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + i * 0.1 }}
              >
                <Stat value={stat.value} suffix={stat.suffix} label={stat.label} dark />
              </motion.div>
            ))}
          </div>
        </div>

      </section>

      {/* ── TRUST-BAND (Google-Bewertung + belegbare Signale) ────────── */}
      <TrustBand />

      {/* ── REFERENZEN-MARQUEE ───────────────────────────────────────── */}
      <section className="py-14 bg-white border-b border-line" aria-label="Referenzen">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="eyebrow text-slate/70">
            <span className="h-px w-8 bg-slate/30" />
            Auswahl betreuter Auftraggeber
          </p>
          <Link to="/referenzen" className="text-sm font-bold text-brand hover:text-brand-light transition-colors inline-flex items-center gap-1.5">
            Alle Referenzen <ArrowRight size={15} />
          </Link>
        </div>
        <LogoMarquee />
      </section>

      {/* ── LEISTUNGEN (01) ──────────────────────────────────────────── */}
      <section className="py-24 lg:py-36 bg-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 lg:mb-20">
            <SectionHeading
              index="01"
              eyebrow="Leistungen"
              title={
                <>
                  Ergebnisse statt <span className="text-brand-light">Reinigungsstunden.</span>
                </>
              }
              className="max-w-2xl"
            />
            <Reveal delay={0.15}>
              <ButtonLink to="/leistungen" variant="outline" arrow>
                Alle 8 Leistungen
              </ButtonLink>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredServices.map((service, index) => (
              <Reveal key={service.title} delay={index * 0.12} className="h-full">
                <Link
                  to={service.path}
                  className="group relative flex flex-col h-full min-h-[30rem] rounded-3xl overflow-hidden shadow-soft card-lift bg-navy"
                >
                  <SmartImage
                    src={service.image}
                    alt={service.title}
                    sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
                    className="absolute inset-0"
                    imgClassName="opacity-75 transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/55 to-navy/10 transition-opacity" />

                  <div className="relative z-10 mt-auto p-8 text-white">
                    <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-mint bg-navy/60 backdrop-blur px-3 py-1.5 rounded-full mb-5 border border-mint/20">
                      {service.tag}
                    </span>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="w-11 h-11 rounded-xl bg-white/10 backdrop-blur grid place-items-center text-mint">
                        {service.icon}
                      </span>
                      <h3 className="font-headline text-2xl font-bold leading-tight">{service.title}</h3>
                    </div>
                    <p className="text-blue-100/85 text-[15px] font-medium leading-relaxed mb-5">{service.outcome}</p>
                    <ul className="space-y-2 mb-6">
                      {service.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-center gap-2.5 text-sm font-semibold text-blue-50">
                          <CheckCircle2 size={15} className="text-mint flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                    <span className="inline-flex items-center gap-2 text-sm font-bold text-white">
                      Mehr erfahren
                      <span className="w-8 h-8 rounded-full bg-accent grid place-items-center transition-transform duration-300 group-hover:translate-x-1.5">
                        <ArrowRight size={15} />
                      </span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          {/* Zweite Reihe: alle weiteren Leistungen kompakt — nichts bleibt unsichtbar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
            {moreServices.map((service, i) => (
              <Reveal key={service.slug} delay={0.1 + i * 0.06}>
                <Link
                  to={service.path}
                  className="group flex items-center gap-4 bg-white rounded-2xl border border-line p-5 card-lift h-full"
                >
                  <span className="w-11 h-11 rounded-xl bg-brand/8 text-brand grid place-items-center flex-shrink-0 group-hover:bg-accent group-hover:text-white transition-colors">
                    {service.icon}
                  </span>
                  <span className="min-w-0 flex-grow">
                    <span className="block font-headline font-bold text-[15px] text-navy leading-snug">
                      {service.name}
                    </span>
                    <span className="block text-xs text-slate mt-0.5">{service.short}</span>
                  </span>
                  <ArrowRight
                    size={16}
                    className="flex-shrink-0 text-brand/40 transition-all duration-300 group-hover:text-accent group-hover:translate-x-1"
                  />
                </Link>
              </Reveal>
            ))}
          </div>

          {/* Anfrage-Teaser — strukturierte Anfrage für FM & Einkauf, führt in den Funnel */}
          <Reveal delay={0.15} className="mt-8">
            <Link
              to="/angebot"
              className="group flex flex-col sm:flex-row sm:items-center gap-5 bg-navy text-white rounded-3xl p-7 sm:p-8 overflow-hidden relative grain card-lift"
            >
              <div className="absolute -top-20 -right-10 w-64 h-64 rounded-full bg-accent/20 blur-[90px]" />
              <span className="relative z-10 w-14 h-14 rounded-2xl bg-white/10 grid place-items-center text-mint flex-shrink-0">
                <ClipboardList className="w-7 h-7" />
              </span>
              <div className="relative z-10 flex-grow">
                <h3 className="font-headline font-bold text-xl mb-1">In 2 Minuten zur strukturierten Anfrage</h3>
                <p className="text-blue-100/80 text-sm font-medium">
                  Für FM &amp; Einkauf: Objekt, Leistungen und Anforderungen erfassen — als Grundlage für Angebot und
                  Leistungsverzeichnis. Antwort in 24h.
                </p>
              </div>
              <span className="relative z-10 inline-flex items-center gap-2 text-sm font-bold text-mint flex-shrink-0">
                Angebot anfordern
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── VORHER / NACHHER (02) ────────────────────────────────────── */}
      <section className="relative py-24 lg:py-36 bg-navy text-white overflow-hidden grain">
        <div className="absolute inset-0 blueprint-grid" />
        <div className="absolute -top-40 -left-40 w-[30rem] h-[30rem] rounded-full bg-brand/30 blur-[140px]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-5">
              <SectionHeading
                index="02"
                eyebrow="Der Unterschied"
                dark
                title={
                  <>
                    Sehen Sie selbst, was <span className="text-mint">System</span> ausmacht.
                  </>
                }
                lead="Ziehen Sie den Regler: links der Zustand bei Übernahme, rechts unser dokumentierter Standard. Genau diese Differenz liefern wir — jede Woche, in jedem Objekt."
              />
              <Reveal delay={0.2} className="mt-10">
                <div className="flex flex-col sm:flex-row gap-4">
                  <ButtonLink to="/referenzen" variant="white" arrow>
                    Referenzen ansehen
                  </ButtonLink>
                  <ButtonLink to="/angebot" variant="outline-light">
                    Kostenlose Objektbegehung
                  </ButtonLink>
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.15} className="lg:col-span-7">
              <BeforeAfter
                beforeSrc={IMG.beforeDirty}
                afterSrc={IMG.afterClean}
                beforeLabel="Bei Übernahme"
                afterLabel="AHAD Standard"
              />
              {/* Ehrlichkeit schlägt Inszenierung: Symbolbilder als solche kennzeichnen */}
              <p className="mt-4 text-[13px] text-blue-100/60 font-medium">
                Beispielhafte Darstellung — echte Vorher/Nachher-Dokumentation aus unseren Objekten zeigen wir
                Ihnen gern im persönlichen Gespräch.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── AHAD SYSTEM (03) ─────────────────────────────────────────── */}
      <section className="py-24 lg:py-36 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <SectionHeading
            index="03"
            eyebrow="Ihr Wettbewerbsvorteil"
            align="center"
            title={
              <>
                Das <span className="font-logo text-brand-light">AHAD</span> System
              </>
            }
            lead="Vier Buchstaben, vier Schritte: Analyse, Handling, Audit, Dokumentation. So wird aus Reinigung ein steuerbarer Prozess mit messbarer Qualität."
            className="mb-16 lg:mb-24 max-w-3xl mx-auto"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {systemSteps.map((step, index) => (
              <Reveal key={index} delay={index * 0.1} className="h-full">
                <div
                  className={`relative h-full rounded-3xl p-8 overflow-hidden card-lift border ${
                    step.highlight
                      ? 'bg-navy text-white border-navy shadow-lifted'
                      : 'bg-paper border-line'
                  }`}
                >
                  <span
                    className={`absolute -top-7 -right-3 font-logo font-black text-[9rem] leading-none select-none pointer-events-none ${
                      step.highlight ? 'text-white/5' : 'text-navy/5'
                    }`}
                    aria-hidden
                  >
                    {step.letter}
                  </span>

                  <div className="relative z-10">
                    <span
                      className={`inline-flex w-14 h-14 rounded-2xl items-center justify-center mb-6 ${
                        step.highlight ? 'bg-accent text-white shadow-glow' : 'bg-brand/8 text-brand'
                      }`}
                    >
                      {step.icon}
                    </span>
                    <div className={`text-[11px] font-black uppercase tracking-[0.2em] mb-2 ${step.highlight ? 'text-mint' : 'text-brand'}`}>
                      Schritt {index + 1}
                    </div>
                    <h3 className={`font-headline text-2xl font-bold mb-2 ${step.highlight ? 'text-white' : 'text-navy'}`}>
                      {step.title}
                    </h3>
                    <p className={`text-sm font-bold mb-4 ${step.highlight ? 'text-mint' : 'text-accent'}`}>{step.subtitle}</p>
                    <p className={`text-sm leading-relaxed ${step.highlight ? 'text-blue-100/85' : 'text-slate'}`}>
                      {step.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3} className="text-center mt-12">
            <ButtonLink to="/ahad-system" variant="ghost" arrow>
              Das System im Detail
            </ButtonLink>
          </Reveal>
        </div>
      </section>

      {/* ── BRANCHEN (04) ────────────────────────────────────────────── */}
      <section className="py-24 lg:py-36 bg-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
            <SectionHeading
              index="04"
              eyebrow="Branchen"
              title="Zuhause in anspruchsvollen Umgebungen."
              lead="Wo Ausfälle, Reklamationen oder fehlende Nachweise teuer werden, zählt stabile Ausführung im laufenden Betrieb."
              className="max-w-2xl"
            />
            <Reveal delay={0.15}>
              <ButtonLink to="/branchen" variant="outline" arrow>
                Alle Branchen
              </ButtonLink>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {industries.map((industry, i) => (
              <Reveal key={industry.title} delay={i * 0.08} className={i === 0 ? 'sm:col-span-2 lg:col-span-1 lg:row-span-2' : ''}>
                <Link
                  to={industry.path}
                  className={`group relative flex rounded-3xl overflow-hidden shadow-soft card-lift bg-navy ${
                    i === 0 ? 'min-h-[24rem] lg:min-h-full lg:h-full' : 'min-h-[15rem]'
                  }`}
                >
                  <SmartImage
                    src={industry.image}
                    alt={industry.title}
                    sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                    className="absolute inset-0"
                    imgClassName="opacity-70 transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/35 to-transparent" />
                  <div className="relative z-10 mt-auto p-7 text-white w-full">
                    <p className="text-[11px] font-black uppercase tracking-[0.2em] text-mint mb-2">{industry.claim}</p>
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="font-headline text-xl lg:text-2xl font-bold">{industry.title}</h3>
                      <span className="w-9 h-9 rounded-full bg-white/15 backdrop-blur grid place-items-center flex-shrink-0 transition-all duration-300 group-hover:bg-accent group-hover:translate-x-1">
                        <ArrowRight size={16} />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}

            {/* CTA-Kachel im Raster */}
            <Reveal delay={0.4}>
              <div className="relative flex flex-col justify-between min-h-[15rem] rounded-3xl bg-brand text-white p-7 overflow-hidden grain shadow-soft">
                <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full bg-mint/20 blur-3xl" />
                <Microscope className="w-9 h-9 text-mint relative z-10" />
                <div className="relative z-10">
                  <h3 className="font-headline text-xl font-bold mb-3">Ihre Branche nicht dabei?</h3>
                  <p className="text-sm text-blue-100/85 font-medium mb-5">
                    Wir prüfen jedes Objekt individuell — sagen Sie uns, was Sie brauchen.
                  </p>
                  <ButtonLink to="/kontakt" variant="white" arrow className="!px-5 !py-2.5">
                    Kontakt aufnehmen
                  </ButtonLink>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── BEWERTUNGEN (echte Google-Reviews) ───────────────────────── */}
      <Reviews />

      {/* ── PROZESS (06) ─────────────────────────────────────────────── */}
      <section className="py-24 lg:py-36 bg-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <SectionHeading
            index="05"
            eyebrow="So einfach starten Sie"
            align="center"
            title="In drei Schritten zum sauberen Betrieb."
            className="mb-16 lg:mb-20 max-w-3xl mx-auto"
          />
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
            <div className="hidden md:block absolute top-16 left-[16%] right-[16%] h-px bg-gradient-to-r from-brand/10 via-brand/40 to-brand/10" aria-hidden />
            {processSteps.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.15}>
                <div className="relative bg-white rounded-3xl border border-line p-8 text-center card-lift h-full">
                  <div className="relative inline-flex mb-6">
                    <span className="w-16 h-16 rounded-2xl bg-navy text-mint grid place-items-center shadow-soft">{step.icon}</span>
                    <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-accent text-white text-xs font-black grid place-items-center border-2 border-white">
                      {i + 1}
                    </span>
                  </div>
                  <div className="text-[11px] font-black uppercase tracking-[0.2em] text-accent mb-2">{step.duration}</div>
                  <h3 className="font-headline text-xl font-bold text-navy mb-3">{step.title}</h3>
                  <p className="text-sm text-slate leading-relaxed">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── AHAD-VERSPRECHEN (Garantie + Proof + Objektleitung) ──────── */}
      <Guarantee />

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-white border-t border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Klartext"
              title="Häufige Fragen."
              lead="Antworten auf das, was Entscheider vor dem Wechsel wirklich wissen wollen."
            />
            <Reveal delay={0.2} className="mt-8">
              <div className="bg-paper rounded-2xl border border-line p-6">
                <p className="text-sm font-bold text-navy mb-1">Ihre Frage ist nicht dabei?</p>
                <p className="text-sm text-slate mb-4">Rufen Sie uns an — wir antworten ohne Warteschleife.</p>
                <a href={SITE.phoneHref} className="font-headline font-bold text-brand text-lg hover:text-brand-light transition-colors">
                  {SITE.phone}
                </a>
              </div>
            </Reveal>
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
