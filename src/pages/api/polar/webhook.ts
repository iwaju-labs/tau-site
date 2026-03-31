import type { APIRoute } from "astro";
import { redis } from "../../../lib/redis";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const secret = import.meta.env.POLAR_WEBHOOK_SECRET;
  if (!secret) {
    return new Response('Webhook secret not configured', { status: 500 });
  }

  try {
    const payload = JSON.parse(await request.text());
    const eventType = payload.type;

    if (eventType === 'order.created') {
      await redis.incr('tau:total_sold');
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json'},
    });
  } catch (error) {
    console.error('[Polar Webhook] Error:', error);
    return new Response('Webhook processing failed', { status: 400 });
  }
}