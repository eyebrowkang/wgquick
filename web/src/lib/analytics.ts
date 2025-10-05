import { analyticsConfig } from '../config/analytics.ts';

type GtagArgs = [string, ...unknown[]];

declare global {
  interface Window {
    dataLayer?: GtagArgs[];
  }
}

let initialized = false;

export function initAnalytics() {
  const { measurementId, anonymizeIp } = analyticsConfig;
  if (!measurementId || typeof document === 'undefined' || initialized) {
    return;
  }

  initialized = true;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  script.crossOrigin = 'anonymous';
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  const gtag = (...args: GtagArgs) => {
    window.dataLayer?.push(args);
  };

  gtag('js', new Date());
  if (anonymizeIp) {
    gtag('config', measurementId, { anonymize_ip: true });
  } else {
    gtag('config', measurementId);
  }
}
