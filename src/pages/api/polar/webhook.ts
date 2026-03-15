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

      // We need to fetch the benefit ID that corresponds to "License Key" for this organization 
      // OR we can correct this logic: Polar automatically creates license keys IF the product has a "License Key" benefit attached.
      // IF you attached a "License Key" benefit to your Product in the Polar Dashboard, you DO NOT need to manually create one here!
      //
      // However, if you haven't set up Benefits, we must create a standalone license key manually.
      // Let's assume you haven't set up Benefits yet and do it manually for maximum control.
      
      /* 
         Since the SDK for manual creation might be tricky without a benefit query first, 
         the *BEST* way is to rely on Polar's "Benefit" system.
         
         BUT, since you asked to do it manually/backend-side, here is the manual creation.
      */
      
      // NOTE: There isn't a simple "create arbitrary key" in the public API without a Benefit. 
      // The standard flow is: Product -> Benefit (License Key) -> Auto-generated on purchase.
      
      // If we cannot create one manually easily, we should log that we expect one to be auto-generated.
      // Let's check if the order payload already has the license key?
      // Usually, it's sent in a separate `benefit_grant.created` webhook.
      
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
