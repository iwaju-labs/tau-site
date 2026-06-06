import { features } from '../data/features';

const rows = [features.slice(0, 2), features.slice(2, 4)];

export default function Features() {
	return (
		<section id="features" className="py-24 px-6">
			<div className="mx-auto max-w-5xl">
				<h2 className="text-center text-3xl font-bold tracking-tight text-[#1a0f0d] sm:text-4xl">
					Everything you need all in one place.
				</h2>
				<div className="mt-16 rounded-2xl border border-[#cfc4ba] overflow-hidden divide-y divide-[#cfc4ba]">
					{rows.map((row) => (
						<div
							key={row[0].slug}
							className="grid grid-cols-1 sm:grid-cols-2 divide-y divide-[#cfc4ba] sm:divide-y-0 sm:divide-x sm:divide-[#cfc4ba]"
						>
							{row.map((f) => {
								const Icon = f.icon;
								return (
									<div
										key={f.slug}
										className="flex flex-col p-8 transition-shadow hover:shadow-[inset_0_0_0_1px_rgba(170,30,15,0.12)]"
									>
										<Icon className="size-6 text-[#6b4f47]" />
										<h3 className="mt-4 text-lg font-semibold text-[#1a0f0d]">{f.title}</h3>
										<p className="mt-2 text-sm text-[#6b4f47] flex-1">{f.description}</p>
										<a
											href={`/features/${f.slug}`}
											className="mt-5 text-xs text-[#6b4f47] hover:text-[#aa1e0f] transition self-start"
										>
											Learn more →
										</a>
									</div>
								);
							})}
						</div>
					))}
				</div>
				<div className="mt-10 text-center">
					<a href="/features" className="text-sm text-[#6b4f47] hover:text-[#aa1e0f] transition">
						View all features →
					</a>
				</div>
			</div>
		</section>
	);
}
