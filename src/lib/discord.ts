const TIERS = [
  { limit: 3,        solo: "€9.99",  pro: "€17.99" },
  { limit: 13,       solo: "€18.99", pro: "€40.99" },
  { limit: Infinity, solo: "€24.99", pro: "€50.99" },
];

export function getTierIndexForCount(count: number): number {
  for (let i = 0; i < TIERS.length; i++) {
    if (count < TIERS[i].limit) return i + 1;
  }
  return 3;
}

async function send(payload: object): Promise<void> {
  const url = import.meta.env.DISCORD_WEBHOOK_URL || process.env.DISCORD_WEBHOOK_URL;
  if (!url) return;
  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    // Don't let Discord failures affect the main request
  }
}

export async function notifySale(opts: {
  plan: string;
  email: string;
  amountCents: number;
  currency: string;
  totalSold: number;
  tierIndex: number;
}): Promise<void> {
  const price = `${(opts.amountCents / 100).toFixed(2)} ${opts.currency.toUpperCase()}`;
  await send({
    embeds: [{
      title: '💰 New Sale',
      color: 0x57F287,
      fields: [
        { name: 'Plan', value: opts.plan || 'Unknown', inline: true },
        { name: 'Price', value: price, inline: true },
        { name: 'Customer', value: opts.email || 'Unknown', inline: true },
        { name: 'Total Sold', value: String(opts.totalSold), inline: true },
        { name: 'Tier', value: `T${opts.tierIndex}`, inline: true },
      ],
      timestamp: new Date().toISOString(),
    }],
  });
}

export async function notifyTierChange(opts: {
  newTierIndex: number;
  totalSold: number;
}): Promise<void> {
  const prev = TIERS[opts.newTierIndex - 2]; // tier before the new one
  const curr = TIERS[opts.newTierIndex - 1];
  await send({
    embeds: [{
      title: '🔺 Price Tier Unlocked',
      color: 0xFEE75C,
      description: `Tau hit **${opts.totalSold} sales** — prices have moved to **Tier ${opts.newTierIndex}**!`,
      fields: [
        { name: 'Solo', value: `~~${prev.solo}~~ → **${curr.solo}**`, inline: true },
        { name: 'Pro', value: `~~${prev.pro}~~ → **${curr.pro}**`, inline: true },
      ],
      timestamp: new Date().toISOString(),
    }],
  });
}

export async function notifyCheckout(opts: {
  plan: string;
  tierIndex: number;
}): Promise<void> {
  await send({
    embeds: [{
      title: '🛒 Checkout Started',
      color: 0x5865F2,
      fields: [
        { name: 'Plan', value: opts.plan.charAt(0).toUpperCase() + opts.plan.slice(1), inline: true },
        { name: 'Tier', value: `T${opts.tierIndex}`, inline: true },
      ],
      timestamp: new Date().toISOString(),
    }],
  });
}

export async function notifyLicenseActivation(opts: {
  keyMasked: string;
  label: string;
}): Promise<void> {
  await send({
    embeds: [{
      title: '🔑 License Activated',
      color: 0x9B59B6,
      fields: [
        { name: 'Key', value: opts.keyMasked, inline: true },
        { name: 'Device', value: opts.label, inline: true },
      ],
      timestamp: new Date().toISOString(),
    }],
  });
}

export async function notifyDownload(opts: {
  os: string;
  filename: string;
}): Promise<void> {
  await send({
    embeds: [{
      title: '⬇️ App Downloaded',
      color: 0x95A5A6,
      fields: [
        { name: 'Platform', value: opts.os === 'mac' ? 'macOS' : 'Windows', inline: true },
        { name: 'File', value: opts.filename, inline: true },
      ],
      timestamp: new Date().toISOString(),
    }],
  });
}
