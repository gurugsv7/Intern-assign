import { useCallback } from 'react';

export function useAnalytics() {
  const trackEvent = useCallback((eventName: string, params?: Record<string, any>) => {
    if (typeof window === 'undefined') {
      return;
    }

    const payload = {
      ...params,
      event_name: eventName,
      event_time: new Date().toISOString(),
    };

    const dataLayer = (window as any).dataLayer;
    if (Array.isArray(dataLayer)) {
      dataLayer.push({ event: eventName, ...payload });
    }

    if ((window as any).gtag) {
      (window as any).gtag('event', eventName, payload);
    }

    console.log(`[Analytics] Event: ${eventName}`, payload);
  }, []);

  return { trackEvent };
}
