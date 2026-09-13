import { Link } from 'react-router-dom';
import { ArrowRight, BadgeCheck, CalendarDays, Phone, Users } from 'lucide-react';
import SEO from '@/components/SEO';
import PageHero from '@/components/PageHero';
import CTABand from '@/components/CTABand';
import Reveal from '@/components/ui/Reveal';
import { SITE } from '@/lib/site';
import { buildNewsSchema, formatNewsDate, requireNewsItem } from '@/data/news';

const ITEM = requireNewsItem('guentzel-objekt-service-fortfuehrung');

/** Was sich für Kunden ändert — Wortlaut aus dem Kundenschreiben vom 31.08.2026. */
const FUER_KUNDEN = [
  {
    icon: Users,
    title: 'Ihre Teams bleiben',
    text: 'Sämtliche Mitarbeiterinnen und Mitarbeiter wurden übernommen. Die eingespielten Teams und Ihre gewohnten Ansprechpartner vor Ort bleiben.',
  },
  {
    icon: BadgeCheck,
    title: 'Konditionen unverändert',
    text: 'Ihre Konditionen bleiben unverändert, ebenso der Name Güntzel. Ihre Leistungen laufen ohne Unterbrechung weiter.',
  },
  {
    icon: CalendarDays,
    title: 'Winterdienst gesichert',
    text: 'Der Winterdienst für die Saison 2026/27 ist gesichert. Die Einsatzplanung läuft unverändert weiter.',
  },
];

/** Eckdaten des Verfahrens, jeweils mit Datum aus den Originaldokumenten. */
const CHRONIK = [
  { datum: '1. August 2026', text: 'Eröffnung des Insolvenzverfahrens über das Vermögen der Güntzel Objekt-Service GmbH & Co. KG (Amtsgericht Villingen-Schwenningen, Az. 1 IN 70/26). Der Geschäftsbetrieb läuft in vollem Umfang weiter.' },
  { datum: '28. August 2026', text: 'Die AHAD Cleaning Company GmbH unterzeichnet den Kaufvertrag über den Geschäftsbetrieb.' },
  { datum: '31. August 2026', text: 'Insolvenzverwalter Stefano Buck (Schultze & Braun) und die AHAD Cleaning Company informieren Kunden, Mitarbeitende und Öffentlichkeit.' },
  { datum: '1. September 2026', text: 'Übergabe des Geschäftsbetriebs. Ab diesem Tag rechnet die AHAD Cleaning Company GmbH die Leistungen ab.' },
];

