import type { APIRoute } from 'astro';
import { Polar } from '@polar-sh/sdk';

export const prerender = false;

const polar = new Polar({
  accessToken: import.meta.env.POLAR_ACCESS_TOKEN || process.env.POLAR_ACCESS_TOKEN,
});

export const GET: APIRoute = async ({ request, redirect }) => {
  // Try picking it up from the Astro url parameter if available, fallback to request.url
  const url = new URL(request.url);
  const plan = url.searchParams.get('plan');
  
  let productId = '';
  
  if (plan === 'solo') {
    productId = import.meta.env.POLAR_SOLO_PRODUCT_ID || process.env.POLAR_SOLO_PRODUCT_ID;
  } else if (plan === 'pro') {
    productId = import.meta.env.POLAR_PRO_PRODUCT_ID || process.env.POLAR_PRO_PRODUCT_ID;
  } else {
    // try checking request url string directly for basic fallback
    if (request.url.includes('plan=solo')) {
      productId = import.meta.env.POLAR_SOLO_PRODUCT_ID || process.env.POLAR_SOLO_PRODUCT_ID;
    } else if (request.url.includes('plan=pro')) {
      productId = import.meta.env.POLAR_PRO_PRODUCT_ID || process.env.POLAR_PRO_PRODUCT_ID;
    } else {
      console.error('Invalid plan requested:', plan, 'URL:', request.url);
      return new Response('Invalid plan', { status: 400 });
    }
  }

  const successUrl = import.meta.env.POLAR_SUCCESS_URL || process.env.POLAR_SUCCESS_URL || 'http://localhost:4321/thank-you?checkout_id={CHECKOUT_ID}';

  if (!productId) {
    console.error('Missing product ID for plan:', plan);
    return new Response('Missing configuration', { status: 500 });
  }

  try {
    const checkout = await polar.checkouts.create({
      products: [productId],
      successUrl: successUrl,
    });

    return redirect(checkout.url);
  } catch (error) {
    console.error('Polar checkout error:', error);
    return new Response('Error creating checkout section', { status: 500 });
  }
};
