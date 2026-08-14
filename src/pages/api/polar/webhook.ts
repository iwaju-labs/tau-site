import type { APIRoute } from "astro";
import { redis } from "../../../lib/redis";
import { notifySale } from "../../../lib/discord";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const secret = import.meta.env.POLAR_WEBHOOK_SECRET;
  if (!secret) {
    return new Response('Webhook secret not configured', { status: 500 });
  }

  try {
    const payload = JSON.parse(await request.text());

    if (payload.type === 'order.created') {
      // Still counted, but only as a statistic for the notification below.
      // It used to select a pricing tier, which made this counter something
      // that could not be lost without silently changing what people paid.
      const totalSold = await redis.incr('tau:total_sold');

      const data = payload.data ?? {};
      await notifySale({
        plan: data.product?.name ?? 'Unknown',
        email: data.customer?.email ?? 'Unknown',
        amountCents: data.totalAmount ?? 0,
        currency: data.currency ?? 'eur',
        totalSold,
      });
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
