import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Instagram, Linkedin, Clock, ShieldCheck, BadgeCheck, FileCheck2 } from 'lucide-react';
import Logo from '@/components/Logo';
import { SITE } from '@/lib/site';

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

export default function Footer() {
  return (
    <footer className="relative bg-navy-900 text-white overflow-hidden grain">
      <div className="absolute inset-0 blueprint-grid opacity-50" />
      <div className="absolute -top-48 right-0 w-[36rem] h-[36rem] rounded-full bg-brand/25 blur-[160px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
        {/* Standort-Leiste — lokale Relevanz & SEO */}
        <div className="py-10 border-b border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <p className="font-headline font-bold text-lg text-white">
            Gebäudereinigung für <span className="text-mint">Süddeutschland</span>
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Villingen-Schwenningen', href: '/standorte/villingen-schwenningen' },
              { label: 'Stuttgart', href: '/standorte/stuttgart' },
              { label: 'Konstanz', href: '/standorte/konstanz' },
              { label: 'Schwarzwald-Baar-Kreis', href: '/standorte' },
            ].map((area) => (
              <Link
                key={area.label}
                to={area.href}
                className="flex items-center gap-1.5 text-[13px] font-semibold bg-white/5 hover:bg-white/10 border border-white/10 px-3.5 py-2 rounded-full transition-colors text-blue-100/90"
              >
                <MapPin size={13} className="text-mint" />
                {area.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Hauptbereich */}
        <div className="py-16 lg:py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4 space-y-7">
            <Logo variant="dark" />
            <p className="text-blue-100/70 leading-relaxed max-w-sm">
              Systematische Gebäudedienstleistungen für Industrie, Verwaltung und Mittelstand. Struktur, Sauberkeit
              und Sicherheit — messbar, dokumentiert, verlässlich.
            </p>
            <div className="flex flex-wrap gap-2.5">
              {[
                { icon: <ShieldCheck size={13} />, label: '24h Reaktionszeit' },
                { icon: <BadgeCheck size={13} />, label: 'Voll versichert' },
                { icon: <FileCheck2 size={13} />, label: 'Dokumentierte Qualität' },
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
            <div className="flex gap-3">
              <a
                href={SITE.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl grid place-items-center hover:bg-brand hover:border-brand transition-colors"
              >
                <Instagram className="w-4.5 h-4.5" size={18} />
              </a>
              <a
                href={SITE.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl grid place-items-center hover:bg-brand hover:border-brand transition-colors"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {columns.map((col) => (
            <nav key={col.title} className="lg:col-span-2" aria-label={col.title}>
              <h4 className="text-[12px] font-black uppercase tracking-[0.2em] text-blue-100/50 mb-6">{col.title}</h4>
              <ul className="space-y-3.5">
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

          <div className="lg:col-span-2">
            <h4 className="text-[12px] font-black uppercase tracking-[0.2em] text-blue-100/50 mb-6">Kontakt</h4>
            <ul className="space-y-5 text-[14px]">
              <li className="flex gap-3">
                <MapPin className="w-4.5 h-4.5 text-mint flex-shrink-0 mt-0.5" size={18} />
                <span className="text-blue-100/75">
                  {SITE.address.street}
                  <br />
                  {SITE.address.zip} {SITE.address.city}
                </span>
              </li>
              <li className="flex gap-3">
                <Phone className="w-4.5 h-4.5 text-mint flex-shrink-0 mt-0.5" size={18} />
                <a href={SITE.phoneHref} className="text-white font-bold hover:text-mint transition-colors">
                  {SITE.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="w-4.5 h-4.5 text-mint flex-shrink-0 mt-0.5" size={18} />
                <a href={SITE.emailHref} className="text-blue-100/75 hover:text-mint transition-colors break-all">
                  {SITE.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Clock className="w-4.5 h-4.5 text-mint flex-shrink-0 mt-0.5" size={18} />
                <span className="text-blue-100/75">{SITE.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[13px] text-blue-100/50">
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
