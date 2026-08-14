import type { APIRoute } from "astro";
import { redis } from "../../../lib/redis";
import { notifySale } from "../../../lib/discord";
import { isSignatureValid } from "../../../lib/webhookSignature";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const secret = import.meta.env.POLAR_WEBHOOK_SECRET || process.env.POLAR_WEBHOOK_SECRET;
  if (!secret) {
    console.error('[Polar Webhook] POLAR_WEBHOOK_SECRET is not set');
    return new Response('Webhook secret not configured', { status: 500 });
  }

  const body = await request.text();

  // This used to check only that the secret was *set* and then trust the body,
  // so anyone who knew the URL could post fake orders — inflating the sales
  // counter and firing Discord notifications.
  const signed = isSignatureValid(
    secret,
    {
      id: request.headers.get('webhook-id'),
      timestamp: request.headers.get('webhook-timestamp'),
      signature: request.headers.get('webhook-signature'),
    },
    body,
  );

  if (!signed) {
    console.warn('[Polar Webhook] Rejected a request with a missing or invalid signature');
    return new Response('Invalid signature', { status: 401 });
  }

  try {
    const payload = JSON.parse(body);
    const event = payload.type;

    // Logged unconditionally: without this there is no way to tell whether
    // Polar is calling at all, or calling with an event we ignore.
    console.log('[Polar Webhook] Received', event);

    // A completed checkout can produce either of these depending on which
    // events the endpoint subscribes to. Handle both so a notification does
    // not depend on that choice.
    if (event === 'order.created' || event === 'order.paid') {
      const data = payload.data ?? {};
      const orderId = data.id;

      // ...but count it once, whichever arrives first.
      const firstTime = orderId
        ? await redis.set(`order:${orderId}:notified`, 1, { nx: true, ex: 60 * 60 * 24 * 30 })
        : 'OK';

      if (!firstTime) {
        console.log('[Polar Webhook] Order', orderId, 'already notified; skipping');
        return new Response(JSON.stringify({ received: true }), { status: 200 });
      }

      const totalSold = await redis.incr('tau:total_sold');
      const amountCents = data.totalAmount ?? data.total_amount ?? 0;

      await notifySale({
        product: data.product?.name ?? 'Unknown',
        email: data.customer?.email ?? 'Unknown',
        amountCents,
        currency: data.currency ?? 'eur',
        orderId: orderId ?? 'unknown',
        discounted: amountCents === 0 || Boolean(data.discountId ?? data.discount_id),
        totalSold,
      });
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('[Polar Webhook] Error:', error);
    return new Response('Webhook processing failed', { status: 400 });
  }
}
