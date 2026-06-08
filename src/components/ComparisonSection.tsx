import { useState, useRef } from 'react';

// ─── Drop in real video files here when ready ────────────────────────────────

const BEFORE_SRC: string | null = null; // e.g. '/tau-assets/before.mp4'

const AFTER_EXAMPLES: { webm?: string; mp4: string; label: string }[] = [
	// { webm: '/tau-assets/after-example-1.webm', mp4: '/tau-assets/after-example-1.mp4', label: 'Example 1' },
	// { webm: '/tau-assets/after-example-2.webm', mp4: '/tau-assets/after-example-2.mp4', label: 'Example 2' },
	// { webm: '/tau-assets/after-example-3.webm', mp4: '/tau-assets/after-example-3.mp4', label: 'Example 3' },
];

// ─────────────────────────────────────────────────────────────────────────────

const SWIPE_THRESHOLD = 72;

function VideoCard({ src }: { src: { webm?: string; mp4: string } }) {
	return (
		<video
			autoPlay loop muted playsInline
			className="w-full h-full object-cover rounded-2xl select-none"
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
	const [dragX, setDragX] = useState(0);
	const [dragging, setDragging] = useState(false);
	const [exiting, setExiting] = useState(false);
	const startX = useRef(0);

	const at = (offset: number) => AFTER_EXAMPLES[(topIdx + offset) % total];

	const advance = (direction: 'left' | 'right') => {
		setExiting(true);
		const flyX = direction === 'right' ? 700 : -700;
		// CSS picks this up via the exiting + dragX state
		setDragX(flyX);
		setTimeout(() => {
			setTopIdx(i => (i + 1) % total);
			setExiting(false);
			setDragX(0);
		}, 380);
	};

	const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
		if (total <= 1 || exiting) return;
		setDragging(true);
		startX.current = e.clientX;
		(e.currentTarget).setPointerCapture(e.pointerId);
	};

	const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
		if (!dragging || exiting) return;
		setDragX(e.clientX - startX.current);
	};

	const onPointerUp = () => {
		if (!dragging) return;
		setDragging(false);
		if (Math.abs(dragX) > SWIPE_THRESHOLD) {
			advance(dragX > 0 ? 'right' : 'left');
		} else {
			setDragX(0);
		}
	};

	const topCardStyle: React.CSSProperties = {
		transform: `translateX(${dragX}px) rotate(${dragX * 0.03}deg)`,
		transition: dragging ? 'none' : exiting ? 'transform 0.38s ease-in, opacity 0.38s ease-in' : 'transform 0.3s ease-out',
		opacity: exiting ? 0 : 1,
		cursor: total > 1 ? (dragging ? 'grabbing' : 'grab') : 'default',
		zIndex: 3,
		userSelect: 'none',
	};

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
						{BEFORE_SRC ? (
							<video
								autoPlay loop muted playsInline
								className="w-full aspect-video rounded-2xl border border-[#cfc4ba]"
								onContextMenu={e => e.preventDefault()}
							>
								<source src={BEFORE_SRC} type="video/mp4" />
							</video>
						) : (
							<Placeholder label="before" />
						)}
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
								{/* Stack container — overflow hidden clips mid-flight cards cleanly */}
								<div className="relative w-full aspect-video overflow-hidden rounded-2xl">

									{/* Back card (furthest behind) */}
									{total > 2 && (
										<div
											className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none"
											style={{ transform: 'rotate(-2.5deg) scale(0.91) translateY(12px)', zIndex: 1 }}
										>
											<VideoCard src={at(2)} />
										</div>
									)}

									{/* Middle card */}
									{total > 1 && (
										<div
											className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none"
											style={{ transform: 'rotate(1.5deg) scale(0.96) translateY(6px)', zIndex: 2 }}
										>
											<VideoCard src={at(1)} />
										</div>
									)}

									{/* Top card — interactive */}
									<div
										className="absolute inset-0 rounded-2xl overflow-hidden"
										style={topCardStyle}
										onPointerDown={onPointerDown}
										onPointerMove={onPointerMove}
										onPointerUp={onPointerUp}
										onPointerLeave={onPointerUp}
									>
										<VideoCard src={at(0)} />
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
