import { CheckCircle2, Download, Key, Monitor, Apple } from 'lucide-react';

export default function ThankYou() {
	return (
		<section className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-20 text-center">
			<div className="mx-auto max-w-2xl bg-zinc-900 border border-zinc-800 p-8 sm:p-12 shadow-2xl">
				<div className="mx-auto flex h-16 w-16 items-center justify-center bg-green-500/10 text-green-500 mb-6 rounded-full">
					<CheckCircle2 className="h-10 w-10" />
				</div>
				
				<h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl text-balance">
					Thanks for your order!
				</h1>
				
				<p className="mt-4 text-lg text-zinc-400 text-balance">
					Your license key has been sent to your email address.
				</p>

				<div className="mt-10 grid gap-4 grid-cols-1 sm:grid-cols-2">
					<a
						href="https://downloads.usetau.app/Tau-Setup-latest.exe"
						className="flex items-center justify-center gap-3 bg-white px-6 py-4 text-sm font-bold text-zinc-900 hover:bg-zinc-200 transition group"
					>
                        <Monitor className="h-5 w-5" />
                        Download for Windows
					</a>
					<a
						href="https://downloads.usetau.app/Tau-latest.dmg"
						className="flex items-center justify-center gap-3 border border-zinc-700 px-6 py-4 text-sm font-bold text-zinc-100 hover:border-zinc-400 transition"
					>
                        <Apple className="h-5 w-5" />
                        Download for Mac
					</a>
				</div>

				<div className="mt-12 text-left">
					<h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
						What's next?
					</h3>
					<ol className="space-y-4 text-zinc-400 text-sm">
						<li className="flex gap-3">
							<span className="flex h-6 w-6 shrink-0 items-center justify-center border border-zinc-700 text-xs font-mono text-zinc-300">1</span>
							<span>Download and install Tau for your OS.</span>
						</li>
						<li className="flex gap-3">
							<span className="flex h-6 w-6 shrink-0 items-center justify-center border border-zinc-700 text-xs font-mono text-zinc-300">2</span>
							<span>Open the app and go to <span className="text-white">Settings</span>.</span>
						</li>
						<li className="flex gap-3">
							<span className="flex h-6 w-6 shrink-0 items-center justify-center border border-zinc-700 text-xs font-mono text-zinc-300">3</span>
							<span>Paste your license key to activate.</span>
						</li>
					</ol>
				</div>
			</div>
		</section>
	);
}
