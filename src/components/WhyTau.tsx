import { Check, X, Minus } from 'lucide-react';

type CellValue = true | false | 'partial' | null;

const rows: { feature: string; tau: CellValue; obs: CellValue; capcut: CellValue; phone: CellValue }[] = [
	{ feature: 'Purpose-built for timelapses',        tau: true,      obs: false,     capcut: false,     phone: 'partial' },
	{ feature: 'Screen recording',                    tau: true,      obs: true,      capcut: false,     phone: false     },
	{ feature: 'Camera recording',                    tau: true,      obs: true,      capcut: false,     phone: true      },
	{ feature: 'Screen + camera simultaneously',      tau: true,      obs: 'partial', capcut: false,     phone: false     },
	{ feature: 'Smart timer overlays',                tau: true,      obs: false,     capcut: 'partial',  phone: false     },
	{ feature: 'Record + Edit + Export in one app',   tau: true,      obs: false,     capcut: false,     phone: false     },
	{ feature: 'One-click export (MP4 / GIF / WEBM)', tau: true,      obs: false,     capcut: false,     phone: false     },
	{ feature: 'Runs quietly in the background',      tau: true,      obs: false,     capcut: null,      phone: false     },
];

function Cell({ value }: { value: CellValue }) {
	if (value === true)      return <Check className="mx-auto h-4 w-4 text-[#aa1e0f]" />;
	if (value === false)     return <X className="mx-auto h-4 w-4 text-[#cfc4ba]" />;
	if (value === 'partial') return <Minus className="mx-auto h-4 w-4 text-[#9b8880]" />;
	return <span className="block text-center text-[#cfc4ba] text-xs">—</span>;
}

export default function WhyTau() {
	return (
		<section className="py-24 px-6">
			<div className="mx-auto max-w-4xl">
				<h2 className="text-center text-3xl font-bold tracking-tight text-[#1a0f0d] sm:text-4xl">
					Why not just use anything else?
				</h2>
				<p className="mt-4 text-center text-[#6b4f47] max-w-xl mx-auto">
					<span className='font-bold'>OBS</span> is for streamers. <span className='font-bold'>CapCut</span> is for editors. Your phone is for scrolling.
					Tau is built to do one thing better than the rest — capturing and sharing your process.
				</p>
				<div className="mt-12 border border-[#cfc4ba] overflow-hidden">
					<table className="w-full text-sm">
						<thead>
							<tr className="border-b border-[#cfc4ba] bg-[#e0d8cf]">
								<th className="py-4 px-6 text-left text-[#6b4f47] font-normal w-1/2" />
								<th className="py-4 px-4 text-center font-semibold text-[#1a0f0d]">Tau</th>
								<th className="py-4 px-4 text-center font-normal text-[#9b8880]">OBS</th>
								<th className="py-4 px-4 text-center font-normal text-[#9b8880]">CapCut</th>
								<th className="py-4 px-4 text-center font-normal text-[#9b8880]">Phone</th>
							</tr>
						</thead>
						<tbody>
							{rows.map((row, i) => (
								<tr
									key={row.feature}
									className={`border-b border-[#cfc4ba] last:border-0 ${i % 2 === 0 ? 'bg-[#e8e0d8]/40' : ''}`}
								>
									<td className="py-4 px-6 text-[#1a0f0d]">{row.feature}</td>
									<td className="py-4 px-4"><Cell value={row.tau} /></td>
									<td className="py-4 px-4"><Cell value={row.obs} /></td>
									<td className="py-4 px-4"><Cell value={row.capcut} /></td>
									<td className="py-4 px-4"><Cell value={row.phone} /></td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</section>
	);
}
