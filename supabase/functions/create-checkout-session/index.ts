import Stripe from 'https://esm.sh/stripe@13.11.0';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
});

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Maps cart item names (from index.html addToCart) to Stripe price IDs
const priceMap: Record<string, string> = {
  'Basic — Accès à vie':       'price_1TFdCV3EpArTHMXQ2Rsb6jHi',
  'Gold — Accès à vie':        'price_1TFdU63EpArTHMXQD27lYrrB',
  'Review de CV':               'price_1TFdlp3EpArTHMXQ2CkkL9qd',
  'Entretien blanc':            'price_1TFdn73EpArTHMXQ0AMFPQAw',
  'Session de coaching':        'price_1TFdnb3EpArTHMXQ2k6sfFoC',
  'Pack CV + Entretien':        'price_1TFdoV3EpArTHMXQUmIlGeVT',
  'Pack Entretien + Coaching':  'price_1TFdpr3EpArTHMXQ8uiTrtpv',
  'Liste de contacts':          'price_1TGkLT3EpArTHMXQx6imPoWO',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { items, user_id, email } = await req.json();
    console.log('[checkout] user_id:', user_id, '| email:', email, '| items:', JSON.stringify(items));

    const lineItems = (items || [])
      .filter((item: any) => priceMap[item.name])
      .map((item: any) => ({
        price: priceMap[item.name],
        quantity: item.qty || 1,
      }));

    if (lineItems.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Aucun produit valide dans le panier' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: 'payment',
      line_items: lineItems,
      success_url: 'https://platform.deskready.com/plateforme.html',
      cancel_url: 'https://deskready.com/#offres',
      metadata: {
        user_id: user_id || '',
        user_email: email || '',
      },
    };

    if (email) {
      sessionParams.customer_email = email;
    }

    const session = await stripe.checkout.sessions.create(sessionParams);
    console.log('[checkout] session created:', session.id);

    return new Response(
      JSON.stringify({ checkoutUrl: session.url }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('[checkout] error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
