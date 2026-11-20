import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type StepState = { funnelStep?: number; funnelPushed?: boolean } | null;

/**
 * Schritt eines mehrstufigen Formulars im Browser-Verlauf statt nur im State.
 * So führt die Zurück-Taste des Browsers (und die Wischgeste am Handy) einen
 * Schritt zurück, statt das Formular zu verlassen. Ein Neuladen behält den Schritt.
 *
 * Der Schritt liegt im Verlaufs-Eintrag (location.state), nicht in der URL:
 * Pfad und Suchparameter bleiben gleich, damit Seitenwechsel-Effekte
 * (Scroll nach oben, Titelansage, Kampagnenparameter) nicht bei jedem Schritt auslösen.
 *
 * @param max       letzter Schritt
 * @param reachable höchster Schritt, für den die nötigen Angaben vorliegen
 */
export function useHistoryStep(max: number, reachable: number = max) {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as StepState;
  const requested = typeof state?.funnelStep === 'number' ? state.funnelStep : 1;
  const step = Math.max(1, Math.min(requested, reachable, max));

  const goTo = useCallback(
    (target: number, { replace = false }: { replace?: boolean } = {}) => {
      navigate(
        { pathname: location.pathname, search: location.search, hash: location.hash },
        { replace, state: { funnelStep: Math.max(1, Math.min(target, max)), funnelPushed: !replace } },
      );
    },
    [location.hash, location.pathname, location.search, max, navigate],
  );

  const next = useCallback(() => goTo(step + 1), [goTo, step]);

  const back = useCallback(() => {
    // Wurde dieser Schritt per „Weiter“ erreicht, ist „Zurück“ derselbe Weg wie
    // die Browser-Taste. Sonst (z. B. nach Neuladen) den Eintrag ersetzen.
    if (state?.funnelPushed && step > 1) navigate(-1);
    else goTo(step - 1, { replace: true });
  }, [goTo, navigate, state?.funnelPushed, step]);

  return { step, next, back, goTo, hasStoredStep: typeof state?.funnelStep === 'number' };
}
