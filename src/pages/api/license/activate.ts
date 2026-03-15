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
    const { key, label, conditions } = body;

    if (!key || !label) {
      return new Response(JSON.stringify({ error: 'Missing required parameters: key, label' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const result = await polar.licenseKeys.activate({
      key,
      organizationId,
      label,
      conditions: conditions || {},
    });

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('License activation error:', error);
    return new Response(JSON.stringify({ error: error.message || 'Activation failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
