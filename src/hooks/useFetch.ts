import { useState, useEffect, useCallback, useRef } from 'react';

interface FetchOptions extends RequestInit {
  manual?: boolean;
}

type FetchSource<T> = string | (() => Promise<T>);

export function useFetch<T>(source: FetchSource<T>, options: FetchOptions = {}) {
  const { manual = false, ...requestOptions } = options;
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(!manual);
  const [error, setError] = useState<Error | null>(null);
  const optionsRef = useRef<RequestInit>(requestOptions);

  useEffect(() => {
    optionsRef.current = requestOptions;
  }, [requestOptions]);

  const fetchData = useCallback(async (overrideOptions?: RequestInit) => {
    setLoading(true);
    setError(null);
    try {
      if (typeof source === 'function') {
        const result = await source();
        setData(result);
      } else {
        const response = await fetch(source, { ...optionsRef.current, ...overrideOptions });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      }
    } catch (e) {
      setError(e instanceof Error ? e : new Error('An unknown error occurred'));
    } finally {
      setLoading(false);
    }
  }, [source]);

  useEffect(() => {
    if (!manual) {
      fetchData();
    }
  }, [fetchData, manual]);

  return { data, loading, error, refetch: fetchData, setData };
}
