import { Link } from 'react-router-dom';
import { Instagram, Linkedin } from 'lucide-react';
import Logo from '@/components/Logo';
import { SITE } from '@/lib/site';
import { CLAIM } from '@/lib/messaging';

const columns = [
  {
    title: 'Leistungen',
    links: [
      { label: 'Unterhaltsreinigung', href: '/leistungen/unterhaltsreinigung' },
      { label: 'Industriereinigung', href: '/leistungen/industrie-produktionsreinigung' },
      { label: 'Glas- & Fassadenreinigung', href: '/leistungen/glas-fassadenreinigung' },
      { label: 'Baureinigung', href: '/leistungen/baureinigung' },
      { label: 'Medizintechnik & Reinraum', href: '/leistungen/medizintechnik-reinigung' },
      { label: 'Sonderreinigung', href: '/leistungen/sonderreinigung-stillstandsservice' },
      { label: 'Winterdienst & Hausmeister', href: '/leistungen/winterdienst-hausmeisterservice' },
      { label: 'Küchenabluftreinigung', href: '/leistungen/kuechenabluftreinigung-vdi-2052' },
    ],
  },
  {
    title: 'Branchen',
    links: [
      { label: 'Industrie & Produktion', href: '/branchen/industrie-produktion' },
      { label: 'Medizintechnik', href: '/branchen/medizintechnik' },
      { label: 'Büro & Verwaltung', href: '/branchen/buero-verwaltung' },
      { label: 'Gewerbeobjekte', href: '/branchen/gewerbeobjekte' },
      { label: 'Hotellerie & Objektbetrieb', href: '/branchen/hotellerie-objektbetrieb' },
    ],
  },
  {
    title: 'Unternehmen',
    links: [
      { label: 'Über uns', href: '/unternehmen' },
      { label: 'Das AHAD System', href: '/ahad-system' },
      { label: 'Referenzen', href: '/referenzen' },
      { label: 'Karriere', href: '/karriere' },
      { label: 'Fachwissen', href: '/fachwissen' },
      { label: 'Aktuelles', href: '/aktuelles' },
      { label: 'Kontakt', href: '/kontakt' },
    ],
  },
  {
    // Lokale Relevanz & SEO: jede Standortseite ist von jeder Seite aus erreichbar.
    title: 'Einsatzgebiete',
    links: [
      { label: 'Villingen-Schwenningen', href: '/standorte/villingen-schwenningen' },
      { label: 'Donaueschingen', href: '/standorte/donaueschingen' },
      { label: 'Tuttlingen', href: '/standorte/tuttlingen' },
      { label: 'Konstanz', href: '/standorte/konstanz' },
      { label: 'Stuttgart', href: '/standorte/stuttgart' },
      { label: 'Alle Einsatzgebiete', href: '/standorte' },
    ],
  },
];

const linkClass = 'text-[15px] text-blue-100/75 hover:text-white transition-colors';

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="py-14 lg:py-16 grid grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-12">
          {/* Marke und Anschrift */}
          <div className="col-span-2 lg:col-span-4">
            <Logo variant="dark" size={42} />
            {/* Marken-Claim als Signatur (Designbook: der eine Claim) */}
            <p className="mt-4 text-sm font-semibold text-mint">{CLAIM}</p>
            <p className="mt-5 text-[15px] text-blue-100/75 leading-relaxed max-w-sm">
              Gebäudedienstleistungen für Industrie, Verwaltung und Mittelstand, mit festen Teams und
              dokumentierter Qualitätskontrolle.
            </p>
            <address className="mt-6 not-italic text-[15px] leading-7 text-blue-100/75">
              {SITE.address.street}
              <br />
              {SITE.address.zip} {SITE.address.city}
              <br />
              <a href={SITE.phoneHref} className="font-semibold text-white hover:text-mint transition-colors">
                {SITE.phone}
              </a>
              <br />
              <a href={SITE.emailHref} className="hover:text-white transition-colors">
                {SITE.email}
              </a>
              <br />
              {SITE.hours}
            </address>
          </div>

          {/* Navigationsspalten */}
          {columns.map((col) => (
            <nav key={col.title} className="lg:col-span-2" aria-label={col.title}>
              <p className="text-sm font-semibold text-white mb-4">{col.title}</p>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link to={link.href} className={linkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Zweites Geschäftsfeld der GmbH — bewusst dezent, kein Ablenken vom
            Cleaning-Conversion-Ziel. Wechselseitige Verlinkung stärkt beide Marken. */}
        <p className="py-5 border-t border-white/15 text-[15px] text-blue-100/75">
          Unser zweites Geschäftsfeld:{' '}
          <a
            href={SITE.careUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-white underline underline-offset-4 decoration-white/40 hover:decoration-white"
          >
            AHAD Care, Unterstützung im Alltag
          </a>{' '}
          (ahad-care.de)
        </p>

        {/* Abschlusszeile — extra Bodenabstand auf Mobile, damit die fixe
            Sticky-CTA-Leiste die Rechtslinks nicht überdeckt. */}
        <div className="pt-5 pb-28 lg:pb-6 border-t border-white/15 flex flex-col md:flex-row md:items-center justify-between gap-4 text-[13px] text-blue-100/75">
          <p>
            © {new Date().getFullYear()} {SITE.legalName}. Alle Rechte vorbehalten.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link to="/impressum" className="hover:text-white transition-colors">
              Impressum
            </Link>
            <Link to="/datenschutz" className="hover:text-white transition-colors">
              Datenschutz
            </Link>
            <a
              href={SITE.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="AHAD Cleaning auf Instagram"
              className="hover:text-white transition-colors"
            >
              <Instagram size={18} aria-hidden="true" />
            </a>
            <a
              href={SITE.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="AHAD Cleaning auf LinkedIn"
              className="hover:text-white transition-colors"
            >
              <Linkedin size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
