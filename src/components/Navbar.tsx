import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<header className="fixed top-0 inset-x-0 z-50 border-b border-[#cfc4ba] bg-[#ede6de]/80 backdrop-blur-sm">
			<div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
				<a href="/" className="flex hover:scale-110 transition-transform items-center gap-2">
					<img src="/tau-assets/tau-logo-transparent.png" alt="Tau" className="h-12 w-auto" />
					<span className="text-lg font-bold -ml-2 text-[#1a0f0d]">tau</span>
				</a>

				{/* Desktop Nav */}
				<nav className="hidden md:flex items-center gap-8 text-sm text-[#6b4f47]">
					<a href="/#features" className="hover:text-[#aa1e0f] transition">Features</a>
					<a href="/#pricing" className="hover:text-[#aa1e0f] transition">Pricing</a>
					<a href="/#faq" className="hover:text-[#aa1e0f] transition">FAQ</a>
					<a
						href="/#pricing"
						className="border border-[#cfc4ba] px-4 py-1.5 text-[#1a0f0d] font-semibold hover:border-[#aa1e0f] hover:text-[#aa1e0f] transition"
					>
						Buy Now
					</a>
				</nav>

				{/* Mobile Menu Button */}
				<button
					className="md:hidden text-[#6b4f47] hover:text-[#aa1e0f]"
					onClick={() => setIsOpen(!isOpen)}
					aria-label="Toggle menu"
				>
					{isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
				</button>
			</div>

			{/* Mobile Nav Overlay */}
			{isOpen && (
				<div className="md:hidden absolute inset-x-0 top-17.25 border-b border-[#cfc4ba] bg-[#ede6de] px-6 py-8 shadow-2xl">
					<nav className="flex flex-col gap-6 text-lg text-[#6b4f47]">
						<a href="/#features" onClick={() => setIsOpen(false)} className="hover:text-[#aa1e0f] transition">Features</a>
						<a href="/#pricing" onClick={() => setIsOpen(false)} className="hover:text-[#aa1e0f] transition">Pricing</a>
						<a href="/#faq" onClick={() => setIsOpen(false)} className="hover:text-[#aa1e0f] transition">FAQ</a>
						<a
							href="/#pricing"
							onClick={() => setIsOpen(false)}
							className="inline-block w-full border border-[#cfc4ba] py-3 text-center text-[#1a0f0d] font-semibold hover:border-[#aa1e0f] hover:text-[#aa1e0f] transition"
						>
							Buy Now
						</a>
					</nav>
				</div>
			)}
		</header>
	);
}
