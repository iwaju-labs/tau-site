import type { APIRoute } from 'astro';
import { Polar } from '@polar-sh/sdk';
import { redis } from '../../../lib/redis';

export const prerender = false;

const polar = new Polar({
  accessToken: import.meta.env.POLAR_ACCESS_TOKEN || process.env.POLAR_ACCESS_TOKEN,
});

// Disabled: not configured for prod yet (depends on Clerk auth via middleware).
export const POST: APIRoute = async () => {
  return new Response(JSON.stringify({ error: 'Account linking is temporarily unavailable.' }), { status: 503 });
};

/*
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

  try {
    await polar.licenseKeys.validate({ key, organizationId });
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid or unrecognised license key.' }), { status: 403 });
  }

  // There is one product, so a valid key is simply a licence — nothing to label.
  await redis.set(`user:${userId}:licenseKey`, key);
  await redis.set(`licenseKey:${key}:userId`, userId);

  return new Response(JSON.stringify({ success: true }), { status: 200 });
};
*/
