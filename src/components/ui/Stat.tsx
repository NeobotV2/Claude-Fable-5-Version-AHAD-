import { cn } from '@/lib/utils';

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
      {/* Zahlen in Space Grotesk (CI: digitaler Akzent). Fest gesetzt statt
          hochgezählt: Die Zahl ist ein Beleg, kein Effekt. */}
      <div
        className={cn(
          'font-accent text-4xl lg:text-[2.75rem] leading-none font-semibold tracking-tight tabular-nums',
          dark ? 'text-white' : 'text-navy'
        )}
      >
        {value}
        {suffix}
      </div>
      <div className={cn('mt-2.5 text-sm', dark ? 'text-blue-100/80' : 'text-slate')}>{label}</div>
    </div>
  );
}
