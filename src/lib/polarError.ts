/**
 * Turning Polar SDK failures into honest HTTP statuses.
 *
 * Every licence endpoint used to answer `500` for any thrown error, including
 * Polar's own `404 ResourceNotFound` for an unknown key. That mattered more
 * than it looks: the desktop app reads 5xx as "the server is having trouble"
 * and falls back to its offline grace period rather than rejecting the key. So
 * a mistyped or revoked licence was never actually turned away — it simply
 * kept working until the grace period lapsed, then produced a "check your
 * connection" screen that had nothing to do with the real problem.
 *
 * A 4xx from Polar is a verdict and must be passed through as one. Anything
 * else really is our problem and stays a 5xx.
 */

/** The value shape Polar accepts for licence validation conditions. */
export type PolarConditions = Record<string, string | number | boolean>;

/** PolarError carries the upstream HTTP status; plain errors do not. */
export function upstreamStatus(error: unknown): number | undefined {
  const status = (error as { statusCode?: unknown } | null)?.statusCode;
  return typeof status === 'number' && status >= 100 && status < 600 ? status : undefined;
}

export function isClientError(status: number | undefined): status is number {
  return status !== undefined && status >= 400 && status < 500;
}

export function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

/**
 * The single place a Polar failure becomes a response.
 *
 * `notFoundMessage` is what the user sees for an unrecognised key; everything
 * else gets a generic message, because Polar's raw text is written for us
 * rather than for them.
 */
export function polarErrorResponse(
  error: unknown,
  context: string,
  notFoundMessage: string,
): Response {
  const status = upstreamStatus(error);

  if (isClientError(status)) {
    // 404 unknown key, 403 forbidden, 409 activation limit, 422 malformed.
    const message =
      status === 404
        ? notFoundMessage
        : (error as { detail?: string; message?: string })?.detail ??
          (error as { message?: string })?.message ??
          notFoundMessage;

    return json({ error: message, code: status === 404 ? 'not_found' : 'rejected' }, status);
  }

  // Ours, not theirs. 502 keeps the desktop client in its grace period rather
  // than deleting a licence over an outage.
  console.error(`${context}:`, error);
  return json(
    { error: 'The licence service is temporarily unavailable. Please try again shortly.', code: 'upstream_error' },
    502,
  );
}
