const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const YF_CHART_SYMBOLS = [
  '^STOXX50E', '^GDAXI', '^FCHI', '^FTSE',
  '^GSPC', '^NDX', '^DJI', '^N225', '^VIX',
  'GC=F', 'CL=F',
];

const YF_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept': 'application/json',
};

function prevBusinessDay(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  while (d.getDay() === 0 || d.getDay() === 6) d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

async function fetchChart(sym: string): Promise<{ symbol: string; price: number; prev: number } | null> {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(sym)}?interval=1d&range=2d`;
  try {
    const r = await fetch(url, { headers: YF_HEADERS });
    const d = await r.json();
    const meta = d?.chart?.result?.[0]?.meta;
    if (meta?.regularMarketPrice && meta?.chartPreviousClose) {
      return { symbol: sym, price: meta.regularMarketPrice, prev: meta.chartPreviousClose };
    }
    console.warn(`[market-data] ${sym}: missing price in response`);
    return null;
  } catch (e) {
    console.warn(`[market-data] ${sym}: fetch error`, e);
    return null;
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const ydStr = prevBusinessDay();

    // Fetch FX + all equity charts in parallel
    const [fxCurrRes, fxPrevRes, ...chartResults] = await Promise.allSettled([
      fetch('https://open.er-api.com/v6/latest/EUR'),
      fetch(`https://api.frankfurter.app/${ydStr}?from=EUR&to=USD,GBP,JPY`),
      ...YF_CHART_SYMBOLS.map(fetchChart),
    ]);

    // FX current rates
    let fxCurr: Record<string, number> | null = null;
    if (fxCurrRes.status === 'fulfilled') {
      const d = await fxCurrRes.value.json();
      if (d.result === 'success') fxCurr = d.rates;
    }

    // FX previous day (for % change)
    let fxPrev: Record<string, number> | null = null;
    if (fxPrevRes.status === 'fulfilled') {
      const d = await fxPrevRes.value.json();
      if (d.rates) fxPrev = d.rates;
    }

    // Equities + Commodities
    const quotes = chartResults
      .map(r => r.status === 'fulfilled' ? r.value : null)
      .filter(Boolean) as Array<{ symbol: string; price: number; prev: number }>;

    const payload = { fxCurr, fxPrev, quotes };
    console.log('[market-data] fxCurr:', !!fxCurr, '| fxPrev:', !!fxPrev, '| quotes:', quotes.length, '/', YF_CHART_SYMBOLS.length);

    return new Response(JSON.stringify(payload), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    console.error('[market-data] error:', err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
