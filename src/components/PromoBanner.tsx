interface PromoBannerProps {
	readonly currentPrice: string;
	readonly nextPrice: string | null;
	readonly spotsLeft: number | null;
}

export default function PromoBanner({ currentPrice, nextPrice, spotsLeft }: PromoBannerProps) {
	if (!nextPrice || spotsLeft === null || spotsLeft <= 0) return null;

	return (
		<div className="w-full bg-[#aa1e0f] border-b border-[#8a1800] py-2 px-4 text-center text-xs text-[#ede6de]">
			<span className="mr-1.5">🔥</span>
			<span className="font-semibold">Early bird pricing:</span>
			{' '}only {spotsLeft} spot{spotsLeft === 1 ? '' : 's'} left at{' '}
			<span className="font-semibold">{currentPrice}</span>
			{' '}— rises to <span className="opacity-80">{nextPrice}</span> after this tier.{' '}
			<a
				href="/#pricing"
				className="ml-1 font-semibold underline underline-offset-2 hover:opacity-80 transition"
			>
				Get it now →
			</a>
		</div>
	);
}
