interface Testimonial {
	quote: string;
	author?: string;
}

// Add your testimonials here
const testimonials: Testimonial[] = [
	// { quote: "...", author: "..." },
	{
		quote: "Sooo clean!",
		author: "Comment on X"
	},
	{
		quote: "It's so easy to use. I don't know how to edit, so being able to manage everything here is amazing!",
		author: "Tau user"
	},
	{
		quote: "Love the widget saying the time and the progress bar",
		author: "Comment on X"
	},
	{
		quote: "cleannn UI damn",
		author: "Comment on X"
	},
	{
		quote: "I'm using it to record my study sessions, and it helps me stay focused. I also love how customizable it is!",
		author: "Tau user"
	}
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
		<section className="py-24 overflow-hidden">
			<p className="text-center text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-10">
				What people are saying
			</p>
			<div
				className="flex gap-6"
				style={{
					animation: `marquee ${duration} linear infinite`,
					width: 'max-content',
				}}
			>
				{repeated.map((t, i) => (
					<div
						key={i}
						className="w-72 shrink-0 border border-zinc-800 bg-zinc-900 p-6 rounded-md"
					>
						<p className="text-sm text-zinc-300 leading-relaxed">"{t.quote}"</p>
						<p className="mt-4 text-xs text-zinc-500">— {t.author}</p>
					</div>
				))}
			</div>
		</section>
	);
}
