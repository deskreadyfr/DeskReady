const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Yahoo Finance chart symbols — FX + Equities + Commodities
const YF_SYMBOLS: Record<string, string> = {
  // FX
  'EURUSD=X':  'EUR/USD',
  'GBPUSD=X':  'GBP/USD',
  'USDJPY=X':  'USD/JPY',
  'EURGBP=X':  'EUR/GBP',
  // Equities
  '^STOXX50E': 'Euro Stoxx 50',
  '^GDAXI':    'DAX',
  '^FCHI':     'CAC 40',
  '^FTSE':     'FTSE 100',
  '^GSPC':     'S&P 500',
  '^NDX':      'Nasdaq 100',
  '^DJI':      'Dow Jones',
  '^N225':     'Nikkei 225',
  '^VIX':      'VIX',
  // Commodities
  'GC=F':      'Gold',
  'CL=F':      'WTI',
};

const YF_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept': 'application/json',
};

async function fetchChart(sym: string): Promise<{ symbol: string; price: number; prev: number } | null> {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(sym)}?interval=1d&range=2d`;
  try {
    const r = await fetch(url, { headers: YF_HEADERS });
    const d = await r.json();
    const meta = d?.chart?.result?.[0]?.meta;
    if (meta?.regularMarketPrice && meta?.chartPreviousClose) {
      return { symbol: sym, price: meta.regularMarketPrice, prev: meta.chartPreviousClose };
    }
    console.warn(`[market-data] ${sym}: missing price`);
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
    const results = await Promise.allSettled(
      Object.keys(YF_SYMBOLS).map(fetchChart)
    );

    const quotes = results
      .map(r => r.status === 'fulfilled' ? r.value : null)
      .filter(Boolean) as Array<{ symbol: string; price: number; prev: number }>;

    const payload = { quotes };
    console.log(`[market-data] ${quotes.length}/${Object.keys(YF_SYMBOLS).length} symbols ok`);

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
