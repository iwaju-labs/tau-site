import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: import.meta.env.UPSTASH_REDIS_REST_URL,
  token: import.meta.env.UPSTASH_REDIS_REST_TOKEN,
});

/**
 * Total orders, kept only for the sales notification in Discord.
 *
 * It used to drive a pricing ladder, which meant losing this counter silently
 * reset every price to the launch tier. Tau is one product at one price now, so
 * this is a statistic rather than a load-bearing value.
 */
export async function getTotalSold(): Promise<number> {
  return (await redis.get<number>("tau:total_sold")) ?? 0;
}
