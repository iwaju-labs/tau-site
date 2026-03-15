import type { APIRoute } from 'astro';
import { Polar } from '@polar-sh/sdk';

export const prerender = false;

const polar = new Polar({
  accessToken: import.meta.env.POLAR_ACCESS_TOKEN || process.env.POLAR_ACCESS_TOKEN,
});

export const POST: APIRoute = async ({ request }) => {
  const organizationId = import.meta.env.POLAR_ORGANIZATION_ID || process.env.POLAR_ORGANIZATION_ID;

  if (!organizationId) {
    return new Response(JSON.stringify({ error: 'Server configuration error: Missing Organization ID' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await request.json();
    const { key, activation_id } = body;

    // Support both camelCase and snake_case depending on how the app sends it
    const activationIdToUse = activation_id || body.activationId;

    if (!key || !activationIdToUse) {
      return new Response(JSON.stringify({ error: 'Missing required parameters: key, activation_id' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await polar.licenseKeys.deactivate({
      key,
      organizationId,
      activationId: activationIdToUse,
    });

    // Polar usually returns 204 No Content or simple success on deactivation
    return new Response(JSON.stringify({ success: true, message: 'License deactivated for this device.' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('License deactivation error:', error);
    return new Response(JSON.stringify({ error: error.message || 'Deactivation failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
