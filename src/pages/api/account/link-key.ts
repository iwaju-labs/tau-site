import type { APIRoute } from 'astro';
import { Polar } from '@polar-sh/sdk';
import { redis } from '../../../lib/redis';

export const prerender = false;

const polar = new Polar({
  accessToken: import.meta.env.POLAR_ACCESS_TOKEN || process.env.POLAR_ACCESS_TOKEN,
});

const SOLO_PRODUCT_IDS = new Set([
  import.meta.env.POLAR_SOLO_PRODUCT_ID_T1 || process.env.POLAR_SOLO_PRODUCT_ID_T1,
  import.meta.env.POLAR_SOLO_PRODUCT_ID_T2 || process.env.POLAR_SOLO_PRODUCT_ID_T2,
  import.meta.env.POLAR_SOLO_PRODUCT_ID_T3 || process.env.POLAR_SOLO_PRODUCT_ID_T3,
]);

const PRO_PRODUCT_IDS = new Set([
  import.meta.env.POLAR_PRO_PRODUCT_ID_T1 || process.env.POLAR_PRO_PRODUCT_ID_T1,
  import.meta.env.POLAR_PRO_PRODUCT_ID_T2 || process.env.POLAR_PRO_PRODUCT_ID_T2,
  import.meta.env.POLAR_PRO_PRODUCT_ID_T3 || process.env.POLAR_PRO_PRODUCT_ID_T3,
]);

export const POST: APIRoute = async ({ request, locals }) => {
  const { userId } = locals.auth();
  if (!userId) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  let key: string;
  try {
    const body = await request.json();
    key = (body.key ?? '').trim();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request body' }), { status: 400 });
  }

  if (!key) {
    return new Response(JSON.stringify({ error: 'License key is required' }), { status: 400 });
  }

  const organizationId = import.meta.env.POLAR_ORGANIZATION_ID || process.env.POLAR_ORGANIZATION_ID;

  let validatedKey: Awaited<ReturnType<typeof polar.licenseKeys.validate>>;
  try {
    validatedKey = await polar.licenseKeys.validate({ key, organizationId });
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid or unrecognised license key.' }), { status: 403 });
  }

  // Determine plan by looking up orders for this customer on Polar
  let plan: 'solo' | 'pro' | 'unknown' = 'unknown';
  try {
    const orders = await polar.orders.list({ customerId: validatedKey.customerId, organizationId });
    for (const order of orders.result.items) {
      if (PRO_PRODUCT_IDS.has(order.productId)) { plan = 'pro'; break; }
      if (SOLO_PRODUCT_IDS.has(order.productId)) { plan = 'solo'; break; }
    }
  } catch {
    // plan stays 'unknown' — key is still valid
  }

  await redis.set(`user:${userId}:licenseKey`, key);
  await redis.set(`user:${userId}:plan`, plan);
  await redis.set(`licenseKey:${key}:userId`, userId);

  return new Response(JSON.stringify({ success: true, plan }), { status: 200 });
};
