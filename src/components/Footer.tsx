const sections = [
	{
		label: 'Product',
		links: [
			{ href: '/features', label: 'Features' },
			{ href: '/#pricing', label: 'Pricing' },
			{ href: '/#faq', label: 'FAQ' },
			{ href: '/changelog', label: 'Changelog' },
		],
	},
	{
		label: 'Resources',
		links: [
			{ href: '/blog', label: 'Blog' },
			{ href: '/tools/timelapse-duration-calculator', label: 'Timelapse Duration Calculator'}
		],
	},
	{
		label: 'Legal',
		links: [
			{ href: '/privacy', label: 'Privacy' },
			{ href: '/terms', label: 'Terms' },
			{ href: 'https://www.twitter.com/_dngi', label: 'Contact' },
		],
	},
];

export default function Footer() {
	return (
		<footer className="border-t border-zinc-800 py-16 px-6">
			<div className="mx-auto max-w-5xl">
				<div className="flex flex-col gap-12 sm:flex-row sm:justify-between">
					{sections.map((section) => (
						<div key={section.label}>
							<p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
								{section.label}
							</p>
							<ul className="mt-4 space-y-3">
								{section.links.map((link) => (
									<li key={link.href}>
										<a
											href={link.href}
											className="text-sm text-zinc-400 hover:text-white transition"
										>
											{link.label}
										</a>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
				<p className="mt-16 text-sm text-zinc-600">
					&copy; {new Date().getFullYear()} Tau. All rights reserved.
				</p>
			</div>
		</footer>
	);
}
