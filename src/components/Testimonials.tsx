import { Star, BadgeCheck } from 'lucide-react';

interface Testimonial {
	quote: string;
	author?: string;
	verified?: boolean;
}

const testimonials: Testimonial[] = [
	{
		quote: "I'm using it to record my study sessions, and it helps me stay focused. I also love how customizable it is!",
		author: "Tau user",
		verified: true,
	},
	{
		quote: "It's so easy to use. I don't know how to edit, so being able to manage everything here is amazing!",
		author: "Tau user",
		verified: true,
	},
	{
		quote: "Love the widget saying the time and the progress bar",
		author: "Comment on X",
		verified: false,
	},
	{
		quote: "Sooo clean!",
		author: "Comment on X",
		verified: false,
	},
	{
		quote: "cleannn UI damn",
		author: "Comment on X",
		verified: false,
	},
];

export default function Testimonials() {
	if (testimonials.length === 0) return null;

	// Repeat enough copies so the first half always exceeds the widest viewport (2560px).
	// -50% animation then moves exactly one half, looping seamlessly.
	const CARD_WIDTH = 312; // w-72 (288) + gap-6 (24)
	const copiesPerHalf = Math.max(2, Math.ceil(2560 / (testimonials.length * CARD_WIDTH)));
	const repeated = Array.from({ length: copiesPerHalf * 2 }, () => testimonials).flat();
	const duration = `${copiesPerHalf * 20}s`; // 20s per copy-width → consistent speed

	return (
		<section className="py-24 overflow-hidden marquee-section">
			<p className="text-center text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-10">
				testimonials.
			</p>
			<div
				className="flex gap-6 marquee-track"
				style={{
					'--marquee-duration': duration,
					width: 'max-content',
					willChange: 'transform',
				} as React.CSSProperties}
			>
				{repeated.map((t, i) => (
					<div
						key={`${t.quote}-${i}`}
						className="w-72 shrink-0 border border-zinc-800 bg-zinc-900 p-6 rounded-md"
					>
						<div className="flex gap-0.5 mb-3">
							{Array.from({ length: 5 }).map((_, j) => (
								<Star key={j} size={12} className="text-yellow-400" fill="currentColor" strokeWidth={0} />
							))}
						</div>
						<p className="text-sm text-zinc-300 leading-relaxed">"{t.quote}"</p>
						<div className="mt-4 flex items-center gap-2">
							{t.verified
								? <BadgeCheck size={15} className="text-blue-400 shrink-0" />
								: <span className="text-zinc-600 text-xs font-bold shrink-0">𝕏</span>
							}
							<p className="text-xs text-zinc-500">
								{t.verified ? <span className="text-zinc-400">{t.author}</span> : t.author}
							</p>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
