import type { APIRoute } from 'astro';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { notifyDownload } from '../../lib/discord';

export const prerender = false;

// Create a new ratelimiter, that allows 10 requests per 10 seconds
const ratelimit = new Ratelimit({
  redis: new Redis({
    url: import.meta.env.UPSTASH_REDIS_REST_URL || process.env.UPSTASH_REDIS_REST_URL || '',
    token: import.meta.env.UPSTASH_REDIS_REST_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || '',
  }),
  limiter: Ratelimit.slidingWindow(10, "10 s"),
  analytics: true,
});

export const GET: APIRoute = async ({ request, redirect, clientAddress }) => {
  const url = new URL(request.url);
  const os = url.searchParams.get('os'); // 'windows' or 'mac'

  try {
    // Only attempt rate limiting if the env vars are available
    if (import.meta.env.UPSTASH_REDIS_REST_URL || process.env.UPSTASH_REDIS_REST_URL) {
      // Use client IP as the identifier. clientAddress is provided by Astro.
      const identifier = clientAddress || request.headers.get("x-forwarded-for") || 'anonymous';
      const { success } = await ratelimit.limit(`download_${identifier}`);

      if (!success) {
        return new Response('Too many requests, please try again later.', { status: 429 });
      }
    }
    let ymlUrl = '';
    
    if (os === 'mac') {
      ymlUrl = 'https://releases.trytau.app/latest-mac.yml';
    } else {
      ymlUrl = 'https://releases.trytau.app/latest.yml';
    }

    const response = await fetch(ymlUrl);
    
    if (!response.ok) {
      console.error(`Failed to fetch ${ymlUrl}: ${response.statusText}`);
      // Fallback for when no releases exist yet
      return new Response('No release found yet. Please check back later.', { status: 404 });
    }

    const ymlText = await response.text();
    
    // Parse the path line out of the YAML using Regex (efficient, no libraries needed)
    // latest.yml typically contains a line like: "path: Tau-Setup-1.0.0.exe"
    const pathMatch = /^path:\s*(.+)$/m.exec(ymlText);
    
    if (pathMatch?.[1]) {
      const filename = pathMatch[1].trim();
      const downloadUrl = `https://releases.trytau.app/${filename}`;

      notifyDownload({ os: os ?? 'unknown', filename }).catch(() => {});
      return redirect(downloadUrl, 302);
    } else {
      console.error('Could not parse path from yml:', ymlText);
      return new Response('Error parsing release metadata.', { status: 500 });
    }
    
  } catch (error) {
    console.error('Download routing error:', error);
    return new Response('Error handling download.', { status: 500 });
  }
};
