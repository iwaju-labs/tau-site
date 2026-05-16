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
				<h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
					Simple, one-time pricing.
				</h2>
				<p className="mt-4 text-zinc-400">Pay once. Own it forever. Free updates included.</p>
			</div>

			<div className="mx-auto mt-16 grid max-w-3xl gap-8 sm:grid-cols-2">
				{/* Solo */}
				<div className="border border-zinc-800 bg-zinc-900 p-8 flex flex-col relative overflow-hidden rounded-2xl">
					<h3 className="text-lg font-semibold text-white">Solo</h3>
					<p className="mt-1 text-sm text-zinc-400">Best for personal use</p>

					<div className="mt-6">
						<span className="text-5xl font-bold text-white">{data.solo}</span>
						{nextPrices && (
							<p className="mt-1.5 text-xs text-amber-400">↑ Rises to {nextPrices.solo} next tier</p>
						)}
					</div>
					<p className="mt-2 text-sm text-zinc-400">1 device</p>
					<p className="mt-1 text-xs text-zinc-600">+ applicable taxes</p>

					<ul className="mt-6 space-y-2 flex-1">
						{soloFeatures.map(f => (
							<li key={f} className="flex items-start gap-2 text-sm text-zinc-300">
								<CheckIcon />
								{f}
							</li>
						))}
					</ul>

					{data.spotsLeft !== null && capacity !== null && fillPct !== null && (
						<div className="mt-8">
							<div className="flex items-center gap-1.5 text-xs text-zinc-400 mb-1.5">
								<span className="relative flex h-2 w-2">
									<span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-50 animate-ping" />
									<span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
								</span>
								{data.spotsLeft} spot{data.spotsLeft === 1 ? '' : 's'} left at this price
							</div>
							<div className="w-full h-1 bg-zinc-800 overflow-hidden">
								<div
									className="h-full bg-white transition-all duration-1000"
									style={{ width: `${fillPct}%` }}
								/>
							</div>
						</div>
					)}

					<a
						href="/api/checkout?plan=solo"
						className="mt-4 py-3 text-center text-sm font-semibold bg-white text-zinc-900 hover:bg-zinc-200 transition"
					>
						Buy Solo — {data.solo}
					</a>
				</div>

				{/* Pro */}
				<div className="border border-white bg-white text-zinc-900 p-8 flex flex-col relative overflow-hidden rounded-2xl">
					<div className="absolute top-4 right-4 text-right">
						<span className="bg-zinc-900 text-white text-xs font-bold px-3 py-1 block">Best Value</span>
						<span className="text-zinc-500 text-xs mt-0.5 block">3 devices · less than 2×</span>
					</div>
					<h3 className="text-lg font-semibold">Pro</h3>
					<p className="mt-1 text-sm text-zinc-600">Best for creators with multiple machines</p>

					<div className="mt-6">
						<span className="text-5xl font-bold">{data.pro}</span>
						{nextPrices && (
							<p className="mt-1.5 text-xs text-amber-600">↑ Rises to {nextPrices.pro} next tier</p>
						)}
					</div>
					<p className="mt-2 text-sm text-zinc-600">Up to 3 devices</p>
					<p className="mt-1 text-xs text-zinc-400">+ applicable taxes</p>

					<ul className="mt-6 space-y-2 flex-1">
						{proFeatures.map(f => (
							<li key={f} className="flex items-start gap-2 text-sm text-zinc-700">
								<CheckIcon />
								{f}
							</li>
						))}
					</ul>

					{data.spotsLeft !== null && capacity !== null && fillPct !== null && (
						<div className="mt-8">
							<div className="flex items-center gap-1.5 text-xs text-zinc-500 mb-1.5">
								<span className="relative flex h-2 w-2">
									<span className="absolute inline-flex h-full w-full rounded-full bg-zinc-900 opacity-50 animate-ping" />
									<span className="relative inline-flex h-2 w-2 rounded-full bg-zinc-900" />
								</span>
								{data.spotsLeft} spot{data.spotsLeft === 1 ? '' : 's'} left at this price
							</div>
							<div className="w-full h-1 bg-zinc-200 overflow-hidden">
								<div
									className="h-full bg-zinc-900 transition-all duration-1000"
									style={{ width: `${fillPct}%` }}
								/>
							</div>
						</div>
					)}

					<a
						href="/api/checkout?plan=pro"
						className="mt-4 py-3 text-center text-sm font-semibold bg-zinc-900 text-white hover:bg-zinc-700 transition"
					>
						Buy Pro — {data.pro}
					</a>
				</div>
			</div>
		</section>
	);
}
