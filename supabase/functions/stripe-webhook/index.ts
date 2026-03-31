import Stripe from 'https://esm.sh/stripe@13.11.0';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!);
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseKey);

const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')!;

// Maps Stripe price IDs → product_name stored in user_purchases
const productMap: Record<string, string> = {
  'price_1TFdCV3EpArTHMXQ2Rsb6jHi': 'Basic',
  'price_1TFdU63EpArTHMXQD27lYrrB': 'Gold',
  'price_1TFdlp3EpArTHMXQ2CkkL9qd': 'CV Review',
  'price_1TFdn73EpArTHMXQ0AMFPQAw': 'Entretien blanc',
  'price_1TFdnb3EpArTHMXQ2k6sfFoC': 'Session coaching',
  'price_1TFdoV3EpArTHMXQUmIlGeVT': 'Pack CV + Entretien',
  'price_1TFdpr3EpArTHMXQ8uiTrtpv': 'Pack Entretien + Coaching',
  'price_1TGkLT3EpArTHMXQx6imPoWO': 'Liste de contacts'
};

Deno.serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const signature = req.headers.get('stripe-signature');
    if (!signature) {
      return new Response('Missing signature', { status: 400 });
    }

    const body = await req.text();
    const event = await stripe.webhooks.constructEventAsync(
      body,
      signature,
      webhookSecret
    );

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.user_id || null;
      const userEmail = session.metadata?.user_email || session.customer_email || null;

      console.log('[webhook] session completed. user_id:', userId, '| user_email:', userEmail);

      if (!userId && !userEmail) {
        console.log('[webhook] No user_id or email in metadata, skipping purchase recording');
        return new Response(JSON.stringify({ ok: true }), { status: 200 });
      }

      const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

      for (const item of lineItems.data) {
        const priceId = item.price?.id;
        const productName = productMap[priceId!] || 'Unknown';
        const amount = item.amount_total;

        if (!userId) {
          console.log(`[webhook] Guest purchase (email: ${userEmail}): ${productName} — not recorded (no account)`);
          continue;
        }

        const { error } = await supabase
          .from('user_purchases')
          .insert({
            user_id: userId,
            product_name: productName,
            product_id: priceId,
            stripe_payment_intent_id: session.payment_intent,
            amount_cents: amount,
            status: 'completed'
          });

        if (error) {
          console.error('[webhook] Error inserting purchase:', error);
        } else {
          console.log(`[webhook] Purchase recorded: ${userId} — ${productName}`);
        }
      }
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('[webhook] error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
});
