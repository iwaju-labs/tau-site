import type { APIRoute } from 'astro';
import { Polar } from '@polar-sh/sdk';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { notifyDownload } from '../../lib/discord';

export const prerender = false;

const ratelimit = new Ratelimit({
  redis: new Redis({
    url: import.meta.env.UPSTASH_REDIS_REST_URL || process.env.UPSTASH_REDIS_REST_URL || '',
    token: import.meta.env.UPSTASH_REDIS_REST_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || '',
  }),
  limiter: Ratelimit.slidingWindow(10, "10 s"),
  analytics: true,
});

const polar = new Polar({
  accessToken: import.meta.env.POLAR_ACCESS_TOKEN || process.env.POLAR_ACCESS_TOKEN,
});

export const GET: APIRoute = async ({ request, redirect, clientAddress }) => {
  const url = new URL(request.url);
  const os = url.searchParams.get('os');
  const key = url.searchParams.get('key');

  if (!key) {
    return new Response('A valid license key is required to download. Please check your purchase email.', { status: 401 });
  }

  const organizationId = import.meta.env.POLAR_ORGANIZATION_ID || process.env.POLAR_ORGANIZATION_ID;

  try {
    await polar.licenseKeys.validate({ key, organizationId });
  } catch {
    return new Response('Invalid or unrecognised license key. Please check your purchase email and try again.', { status: 403 });
  }

  try {
    if (import.meta.env.UPSTASH_REDIS_REST_URL || process.env.UPSTASH_REDIS_REST_URL) {
      const identifier = clientAddress || request.headers.get("x-forwarded-for") || 'anonymous';
      const { success } = await ratelimit.limit(`download_${identifier}`);
      if (!success) {
        return new Response('Too many requests, please try again later.', { status: 429 });
      }
    }

    const ymlUrl = os === 'mac'
      ? 'https://releases.trytau.app/latest-mac.yml'
      : 'https://releases.trytau.app/latest.yml';

    const response = await fetch(ymlUrl);
    if (!response.ok) {
      console.error(`Failed to fetch ${ymlUrl}: ${response.statusText}`);
      return new Response('No release found yet. Please check back later.', { status: 404 });
    }

    const ymlText = await response.text();
    const pathMatch = /^path:\s*(.+)$/m.exec(ymlText);

    if (pathMatch?.[1]) {
      const filename = pathMatch[1].trim();
      const downloadUrl = `https://releases.trytau.app/${filename}`;
      notifyDownload({ os: os ?? 'unknown', filename }).catch(() => {});
      return redirect(downloadUrl, 302);
    }

    console.error('Could not parse path from yml:', ymlText);
    return new Response('Error parsing release metadata.', { status: 500 });

  } catch (error) {
    console.error('Download routing error:', error);
    return new Response('Error handling download.', { status: 500 });
  }
};
