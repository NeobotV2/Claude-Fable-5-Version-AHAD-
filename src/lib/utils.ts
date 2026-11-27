import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

/**
 * tailwind-merge kennt nur die Standard-Schriftgrößen. Die eigenen Größen aus
 * index.css (text-caption, text-nav …) müssen hier angemeldet sein — sonst
 * hält es sie für Textfarben und wirft z. B. `text-white` neben `text-nav`
 * weg (weiße Schrift auf Schaltflächen ginge verloren).
 * Neue Größen-Tokens bitte hier ergänzen.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [{ text: ['caption', 'nav', 'body-sm', 'lead', 'figure'] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
