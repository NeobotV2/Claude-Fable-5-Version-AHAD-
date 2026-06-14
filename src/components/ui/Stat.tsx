import { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useSpring, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';

interface CountUpProps {
  value: number;
  suffix?: string;
  className?: string;
}

/**
 * Zahl, die beim Erscheinen hochzählt — Beleg statt Behauptung.
 *
 * Robust by design: Ausgangs- und Fallback-Zustand ist IMMER die echte Zahl
 * (im JSX gerendert, daher auch im prerenderten HTML korrekt — gut für SEO).
 * Das Hochzählen ist nur Progressive Enhancement. Löst der In-View-Trigger
 * mobil mal nicht aus, bleibt der echte Wert stehen — nie eine 0.
 */
export function CountUp({ value, suffix = '', className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const reduce = useReducedMotion();
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 60, damping: 18 });

  // Anzeige an den Spring koppeln. Solange nichts ausgelöst wurde, ruht der
  // Spring bei 0 und sendet kein 'change' — der echte JSX-Wert bleibt stehen.
  useEffect(() => {
    return spring.on('change', (latest) => {
      if (ref.current) ref.current.textContent = `${Math.round(latest)}${suffix}`;
    });
  }, [spring, suffix]);

  // Auslösen, sobald sichtbar. Bei reduzierter Bewegung gar nicht animieren —
  // dann bleibt der echte Wert ohne Umweg stehen.
  useEffect(() => {
    if (!reduce && inView) motionValue.set(value);
  }, [inView, reduce, value, motionValue]);

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  );
}

interface StatProps {
  value: number;
  suffix?: string;
  label: string;
  dark?: boolean;
  className?: string;
}

export default function Stat({ value, suffix, label, dark = false, className }: StatProps) {
  return (
    <div className={cn('min-w-0', className)}>
      {/* Zahlen in Space Grotesk (CI: digitaler Akzent); auf Dunkel Weiß statt Tint. */}
      <div className={cn('font-accent text-4xl lg:text-5xl font-bold tracking-tight', dark ? 'text-white' : 'text-brand')}>
        <CountUp value={value} suffix={suffix} />
      </div>
      <div className={cn('mt-2 text-[11px] font-bold uppercase tracking-[0.18em]', dark ? 'text-blue-100/70' : 'text-slate')}>
        {label}
      </div>
    </div>
  );
}
