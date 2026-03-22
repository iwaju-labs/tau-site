import { useEffect, useRef, useState } from 'react';

interface Satellite {
	src: string;
	alt: string;
}

interface OrbitSectionProps {
	mainVideoSrc?: string;
	satellites?: Satellite[];
}

const ORBIT_RADIUS_X = 460;
const ORBIT_RADIUS_Y = 70;
const RING_Y_OFFSET = 110;   // px from scene center to each ring's center
const DEGREES_PER_MS = 0.018; // ~10s per orbit (orbit speed)

const DEFAULT_SATELLITES: Satellite[] = [
	// top ring (first half)
	{ src: '/tau-assets/landing-page-timelapses/tlapse039.gif', alt: 'Timelapse preview' },
	{ src: '/tau-assets/landing-page-timelapses/tlapse038.gif', alt: 'Timelapse preview' },
	{ src: '/tau-assets/landing-page-timelapses/tlapse036.gif', alt: 'Timelapse preview' },
	{ src: '/tau-assets/landing-page-timelapses/tlapse035.gif', alt: 'Timelapse preview' },
	// bottom ring (second half)
	{ src: '/tau-assets/landing-page-timelapses/tlapse029.gif', alt: 'Timelapse preview' },
	{ src: '/tau-assets/landing-page-timelapses/tlapse024.gif', alt: 'Timelapse preview' },
	{ src: '/tau-assets/landing-page-timelapses/tlapse009.gif', alt: 'Timelapse preview' },
	{ src: '/tau-assets/landing-page-timelapses/tlapse032.gif', alt: 'Timelapse preview' },
];

export default function OrbitSection({
	mainVideoSrc = '/tau-assets/tau-demo-improved.mp4',
	satellites = DEFAULT_SATELLITES,
}: OrbitSectionProps) {
	const [hovered, setHovered] = useState(false);
	const satRefs = useRef<(HTMLDivElement | null)[]>([]);
	const rafRef = useRef<number>(0);
	const angleRef = useRef<number>(0);
	const lastTimeRef = useRef<number>(0);

	useEffect(() => {
		const half = Math.ceil(satellites.length / 2);

		const animate = (timestamp: number) => {
			const delta = lastTimeRef.current ? timestamp - lastTimeRef.current : 0;
			lastTimeRef.current = timestamp;
			angleRef.current += DEGREES_PER_MS * delta;

			satRefs.current.forEach((el, i) => {
				if (!el) return;

				const isTop = i < half;
				const ringIndex = isTop ? i : i - half;
				const count = isTop ? half : satellites.length - half;
				// Top ring rotates forward, bottom ring rotates backward
				const direction = isTop ? 1 : -1;
				// Stagger the starting positions so rings aren't in sync
				const phaseOffset = isTop ? 0 : 45;
				const yOffset = isTop ? -RING_Y_OFFSET : RING_Y_OFFSET;

				const angle = (direction * angleRef.current + (360 / count) * ringIndex + phaseOffset) * (Math.PI / 180);
				const x = Math.cos(angle) * ORBIT_RADIUS_X;
				const y = yOffset + Math.sin(angle) * ORBIT_RADIUS_Y;
				const sinVal = Math.sin(angle);

				const scale = 0.72 + 0.28 * ((sinVal + 1) / 2);
				const opacity = 0.55 + 0.45 * ((sinVal + 1) / 2);
				// Main video z-index 10; satellites range 4–16 to cross above and below
				const zIndex = Math.round(10 + sinVal * 6);

				el.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${scale})`;
				el.style.opacity = String(opacity);
				el.style.zIndex = String(zIndex);
			});

			rafRef.current = requestAnimationFrame(animate);
		};

		rafRef.current = requestAnimationFrame(animate);
		return () => cancelAnimationFrame(rafRef.current);
	}, [satellites.length]);

	return (
		<section
			className="relative flex flex-col items-center justify-center pt-4 pb-4 px-6 overflow-hidden"
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
		>
			<div className="relative" style={{ width: '1200px', height: '580px' }}>
				{/* Main video — z-index 10, satellites cross above (>10) and below (<10) */}
				<div
					className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
					style={{ zIndex: hovered ? 20 : 10 }}
				>
					<div style={{
						transform: `scale(${hovered ? 1.04 : 1})`,
						transition: 'transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)',
					}}>
						<video
							src={mainVideoSrc}
							autoPlay
							loop
							muted
							playsInline
							className="w-160 aspect-video animate-[border-glow_2.5s_ease-in-out_infinite]"
							onContextMenu={e => e.preventDefault()}
						/>
					</div>
				</div>

				{/* Orbiting satellites — first half = top ring, second half = bottom ring */}
				{satellites.map((sat, i) => (
					<div
						key={i}
						ref={el => { satRefs.current[i] = el; }}
						className="absolute left-1/2 top-1/2 will-change-transform"
						style={{
							zIndex: 5,
							transition: 'transform 80ms cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 80ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
						}}
					>
						<img
							src={sat.src}
							alt={sat.alt}
							draggable={false}
							onContextMenu={e => e.preventDefault()}
							className="w-48 aspect-video rounded-md border border-white/10 shadow-2xl shadow-black/70 select-none"
						/>
					</div>
				))}
			</div>
		</section>
	);
}
