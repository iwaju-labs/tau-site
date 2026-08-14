import type { APIRoute } from 'astro';
import { Polar } from '@polar-sh/sdk';
import { json, polarErrorResponse, type PolarConditions } from '../../../lib/polarError';

export const prerender = false;

const polar = new Polar({
  accessToken: import.meta.env.POLAR_ACCESS_TOKEN || process.env.POLAR_ACCESS_TOKEN,
});

export const POST: APIRoute = async ({ request }) => {
  const organizationId = import.meta.env.POLAR_ORGANIZATION_ID || process.env.POLAR_ORGANIZATION_ID;

  if (!organizationId) {
    console.error('License validation: POLAR_ORGANIZATION_ID is not set');
    return json({ error: 'Server configuration error', code: 'misconfigured' }, 500);
  }

  let key: string;
  let conditions: PolarConditions | undefined;
  try {
    const body = await request.json();
    key = body?.key;
    conditions = body?.conditions;
  } catch {
    return json({ error: 'Invalid request body', code: 'bad_request' }, 400);
  }

  if (!key) {
    return json({ error: 'Missing required parameter: key', code: 'bad_request' }, 400);
  }

  let result: Awaited<ReturnType<typeof polar.licenseKeys.validate>>;
  try {
    result = await polar.licenseKeys.validate({
      key,
      organizationId,
      conditions: conditions || {},
    });
  } catch (error) {
    // An unknown key is a 404 from Polar and must stay a 404 here. Collapsing
    // it into a 500 meant the desktop client read it as an outage and kept the
    // licence alive on its grace period instead of rejecting it.
    return polarErrorResponse(
      error,
      'License validation error',
      'That license key was not recognised.',
    );
  }

  // Polar answers 200 for a revoked or disabled key — the verdict is in the
  // body, not the status. Returning the payload unexamined meant a refunded
  // licence validated successfully forever.
  if (result.status !== 'granted') {
    return json(
      {
        error:
          result.status === 'revoked'
            ? 'This license has been revoked.'
            : 'This license is no longer active.',
        code: result.status,
      },
      403,
    );
  }

  if (result.expiresAt && new Date(result.expiresAt).getTime() < Date.now()) {
    return json({ error: 'This license has expired.', code: 'expired' }, 403);
  }

  return json(result, 200);
};
