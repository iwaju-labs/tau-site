import type { APIRoute } from 'astro';

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
      
      console.log(`[Polar Webhook] Order created for product: ${order.product_id}`);
      console.log(`[Polar Webhook] Customer email: ${order.user_email || order.customer_email}`);
      
      // TODO: Handle order fulfillment
      // 1. Generate License Key
      // 2. Save to database
      // 3. Email the customer
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
