import type { APIRoute } from 'astro';
import { Polar } from '@polar-sh/sdk';
import { getPricingTier } from '../../lib/redis';
import { notifyCheckout } from '../../lib/discord';

export const prerender = false;

const polar = new Polar({
  accessToken: import.meta.env.POLAR_ACCESS_TOKEN || process.env.POLAR_ACCESS_TOKEN,
});

export const GET: APIRoute = async ({ request, redirect }) => {
  const url = new URL(request.url);
  const plan = url.searchParams.get('plan');

  if (plan !== 'solo' && plan !== 'pro') {
    return new Response('Invalid plan', { status: 400 });
  }

  const { tierIndex } = await getPricingTier();

  const productIds: Record<string, Record<number, string>> = {
    solo: {
      1: import.meta.env.POLAR_SOLO_PRODUCT_ID_T1,
      2: import.meta.env.POLAR_SOLO_PRODUCT_ID_T2,
      3: import.meta.env.POLAR_SOLO_PRODUCT_ID_T3,
    },
    pro: {
      1: import.meta.env.POLAR_PRO_PRODUCT_ID_T1,
      2: import.meta.env.POLAR_PRO_PRODUCT_ID_T2,
      3: import.meta.env.POLAR_PRO_PRODUCT_ID_T3,
    },
  };

  const productId = productIds[plan][tierIndex];

  if (!productId) {
    console.error(`Missing product ID for plan=${plan} tier=${tierIndex}`);
    return new Response('Missing configuration', { status: 500 });
  }

  const successUrl = import.meta.env.POLAR_SUCCESS_URL || process.env.POLAR_SUCCESS_URL || 'http://localhost:4321/thank-you?checkout_id={CHECKOUT_ID}';

  try {
    const checkout = await polar.checkouts.create({
      products: [productId],
      successUrl: successUrl,
    });

    notifyCheckout({ plan, tierIndex }).catch(() => {});
    return redirect(checkout.url);
  } catch (error) {
    console.error('Polar checkout error:', error);
    return new Response('Error creating checkout section', { status: 500 });
  }
};
