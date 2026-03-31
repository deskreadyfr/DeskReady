const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const YF_SYMBOLS = '^STOXX50E,^GDAXI,^FCHI,^FTSE,^GSPC,^NDX,^DJI,^N225,^VIX,GC=F,CL=F';

function prevBusinessDay(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  while (d.getDay() === 0 || d.getDay() === 6) d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const ydStr = prevBusinessDay();

    const [fxCurrRes, fxPrevRes, yfRes] = await Promise.allSettled([
      fetch('https://open.er-api.com/v6/latest/EUR'),
      fetch(`https://api.frankfurter.app/${ydStr}?from=EUR&to=USD,GBP,JPY`),
      fetch(
        `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${YF_SYMBOLS}`,
        { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; DeskReady/1.0)' } }
      ),
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
    let quotes: Array<{ symbol: string; price: number; prev: number }> = [];
    if (yfRes.status === 'fulfilled') {
      const d = await yfRes.value.json();
      const results = d?.quoteResponse?.result ?? [];
      quotes = results
        .filter((q: any) => q.regularMarketPrice && q.regularMarketPreviousClose)
        .map((q: any) => ({
          symbol: q.symbol,
          price: q.regularMarketPrice,
          prev: q.regularMarketPreviousClose,
        }));
    }

    const payload = { fxCurr, fxPrev, quotes };
    console.log('[market-data] fxCurr ok:', !!fxCurr, '| fxPrev ok:', !!fxPrev, '| quotes:', quotes.length);

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
