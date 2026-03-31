import type { APIRoute } from "astro";
import { getPricingTier } from "../../lib/redis";

export const prerender = false;

export const GET: APIRoute = async () => {
    const tier = await getPricingTier();

    return new Response(JSON.stringify(tier), {
        status: 200,
        headers: { 
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store',
        },
    });
};