export default function Navbar() {
	return (
		<header className="fixed top-0 inset-x-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm">
			<div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
				<a href="/" className="flex items-center gap-2">
					<img src="/tau-assets/tau-logo-transparent.png" alt="Tau" className="h-7 w-auto invert" />
					<span className="text-sm font-bold tracking-widest text-white uppercase">tau</span>
				</a>
				<nav className="flex items-center gap-8 text-sm text-zinc-400">
					<a href="#features" className="hover:text-white transition">Features</a>
					<a href="#pricing" className="hover:text-white transition">Pricing</a>
					<a href="#faq" className="hover:text-white transition">FAQ</a>
					<a
						href="#pricing"
						className="border border-zinc-700 px-4 py-1.5 text-zinc-100 font-semibold hover:border-zinc-400 transition"
					>
						Buy Now
					</a>
				</nav>
			</div>
		</header>
	);
}
