import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { FaApple, FaWindows } from 'react-icons/fa';

export default function ThankYou() {
	const [key, setKey] = useState('');
	const trimmedKey = key.trim();

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

				<div className="mt-10 text-left">
					<label htmlFor="license-key" className="block text-sm font-medium text-zinc-300 mb-2">
						Enter your license key to download
					</label>
					<input
						id="license-key"
						type="text"
						value={key}
						onChange={e => setKey(e.target.value)}
						placeholder="XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
						className="w-full bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-600 px-4 py-3 text-sm font-mono focus:outline-none focus:border-zinc-500 transition"
					/>
				</div>

				<div className="mt-4 grid gap-4 grid-cols-1 sm:grid-cols-2">
					<a
						href={trimmedKey ? `/api/download?os=windows&key=${encodeURIComponent(trimmedKey)}` : undefined}
						onClick={e => { if (!trimmedKey) e.preventDefault(); }}
						className={`flex items-center justify-center gap-3 px-6 py-4 text-sm font-bold transition group ${
							trimmedKey
								? 'bg-white text-zinc-900 hover:bg-zinc-200 cursor-pointer'
								: 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
						}`}
					>
						<FaWindows className="h-5 w-5" />
						Download for Windows
					</a>
					<a
						href={trimmedKey ? `/api/download?os=mac&key=${encodeURIComponent(trimmedKey)}` : undefined}
						onClick={e => { if (!trimmedKey) e.preventDefault(); }}
						className={`flex items-center justify-center gap-3 px-6 py-4 text-sm font-bold transition ${
							trimmedKey
								? 'border border-zinc-700 text-zinc-100 hover:border-zinc-400 cursor-pointer'
								: 'border border-zinc-800 text-zinc-600 cursor-not-allowed'
						}`}
					>
						<FaApple className="h-6 w-6" />
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
							<span>Check your email for your license key, then enter it above to download.</span>
						</li>
						<li className="flex gap-3">
							<span className="flex h-6 w-6 shrink-0 items-center justify-center border border-zinc-700 text-xs font-mono text-zinc-300">2</span>
							<span>Install Tau and open the app.</span>
						</li>
						<li className="flex gap-3">
							<span className="flex h-6 w-6 shrink-0 items-center justify-center border border-zinc-700 text-xs font-mono text-zinc-300">3</span>
							<span>Go to <span className="text-white">Settings</span> and paste your license key to activate.</span>
						</li>
					</ol>
				</div>
			</div>
		</section>
	);
}