export default function AktuellesGuentzelUebernahme() {
  return (
    <div>
      <SEO
        ogType="article"
        title="Güntzel Objekt-Service wird fortgeführt | AHAD Cleaning"
        description={ITEM.summary.slice(0, 155)}
        keywords="Güntzel Objekt-Service, AHAD Cleaning Übernahme, Gebäudereinigung Villingen-Schwenningen, Betriebsfortführung"
        schema={buildNewsSchema(ITEM)}
      />

      <PageHero
        eyebrow="Unternehmensmeldung"
        titleSize="lg"
        title={
          <>
            <span className="block">AHAD Cleaning führt</span>
            <span className="block">Güntzel Objekt-Service fort.</span>
          </>
        }
        lead="Der Geschäftsbetrieb ist zum 1. September 2026 auf die AHAD Cleaning Company GmbH übergegangen. Alle Mitarbeitenden wurden übernommen, der Name Güntzel bleibt."
        image="/images/ahad/team.webp"
        crumbs={[{ label: 'Aktuelles', href: '/aktuelles' }, { label: 'Güntzel Objekt-Service' }]}
        cta={{ label: 'Ansprechpartner kontaktieren', to: '/kontakt' }}
      />

      <article className="py-16 lg:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-8">
          <p className="text-sm font-semibold text-slate mb-8">
            <time dateTime={ITEM.datePublished}>{formatNewsDate(ITEM.datePublished)}</time>
            {' · '}Villingen-Schwenningen
          </p>

          <p className="text-lg leading-relaxed text-navy font-medium mb-6">
            Über das Vermögen der Güntzel Objekt-Service GmbH &amp; Co. KG wurde am 1. August 2026 das
            Insolvenzverfahren eröffnet. Der Geschäftsbetrieb wurde seither in vollem Umfang fortgeführt.
            Mit Kaufvertrag vom 28. August 2026 hat die AHAD Cleaning Company GmbH den Geschäftsbetrieb
            erworben, die Übergabe erfolgte zum 1. September 2026.
          </p>

          <p className="text-[17px] leading-relaxed text-slate mb-6">
            Damit ist die Zukunft des Industrie- und Gebäudereinigungsspezialisten gesichert. Alle rund 25
            Arbeitsplätze bleiben erhalten. Güntzel Objekt-Service betreut seit über 20 Jahren Kunden in
            Villingen-Schwenningen, Bad Dürrheim, Donaueschingen, Rottweil, Tuttlingen, Tübingen, Albstadt,
            Konstanz und Umgebung. Nach der Übernahme beschäftigt AHAD rund 90 Mitarbeiterinnen und
            Mitarbeiter in der Region Schwarzwald-Baar-Heuberg.
          </p>

          <figure className="my-10 border-l-4 border-accent pl-6">
            <blockquote className="font-headline text-xl lg:text-2xl leading-relaxed text-navy font-medium">
              „Wir sind selbst ein Familienbetrieb aus Villingen-Schwenningen und kennen diese Arbeit.
              Deshalb war für uns von Anfang an klar, dass wir den Betrieb mit allen Mitarbeiterinnen und
              Mitarbeitern übernehmen. Für die Kunden ändert sich nichts: Die eingespielten Teams bleiben,
              und der Winterdienst für die kommende Saison ist gesichert.“
            </blockquote>
            <figcaption className="mt-4 text-sm text-slate">
              <span className="font-bold text-navy">Muhammet Ali Yerlikaya</span> — Prokurist und
              Vertriebsleiter, AHAD Cleaning Company GmbH
            </figcaption>
          </figure>

          <h2 className="font-headline text-2xl sm:text-3xl font-bold text-navy mt-14 mb-6">
            Was das für Kunden bedeutet
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12">
            {FUER_KUNDEN.map((punkt, index) => (
              <Reveal key={punkt.title} delay={Math.min(index * 0.06, 0.2)} className="h-full">
                <div className="h-full bg-paper rounded-2xl border border-line p-6">
                  <punkt.icon className="text-accent mb-3" size={22} aria-hidden="true" />
                  <h3 className="font-bold text-navy text-[15px] mb-2">{punkt.title}</h3>
                  <p className="text-sm leading-relaxed text-slate">{punkt.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="bg-navy text-white rounded-3xl p-7 sm:p-9 mb-12">
            <h2 className="font-headline text-xl font-bold mb-3">Zur Abrechnung</h2>
            <p className="text-[15px] leading-relaxed text-blue-50">
              Leistungen bis einschließlich 31. August 2026 werden durch die Insolvenzverwaltung
              abgerechnet. Zahlungen für diesen Zeitraum richten Sie bitte weiterhin an die Ihnen bekannte
              Bankverbindung der Insolvenzverwaltung. Leistungen ab dem 1. September 2026 rechnet die AHAD
              Cleaning Company GmbH ab.
            </p>
          </div>

          <h2 className="font-headline text-2xl sm:text-3xl font-bold text-navy mb-6">Der Ablauf</h2>
          <ol className="space-y-5 mb-12">
            {CHRONIK.map((schritt) => (
              <li key={schritt.datum} className="flex gap-4">
                <span className="flex-shrink-0 mt-1.5 w-2.5 h-2.5 rounded-full bg-accent" aria-hidden="true" />
                <div>
                  <p className="font-bold text-navy text-[15px]">{schritt.datum}</p>
                  <p className="text-[15px] leading-relaxed text-slate mt-0.5">{schritt.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <figure className="my-10 border-l-4 border-line pl-6">
            <blockquote className="text-[17px] leading-relaxed text-navy">
              „Ich freue mich sehr darüber, dass wir mit der AHAD Cleaning Company einen Übernehmer aus der
              Branche gefunden haben. Die Mitarbeitenden können nun nach einer herausfordernden Zeit wieder
              positiv in die Zukunft schauen.“
            </blockquote>
            <figcaption className="mt-4 text-sm text-slate">
              <span className="font-bold text-navy">Rechtsanwalt Stefano Buck</span> — Insolvenzverwalter,
              Schultze &amp; Braun
            </figcaption>
          </figure>

          <div className="bg-paper rounded-3xl border border-line p-7 sm:p-9">
            <h2 className="font-headline text-xl font-bold text-navy mb-2">
              Ihr Ansprechpartner für Güntzel-Objekte
            </h2>
            <p className="text-[15px] text-slate leading-relaxed mb-5">
              Fragen zur Fortführung, zur Vertragsübernahme oder zur Abrechnung beantwortet Ihnen
              persönlich:
            </p>
            <p className="font-bold text-navy">Muhammet Ali Yerlikaya</p>
            <p className="text-sm text-slate mb-4">Prokurist und Vertriebsleiter</p>
            <ul className="space-y-2 text-[15px]">
              <li className="flex items-center gap-2.5">
                <Phone size={16} className="text-accent flex-shrink-0" aria-hidden="true" />
                <a href="tel:+491743926183" className="font-bold text-brand hover:underline">
                  0174 3926183
                </a>
                <span className="text-slate text-sm">mobil</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={16} className="text-accent flex-shrink-0" aria-hidden="true" />
                <a href={SITE.phoneHref} className="font-bold text-brand hover:underline">
                  {SITE.phone}
                </a>
                <span className="text-slate text-sm">Büro, werktags 7 bis 17 Uhr</span>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="font-bold text-brand hover:underline">
                  {SITE.email}
                </a>
              </li>
            </ul>
          </div>

          <div className="mt-12 pt-8 border-t border-line">
            <h2 className="text-[13px] font-bold uppercase tracking-wider text-slate mb-3">Quellen</h2>
            <ul className="space-y-2 text-sm text-slate">
              {ITEM.sources.map((quelle) => (
                <li key={quelle.title}>
                  {quelle.reference.startsWith('https://') ? (
                    <a
                      href={quelle.reference}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand hover:underline"
                    >
                      {quelle.title}
                    </a>
                  ) : (
                    <span>{quelle.title}</span>
                  )}
                  {' — '}
                  {quelle.publisher}, {formatNewsDate(quelle.date)}
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-10">
            <Link to="/aktuelles" className="inline-flex items-center gap-2 font-bold text-brand hover:underline">
              Alle Meldungen <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </p>
        </div>
      </article>

      <CTABand
        title="Fragen zu Ihrem Objekt?"
        lead="Wir melden uns persönlich und klären den nächsten Schritt — ohne Ticketsystem, ohne Warteschleife."
      />
    </div>
  );
}
