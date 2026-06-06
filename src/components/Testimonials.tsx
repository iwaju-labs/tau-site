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

	const CARD_WIDTH = 312;
	const copiesPerHalf = Math.max(2, Math.ceil(2560 / (testimonials.length * CARD_WIDTH)));
	const repeated = Array.from({ length: copiesPerHalf * 2 }, () => testimonials).flat();
	const duration = `${copiesPerHalf * 20}s`;

	return (
		<section className="py-24 overflow-hidden marquee-section">
			<p className="text-center text-xs font-semibold uppercase tracking-widest text-[#9b8880] mb-10">
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
						className="w-72 shrink-0 border border-[#cfc4ba] bg-[#e0d8cf] p-6 rounded-md"
					>
						<div className="flex gap-0.5 mb-3">
							{Array.from({ length: 5 }).map((_, j) => (
								<Star key={j} size={12} className="text-yellow-500" fill="currentColor" strokeWidth={0} />
							))}
						</div>
						<p className="text-sm text-[#1a0f0d] leading-relaxed">"{t.quote}"</p>
						<div className="mt-4 flex items-center gap-2">
							{t.verified
								? <BadgeCheck size={15} className="text-blue-500 shrink-0" />
								: <span className="text-[#9b8880] text-xs font-bold shrink-0">𝕏</span>
							}
							<p className="text-xs text-[#6b4f47]">
								{t.verified ? <span className="text-[#6b4f47]">{t.author}</span> : t.author}
							</p>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
