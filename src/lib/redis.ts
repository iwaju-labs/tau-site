import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: import.meta.env.UPSTASH_REDIS_REST_URL,
  token: import.meta.env.UPSTASH_REDIS_REST_TOKEN,
});

const TIERS = [
  { limit: 3,        solo: "€9.99",  pro: "€17.99" },
  { limit: 13,       solo: "€18.99", pro: "€40.99" },
  { limit: Infinity, solo: "€24.99", pro: "€50.99" },
];

export async function getPricingTier() {
  const sold = (await redis.get<number>("tau:total_sold")) ?? 0;

  for (let i = 0; i < TIERS.length; i++) {
    const tier = TIERS[i];
    if (sold < tier.limit) {
      const spotsLeft = tier.limit === Infinity ? null : tier.limit - sold;
      return { solo: tier.solo, pro: tier.pro, spotsLeft, totalSold: sold, tierIndex: i + 1 };
    }
  }

  return { solo: "€24.99", pro: "€50.99", spotsLeft: null, totalSold: sold, tierIndex: 3 };
}
