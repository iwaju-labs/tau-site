const sections = [
	{
		label: 'Product',
		links: [
			{ href: '/features', label: 'Features' },
			{ href: '/pricing', label: 'Pricing' },
			{ href: '/#faq', label: 'FAQ' },
			{ href: '/changelog', label: 'Changelog' },
		],
	},
	{
		label: 'Resources',
		links: [
			{ href: '/blog', label: 'Blog' },
			{ href: '/tools/timelapse-duration-calculator', label: 'Duration Calculator' },
			{ href: '/tools/frame-interval-calculator', label: 'Interval Calculator' },
			{ href: '/tools/timelapse-file-size-estimator', label: 'File Size Estimator' },
		],
	},
	{
		label: 'Compare',
		links: [
			{ href: '/vs/obs', label: 'Tau vs OBS' },
			{ href: '/vs/screenflow', label: 'Tau vs ScreenFlow' },
			{ href: '/vs/loom', label: 'Tau vs Loom' },
			{ href: '/vs/cleanshot-x', label: 'Tau vs CleanShot X' },
			{ href: '/vs/screenstudio', label: 'Tau vs Screen Studio' },
			{ href: '/vs/camtasia', label: 'Tau vs Camtasia' },
		],
	},
	{
		label: 'Use Cases',
		links: [
			{ href: '/for/coding', label: 'For Coding' },
			{ href: '/for/design', label: 'For Design' },
			{ href: '/for/digital-art', label: 'For Digital Art' },
			{ href: '/for/devlogs', label: 'For Devlogs' },
		],
	},
	{
		label: 'Company',
		links: [
			{ href: '/about', label: 'About' },
			{ href: '/privacy', label: 'Privacy' },
			{ href: '/terms', label: 'Terms' },
			{ href: 'https://www.twitter.com/_dngi', label: 'Contact' },
		],
	},
];

export default function Footer() {
	return (
		<footer className="border-t border-[#cfc4ba] py-16 px-6">
			<div className="mx-auto max-w-5xl">
				<div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
					{sections.map((section) => (
						<div key={section.label}>
							<p className="text-xs font-semibold uppercase tracking-widest text-[#9b8880]">
								{section.label}
							</p>
							<ul className="mt-4 space-y-3">
								{section.links.map((link) => (
									<li key={link.href}>
										<a
											href={link.href}
											className="text-sm text-[#6b4f47] hover:text-[#aa1e0f] transition"
										>
											{link.label}
										</a>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
				<p className="mt-16 text-sm text-[#9b8880]">
					&copy; {new Date().getFullYear()} Tau. All rights reserved.
				</p>
			</div>
		</footer>
	);
}
