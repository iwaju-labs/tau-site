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
  product: string;
  email: string;
  amountCents: number;
  currency: string;
  orderId: string;
  discounted: boolean;
  totalSold: number;
}): Promise<void> {
  const price =
    opts.amountCents === 0
      ? 'Free'
      : `${(opts.amountCents / 100).toFixed(2)} ${opts.currency.toUpperCase()}`;

  await send({
    embeds: [{
      // A €0 order is almost always a test or a comped licence, and it should
      // not look like revenue at a glance.
      title: opts.discounted ? '🏷️ New Sale (discounted)' : '💰 New Sale',
      color: opts.discounted ? 0xFEE75C : 0x57F287,
      fields: [
        { name: 'Product', value: opts.product || 'Unknown', inline: true },
        { name: 'Price', value: price, inline: true },
        { name: 'Sale #', value: String(opts.totalSold), inline: true },
        { name: 'Customer', value: opts.email || 'Unknown', inline: false },
        { name: 'Order', value: `\`${opts.orderId}\``, inline: false },
      ],
      timestamp: new Date().toISOString(),
    }],
  });
}

export async function notifyCheckout(): Promise<void> {
  await send({
    embeds: [{
      title: '🛒 Checkout Started',
      color: 0x5865F2,
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
