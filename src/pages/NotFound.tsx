import { Link } from 'react-router-dom';
import { Home, ArrowRight, Sparkles } from 'lucide-react';
import SEO from '@/components/SEO';
import ButtonLink from '@/components/ui/Button';

const quickLinks = [
  { label: 'Unsere Leistungen', href: '/leistungen' },
  { label: 'Angebot anfordern', href: '/angebot' },
  { label: 'Kontakt', href: '/kontakt' },
];

export default function NotFound() {
  return (
    <div className="relative min-h-[100svh] flex items-center bg-navy text-white overflow-hidden grain">
      <SEO
        title="Seite nicht gefunden (404) | AHAD Cleaning"
        description="Diese Seite existiert nicht mehr oder wurde verschoben."
        noindex
      />
      <div className="absolute inset-0 blueprint-grid" />
      <div className="absolute -top-40 -right-40 w-[34rem] h-[34rem] rounded-full bg-brand/30 blur-[140px]" />
      <div className="absolute -bottom-40 -left-40 w-[30rem] h-[30rem] rounded-full bg-accent/20 blur-[140px]" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-8 py-40 text-center">
        <span className="eyebrow text-mint justify-center mb-6">
          <Sparkles size={14} />
          Hier wurde zu gründlich aufgeräumt
        </span>
        <h1 className="font-logo font-black text-[clamp(6rem,20vw,12rem)] leading-none tracking-tighter text-white/95">
          404
        </h1>
        <p className="text-xl text-blue-100/85 font-medium mt-6 mb-10 max-w-xl mx-auto">
          Diese Seite existiert nicht mehr oder wurde verschoben. Was wir Ihnen stattdessen anbieten können:
          blitzsaubere Wege zurück.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
          <ButtonLink to="/" size="lg" arrow>
            <span className="inline-flex items-center gap-2">
              <Home size={17} />
              Zur Startseite
            </span>
          </ButtonLink>
          <ButtonLink to="/angebot" variant="outline-light" size="lg">
            Kostenlose Besichtigung anfragen
          </ButtonLink>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-blue-100/75 hover:text-mint bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-full transition-colors"
            >
              {link.label}
              <ArrowRight size={13} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
