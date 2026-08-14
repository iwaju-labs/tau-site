import { useState } from 'react';
// import { SignOutButton } from '@clerk/astro/react'; // disabled: not configured for prod yet; unused (account.astro no longer renders this component)

interface AccountPanelProps {
	readonly linkedKey: string | null;
}

export default function AccountPanel({ linkedKey: initialKey }: AccountPanelProps) {
	const [key, setKey] = useState('');
	const [linkedKey, setLinkedKey] = useState(initialKey);
	const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
	const [errorMsg, setErrorMsg] = useState('');

	const handleLink = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		setStatus('loading');
		setErrorMsg('');

		try {
			const res = await fetch('/api/account/link-key', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ key }),
			});

			const data = await res.json();

			if (res.ok) {
				setLinkedKey(key);
				setKey('');
				setStatus('success');
			} else {
				setStatus('error');
				setErrorMsg(data.error ?? 'Something went wrong.');
			}
		} catch {
			setStatus('error');
			setErrorMsg('Network error. Please try again.');
		}
	};

	return (
		<div className="space-y-8">
			{/* License Key */}
			<div className="border border-[#cfc4ba] bg-[#e0d8cf] rounded-2xl p-6">
				<h2 className="text-lg font-semibold text-[#1a0f0d] mb-1">License Key</h2>

				{linkedKey ? (
					<div className="space-y-3">
						<div className="flex items-center gap-3">
							<span className="text-sm font-mono text-[#1a0f0d] bg-[#ede6de] border border-[#cfc4ba] px-3 py-1.5 rounded">
								{linkedKey}
							</span>
							<span className="text-xs font-semibold bg-[#aa1e0f] text-[#ede6de] px-2.5 py-1 rounded-full">
								Unlimited devices
							</span>
						</div>
						<p className="text-xs text-[#9b8880]">
							Key linked.{' '}
							<button
								className="underline hover:text-[#aa1e0f] transition"
								onClick={() => { setLinkedKey(null); setStatus('idle'); }}
							>
								Link a different key
							</button>
						</p>
					</div>
				) : (
					<form onSubmit={handleLink} className="space-y-3 mt-3">
						<p className="text-sm text-[#6b4f47]">
							Enter the license key from your purchase email to link it to your account.{' '}
							<a
								href="https://polar.sh/tau/portal/"
								target="_blank"
								rel="noopener noreferrer"
								className="underline hover:text-[#aa1e0f] transition"
							>
								Find your key →
							</a>
						</p>
						<div className="flex gap-3">
							<input
								type="text"
								value={key}
								onChange={e => setKey(e.target.value)}
								placeholder="XXXX-XXXX-XXXX-XXXX"
								className="flex-1 bg-[#ede6de] border border-[#cfc4ba] px-3 py-2 text-sm text-[#1a0f0d] placeholder:text-[#9b8880] focus:outline-none focus:border-[#aa1e0f]"
							/>
							<button
								type="submit"
								disabled={!key.trim() || status === 'loading'}
								className="bg-[#aa1e0f] text-[#ede6de] px-5 py-2 text-sm font-semibold hover:bg-[#8a1800] transition disabled:opacity-50 disabled:cursor-not-allowed"
							>
								{status === 'loading' ? 'Verifying…' : 'Link Key'}
							</button>
						</div>
						{status === 'error' && (
							<p className="text-sm text-[#aa1e0f]">{errorMsg}</p>
						)}
					</form>
				)}
			</div>

			{/* Sign Out - disabled: not configured for prod yet
			<div className="flex justify-end">
				<SignOutButton redirectUrl="/">
					<button className="text-sm text-[#9b8880] hover:text-[#aa1e0f] transition underline">
						Sign out
					</button>
				</SignOutButton>
			</div>
			*/}
		</div>
	);
}
