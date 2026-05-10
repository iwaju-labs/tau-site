import { faqs } from '../data/faqs';

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
