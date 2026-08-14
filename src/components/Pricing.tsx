const PRICE = '€25';

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

const features = [
	'Use it on all your devices',
	'One-time payment, yours forever',
	'Smart overlays & filters',
	'One-click export',
	'Free updates',
];

export default function Pricing() {
	return (
		<section id="pricing" className="py-24 px-6">
			<div className="mx-auto max-w-3xl text-center">
				<h2 className="text-3xl font-bold tracking-tight text-[#1a0f0d] sm:text-4xl">
					One price. Every device.
				</h2>
				<p className="mt-4 text-[#6b4f47]">Pay once. Own it forever. Free updates included.</p>
				<div className="mt-4 flex items-center justify-center gap-3 flex-wrap">
					{['No subscription', '14-day money-back guarantee', 'Free updates'].map(label => (
						<span
							key={label}
							className="inline-flex items-center gap-1.5 text-xs font-medium text-[#6b4f47] border border-[#cfc4ba] bg-[#e0d8cf] px-3 py-1.5 rounded-full"
						>
							<CheckIcon />
							{label}
						</span>
					))}
				</div>
			</div>

			<div className="mx-auto mt-16 max-w-md">
				<div className="border border-[#1a0f0d] bg-[#1a0f0d] text-[#ede6de] p-8 flex flex-col rounded-2xl">
					<h3 className="text-lg font-semibold">Tau License</h3>
					<p className="mt-1 text-sm text-[#ede6de]/70">Everything, everywhere, forever</p>

					<div className="mt-6">
						<span className="text-5xl font-bold">{PRICE}</span>
					</div>
					<p className="mt-2 text-sm text-[#ede6de]/70">Unlimited devices</p>
					<p className="mt-1 text-xs text-[#ede6de]/50">+ applicable taxes</p>

					<ul className="mt-6 space-y-2 flex-1">
						{features.map(f => (
							<li key={f} className="flex items-start gap-2 text-sm text-[#ede6de]/90">
								<CheckIcon />
								{f}
							</li>
						))}
					</ul>

					<a
						href="/api/checkout"
						className="mt-8 py-3 text-center text-sm font-semibold bg-[#aa1e0f] text-[#ede6de] hover:bg-[#8a1800] transition rounded-lg"
					>
						Get Tau — {PRICE}
					</a>
				</div>
			</div>
		</section>
	);
}
