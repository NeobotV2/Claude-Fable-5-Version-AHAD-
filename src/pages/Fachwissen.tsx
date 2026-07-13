import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, CalendarDays, Clock, ShieldCheck } from 'lucide-react';
import SEO from '@/components/SEO';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/ui/Reveal';
import SmartImage from '@/components/ui/SmartImage';
import CTABand from '@/components/CTABand';
import { IMG } from '@/lib/images';
import { EDITORIAL_ARTICLES, type EditorialArticleSlug } from '@/data/editorial';

const formatEditorialDate = (slug: EditorialArticleSlug) =>
  new Intl.DateTimeFormat('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${EDITORIAL_ARTICLES[slug].dateModified}T00:00:00Z`));

const articles = [
  {
    slug: 'was-kostet-gebaeudereinigung-stundensatz-preise',
    title: 'Was kostet Gebäudereinigung? Stundensatz, m²-Preise & Rechenbeispiele',
    excerpt:
      'Kostenbestandteile, Leistungswerte und daraus abgeleitete m²-Preise mit offengelegten Rechenannahmen — als Orientierung, nicht als Preisversprechen.',
    path: '/fachwissen/was-kostet-gebaeudereinigung-stundensatz-preise',
    category: 'Kosten & Kalkulation',
    readingTime: '9 Min.',
    image: IMG.unterhaltDetail,
  },
  {
    slug: 'checkliste-reinigungsangebot',
    title: 'Checkliste: Reinigungsangebot einholen & vergleichen',
    excerpt:
      'Die druckbare Arbeitshilfe für Objektverantwortliche: Objektdaten, Leistungsdefinition, Angebotsvergleich, Anbieterprüfung und Vertragsregeln — in 5 Schritten abhaken.',
    path: '/fachwissen/checkliste-reinigungsangebot',
    category: 'Arbeitshilfe',
    readingTime: '4 Min.',
    image: IMG.teamMeeting,
  },
  {
    slug: 'unterhaltsreinigung-unternehmen-reinigungsintervalle',
    title: 'Reinigungsintervalle für Unternehmen: Der praxisnahe Leitfaden',
    excerpt:
      'Wie oft sollten Büro, Sanitär und Verkehrsflächen wirklich gereinigt werden? Intervalle nach Nutzung statt Bauchgefühl — mit Tabellen für typische Objekttypen.',
    path: '/fachwissen/unterhaltsreinigung-unternehmen-reinigungsintervalle',
    category: 'Unterhaltsreinigung',
    readingTime: '8 Min.',
    image: IMG.unterhaltsreinigung,
  },
  {
    slug: 'iso-9001-iso-14001-gebaeudereinigung-unternehmen',
    title: 'ISO 9001 & ISO 14001 in der Gebäudereinigung: Was Auftraggeber wissen müssen',
    excerpt:
      'Welche Rolle spielen Zertifizierungen bei der Dienstleisterwahl — und woran erkennen Sie, ob ein Anbieter Qualität wirklich systematisch managt?',
    path: '/fachwissen/iso-9001-iso-14001-gebaeudereinigung-unternehmen',
    category: 'Qualität & Compliance',
    readingTime: '6 Min.',
    image: IMG.medizinDetail,
  },
  {
    slug: 'industrie-produktionsreinigung-ohne-prozessstoerung',
    title: 'Industriereinigung ohne Prozessstörung: So funktioniert es',
    excerpt:
      'Schichtintegration, Sicherheitsunterweisungen, Eskalationswege: Die Erfolgsfaktoren für Reinigung im laufenden Produktionsbetrieb.',
    path: '/fachwissen/industrie-produktionsreinigung-ohne-prozessstoerung',
    category: 'Industrie',
    readingTime: '7 Min.',
    image: IMG.industrie,
  },
  {
    slug: 'reinigungsfirma-wechseln-checkliste-tipps',
    title: 'Reinigungsfirma wechseln: Checkliste & Tipps für den geräuschlosen Übergang',
    excerpt:
      'Wann lohnt der Wechsel, welche Kündigungsfristen gelten, und wie übernimmt der neue Anbieter ohne Chaos? Die komplette Checkliste.',
    path: '/fachwissen/reinigungsfirma-wechseln-checkliste-tipps',
    category: 'Entscheiderwissen',
    readingTime: '10 Min.',
    image: IMG.handshake,
  },
  {
    slug: 'leistungsverzeichnis-gebaeudereinigung-erstellen',
    title: 'Leistungsverzeichnis erstellen: So machen Sie Reinigungsangebote vergleichbar',
    excerpt:
      'Aufbau, Bestandteile und der Unterschied zwischen verrichtungs- und ergebnisorientiert — plus Schritt-für-Schritt-Anleitung für ein belastbares LV.',
    path: '/fachwissen/leistungsverzeichnis-gebaeudereinigung-erstellen',
    category: 'Entscheiderwissen',
    readingTime: '9 Min.',
    image: IMG.teamMeeting,
  },
  {
    slug: 'kuechenabluftreinigung-vdi-2052-pflicht-ablauf-nachweis',
    title: 'Küchenabluftreinigung nach VDI 2052: Einordnung, Ablauf & Nachweis',
    excerpt:
      'Wie Nutzung, Belastung und Anlagenzustand in die Intervallplanung einfließen — mit Hinweisen zu Brandschutz, Hygiene und Dokumentation.',
    path: '/fachwissen/kuechenabluftreinigung-vdi-2052-pflicht-ablauf-nachweis',
    category: 'Hygiene & Brandschutz',
    readingTime: '8 Min.',
    image: IMG.kuechenabluft,
  },
] satisfies Array<{
  slug: EditorialArticleSlug;
  title: string;
  excerpt: string;
  path: string;
  category: string;
  readingTime: string;
  image: string;
}>;

export default function Fachwissen() {
  return (
    <div>
      <SEO
        title="Fachwissen Gebäudereinigung: Leitfäden für Entscheider | AHAD Cleaning"
        description="Praxisnahe Leitfäden rund um Gebäudereinigung: mit sichtbarem Aktualisierungsstand, redaktioneller Einordnung und Links zu offiziellen Primärquellen."
        keywords="Fachwissen Gebäudereinigung, Reinigungsintervalle, ISO 9001 Reinigung, Reinigungsfirma wechseln"
      />

      <PageHero
        eyebrow="Fachwissen"
        title={
          <>
            <span className="block">Wissen, das{' '}</span>
            <span className="block">
              <span className="whitespace-nowrap">saubere Entscheidungen</span> schafft.
            </span>
          </>
        }
        lead="Praxisleitfäden für Facility Manager, Einkauf und Geschäftsführung — mit nachvollziehbarem Aktualisierungsstand, Einordnung veränderlicher Werte und offiziellen Primärquellen."
        crumbs={[{ label: 'Fachwissen' }]}
      />

      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <Reveal className="mb-10">
            <div className="flex items-start gap-4 rounded-2xl border border-line bg-paper p-6">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand/8 text-brand">
                <ShieldCheck size={21} aria-hidden="true" />
              </span>
              <div>
                <h2 className="font-headline text-lg font-bold text-navy">Unser Redaktionsstandard</h2>
                <p className="mt-1 max-w-3xl text-sm leading-relaxed text-slate">
                  Jeder Leitfaden nennt Redaktion, Veröffentlichungs- und Änderungsdatum sowie die verwendeten
                  Primärquellen. Namentliche Fachprüfer zeigen wir erst nach dokumentierter und noch gültiger Prüfung.
                  Preis-, Intervall- und Fristangaben sind Orientierung und müssen für den Einzelfall geprüft werden.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {articles.map((article, i) => (
              <Reveal key={article.path} delay={Math.min(i * 0.08, 0.25)} className="h-full">
                <Link
                  to={article.path}
                  className="group flex flex-col h-full bg-paper rounded-3xl border border-line overflow-hidden card-lift"
                >
                  <div className="relative">
                    <SmartImage
                      src={article.image}
                      alt={article.title}
                      className="aspect-[16/8]"
                      imgClassName="transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute top-4 left-4 bg-navy/80 backdrop-blur text-mint text-[10px] font-black uppercase tracking-[0.18em] px-3 py-1.5 rounded-full">
                      {article.category}
                    </span>
                  </div>
                  <div className="flex flex-col flex-grow p-8">
                    <h2 className="font-headline text-xl lg:text-2xl font-bold text-navy leading-snug mb-3 group-hover:text-brand transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-sm text-slate leading-relaxed flex-grow">{article.excerpt}</p>
                    <div className="mt-6 pt-5 border-t border-line flex flex-wrap items-center justify-between gap-3">
                      <span className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] font-semibold text-slate/80">
                        <span className="flex items-center gap-2">
                          <Clock size={14} aria-hidden="true" />
                          {article.readingTime} Lesezeit
                        </span>
                        <span className="flex items-center gap-2">
                          <CalendarDays size={14} aria-hidden="true" />
                          Aktualisiert {formatEditorialDate(article.slug)}
                        </span>
                      </span>
                      <span className="inline-flex items-center gap-2 text-sm font-bold text-brand">
                        Lesen
                        <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3} className="mt-12">
            <div className="flex items-center gap-4 bg-paper border border-line rounded-2xl p-6 max-w-2xl mx-auto">
              <span className="w-12 h-12 rounded-xl bg-brand/8 text-brand grid place-items-center flex-shrink-0">
                <BookOpen size={22} />
              </span>
              <p className="text-sm text-slate">
                <strong className="text-navy">Ihr Thema fehlt?</strong> Schreiben Sie uns — wir erweitern unsere
                Leitfäden laufend um Fragen aus der Praxis.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <CTABand
        title="Lieber direkt vom Profi hören?"
        lead="Sparen Sie sich die Recherche: In einem kurzen Gespräch klären wir, was für Ihr Objekt wirklich sinnvoll ist."
      />
    </div>
  );
}
