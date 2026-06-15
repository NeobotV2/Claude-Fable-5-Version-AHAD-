import type { ReactNode } from 'react';
import { ShieldCheck, Users, Clock, UserRound, BadgeCheck, Star } from 'lucide-react';
import { GOOGLE_RATING, TRUST_BADGES } from '@/lib/site';

const ICONS: Record<string, ReactNode> = {
  users: <Users className="w-5 h-5" />,
  shield: <ShieldCheck className="w-5 h-5" />,
  clock: <Clock className="w-5 h-5" />,
  user: <UserRound className="w-5 h-5" />,
  badge: <BadgeCheck className="w-5 h-5" />,
};

/**
 * Schlankes Trust-Band direkt unter dem Hero: öffentliche Google-Bewertung
 * (verlinkt) + belegbare Vertrauenssignale. Front-loaded Seriosität, ohne die
 * Seite zu verlängern.
 */
export default function TrustBand() {
  const href = GOOGLE_RATING.url || GOOGLE_RATING.searchFallback;
  const value = GOOGLE_RATING.value.toFixed(1).replace('.', ',');
  const filled = Math.round(GOOGLE_RATING.value);

  return (
    <section className="bg-white border-b border-line" aria-label="Vertrauen & Bewertungen">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-9">
        {/* Google-Bewertung */}
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 flex-shrink-0"
          aria-label={`${value} von 5 Sternen aus ${GOOGLE_RATING.count} Google-Bewertungen`}
        >
          <span className="font-accent text-3xl font-bold text-navy leading-none">{value}</span>
          <span>
            <span className="flex gap-0.5" aria-hidden>
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={15} className={i <= filled ? 'fill-amber-400 text-amber-400' : 'text-gray-300'} />
              ))}
            </span>
            <span className="block text-[12px] text-slate mt-1 group-hover:text-brand transition-colors">
              {GOOGLE_RATING.count} Google-Bewertungen ↗
            </span>
          </span>
        </a>

        <span className="hidden lg:block w-px h-12 bg-line flex-shrink-0" aria-hidden />

        {/* Belegbare Vertrauenssignale */}
        <ul className="flex flex-wrap gap-x-7 gap-y-3">
          {TRUST_BADGES.map((b) => (
            <li key={b.label} className="flex items-center gap-2.5">
              <span className="text-accent flex-shrink-0" aria-hidden>
                {ICONS[b.icon] ?? <BadgeCheck className="w-5 h-5" />}
              </span>
              <span className="leading-tight">
                <span className="block text-[13px] font-bold text-navy">{b.label}</span>
                <span className="block text-[11px] text-slate">{b.sub}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
