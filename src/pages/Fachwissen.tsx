import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Clock } from 'lucide-react';
import SEO from '@/components/SEO';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/ui/Reveal';
import SmartImage from '@/components/ui/SmartImage';
import CTABand from '@/components/CTABand';
import { IMG } from '@/lib/images';

const articles = [
  {
    title: 'Reinigungsintervalle für Unternehmen: Der praxisnahe Leitfaden',
    excerpt:
      'Wie oft sollten Büro, Sanitär und Verkehrsflächen wirklich gereinigt werden? Intervalle nach Nutzung statt Bauchgefühl — mit Tabellen für typische Objekttypen.',
    path: '/fachwissen/unterhaltsreinigung-unternehmen-reinigungsintervalle',
    category: 'Unterhaltsreinigung',
    readingTime: '8 Min.',
    image: IMG.unterhaltsreinigung,
  },
  {
    title: 'ISO 9001 & ISO 14001 in der Gebäudereinigung: Was Auftraggeber wissen müssen',
    excerpt:
      'Welche Rolle spielen Zertifizierungen bei der Dienstleisterwahl — und woran erkennen Sie, ob ein Anbieter Qualität wirklich systematisch managt?',
    path: '/fachwissen/iso-9001-iso-14001-gebaeudereinigung-unternehmen',
    category: 'Qualität & Compliance',
    readingTime: '6 Min.',
    image: IMG.medizinDetail,
  },
  {
    title: 'Industriereinigung ohne Prozessstörung: So funktioniert es',
    excerpt:
      'Schichtintegration, Sicherheitsunterweisungen, Eskalationswege: Die Erfolgsfaktoren für Reinigung im laufenden Produktionsbetrieb.',
    path: '/fachwissen/industrie-produktionsreinigung-ohne-prozessstoerung',
    category: 'Industrie',
    readingTime: '7 Min.',
    image: IMG.industrie,
  },
  {
    title: 'Reinigungsfirma wechseln: Checkliste & Tipps für den geräuschlosen Übergang',
    excerpt:
      'Wann lohnt der Wechsel, welche Kündigungsfristen gelten, und wie übernimmt der neue Anbieter ohne Chaos? Die komplette Checkliste.',
    path: '/fachwissen/reinigungsfirma-wechseln-checkliste-tipps',
    category: 'Entscheiderwissen',
    readingTime: '10 Min.',
    image: IMG.handshake,
  },
  {
    title: 'Leistungsverzeichnis erstellen: So machen Sie Reinigungsangebote vergleichbar',
    excerpt:
      'Aufbau, Bestandteile und der Unterschied zwischen verrichtungs- und ergebnisorientiert — plus Schritt-für-Schritt-Anleitung für ein belastbares LV.',
    path: '/fachwissen/leistungsverzeichnis-gebaeudereinigung-erstellen',
    category: 'Entscheiderwissen',
    readingTime: '9 Min.',
    image: IMG.teamMeeting,
  },
  {
    title: 'Küchenabluftreinigung nach VDI 2052: Pflicht, Intervalle & Nachweis',
    excerpt:
      'Reinigungsintervalle nach Betriebsstunden, Brandschutz, Versicherungsschutz und Dokumentationspflicht — der Leitfaden für Betreiber gewerblicher Küchen.',
    path: '/fachwissen/kuechenabluftreinigung-vdi-2052-pflicht-ablauf-nachweis',
    category: 'Hygiene & Brandschutz',
    readingTime: '8 Min.',
    image: IMG.kuechenabluft,
  },
];

export default function Fachwissen() {
  return (
    <div>
      <SEO
        title="Fachwissen Gebäudereinigung: Leitfäden für Entscheider | AHAD Cleaning"
        description="Praxisnahe Leitfäden rund um Gebäudereinigung: Reinigungsintervalle, ISO-Zertifizierung, Industriereinigung und Anbieterwechsel — von den Experten von AHAD."
        keywords="Fachwissen Gebäudereinigung, Reinigungsintervalle, ISO 9001 Reinigung, Reinigungsfirma wechseln"
      />

      <PageHero
        eyebrow="Fachwissen"
        title={
          <>
            Wissen, das saubere
            <br />
            Entscheidungen schafft.
          </>
        }
        lead="Praxisleitfäden für Facility Manager, Einkäufer und Geschäftsführung — ohne Werbesprech, dafür mit den Zahlen und Checklisten, die Sie für Ihre Entscheidung brauchen."
        crumbs={[{ label: 'Fachwissen' }]}
      />

      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
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
                    <div className="mt-6 pt-5 border-t border-line flex items-center justify-between">
                      <span className="flex items-center gap-2 text-[13px] font-semibold text-slate/80">
                        <Clock size={14} />
                        {article.readingTime} Lesezeit
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
