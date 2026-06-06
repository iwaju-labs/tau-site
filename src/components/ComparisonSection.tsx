export default function ComparisonSection() {
	return (
		<section className="py-24 px-6">
			<div className="mx-auto max-w-5xl">
				<h2 className="text-center text-3xl font-bold tracking-tight text-[#1a0f0d] sm:text-4xl">
					See the difference
				</h2>
				<p className="mt-4 text-center text-[#6b4f47]">
					Regular timelapse vs. a timelapse made with Tau
				</p>
				<div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
					<div className="flex flex-col gap-3">
						<p className="text-xs font-semibold uppercase tracking-widest text-[#9b8880] text-center">
							Without Tau
						</p>
						<video
							src="/tau-assets/comparison-before.mp4"
							autoPlay
							loop
							muted
							playsInline
							className="w-full aspect-video rounded-2xl border border-[#cfc4ba]"
							onContextMenu={e => e.preventDefault()}
						/>
					</div>
					<div className="flex flex-col gap-3">
						<p className="text-xs font-semibold uppercase tracking-widest text-[#aa1e0f] text-center">
							With Tau
						</p>
						<video
							src="/tau-assets/comparison-after.mp4"
							autoPlay
							loop
							muted
							playsInline
							className="w-full aspect-video rounded-2xl animate-[border-glow_2.5s_ease-in-out_infinite]"
							onContextMenu={e => e.preventDefault()}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
