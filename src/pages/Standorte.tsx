import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SEO from '@/components/SEO';
import PageHero from '@/components/PageHero';
import SectionHeading from '@/components/ui/SectionHeading';
import SmartImage from '@/components/ui/SmartImage';
import CTABand from '@/components/CTABand';
import { IMG } from '@/lib/images';
import { SITE } from '@/lib/site';

const regionen = [
  {
    name: 'Villingen-Schwenningen',
    path: '/standorte/villingen-schwenningen',
    region: 'Zentrale · Schwarzwald-Baar-Kreis',
    description:
      'Von unserer Zentrale aus steuern wir Einsatzplanung, Qualitätssicherung und die Betreuung des Schwarzwald-Baar-Kreises.',
    image: IMG.heroArchitecture,
    badge: 'Hauptsitz',
  },
  {
    name: 'Stuttgart',
    path: '/standorte/stuttgart',
    region: 'Landeshauptstadt & Umland',
    description:
      'Gebäude- und Industriereinigung in der Metropolregion Stuttgart, für Bürogebäude ebenso wie für Produktionsstandorte.',
    image: IMG.stuttgart,
    badge: 'Metropolregion',
  },
  {
    name: 'Konstanz',
    path: '/standorte/konstanz',
    region: 'Bodenseeregion',
    description:
      'Objektbetreuung rund um den Bodensee für Gewerbe, Hotellerie und öffentliche Auftraggeber.',
    image: IMG.bodensee,
    badge: 'Bodensee',
  },
];

/** Orte mit eigener Seite: Chips verlinken dorthin. */
const ORTSSEITEN: Record<string, string> = {
  'Villingen-Schwenningen': '/standorte/villingen-schwenningen',
  Stuttgart: '/standorte/stuttgart',
  Konstanz: '/standorte/konstanz',
  Donaueschingen: '/standorte/donaueschingen',
  Tuttlingen: '/standorte/tuttlingen',
};

const einzugsgebiete = [
  'Villingen-Schwenningen', 'Stuttgart', 'Konstanz', 'Rottweil', 'Tuttlingen', 'Donaueschingen',
  'Bad Dürrheim', 'Singen', 'Freiburg', 'Offenburg', 'Balingen', 'Sindelfingen',
];

export default function Standorte() {
  return (
    <div>
      <SEO
        title="Einsatzgebiete in Süddeutschland | AHAD Cleaning"
        description="Einsatzgebiete von AHAD Cleaning: Villingen-Schwenningen, Donaueschingen, Tuttlingen, Konstanz und Stuttgart. Unternehmenssitz in Villingen-Schwenningen."
        keywords="Gebäudereinigung Standorte, Reinigungsfirma Villingen-Schwenningen, Gebäudereinigung Stuttgart, Reinigung Konstanz"
      />

      <PageHero
        eyebrow="Unternehmenssitz & Einsatzgebiete"
        title="Gebäudereinigung in Baden-Württemberg: unsere Einsatzgebiete"
        lead="Von unserem Unternehmenssitz in Villingen-Schwenningen betreuen wir Objekte in mehreren Regionen Süddeutschlands. Stuttgart und Konstanz sind Einsatzgebiete."
        image={IMG.schwarzwald}
        crumbs={[{ label: 'Standorte' }]}
        cta={{ label: 'Kostenlose Besichtigung anfragen', to: '/angebot' }}
        secondaryCta={{ label: SITE.phone, href: SITE.phoneHref }}
      />

      {/* Regionen: Foto, Name, Kurzbeschreibung */}
      <section className="section-y bg-white">
        <div className="container-page grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
          {regionen.map((standort) => (
            <Link key={standort.name} to={standort.path} className="group block">
              <figure className="relative">
                <SmartImage
                  src={standort.image}
                  alt={`AHAD Cleaning Einsatzgebiet ${standort.name}`}
                  sizes="(min-width:768px) 33vw, 100vw"
                  className="aspect-[3/2]"
                />
                <figcaption className="absolute left-0 bottom-0 bg-navy text-white text-caption font-medium px-3 py-1.5">
                  {standort.badge}
                </figcaption>
              </figure>
              <p className="mt-5 text-sm font-semibold text-accent">{standort.region}</p>
              <h2 className="mt-1 text-2xl font-bold text-navy group-hover:text-accent transition-colors">
                {standort.name}
              </h2>
              <p className="mt-2 text-slate leading-relaxed">{standort.description}</p>
              <span className="text-link mt-4 text-body-sm">
                Einsatzgebiet ansehen
                <ArrowRight size={15} aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Einzugsgebiet + Kontakt */}
      <section className="section-y bg-paper border-t border-line">
        <div className="container-page grid grid-cols-1 lg:grid-cols-12 gap-x-14 gap-y-12">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="Einzugsgebiet"
              title="Im Einsatz in Süddeutschland."
              lead="Auch außerhalb der genannten Gebiete prüfen wir Anfragen. Betreut wird jedes Objekt von unserem Sitz in Villingen-Schwenningen aus."
            />
            {/* Orte mit eigener Seite sind verlinkt, die übrigen stehen als Text. */}
            <p className="mt-8 text-lg font-medium text-navy leading-loose">
              {einzugsgebiete.map((stadt, i) => (
                <span key={stadt}>
                  {i > 0 && ' · '}
                  {ORTSSEITEN[stadt] ? (
                    <Link to={ORTSSEITEN[stadt]} className="text-accent underline underline-offset-4 hover:text-accent-dark">
                      {stadt}
                    </Link>
                  ) : (
                    stadt
                  )}
                </span>
              ))}{' '}
              und Umgebung
            </p>
          </div>

          <div className="lg:col-span-5">
            <h3 className="pb-4 border-b border-navy font-semibold text-navy">Zentrale Villingen-Schwenningen</h3>
            <dl>
              <div className="grid grid-cols-[6.5rem_1fr] gap-x-4 py-3.5 border-b border-line">
                <dt className="text-body-sm text-slate">Adresse</dt>
                <dd className="font-medium text-navy">
                  {SITE.address.street}
                  <br />
                  {SITE.address.zip} {SITE.address.city}
                </dd>
              </div>
              <div className="grid grid-cols-[6.5rem_1fr] gap-x-4 py-3.5 border-b border-line">
                <dt className="text-body-sm text-slate">Telefon</dt>
                <dd>
                  <a href={SITE.phoneHref} className="inline-block py-2.5 -my-2.5 font-semibold text-accent hover:underline underline-offset-4">
                    {SITE.phone}
                  </a>
                </dd>
              </div>
              <div className="grid grid-cols-[6.5rem_1fr] gap-x-4 py-3.5 border-b border-line">
                <dt className="text-body-sm text-slate">Bürozeiten</dt>
                <dd className="font-medium text-navy">{SITE.hours}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <CTABand
        title="Ihr Objekt liegt in unserer Region?"
        lead="Dann vereinbaren Sie eine Besichtigung. Sie ist unverbindlich und kostenfrei, im Anschluss erhalten Sie ein Angebot."
      />
    </div>
  );
}
