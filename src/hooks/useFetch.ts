import { useState, useEffect, useCallback } from 'react';

interface FetchOptions extends RequestInit {
  manual?: boolean;
}

export function useFetch<T>(url: string, options: FetchOptions = {}) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(!options.manual);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async (overrideOptions?: RequestInit) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url, { ...options, ...overrideOptions });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
    } catch (e) {
      setError(e instanceof Error ? e : new Error('An unknown error occurred'));
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  useEffect(() => {
    if (!options.manual) {
      fetchData();
    }
  }, [fetchData, options.manual]);

  return { data, loading, error, refetch: fetchData };
}
