import type { APIRoute } from 'astro';
import { Polar } from '@polar-sh/sdk';
import { notifyLicenseActivation } from '../../../lib/discord';
import { json, polarErrorResponse, type PolarConditions } from '../../../lib/polarError';

export const prerender = false;

const polar = new Polar({
  accessToken: import.meta.env.POLAR_ACCESS_TOKEN || process.env.POLAR_ACCESS_TOKEN,
});

export const POST: APIRoute = async ({ request }) => {
  const organizationId = import.meta.env.POLAR_ORGANIZATION_ID || process.env.POLAR_ORGANIZATION_ID;

  if (!organizationId) {
    console.error('License activation: POLAR_ORGANIZATION_ID is not set');
    return json({ error: 'Server configuration error', code: 'misconfigured' }, 500);
  }

  let key: string;
  let label: string;
  let conditions: PolarConditions | undefined;
  try {
    const body = await request.json();
    key = body?.key;
    label = body?.label;
    conditions = body?.conditions;
  } catch {
    return json({ error: 'Invalid request body', code: 'bad_request' }, 400);
  }

  if (!key || !label) {
    return json({ error: 'Missing required parameters: key, label', code: 'bad_request' }, 400);
  }

  let result: Awaited<ReturnType<typeof polar.licenseKeys.activate>>;
  try {
    result = await polar.licenseKeys.activate({
      key,
      organizationId,
      label,
      conditions: conditions || {},
    });
  } catch (error) {
    // Same fix as validate: an unknown key is a 404 and a hit activation limit
    // is a 4xx, both of which the client can act on. They were arriving as 500s
    // carrying Polar's raw text, which is why the app had to match on the body
    // to tell a bad key from a server fault.
    return polarErrorResponse(
      error,
      'License activation error',
      'That license key was not recognised.',
    );
  }

  const keyMasked = key.length > 8 ? `${key.slice(0, 4)}…${key.slice(-4)}` : key;
  notifyLicenseActivation({ keyMasked, label }).catch(() => {});

  return json(result, 200);
};
