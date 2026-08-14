import { createHmac, timingSafeEqual } from 'node:crypto';

/**
 * Verification for Polar webhooks, which use the Standard Webhooks scheme.
 *
 * The signed payload is `${id}.${timestamp}.${body}`, and the signature header
 * may carry several space-separated `v1,<base64>` values while a secret is
 * being rotated — any one matching is enough.
 *
 * Kept apart from the route so it can be tested. Getting it wrong in either
 * direction is costly: too strict and every real webhook is silently rejected,
 * too loose and anyone who knows the URL can post fake orders.
 */

/** How far a timestamp may be from now, so a captured request cannot be replayed. */
export const TOLERANCE_SECONDS = 300;

export function isSignatureValid(
  secret: string,
  headers: { id: string | null; timestamp: string | null; signature: string | null },
  body: string,
  now: number = Date.now(),
): boolean {
  const { id, timestamp, signature } = headers;
  if (!id || !timestamp || !signature) return false;

  const age = Math.abs(now / 1000 - Number(timestamp));
  if (!Number.isFinite(age) || age > TOLERANCE_SECONDS) return false;

  const expected = sign(secret, id, timestamp, body);

  return signature
    .split(' ')
    .map((part) => part.split(',')[1])
    .filter(Boolean)
    .some((candidate) => equals(candidate, expected));
}

/** The signature Polar would send for this payload. Exported for tests. */
export function sign(secret: string, id: string, timestamp: string, body: string): string {
  // Secrets are distributed as `whsec_<base64>`; the key is the decoded part.
  const raw = secret.startsWith('whsec_') ? secret.slice(6) : secret;
  return createHmac('sha256', Buffer.from(raw, 'base64'))
    .update(`${id}.${timestamp}.${body}`)
    .digest('base64');
}

function equals(a: string, b: string): boolean {
  const bufferA = Buffer.from(a);
  const bufferB = Buffer.from(b);
  // timingSafeEqual throws on a length mismatch, so check that first.
  return bufferA.length === bufferB.length && timingSafeEqual(bufferA, bufferB);
}
