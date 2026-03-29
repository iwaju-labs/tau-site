export default function DemoSection() {
	return (
		<section className="py-16 px-6">
			<div className="mx-auto max-w-4xl">
				<p className="text-center text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-6">
					See it in action
				</p>
				<video
					src="/tau-assets/tau-demo-improved.mp4"
					autoPlay
					loop
					muted
					playsInline
					poster="/tau-assets/demo-preload-poster.png"
					className="w-full aspect-video animate-[border-glow_2.5s_ease-in-out_infinite]"
					onContextMenu={e => e.preventDefault()}
				/>
			</div>
		</section>
	);
}
