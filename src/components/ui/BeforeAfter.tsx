import { useCallback, useId, useRef, useState } from 'react';
import { ChevronsLeftRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { srcSetFor } from '@/lib/images';

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
  const instructionsId = useId();
  const [position, setPosition] = useState(58);
  const [dragging, setDragging] = useState(false);
  const [rangeFocused, setRangeFocused] = useState(false);

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
        'relative w-full aspect-[16/10] sm:aspect-[16/9] overflow-hidden select-none',
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
        srcSet={srcSetFor(afterSrc)}
        sizes="(min-width:1024px) 50vw, 100vw"
        alt={afterLabel}
        draggable={false}
        loading="lazy"
        decoding="async"
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
          srcSet={srcSetFor(beforeSrc)}
          sizes="(min-width:1024px) 50vw, 100vw"
          alt=""
          draggable={false}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover grayscale-[35%] brightness-[0.82] contrast-[0.95]"
        />
      </div>

      {/* Labels */}
      <span className="absolute top-0 left-0 bg-navy text-white text-caption font-semibold px-3.5 py-2 pointer-events-none">
        {beforeLabel}
      </span>
      <span className="absolute top-0 right-0 bg-accent text-white text-caption font-semibold px-3.5 py-2 pointer-events-none">
        {afterLabel}
      </span>

      <p id={instructionsId} className="sr-only">
        Mit den Pfeiltasten lässt sich der sichtbare Anteil in Ein-Prozent-Schritten verändern.
      </p>

      {/* Tastatur-Bedienung: unsichtbare Bedienfläche, sichtbarer Fokus am Griff. */}
      <input
        type="range"
        min={4}
        max={96}
        value={Math.round(position)}
        onChange={(e) => setPosition(Number(e.target.value))}
        aria-label="Vorher-Nachher-Vergleich verschieben"
        aria-describedby={instructionsId}
        aria-valuetext={`${Math.round(position)} Prozent ${beforeLabel}, ${100 - Math.round(position)} Prozent ${afterLabel}`}
        onFocus={() => setRangeFocused(true)}
        onBlur={() => setRangeFocused(false)}
        className="peer absolute inset-0 z-10 w-full h-full opacity-0 cursor-ew-resize focus-visible:outline-none"
      />

      {/* Trennlinie + Griff */}
      <div className="absolute inset-y-0 pointer-events-none" style={{ left: `${position}%` }} aria-hidden>
        <div className="absolute inset-y-0 -translate-x-1/2 w-0.5 bg-white" />
        <div
          className={cn(
            'absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-white grid place-items-center text-navy',
            rangeFocused && 'ring-4 ring-mint ring-offset-4 ring-offset-navy'
          )}
        >
          <ChevronsLeftRight size={20} />
        </div>
      </div>
    </div>
  );
}
