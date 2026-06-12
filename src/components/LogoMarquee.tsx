import { CLIENT_REFERENCES } from '@/lib/site';

/** Endlos-Band der Kundenlogos — Social Proof in Bewegung. */
export default function LogoMarquee() {
  return (
    <div className="flex overflow-hidden marquee-container mask-fade-x" aria-label="Referenzkunden von AHAD Cleaning">
      {[0, 1, 2].map((i) => (
        <div key={i} className="flex animate-marquee whitespace-nowrap shrink-0 gap-16 px-8 items-center py-4" aria-hidden={i > 0}>
          {CLIENT_REFERENCES.map((ref, index) => (
            <a
              key={`${i}-${index}`}
              href={`https://${ref.domain}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center"
              title={ref.name}
              tabIndex={i > 0 ? -1 : undefined}
            >
              <img
                src={ref.logoUrl || `https://logo.clearbit.com/${ref.domain}`}
                alt={`${ref.name} Logo`}
                className="h-9 w-auto object-contain max-w-[150px] reference-logo"
                loading="lazy"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (!target.src.includes('google.com')) {
                    target.src = `https://www.google.com/s2/favicons?domain=${ref.domain}&sz=128`;
                  }
                }}
              />
            </a>
          ))}
        </div>
      ))}
    </div>
  );
}
