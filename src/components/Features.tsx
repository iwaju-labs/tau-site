import { Video, Timer, Scissors, Wand2, Tag, FileVideo } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const features: { icon: LucideIcon; title: string; description: string }[] = [
	{
		icon: Video,
		title: 'Record from camera or screen',
		description: "Capture your work directly — whether it's a coding session, design process, or art piece.",
	},
	{
		icon: Timer,
		title: 'Smart timer overlays',
		description: 'Add clock, stopwatch, or custom font overlays so viewers always know how long things took.',
	},
	{
		icon: Scissors,
		title: 'Minimal editor',
		description: 'Trim, add music, and export without the bloat of a full video editor.',
	},
	{
		icon: Wand2,
		title: 'Filters & templates',
		description: 'Fisheye, colour correction, and more — make every timelapse look intentional.',
	},
	{
		icon: Tag,
		title: 'Shareable work card',
		description: '"Worked 4 hours on landing page" — one exportable moment, ready to post.',
	},
	{
		icon: FileVideo,
		title: 'Export to MP4',
		description: 'One click to a clean MP4, ready for Twitter, YouTube, or wherever you share.',
	},
];

export default function Features() {
	return (
		<section id="features" className="py-24 px-6">
			<div className="mx-auto max-w-5xl">
				<h2 className="text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
					Everything you need. Nothing you don't.
				</h2>
				<div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
					{features.map((f) => (
						<div key={f.title} className="border border-zinc-800 bg-zinc-900 p-6">
							<f.icon className="size-6 text-zinc-400" />
							<h3 className="mt-4 text-lg font-semibold text-white">{f.title}</h3>
							<p className="mt-2 text-sm text-zinc-400">{f.description}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
