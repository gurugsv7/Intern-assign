import { useCallback } from 'react';

export function useAnalytics() {
  const trackEvent = useCallback((eventName: string, params?: Record<string, any>) => {
    console.log(`[Analytics] Event: ${eventName}`, params);
    // In a real app, you'd call window.gtag or similar
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', eventName, params);
    }
  }, []);

  return { trackEvent };
}
