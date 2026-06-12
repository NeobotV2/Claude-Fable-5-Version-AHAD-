import { useCallback, useRef, useState } from 'react';
import { ChevronsLeftRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BeforeAfterProps {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}

/**
 * Interaktiver Vorher/Nachher-Vergleich.
 * Bedienbar per Maus, Touch und Tastatur (verstecktes Range-Input).
 */
export default function BeforeAfter({
  beforeSrc,
  afterSrc,
  beforeLabel = 'Vorher',
  afterLabel = 'Nachher',
  className,
}: BeforeAfterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(58);
  const [dragging, setDragging] = useState(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(96, Math.max(4, pct)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    setDragging(true);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    updateFromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (dragging) updateFromClientX(e.clientX);
  };
  const stopDragging = () => setDragging(false);

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden select-none shadow-lifted border border-white/10',
        dragging ? 'cursor-grabbing' : 'cursor-grab',
        className
      )}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
      onPointerLeave={stopDragging}
    >
      {/* Nachher (volle Fläche, Basis) */}
      <img
        src={afterSrc}
        alt={afterLabel}
        draggable={false}
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Vorher — wird per clip-path freigelegt */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        aria-hidden
      >
        <img
          src={beforeSrc}
          alt=""
          draggable={false}
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover grayscale-[35%] brightness-[0.82] contrast-[0.95]"
        />
      </div>

      {/* Labels */}
      <span className="absolute top-4 left-4 glass-dark text-white text-[11px] font-black uppercase tracking-[0.18em] px-3.5 py-2 rounded-full pointer-events-none">
        {beforeLabel}
      </span>
      <span className="absolute top-4 right-4 bg-accent text-white text-[11px] font-black uppercase tracking-[0.18em] px-3.5 py-2 rounded-full pointer-events-none shadow-glow">
        {afterLabel}
      </span>

      {/* Trennlinie + Griff */}
      <div className="absolute inset-y-0 pointer-events-none" style={{ left: `${position}%` }} aria-hidden>
        <div className="absolute inset-y-0 -translate-x-1/2 w-[3px] bg-white shadow-[0_0_24px_rgb(0_0_0/0.45)]" />
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-white shadow-lifted grid place-items-center text-navy">
          <ChevronsLeftRight size={24} />
        </div>
      </div>

      {/* Tastatur-Bedienung */}
      <input
        type="range"
        min={4}
        max={96}
        value={Math.round(position)}
        onChange={(e) => setPosition(Number(e.target.value))}
        aria-label="Vorher-Nachher-Vergleich verschieben"
        className="absolute inset-0 w-full h-full opacity-0"
        style={{ cursor: 'inherit' }}
      />
    </div>
  );
}
