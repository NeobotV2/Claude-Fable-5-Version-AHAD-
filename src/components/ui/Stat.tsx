import { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useSpring, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';

interface CountUpProps {
  value: number;
  suffix?: string;
  className?: string;
}

/** Zahl, die beim Erscheinen hochzählt — Beleg statt Behauptung. */
export function CountUp({ value, suffix = '', className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const reduce = useReducedMotion();
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 60, damping: 18 });

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, value, motionValue]);

  useEffect(() => {
    if (reduce) {
      if (ref.current) ref.current.textContent = `${value}${suffix}`;
      return;
    }
    return spring.on('change', (latest) => {
      if (ref.current) ref.current.textContent = `${Math.round(latest)}${suffix}`;
    });
  }, [spring, suffix, value, reduce]);

  return (
    <span ref={ref} className={className}>
      0{suffix}
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
      {/* Auf dunklem Grund bewusst Weiß statt Mint — wirkt seriöser, Mint bleibt Detailakzent. */}
      <div className={cn('font-headline text-4xl lg:text-5xl font-bold tracking-tight', dark ? 'text-white' : 'text-brand')}>
        <CountUp value={value} suffix={suffix} />
      </div>
      <div className={cn('mt-2 text-[11px] font-bold uppercase tracking-[0.18em]', dark ? 'text-blue-100/70' : 'text-slate')}>
        {label}
      </div>
    </div>
  );
}
