import { useEffect, useState } from 'react';

type PricingData = {
	solo: string;
	pro: string;
	spotsLeft: number | null;
	tierIndex: number;
};

const DEFAULTS: PricingData = { solo: '€9.99', pro: '€17.99', spotsLeft: 3, tierIndex: 1 };

const TIER_NEXT_PRICES: Record<number, { solo: string; pro: string } | null> = {
	1: { solo: '€18.99', pro: '€40.99' },
	2: { solo: '€24.99', pro: '€50.99' },
	3: null,
};

const TIER_CAPACITY: Record<number, number | null> = {
	1: 3,
	2: 10,
	3: null,
};

const CheckIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		className="size-4 shrink-0 mt-0.5"
	>
		<path d="M20 6L9 17l-5-5" />
	</svg>
);

const soloFeatures = [
	'One-time payment, yours forever',
	'Smart overlays & filters',
	'One-click export',
	'Free updates',
];

const proFeatures = [
	'Everything in Solo',
	'Up to 3 devices',
	'Priority support',
	'Early access to new features',
];

export default function Pricing() {
	const [data, setData] = useState<PricingData>(DEFAULTS);

	useEffect(() => {
		fetch('/api/pricing-info')
			.then(r => r.json())
			.then(setData)
			.catch(() => {});
	}, []);

	const nextPrices = TIER_NEXT_PRICES[data.tierIndex];
	const capacity = TIER_CAPACITY[data.tierIndex];
	const sold = capacity !== null && data.spotsLeft !== null ? capacity - data.spotsLeft : null;
	const fillPct = capacity !== null && sold !== null ? Math.round((sold / capacity) * 100) : null;

	return (
		<section id="pricing" className="py-24 px-6">
			<div className="mx-auto max-w-3xl text-center">
				<h2 className="text-3xl font-bold tracking-tight text-[#1a0f0d] sm:text-4xl">
					Simple, one-time pricing.
				</h2>
				<p className="mt-4 text-[#6b4f47]">Pay once. Own it forever. Free updates included.</p>
				<div className="mt-4 flex items-center justify-center gap-3 flex-wrap">
					{['No subscription', '14-day money-back guarantee', 'Free updates'].map(label => (
						<span key={label} className="inline-flex items-center gap-1.5 text-xs font-medium text-[#6b4f47] border border-[#cfc4ba] bg-[#e0d8cf] px-3 py-1.5 rounded-full">
							<CheckIcon />
							{label}
						</span>
					))}
				</div>
			</div>

			<div className="mx-auto mt-16 grid max-w-3xl gap-8 sm:grid-cols-2">
				{/* Solo */}
				<div className="border border-[#cfc4ba] bg-[#e0d8cf] p-8 flex flex-col relative overflow-hidden rounded-2xl">
					<h3 className="text-lg font-semibold text-[#1a0f0d]">Solo</h3>
					<p className="mt-1 text-sm text-[#6b4f47]">Best for personal use</p>

					<div className="mt-6">
						<span className="text-5xl font-bold text-[#1a0f0d]">{data.solo}</span>
						{nextPrices && (
							<p className="mt-1.5 text-xs text-amber-600">↑ Rises to {nextPrices.solo} next tier</p>
						)}
					</div>
					<p className="mt-2 text-sm text-[#6b4f47]">1 device</p>
					<p className="mt-1 text-xs text-[#9b8880]">+ applicable taxes</p>

					<ul className="mt-6 space-y-2 flex-1">
						{soloFeatures.map(f => (
							<li key={f} className="flex items-start gap-2 text-sm text-[#1a0f0d]">
								<CheckIcon />
								{f}
							</li>
						))}
					</ul>

					{data.spotsLeft !== null && capacity !== null && fillPct !== null && (
						<div className="mt-8">
							<div className="flex items-center gap-1.5 text-xs text-[#6b4f47] mb-1.5">
								<span className="relative flex h-2 w-2">
									<span className="absolute inline-flex h-full w-full rounded-full bg-[#aa1e0f] opacity-50 animate-ping" />
									<span className="relative inline-flex h-2 w-2 rounded-full bg-[#aa1e0f]" />
								</span>
								{data.spotsLeft} spot{data.spotsLeft === 1 ? '' : 's'} left at this price
							</div>
							<div className="w-full h-1 bg-[#cfc4ba] overflow-hidden">
								<div
									className="h-full bg-[#aa1e0f] transition-all duration-1000"
									style={{ width: `${fillPct}%` }}
								/>
							</div>
						</div>
					)}

					<a
						href="/api/checkout?plan=solo"
						className="mt-4 py-3 text-center text-sm font-semibold bg-[#aa1e0f] text-[#ede6de] hover:bg-[#8a1800] transition"
					>
						Buy Solo — {data.solo}
					</a>
				</div>

				{/* Pro */}
				<div className="border border-[#1a0f0d] bg-[#1a0f0d] text-[#ede6de] p-8 flex flex-col relative overflow-hidden rounded-2xl">
					<div className="absolute top-4 right-4 text-right">
						<span className="bg-[#aa1e0f] text-[#ede6de] text-xs font-bold px-3 py-1 block">Best Value</span>
						<span className="text-[#ede6de]/50 text-xs mt-0.5 block">3 devices · less than 2×</span>
					</div>
					<h3 className="text-lg font-semibold">Pro</h3>
					<p className="mt-1 text-sm text-[#ede6de]/70">Best for creators with multiple machines</p>

					<div className="mt-6">
						<span className="text-5xl font-bold">{data.pro}</span>
						{nextPrices && (
							<p className="mt-1.5 text-xs text-amber-400">↑ Rises to {nextPrices.pro} next tier</p>
						)}
					</div>
					<p className="mt-2 text-sm text-[#ede6de]/70">Up to 3 devices</p>
					<p className="mt-1 text-xs text-[#ede6de]/50">+ applicable taxes</p>

					<ul className="mt-6 space-y-2 flex-1">
						{proFeatures.map(f => (
							<li key={f} className="flex items-start gap-2 text-sm text-[#ede6de]/90">
								<CheckIcon />
								{f}
							</li>
						))}
					</ul>

					{data.spotsLeft !== null && capacity !== null && fillPct !== null && (
						<div className="mt-8">
							<div className="flex items-center gap-1.5 text-xs text-[#ede6de]/60 mb-1.5">
								<span className="relative flex h-2 w-2">
									<span className="absolute inline-flex h-full w-full rounded-full bg-[#ede6de] opacity-50 animate-ping" />
									<span className="relative inline-flex h-2 w-2 rounded-full bg-[#ede6de]" />
								</span>
								{data.spotsLeft} spot{data.spotsLeft === 1 ? '' : 's'} left at this price
							</div>
							<div className="w-full h-1 bg-[#cfc4ba]/20 overflow-hidden">
								<div
									className="h-full bg-[#ede6de] transition-all duration-1000"
									style={{ width: `${fillPct}%` }}
								/>
							</div>
						</div>
					)}

					<a
						href="/api/checkout?plan=pro"
						className="mt-4 py-3 text-center text-sm font-semibold bg-[#aa1e0f] text-[#ede6de] hover:bg-[#8a1800] transition"
					>
						Buy Pro — {data.pro}
					</a>
				</div>
			</div>
		</section>
	);
}
