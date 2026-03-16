import { FaApple, FaWindows } from 'react-icons/fa';

export default function Hero() {
	return (
		<section className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-20 text-center overflow-hidden">
			<img
				src="/tau-assets/tau-logo-transparent.png"
				alt=""
				aria-hidden="true"
				className="pointer-events-none invert -mb-4 select-none w-48 opacity-100 animate-[breathe_4s_ease-in-out_infinite]"
			/>
			<h1 className="max-w-3xl text-5xl font-bold tracking-tight text-white sm:text-7xl">
				Stop making boring timelapses
			</h1>
			<p className="mt-6 max-w-xl text-lg text-zinc-400">
				Tau lets you record, edit, and export timelapses that people actually want to watch — with smart overlays, filters, and one-click export.
			</p>
			<div className="mt-10 flex flex-wrap items-center justify-center gap-4">
				<a
					href="#pricing"
					className="bg-white px-10 py-4 text-base font-bold text-zinc-900 hover:bg-zinc-200 transition shadow-lg shadow-white/10"
				>
					Get Tau Now
				</a>
			</div>
			
			<div className="mt-6 flex justify-center items-center gap-6 text-zinc-500">
				<div className="flex items-center gap-2" title="Available for macOS">
					<FaApple className="h-6 w-6" />
					<span className="text-sm font-medium">macOS</span>
				</div>
				<div className="flex items-center gap-2" title="Available for Windows">
					<FaWindows className="h-5 w-5" />
					<span className="text-sm font-medium">Windows</span>
				</div>
			</div>

			<img src="/tau-assets/tau-demo.gif" alt="a demo timelapse created in tau" className="mt-16 w-full max-w-4xl aspect-video flex items-center justify-center border border-white" />
		</section>
	);
}
