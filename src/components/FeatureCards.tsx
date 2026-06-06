import { features } from '../data/features';

const rows = [features.slice(0, 2), features.slice(2, 4)];

export default function FeatureCards() {
	return (
		<div className="mt-16 rounded-2xl border border-[#cfc4ba] overflow-hidden divide-y divide-[#cfc4ba]">
			{rows.map((row) => (
				<div
					key={row[0].slug}
					className="grid grid-cols-1 sm:grid-cols-2 divide-y divide-[#cfc4ba] sm:divide-y-0 sm:divide-x sm:divide-[#cfc4ba]"
				>
					{row.map((feature) => {
						const Icon = feature.icon;
						return (
							<div
								key={feature.slug}
								className="flex flex-col p-8 transition-shadow hover:shadow-[inset_0_0_0_1px_rgba(170,30,15,0.12)]"
							>
								<Icon className="size-7 text-[#6b4f47]" />
								<h2 className="mt-4 text-xl font-semibold text-[#1a0f0d]">{feature.title}</h2>
								<p className="mt-3 text-sm text-[#6b4f47] leading-relaxed flex-1">
									{feature.description}
								</p>
								<a
									href={`/features/${feature.slug}`}
									className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#aa1e0f] border border-[#cfc4ba] px-4 py-2 hover:bg-[#e0d8cf] transition self-start"
								>
									Learn more
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<path d="M5 12h14" />
										<path d="m12 5 7 7-7 7" />
									</svg>
								</a>
							</div>
						);
					})}
				</div>
			))}
		</div>
	);
}
