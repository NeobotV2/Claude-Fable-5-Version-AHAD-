import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Instagram, Linkedin, Clock, ShieldCheck, BadgeCheck, FileCheck2, ArrowRight } from 'lucide-react';
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
      { label: 'Standorte & Regionen', href: '/standorte' },
      { label: 'Karriere', href: '/karriere' },
      { label: 'Fachwissen', href: '/fachwissen' },
    ],
  },
];

const areas = [
  { label: 'Villingen-Schwenningen', href: '/standorte/villingen-schwenningen' },
  { label: 'Stuttgart', href: '/standorte/stuttgart' },
  { label: 'Konstanz', href: '/standorte/konstanz' },
  { label: 'Schwarzwald-Baar-Kreis', href: '/standorte' },
];

export default function Footer() {
  return (
    <footer className="relative bg-navy-900 text-white overflow-hidden grain">
      <div className="absolute inset-0 blueprint-grid opacity-50" />
      <div className="absolute -top-48 right-0 w-[36rem] h-[36rem] rounded-full bg-brand/25 blur-[160px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
        {/* Standort-Leiste — lokale Relevanz & SEO */}
        <div className="py-8 border-b border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <p className="font-bold text-lg text-white">
            Gebäudereinigung für <span className="text-mint">Süddeutschland</span>
          </p>
          <div className="flex flex-wrap gap-2.5">
            {areas.map((area) => (
              <Link
                key={area.label}
                to={area.href}
                className="flex items-center gap-1.5 text-[13px] font-semibold bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 px-3.5 py-2 rounded-full transition-colors text-blue-100/90"
              >
                <MapPin size={13} className="text-mint" />
                {area.label}
              </Link>
            ))}
          </div>
        </div>

        {/* 12-Spalten-Raster: Marke 3 · 3× Nav je 2 · Kontakt 3 —
            Kontakt bewusst breit, damit Adresse & E-Mail nicht umbrechen. */}
        <div className="py-14 lg:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-12">
          {/* Marke */}
          <div className="md:col-span-2 lg:col-span-3 space-y-6">
            <div className="space-y-3">
              <Logo variant="dark" size={42} />
              {/* Marken-Claim als konsistente Signatur (Designbook: der eine Claim) */}
              <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-mint">{CLAIM}</p>
            </div>
            <p className="text-blue-100/70 leading-relaxed">
              Systematische Gebäudedienstleistungen für Industrie, Verwaltung und Mittelstand — messbar,
              dokumentiert, verlässlich.
            </p>
            <div className="flex flex-wrap gap-2.5">
              {[
                { icon: <ShieldCheck size={13} />, label: '24h Reaktionszeit' },
                { icon: <BadgeCheck size={13} />, label: 'Voll versichert' },
                { icon: <FileCheck2 size={13} />, label: 'Dokumentiert' },
              ].map((badge) => (
                <span
                  key={badge.label}
                  className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-mint bg-mint/10 border border-mint/20 px-3 py-1.5 rounded-full"
                >
                  {badge.icon}
                  {badge.label}
                </span>
              ))}
            </div>
            <Link
              to="/angebot"
              className="group inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white text-sm font-bold px-5 py-3 rounded-xl transition-colors"
            >
              Kostenlose Besichtigung anfragen
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Navigationsspalten */}
          {columns.map((col) => (
            <nav key={col.title} className="lg:col-span-2" aria-label={col.title}>
              <h4 className="text-[12px] font-black uppercase tracking-[0.2em] text-blue-100/80 mb-5">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-[14px] font-medium text-blue-100/75 hover:text-mint transition-colors link-underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Kontakt — breitere Spalte, damit Adresse & E-Mail nicht umbrechen */}
          <div className="lg:col-span-3">
            <h4 className="text-[12px] font-black uppercase tracking-[0.2em] text-blue-100/80 mb-5">Kontakt</h4>
            <ul className="space-y-4 text-[14px] mb-6">
              <li className="flex gap-3">
                <MapPin size={17} className="text-mint flex-shrink-0 mt-0.5" />
                <span className="text-blue-100/75">
                  {SITE.address.street}
                  <br />
                  {SITE.address.zip} {SITE.address.city}
                </span>
              </li>
              <li className="flex gap-3">
                <Phone size={17} className="text-mint flex-shrink-0 mt-0.5" />
                <a href={SITE.phoneHref} className="text-white font-bold hover:text-mint transition-colors">
                  {SITE.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail size={17} className="text-mint flex-shrink-0 mt-0.5" />
                <a href={SITE.emailHref} className="text-blue-100/75 hover:text-mint transition-colors">
                  {SITE.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Clock size={17} className="text-mint flex-shrink-0 mt-0.5" />
                <span className="text-blue-100/75">{SITE.hours}</span>
              </li>
            </ul>

            <div className="flex items-center gap-3">
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-blue-100/40">Folgen</span>
              <a
                href={SITE.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="AHAD Cleaning auf Instagram"
                className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl grid place-items-center hover:bg-accent hover:border-accent transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href={SITE.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="AHAD Cleaning auf LinkedIn"
                className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl grid place-items-center hover:bg-accent hover:border-accent transition-colors"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar — extra Bodenabstand auf Mobile, damit die fixe
            Sticky-CTA-Leiste die Rechtslinks nicht überdeckt. */}
        <div className="pt-7 pb-28 lg:pb-7 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[13px] text-blue-100/80">
          <p>
            © {new Date().getFullYear()} {SITE.legalName}. Alle Rechte vorbehalten.
          </p>
          <div className="flex gap-8">
            <Link to="/impressum" className="hover:text-white transition-colors">
              Impressum
            </Link>
            <Link to="/datenschutz" className="hover:text-white transition-colors">
              Datenschutz
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
