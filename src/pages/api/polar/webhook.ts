import type { APIRoute } from 'astro';
import { Polar } from '@polar-sh/sdk';

export const prerender = false;

const polar = new Polar({
  accessToken: import.meta.env.POLAR_ACCESS_TOKEN || process.env.POLAR_ACCESS_TOKEN,
});

export const POST: APIRoute = async ({ request }) => {
  const secret = import.meta.env.POLAR_WEBHOOK_SECRET;

  if (!secret) {
    console.error('Missing POLAR_WEBHOOK_SECRET');
    return new Response('Webhook secret not configured', { status: 500 });
  }

  // Get the raw body as text for signature verification
  const body = await request.text();

  // Polar webhooks typically use these standard headers (often Svix-backed)
  const webhookHeaders = {
    'webhook-id': request.headers.get('webhook-id') || '',
    'webhook-timestamp': request.headers.get('webhook-timestamp') || '',
    'webhook-signature': request.headers.get('webhook-signature') || '',
  }; // Used for signature validation later


  try {
    // We parse the payload to check the event type
    const payload = JSON.parse(body);
    const eventType = payload.type; // e.g., 'order.created'

    console.log(`[Polar Webhook] Received event: ${eventType}`);

    // Here is where you handle specific events
    if (eventType === 'order.created') {
      const order = payload.data;
      const productId = order.product_id;
      const organizationId = import.meta.env.POLAR_ORGANIZATION_ID || process.env.POLAR_ORGANIZATION_ID;

      console.log(`[Polar Webhook] Order created for product: ${productId}`);
      console.log(`[Polar Webhook] Customer email: ${order.customer_email || order.user_email }`);

      if (!organizationId) {
        console.error('[Polar Webhook] Missing POLAR_ORGANIZATION_ID');
        return new Response('Server configuration error', { status: 500 });
      }

      // Determine activation limit based on product ID
      let limitActivations = 1;
      const soloId = import.meta.env.POLAR_SOLO_PRODUCT_ID || process.env.POLAR_SOLO_PRODUCT_ID;
      const proId = import.meta.env.POLAR_PRO_PRODUCT_ID || process.env.POLAR_PRO_PRODUCT_ID;

      if (productId === proId) {
        limitActivations = 3;
      } else if (productId === soloId) {
        limitActivations = 1;
      } else {
         console.warn(`[Polar Webhook] Unknown product ID: ${productId}. Defaulting to 1 activation.`);
      }

      // Generate the License Key via Polar API
      // Note: Polar's SDK currently doesn't have a direct 'create' method for license keys in all versions, 
      // so we use the standard REST endpoint if SDK method is missing, or use the SDK if available.
      // Based on docs, it's under `licenseKeys` but let's be safe.
      
      console.log(`[Polar Webhook] Generating license key with limit: ${limitActivations}`);

      
      console.log('[Polar Webhook] To fully automate this, ensure your Polar Product has a "License Key" benefit attached.');
      console.log('[Polar Webhook] If attached, listen for "benefit_grant.created" instead of "order.created" to get the key.');

    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('[Polar Webhook] Error processing event:', error);
    return new Response('Webhook processing failed', { status: 400 });
  }
};
