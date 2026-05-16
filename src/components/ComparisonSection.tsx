export default function ComparisonSection() {
	return (
		<section className="py-24 px-6">
			<div className="mx-auto max-w-5xl">
				<h2 className="text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
					See the difference
				</h2>
				<p className="mt-4 text-center text-zinc-400">
					Regular timelapse vs. a timelapse made with Tau
				</p>
				<div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
					<div className="flex flex-col gap-3">
						<p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 text-center">
							Without Tau
						</p>
						<video
							src="/tau-assets/comparison-before.mp4"
							autoPlay
							loop
							muted
							playsInline
							className="w-full aspect-video border border-zinc-800"
							onContextMenu={e => e.preventDefault()}
						/>
					</div>
					<div className="flex flex-col gap-3">
						<p className="text-xs font-semibold uppercase tracking-widest text-white text-center">
							With Tau
						</p>
						<video
							src="/tau-assets/comparison-after.mp4"
							autoPlay
							loop
							muted
							playsInline
							className="w-full aspect-video animate-[border-glow_2.5s_ease-in-out_infinite]"
							onContextMenu={e => e.preventDefault()}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
