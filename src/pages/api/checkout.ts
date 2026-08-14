import type { APIRoute } from 'astro';
import { Polar } from '@polar-sh/sdk';
import { notifyCheckout } from '../../lib/discord';

export const prerender = false;

const polar = new Polar({
  accessToken: import.meta.env.POLAR_ACCESS_TOKEN || process.env.POLAR_ACCESS_TOKEN,
});

export const GET: APIRoute = async ({ redirect }) => {
  // One product, one price. This used to pick from a six-entry grid of
  // plan (solo/pro) x pricing tier, which is why the old links carried ?plan=.
  const productId = import.meta.env.POLAR_PRODUCT_ID || process.env.POLAR_PRODUCT_ID;

  if (!productId) {
    console.error('Checkout: POLAR_PRODUCT_ID is not set');
    return new Response('Missing configuration', { status: 500 });
  }

  const successUrl =
    import.meta.env.POLAR_SUCCESS_URL ||
    process.env.POLAR_SUCCESS_URL ||
    'http://localhost:4321/thank-you?checkout_id={CHECKOUT_ID}';

  try {
    const checkout = await polar.checkouts.create({ products: [productId], successUrl });
    notifyCheckout().catch(() => {});
    return redirect(checkout.url);
  } catch (error) {
    console.error('Polar checkout error:', error);
    return new Response('Error creating checkout session', { status: 500 });
  }
};
