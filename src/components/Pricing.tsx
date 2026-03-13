const tiers = [
	{
		name: 'Solo',
		price: '€9.99',
		description: 'Best for personal use',
		activations: '1 device',
		cta: 'Buy Solo',
		href: '/api/checkout?plan=solo',
		highlight: false,
	},
	{
		name: 'Pro',
		price: '€17.99',
		description: 'Best for creators with multiple machines',
		activations: 'Up to 3 devices',
		cta: 'Buy Pro',
		href: '/api/checkout?plan=pro',
		highlight: true,
	},
];

export default function Pricing() {
	return (
		<section id="pricing" className="py-24 px-6">
			<div className="mx-auto max-w-3xl text-center">
				<h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
					Simple, one-time pricing.
				</h2>
				<p className="mt-4 text-zinc-400">Pay once. Own it forever. Free updates included.</p>
			</div>
			<div className="mx-auto mt-16 grid max-w-3xl gap-8 sm:grid-cols-2">
				{tiers.map((tier) => (
					<div
						key={tier.name}
						className={`border p-8 flex flex-col ${tier.highlight ? 'border-white bg-white text-zinc-900' : 'border-zinc-800 bg-zinc-900 text-white'}`}
					>
						<h3 className="text-lg font-semibold">{tier.name}</h3>
						<p className={`mt-1 text-sm ${tier.highlight ? 'text-zinc-600' : 'text-zinc-400'}`}>{tier.description}</p>
						<div className="mt-6 text-5xl font-bold">{tier.price}</div>
						<p className={`mt-2 text-sm ${tier.highlight ? 'text-zinc-600' : 'text-zinc-400'}`}>{tier.activations}</p>
						<a
							href={tier.href}
							className={`mt-8 py-3 text-center text-sm font-semibold transition ${tier.highlight ? 'bg-zinc-900 text-white hover:bg-zinc-700' : 'bg-white text-zinc-900 hover:bg-zinc-200'}`}
						>
							{tier.cta}
						</a>
					</div>
				))}
			</div>
		</section>
	);
}
