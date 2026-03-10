export default function Footer() {
	return (
		<footer className="border-t border-zinc-800 py-12 px-6">
			<div className="mx-auto max-w-5xl flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
				<p className="text-sm text-zinc-500">&copy; {new Date().getFullYear()} Tau. All rights reserved.</p>
				<nav className="flex flex-wrap gap-6 text-sm text-zinc-400">
					<a href="#pricing" className="hover:text-white transition">Pricing</a>
					<a href="#faq" className="hover:text-white transition">FAQ</a>
					<a href="https://downloads.usetau.app/Tau-Setup-latest.exe" className="hover:text-white transition">Download</a>
					<a href="mailto:hello@usetau.app" className="hover:text-white transition">Contact</a>
					<a href="/privacy" className="hover:text-white transition">Privacy</a>
					<a href="/terms" className="hover:text-white transition">Terms</a>
				</nav>
			</div>
		</footer>
	);
}
