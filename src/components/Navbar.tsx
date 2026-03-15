import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<header className="fixed top-0 inset-x-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm">
			<div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
				<a href="/" className="flex hover:scale-110 transition-transform items-center gap-2">
					<img src="/tau-assets/tau-logo-transparent.png" alt="Tau" className="h-7 w-auto invert" />
					<span className="text-sm font-bold -ml-2 text-white">tau</span>
				</a>

				{/* Desktop Nav */}
				<nav className="hidden md:flex items-center gap-8 text-sm text-zinc-400">
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

				{/* Mobile Menu Button */}
				<button
					className="md:hidden text-zinc-400 hover:text-white"
					onClick={() => setIsOpen(!isOpen)}
					aria-label="Toggle menu"
				>
					{isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
				</button>
			</div>

			{/* Mobile Nav Overlay */}
			{isOpen && (
				<div className="md:hidden absolute inset-x-0 top-[69px] border-b border-zinc-800 bg-zinc-950 px-6 py-8 shadow-2xl">
					<nav className="flex flex-col gap-6 text-lg text-zinc-400">
						<a href="#features" onClick={() => setIsOpen(false)} className="hover:text-white transition">Features</a>
						<a href="#pricing" onClick={() => setIsOpen(false)} className="hover:text-white transition">Pricing</a>
						<a href="#faq" onClick={() => setIsOpen(false)} className="hover:text-white transition">FAQ</a>
						<a
							href="#pricing"
							onClick={() => setIsOpen(false)}
							className="inline-block w-full border border-zinc-700 py-3 text-center text-zinc-100 font-semibold hover:border-zinc-400 transition"
						>
							Buy Now
						</a>
					</nav>
				</div>
			)}
		</header>
	);
}
