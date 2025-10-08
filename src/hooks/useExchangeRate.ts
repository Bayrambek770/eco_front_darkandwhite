import { useEffect, useState } from 'react';

type RateResult = {
  rate: number | null;
  loading: boolean;
  error: string | null;
  updatedAt: number | null;
};

const STORAGE_KEY = 'rate:UZS-USD';
const TTL_MS = 12 * 60 * 60 * 1000; // 12 hours

export function useUzsToUsdRate(): RateResult {
  const [state, setState] = useState<RateResult>({ rate: null, loading: true, error: null, updatedAt: null });

  useEffect(() => {
    const cachedRaw = localStorage.getItem(STORAGE_KEY);
    if (cachedRaw) {
      try {
        const cached = JSON.parse(cachedRaw) as { rate: number; updatedAt: number };
        if (Date.now() - cached.updatedAt < TTL_MS) {
          setState({ rate: cached.rate, loading: false, error: null, updatedAt: cached.updatedAt });
        }
      } catch {
        // ignore parse errors
      }
    }

    let aborted = false;
    (async () => {
      try {
        // exchangerate.host is free and doesn't require an API key
        const url = 'https://api.exchangerate.host/latest?base=UZS&symbols=USD';
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const rate = Number(data?.rates?.USD);
        if (!rate || !isFinite(rate)) throw new Error('Invalid rate');
        if (!aborted) {
          const updatedAt = Date.now();
          localStorage.setItem(STORAGE_KEY, JSON.stringify({ rate, updatedAt }));
          setState({ rate, loading: false, error: null, updatedAt });
        }
      } catch (e: any) {
        if (!aborted) {
          // Fallback to cached if present, else a conservative default
          const cachedRaw2 = localStorage.getItem(STORAGE_KEY);
          if (cachedRaw2) {
            try {
              const cached = JSON.parse(cachedRaw2) as { rate: number; updatedAt: number };
              setState({ rate: cached.rate, loading: false, error: null, updatedAt: cached.updatedAt });
              return;
            } catch {}
          }
          // Approximate default: 1 USD ≈ 12500 UZS => USD per UZS ≈ 1/12500
          const fallbackRate = 1 / 12500;
          setState({ rate: fallbackRate, loading: false, error: e?.message ?? 'Failed to load rate', updatedAt: null });
        }
      }
    })();

    return () => {
      aborted = true;
    };
  }, []);

  return state;
}
