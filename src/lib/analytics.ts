import { track } from '@vercel/analytics/react';
import { useEffect, useRef } from 'react';

type Property = string | number | boolean | null | undefined;

export interface AttributionContext {
  landingPath: string;
  entryPath: string;
  entryService: string;
  entryIndustry: string;
  entryRegion: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  referrerHost: string;
}

const ATTRIBUTION_KEY = 'ahad-attribution';

const clean = (value: string | null | undefined, max = 120) =>
  String(value ?? '')
    .replace(/[^\p{L}\p{N} _./:-]/gu, '')
    .slice(0, max);

const pathOnly = (value: string) => {
  try {
    const url = new URL(value, window.location.origin);
    return clean(url.pathname, 180) || '/';
  } catch {
    return '/';
  }
};

const contextFromPath = (pathname: string) => {
  const segments = pathname.split('/').filter(Boolean);
  return {
    entryService: segments[0] === 'leistungen' ? clean(segments[1]) : '',
    entryIndustry: segments[0] === 'branchen' ? clean(segments[1]) : '',
    entryRegion: segments[0] === 'standorte' ? clean(segments[1]) : '',
  };
};

export function trackEvent(name: string, properties: Record<string, Property> = {}) {
  if (typeof window === 'undefined') return;
  const safeProperties = Object.fromEntries(
    Object.entries(properties).map(([key, value]) => [
      clean(key, 40),
      typeof value === 'string' ? clean(value) : value,
    ]),
  );
  track(clean(name, 60), safeProperties);
}

export function rememberAttribution(entryUrl = window.location.href): AttributionContext {
  const entryPath = pathOnly(entryUrl);
  const previous = readAttribution();
  const query = new URL(entryUrl, window.location.origin).searchParams;
  const pathContext = contextFromPath(entryPath);
  let referrerHost = '';
  try {
    referrerHost = document.referrer ? clean(new URL(document.referrer).hostname) : '';
  } catch {
    referrerHost = '';
  }
  const context: AttributionContext = {
    landingPath: previous?.landingPath || pathOnly(window.location.href),
    entryPath,
    ...pathContext,
    utmSource: clean(query.get('utm_source') || previous?.utmSource),
    utmMedium: clean(query.get('utm_medium') || previous?.utmMedium),
    utmCampaign: clean(query.get('utm_campaign') || previous?.utmCampaign),
    referrerHost: previous?.referrerHost || referrerHost,
  };
  try {
    sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(context));
  } catch {
    // Attribution is optional; form submission must never depend on storage.
  }
  return context;
}

export function readAttribution(): AttributionContext | null {
  if (typeof window === 'undefined') return null;
  try {
    const parsed = JSON.parse(sessionStorage.getItem(ATTRIBUTION_KEY) || 'null');
    return parsed && typeof parsed === 'object' ? parsed as AttributionContext : null;
  } catch {
    return null;
  }
}

export function stripAnalyticsQuery(url: string): string {
  if (typeof window === 'undefined') return url.split('?')[0];
  try {
    const parsed = new URL(url, window.location.origin);
    return `${parsed.origin}${parsed.pathname}`;
  } catch {
    return url.split('?')[0];
  }
}

/** Tracks a genuine route exit after a funnel start, while avoiding React
 * StrictMode's development-only mount/unmount probe. Properties stay PII-free. */
export function useFunnelAbandonment(
  funnel: 'Offer Funnel' | 'Application Funnel',
  step: number,
  completed: boolean,
  properties: Record<string, Property> = {},
) {
  const stateRef = useRef({ step, completed, properties });
  stateRef.current = { step, completed, properties };

  useEffect(() => {
    let committed = false;
    const timer = window.setTimeout(() => { committed = true; }, 0);
    return () => {
      window.clearTimeout(timer);
      const state = stateRef.current;
      if (committed && !state.completed) {
        trackEvent(`${funnel} Abandon`, { ...state.properties, step: state.step });
      }
    };
  }, [funnel]);
}
