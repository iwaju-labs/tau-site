import { validateEvent, WebhookVerificationError } from '@polar-sh/sdk/webhooks';

/**
 * Confirms a request really came from Polar.
 *
 * Delegates to Polar's own validator rather than reimplementing the signing
 * scheme. A hand-rolled version got this wrong in a way that was invisible
 * locally: Polar's secret is a plain UTF-8 string, and the SDK base64-*encodes*
 * it before handing it to the Standard Webhooks library, which decodes it back
 * — so the HMAC key is the raw bytes of the secret. Base64-*decoding* it
 * instead produces a key that verifies nothing, and every delivery 401s.
 *
 * Signature failures are the only thing treated as untrusted. validateEvent
 * also parses the payload against the SDK's schemas, and that can fail for
 * entirely benign reasons — a newer event type, or a field Polar added since
 * this SDK version. Failing closed on those would silently drop real webhooks,
 * so they are allowed through and the caller parses the body itself.
 */
export function isFromPolar(body: string, headers: Headers, secret: string): boolean {
  try {
    validateEvent(body, Object.fromEntries(headers), secret);
    return true;
  } catch (error) {
    if (error instanceof WebhookVerificationError) return false;

    // Just the headline: the full schema error is hundreds of lines of zod
    // output and would bury everything else in the log.
    const reason = error instanceof Error ? error.message.split('\n')[0] : String(error);
    console.warn('[Polar Webhook] Signature valid, payload not recognised by this SDK version:', reason);
    return true;
  }
}
