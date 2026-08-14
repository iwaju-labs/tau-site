import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { FaApple, FaWindows } from 'react-icons/fa';
// import { useAuth } from '@clerk/astro/react'; // disabled: not configured for prod yet

export default function ThankYou() {
	const [key, setKey] = useState('');
	const trimmedKey = key.trim();
	// Auto-link to account disabled until Clerk is configured for prod.
	const autoLinked = false;

	return (
		<section className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-20 text-center">
			<div className="mx-auto max-w-2xl bg-[#e0d8cf] border border-[#cfc4ba] p-8 sm:p-12 shadow-2xl">
				<div className="mx-auto flex h-16 w-16 items-center justify-center bg-green-500/10 text-green-600 mb-6 rounded-full">
					<CheckCircle2 className="h-10 w-10" />
				</div>

				<h1 className="text-3xl font-bold tracking-tight text-[#1a0f0d] sm:text-4xl text-balance">
					Thanks for your order!
				</h1>

				<p className="mt-4 text-lg text-[#6b4f47] text-balance">
					Your license key has been sent to your email address.
				</p>

				<div className="mt-10 text-left">
					<label htmlFor="license-key" className="block text-sm font-medium text-[#1a0f0d] mb-2">
						Enter your license key to download
					</label>
					<input
						id="license-key"
						type="text"
						value={key}
						onChange={e => setKey(e.target.value)}
						placeholder="XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
						className="w-full bg-[#ede6de] border border-[#cfc4ba] text-[#1a0f0d] placeholder-[#9b8880] px-4 py-3 text-sm font-mono focus:outline-none focus:border-[#aa1e0f] transition"
					/>
					{autoLinked && (
						<p className="mt-2 text-xs text-green-700">
							✓ Key linked to your account — find it anytime in{' '}
							<a href="/account" className="underline hover:text-[#aa1e0f]">Account</a>.
						</p>
					)}
				</div>

				<div className="mt-4 grid gap-4 grid-cols-1 sm:grid-cols-2">
					<a
						href={trimmedKey ? `/api/download?os=windows&key=${encodeURIComponent(trimmedKey)}` : undefined}
						onClick={e => { if (!trimmedKey) e.preventDefault(); }}
						className={`flex items-center justify-center gap-3 px-6 py-4 text-sm font-bold transition group ${
							trimmedKey
								? 'bg-[#aa1e0f] text-[#ede6de] hover:bg-[#8a1800] cursor-pointer'
								: 'bg-[#cfc4ba] text-[#9b8880] cursor-not-allowed'
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
								? 'border border-[#cfc4ba] text-[#1a0f0d] hover:border-[#aa1e0f] hover:text-[#aa1e0f] cursor-pointer'
								: 'border border-[#cfc4ba] text-[#9b8880] cursor-not-allowed'
						}`}
					>
						<FaApple className="h-6 w-6" />
						Download for Mac
					</a>
				</div>

				<div className="mt-12 text-left">
					<h3 className="text-sm font-semibold text-[#1a0f0d] uppercase tracking-wider mb-4">
						What's next?
					</h3>
					<ol className="space-y-4 text-[#6b4f47] text-sm">
						<li className="flex gap-3">
							<span className="flex h-6 w-6 shrink-0 items-center justify-center border border-[#cfc4ba] text-xs font-mono text-[#6b4f47]">1</span>
							<span>Check your email for your license key, then enter it above to download.</span>
						</li>
						<li className="flex gap-3">
							<span className="flex h-6 w-6 shrink-0 items-center justify-center border border-[#cfc4ba] text-xs font-mono text-[#6b4f47]">2</span>
							<span>Install Tau and open the app.</span>
						</li>
						<li className="flex gap-3">
							<span className="flex h-6 w-6 shrink-0 items-center justify-center border border-[#cfc4ba] text-xs font-mono text-[#6b4f47]">3</span>
							<span>Paste your license key on the activation screen — it's the first thing Tau shows you. That's it; it works on all your devices.</span>
						</li>
					</ol>
				</div>
			</div>
		</section>
	);
}
