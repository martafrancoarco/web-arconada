import { Hono } from "npm:hono@4";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";

const app = new Hono();

// Middleware - Allow all origins for CORS
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));
app.use('*', logger(console.log));

// Health check
app.get('/make-server-dcbbc65e/health', (c) => {
  return c.json({ status: 'ok' });
});

// Create Stripe checkout session
app.post('/make-server-dcbbc65e/create-checkout', async (c) => {
  try {
    const { artworkTitle, price, artworkId, successUrl, cancelUrl } = await c.req.json();

    const STRIPE_SECRET_KEY = Deno.env.get('STRIPE_SECRET_KEY');

    if (!STRIPE_SECRET_KEY) {
      console.error('Stripe secret key not found in environment variables');
      return c.json({ error: 'Payment configuration error' }, 500);
    }

    // Determine success/cancel URLs: prefer passed values, fallback to origin header
    const origin = c.req.header('origin') || c.req.header('referer') || 'https://viwcmiexjkjopijdzskw.supabase.co';
    const finalSuccessUrl = successUrl || `${origin}?success=true&artwork=${encodeURIComponent(artworkTitle)}`;
    const finalCancelUrl = cancelUrl || `${origin}?canceled=true`;

    console.log('Creating Stripe checkout for:', artworkTitle, 'price:', price, 'successUrl:', finalSuccessUrl);

    // Create Stripe checkout session
    const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'mode': 'payment',
        'success_url': finalSuccessUrl,
        'cancel_url': finalCancelUrl,
        'line_items[0][price_data][currency]': 'eur',
        'line_items[0][price_data][product_data][name]': artworkTitle,
        'line_items[0][price_data][unit_amount]': String(Math.round(price * 100)),
        'line_items[0][quantity]': '1',
        'metadata[artwork_id]': artworkId,
      }),
    });

    const responseText = await response.text();
    console.log('Stripe API response status:', response.status);

    if (!response.ok) {
      console.error('Stripe API error:', responseText);
      return c.json({ error: 'Failed to create checkout session', details: responseText }, 500);
    }

    const session = JSON.parse(responseText);
    console.log('Stripe session created:', session.id, 'url:', session.url);

    return c.json({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return c.json({ error: 'Internal server error: ' + error.message }, 500);
  }
});

Deno.serve(app.fetch);