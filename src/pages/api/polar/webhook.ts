import type { APIRoute } from "astro";
import { redis } from "../../../lib/redis";
import { notifySale, notifyTierChange, getTierIndexForCount } from "../../../lib/discord";

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
      const prevTotal = (await redis.get<number>('tau:total_sold')) ?? 0;
      const newTotal = await redis.incr('tau:total_sold');

      const prevTier = getTierIndexForCount(prevTotal);
      const newTier = getTierIndexForCount(newTotal);

      const data = payload.data ?? {};
      await notifySale({
        plan: data.product?.name ?? 'Unknown',
        email: data.customer?.email ?? 'Unknown',
        amountCents: data.totalAmount ?? 0,
        currency: data.currency ?? 'eur',
        totalSold: newTotal,
        tierIndex: newTier,
      });

      if (newTier > prevTier) {
        await notifyTierChange({ newTierIndex: newTier, totalSold: newTotal });
      }
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