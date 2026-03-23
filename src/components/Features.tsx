import { Video, Timer, Scissors, Wand2, Tag, FileVideo } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const features: { icon: LucideIcon; title: string; description: string }[] = [
	{
		icon: Video,
		title: 'Record from any camera',
		description: "Capture your work directly — whether it's a coding session, design process, or art piece. MacOS users can use iPhones as a camera input",
	},
	{
		icon: Timer,
		title: 'Smart timer overlays',
		description: 'Add clock, stopwatch, custom font and many other overlays to give your timelapses personality.',
	},
	{
		icon: Scissors,
		title: 'Minimal editor',
		description: 'Trim and export without the bloat of a full video editor.',
	},
	// {
	// 	icon: Wand2,
	// 	title: 'Filters & templates',
	// 	description: 'Fisheye, colour correction, and more — make every timelapse look intentional.',
	// },
	{
		icon: FileVideo,
		title: 'Export to multiple formats',
		description: 'One click to MP4, GIF, WEBM ready for Twitter, YouTube, or wherever you share.',
	},
];

export default function Features() {
	return (
		<section id="features" className="py-24 px-6">
			<div className="mx-auto max-w-5xl">
				<h2 className="text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
					Everything you need all in one place.
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
