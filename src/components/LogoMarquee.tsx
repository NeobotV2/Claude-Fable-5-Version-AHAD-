import { CLIENT_REFERENCES } from '@/lib/site';

/**
 * Endlos-Band der Referenzkunden — einheitliche Wortmarken in Markenfarbe
 * statt unscharfer Fremd-API-Logos (kein logo.clearbit / Google-Favicon mehr).
 * Wirkt konsistent und ist nicht von externer Verfügbarkeit abhängig. Sobald
 * freigegebene echte Logos vorliegen, können sie hier eingesetzt werden.
 */
export default function LogoMarquee() {
  return (
    <div className="flex overflow-hidden marquee-container mask-fade-x" aria-label="Referenzkunden von AHAD Cleaning">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="flex animate-marquee whitespace-nowrap shrink-0 gap-10 sm:gap-14 px-5 sm:px-7 items-center py-4"
          aria-hidden={i > 0}
        >
          {CLIENT_REFERENCES.map((ref, index) => (
            <span
              key={`${i}-${index}`}
              className="font-headline font-bold text-lg sm:text-xl tracking-tight text-navy/40 hover:text-navy transition-colors whitespace-nowrap select-none"
              title={ref.name}
            >
              {ref.name}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
