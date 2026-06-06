import { faqs } from '../data/faqs';

export default function FAQ() {
	return (
		<section id="faq" className="py-24 px-6">
			<div className="mx-auto max-w-2xl">
				<h2 className="text-center text-3xl font-bold tracking-tight text-[#1a0f0d] sm:text-4xl">
					Frequently asked questions
				</h2>
				<dl className="mt-16 space-y-6">
					{faqs.map((faq) => (
						<div key={faq.q} className="border border-[#cfc4ba] bg-[#e0d8cf] p-6">
							<dt className="font-semibold text-[#1a0f0d]">{faq.q}</dt>
							<dd className="mt-2 text-sm text-[#6b4f47]">{faq.a}</dd>
						</div>
					))}
				</dl>
			</div>
		</section>
	);
}
