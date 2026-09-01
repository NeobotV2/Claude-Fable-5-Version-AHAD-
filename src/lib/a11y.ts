/** Nutzerpräferenz „Bewegung reduzieren“ – für JS-gesteuertes Scrollen/Animationen. */
export function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}
