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
    const { key, conditions } = body;

    if (!key) {
      return new Response(JSON.stringify({ error: 'Missing required parameter: key' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const result = await polar.licenseKeys.validate({
      key,
      organizationId,
      conditions: conditions || {},
    });

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('License validation error:', error);
    return new Response(JSON.stringify({ error: error.message || 'Validation failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
