import type { ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}

/**
 * Inhalts-Wrapper ohne versteckten Ausgangszustand. Die früheren Motion-Props
 * bleiben aus Kompatibilitätsgründen Teil der API, Inhalte sind aber im SSR,
 * ohne JavaScript und bei langsamer Hydration sofort sichtbar.
 */
export default function Reveal({ children, className }: RevealProps) {
  return <div className={className}>{children}</div>;
}

/** Statische, direkt zugängliche Variante für große Headlines. */
export function RevealWords({ text, className }: { text: string; className?: string; delay?: number }) {
  return <span className={className}>{text}</span>;
}
