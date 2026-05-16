import { FaApple, FaWindows } from 'react-icons/fa';

interface HeroProps {
	readonly spotsLeft?: number | null;
	readonly nextPrice?: string | null;
}

export default function Hero({ spotsLeft, nextPrice }: HeroProps) {
	return (
		<section className="relative flex flex-col items-center justify-center px-6 pt-32 pb-2 text-center overflow-hidden">
			<img
				src="/tau-assets/tau-logo-transparent.png"
				alt=""
				aria-hidden="true"
				width="192"
				height="192"
				className="pointer-events-none invert -mb-4 select-none w-48 opacity-100 animate-[breathe_4s_ease-in-out_infinite]"
			/>
			<h1 className="max-w-3xl text-5xl font-bold tracking-tight text-white sm:text-7xl select-none">
				Stop making <span className='text-red-700'>boring</span> timelapses
			</h1>
			<p className="mt-3 text-sm text-zinc-500 tracking-wide">
				You spent hours on it. Show people in seconds.
			</p>
			<p className="mt-6 max-w-xl text-lg text-zinc-400">
				Tau lets you record, edit, and export timelapses that people actually want to watch — with smart overlays/filters, and one-click export.
			</p>

			{spotsLeft != null && spotsLeft > 0 && nextPrice && (
				<p className="mt-6 text-xs text-amber-400 font-medium tracking-wide">
					<span className="relative mr-1.5 inline-flex h-1.5 w-1.5 align-middle">
						<span className="absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75 animate-ping" />
						<span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber-400" />
					</span>
					Early bird: {spotsLeft} spot{spotsLeft === 1 ? '' : 's'} left before price rises to {nextPrice}
				</p>
			)}

			<div className="mt-8 flex flex-wrap items-center justify-center gap-4">
				<a
					href="/#pricing"
					className="bg-white px-10 py-4 text-base font-bold text-zinc-900 hover:bg-zinc-200 transition shadow-lg shadow-white/10"
				>
					Get Tau Now
				</a>
				<a
					href="/#demo"
					className="px-10 py-4 text-base font-semibold text-zinc-400 border border-zinc-700 hover:border-zinc-500 hover:text-zinc-200 transition"
				>
					See it in action ↓
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

		</section>
	);
}
