interface PromoBannerProps {
	readonly currentPrice: string;
	readonly nextPrice: string | null;
	readonly spotsLeft: number | null;
}

export default function PromoBanner({ currentPrice, nextPrice, spotsLeft }: PromoBannerProps) {
	if (!nextPrice || spotsLeft === null || spotsLeft <= 0) return null;

	return (
		<div className="w-full bg-zinc-950 border-b border-zinc-800 py-2 px-4 text-center text-xs text-zinc-300">
			<span className="mr-1.5">🔥</span>
			<span className="font-semibold text-white">Early bird pricing:</span>
			{' '}only {spotsLeft} spot{spotsLeft === 1 ? '' : 's'} left at{' '}
			<span className="font-semibold text-white">{currentPrice}</span>
			{' '}— rises to <span className="text-zinc-400">{nextPrice}</span> after this tier.{' '}
			<a
				href="/#pricing"
				className="ml-1 font-semibold text-white underline underline-offset-2 hover:text-zinc-300 transition"
			>
				Get it now →
			</a>
		</div>
	);
}
