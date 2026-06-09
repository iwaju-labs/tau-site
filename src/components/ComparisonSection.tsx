import { useState, useRef } from 'react';

// ─── Drop in real video files here when ready ────────────────────────────────

const BEFORE_SRC = { webm: '/tau-assets/comp-before.webm', mp4: '/tau-assets/comp-before.mp4' };

const AFTER_EXAMPLES: { webm?: string; mp4: string; label: string }[] = [
	{ webm: '/tau-assets/comp-after1.webm', mp4: '/tau-assets/comp-after1.mp4', label: 'Example 1' },
	{ webm: '/tau-assets/comp-after2.webm', mp4: '/tau-assets/comp-after2.mp4', label: 'Example 2' },
];

// ─────────────────────────────────────────────────────────────────────────────

const SWIPE_THRESHOLD = 40;

function VideoCard({ src }: { readonly src: { webm?: string; mp4: string } }) {
	return (
		<video
			autoPlay loop muted playsInline
			className="w-full h-full object-cover rounded-2xl select-none pointer-events-none"
			onContextMenu={e => e.preventDefault()}
			draggable={false}
		>
			{src.webm && <source src={src.webm} type="video/webm" />}
			<source src={src.mp4} type="video/mp4" />
		</video>
	);
}

function Placeholder({ label }: { readonly label: string }) {
	return (
		<div className="w-full aspect-video rounded-2xl bg-zinc-900 border border-dashed border-zinc-700 flex flex-col items-center justify-center gap-2">
			<span className="text-zinc-600 text-xs font-mono uppercase tracking-widest">{label}</span>
			<span className="text-zinc-700 text-xs">video coming soon</span>
		</div>
	);
}

export default function ComparisonSection() {
	const total = AFTER_EXAMPLES.length;
	const [topIdx, setTopIdx] = useState(0);
	const [exiting, setExiting] = useState<'left' | 'right' | null>(null);

	// Refs — updated without triggering re-renders during drag
	const cardRef = useRef<HTMLDivElement>(null);
	const isDragging = useRef(false);
	const startX = useRef(0);
	const currentDX = useRef(0);

	const at = (offset: number) => AFTER_EXAMPLES[(topIdx + offset) % total];

	const advance = (direction: 'left' | 'right') => {
		setExiting(direction);
		setTimeout(() => {
			setTopIdx(i => (i + 1) % total);
			setExiting(null);
			// Reset inline styles set during drag so next card starts clean
			if (cardRef.current) {
				cardRef.current.style.transform = '';
				cardRef.current.style.transition = '';
				cardRef.current.style.opacity = '';
			}
		}, 400);
	};

	const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
		if (exiting || total <= 1) return;
		isDragging.current = true;
		startX.current = e.clientX;
		currentDX.current = 0;
		e.currentTarget.setPointerCapture(e.pointerId);
		if (cardRef.current) cardRef.current.style.transition = 'none';
	};

	const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
		if (!isDragging.current) return;
		const dx = e.clientX - startX.current;
		currentDX.current = dx;
		// Directly mutate DOM — no React re-render, no lag
		if (cardRef.current) {
			cardRef.current.style.transform = `translateX(${dx}px) rotate(${dx * 0.04}deg)`;
		}
	};

	const onPointerUp = () => {
		if (!isDragging.current) return;
		isDragging.current = false;
		const dx = currentDX.current;
		if (Math.abs(dx) > SWIPE_THRESHOLD) {
			advance(dx > 0 ? 'right' : 'left');
		} else if (cardRef.current) {
			cardRef.current.style.transition = 'transform 0.3s ease-out';
			cardRef.current.style.transform = '';
		}
	};

	const exitStyle: React.CSSProperties = exiting
		? {
			transform: `translateX(${exiting === 'right' ? 700 : -700}px) rotate(${exiting === 'right' ? 20 : -20}deg)`,
			transition: 'transform 0.4s ease-in, opacity 0.4s ease-in',
			opacity: 0,
		}
		: {};

	return (
		<section className="py-24 px-6">
			<div className="mx-auto max-w-5xl">
				<h2 className="text-center text-3xl font-bold tracking-tight text-[#1a0f0d] sm:text-4xl">
					See the difference
				</h2>
				<p className="mt-4 text-center text-[#6b4f47]">
					Regular timelapse vs. a timelapse made with Tau
				</p>

				<div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8 items-start">

					{/* Before — static */}
					<div className="flex flex-col gap-3">
						<p className="text-xs font-semibold uppercase tracking-widest text-[#9b8880] text-center">
							Without Tau
						</p>
						<video
							autoPlay loop muted playsInline
							className="w-full aspect-video rounded-2xl border border-[#cfc4ba]"
							onContextMenu={e => e.preventDefault()}
						>
							<source src={BEFORE_SRC.webm} type="video/webm" />
							<source src={BEFORE_SRC.mp4} type="video/mp4" />
						</video>
					</div>

					{/* After — swipeable card stack */}
					<div className="flex flex-col gap-3">
						<p className="text-xs font-semibold uppercase tracking-widest text-[#aa1e0f] text-center">
							With Tau
						</p>

						{total === 0 ? (
							<Placeholder label="after examples" />
						) : (
							<>
								<div className="relative w-full aspect-video overflow-hidden rounded-2xl">

									{/* Back card */}
									{total > 2 && (
										<div
											className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none"
											style={{ transform: 'rotate(-2.5deg) scale(0.91) translateY(12px)', zIndex: 1 }}
										>
											<VideoCard key={at(2).mp4} src={at(2)} />
										</div>
									)}

									{/* Middle card */}
									{total > 1 && (
										<div
											className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none"
											style={{ transform: 'rotate(1.5deg) scale(0.96) translateY(6px)', zIndex: 2 }}
										>
											<VideoCard key={at(1).mp4} src={at(1)} />
										</div>
									)}

									{/* Top card */}
									<div
										ref={cardRef}
										className="absolute inset-0 rounded-2xl overflow-hidden"
										style={{ zIndex: 3, ...exitStyle }}
									>
										<VideoCard key={at(0).mp4} src={at(0)} />

										{/* Transparent overlay captures all pointer events above the video */}
										{!exiting && total > 1 && (
											<div
												className="absolute inset-0 cursor-grab active:cursor-grabbing"
												style={{ touchAction: 'none' }}
												onPointerDown={onPointerDown}
												onPointerMove={onPointerMove}
												onPointerUp={onPointerUp}
												onPointerCancel={onPointerUp}
											/>
										)}
									</div>
								</div>

								{total > 1 && (
									<p className="text-center text-xs text-[#9b8880] select-none mt-1">
										← swipe to see another example →
									</p>
								)}
							</>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}
