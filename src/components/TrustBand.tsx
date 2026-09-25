import type { ReactNode } from 'react';
import { ShieldCheck, Users, Clock, UserRound, BadgeCheck } from 'lucide-react';
import { TRUST_BADGES } from '@/lib/site';

const ICONS: Record<string, ReactNode> = {
  users: <Users className="w-5 h-5" />,
  shield: <ShieldCheck className="w-5 h-5" />,
  clock: <Clock className="w-5 h-5" />,
  user: <UserRound className="w-5 h-5" />,
  badge: <BadgeCheck className="w-5 h-5" />,
};

/**
 * Schlankes Trust-Band direkt unter dem Hero: belegbare Vertrauenssignale in
 * einer Zeile. Google-Wertung, Mitarbeiterzahl und Jahre am Markt stehen
 * bereits im Hero und in der Zahlenleiste darüber — hier nicht ein zweites Mal.
 */
export default function TrustBand() {
  if (TRUST_BADGES.length === 0) return null;

  return (
    <section className="bg-white border-b border-line" aria-label="Zertifikate und Absicherung">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-7 gap-y-4">
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
