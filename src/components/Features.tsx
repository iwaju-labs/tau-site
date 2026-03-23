import { features } from '../data/features';

const rows = [features.slice(0, 2), features.slice(2, 4)];

export default function Features() {
	return (
		<section id="features" className="py-24 px-6">
			<div className="mx-auto max-w-5xl">
				<h2 className="text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
					Everything you need all in one place.
				</h2>
				<div className="mt-16 rounded-2xl border border-zinc-800 overflow-hidden divide-y divide-zinc-800">
					{rows.map((row) => (
						<div
							key={row[0].slug}
							className="grid grid-cols-1 sm:grid-cols-2 divide-y divide-zinc-800 sm:divide-y-0 sm:divide-x sm:divide-zinc-800"
						>
							{row.map((f) => {
								const Icon = f.icon;
								return (
									<div
										key={f.slug}
										className="flex flex-col p-8 transition-shadow hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)]"
									>
										<Icon className="size-6 text-zinc-400" />
										<h3 className="mt-4 text-lg font-semibold text-white">{f.title}</h3>
										<p className="mt-2 text-sm text-zinc-400 flex-1">{f.description}</p>
										<a
											href={`/features/${f.slug}`}
											className="mt-5 text-xs text-zinc-500 hover:text-white transition self-start"
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
					<a href="/features" className="text-sm text-zinc-400 hover:text-white transition">
						View all features →
					</a>
				</div>
			</div>
		</section>
	);
}
