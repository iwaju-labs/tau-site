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
				className="pointer-events-none -mb-4 select-none w-48 opacity-100 animate-[breathe_4s_ease-in-out_infinite]"
			/>
			<h1 className="max-w-full text-7xl font-bold tracking-tight text-[#1a0f0d] sm:text-7xl md:text-7xl lg:text-7xl select-none">
				Stop making <span className='text-[#aa1e0f]'>boring</span> timelapses.
			</h1>
			<p className="mt-3 text-sm text-[#6b4f47] tracking-wide">
				You spent hours on it. Show people your work in style.
			</p>
			<p className="mt-6 max-w-xl text-lg text-[#6b4f47]">
				Tau lets you record your screen, your camera, or both at once — then edit and export timelapses that people actually want to watch, with smart overlays and one-click export.
			</p>

			{spotsLeft != null && spotsLeft > 0 && nextPrice && (
				<p className="mt-6 text-xs text-amber-600 font-medium tracking-wide">
					<span className="relative mr-1.5 inline-flex h-1.5 w-1.5 align-middle">
						<span className="absolute inline-flex h-full w-full rounded-full bg-amber-600 opacity-75 animate-ping" />
						<span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber-600" />
					</span>
					Early bird: {spotsLeft} spot{spotsLeft === 1 ? '' : 's'} left before price rises to {nextPrice}
				</p>
			)}

			<div className="mt-8 flex flex-wrap items-center justify-center gap-4">
				<a
					href="/#pricing"
					className="bg-[#aa1e0f] px-10 py-4 text-base font-bold text-[#ede6de] hover:bg-[#8a1800] transition shadow-lg shadow-[#aa1e0f]/20"
				>
					Get Tau Now
				</a>
				<a
					href="/#demo"
					className="px-10 py-4 text-base font-semibold text-[#6b4f47] border border-[#cfc4ba] hover:border-[#aa1e0f] hover:text-[#aa1e0f] transition"
				>
					See it in action ↓
				</a>
			</div>

			<div className="mt-6 flex justify-center items-center gap-6 text-[#6b4f47]">
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
