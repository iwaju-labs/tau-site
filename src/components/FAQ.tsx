const faqs = [
	{
		q: 'Is there a free trial?',
		a: "No. I believe that the single purchase model and current pricing is fair.",
	},
	{
		q: 'What platforms are supported?',
		a: 'Windows and macOS. Linux support is not planned for v1.',
	},
	{
		q: 'How does the license work?',
		a: "After purchase you'll receive a license key by email. Enter it in the app on first launch to activate.",
	},
	{
		q: 'Can I use it on multiple devices?',
		a: 'Solo allows 1 device. Pro allows up to 3 devices.',
	},
	{
		q: 'Do I get free updates?',
		a: 'Yes — all updates for the current major version are free.',
	},
];

export default function FAQ() {
	return (
		<section id="faq" className="py-24 px-6">
			<div className="mx-auto max-w-2xl">
				<h2 className="text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
					Frequently asked questions
				</h2>
				<dl className="mt-16 space-y-6">
					{faqs.map((faq) => (
						<div key={faq.q} className="border border-zinc-800 bg-zinc-900 p-6">
							<dt className="font-semibold text-white">{faq.q}</dt>
							<dd className="mt-2 text-sm text-zinc-400">{faq.a}</dd>
						</div>
					))}
				</dl>
			</div>
		</section>
	);
}
