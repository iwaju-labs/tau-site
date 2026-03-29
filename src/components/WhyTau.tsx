import { Check, X, Minus } from 'lucide-react';

type CellValue = true | false | 'partial' | null;

const rows: { feature: string; tau: CellValue; obs: CellValue; capcut: CellValue; phone: CellValue }[] = [
	{ feature: 'Purpose-built for timelapses',        tau: true,      obs: false,     capcut: false,     phone: 'partial' },
	{ feature: 'Smart timer overlays',                tau: true,      obs: false,     capcut: 'partial',  phone: false     },
	{ feature: 'Record + Edit + Export in one app',   tau: true,      obs: false,     capcut: false,     phone: false     },
	{ feature: 'iPhone as camera source (macOS)',      tau: true,      obs: false,     capcut: false,     phone: null      },
	{ feature: 'One-click export (MP4 / GIF / WEBM)', tau: true,      obs: false,     capcut: false,     phone: false     },
	{ feature: 'Runs quietly in the background',      tau: true,      obs: false,     capcut: null,      phone: false     },
];

function Cell({ value }: { value: CellValue }) {
	if (value === true)      return <Check className="mx-auto h-4 w-4 text-white" />;
	if (value === false)     return <X className="mx-auto h-4 w-4 text-zinc-700" />;
	if (value === 'partial') return <Minus className="mx-auto h-4 w-4 text-zinc-500" />;
	return <span className="block text-center text-zinc-700 text-xs">—</span>;
}

export default function WhyTau() {
	return (
		<section className="py-24 px-6">
			<div className="mx-auto max-w-4xl">
				<h2 className="text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
					Why not just use OBS?
				</h2>
				<p className="mt-4 text-center text-zinc-400 max-w-xl mx-auto">
					OBS is for streamers. CapCut is for editors. Your phone is for scrolling.
					Tau is built for one thing — capturing and sharing your process.
				</p>
				<div className="mt-12 border border-zinc-800 overflow-hidden">
					<table className="w-full text-sm">
						<thead>
							<tr className="border-b border-zinc-800 bg-zinc-900/50">
								<th className="py-4 px-6 text-left text-zinc-400 font-normal w-1/2" />
								<th className="py-4 px-4 text-center font-semibold text-white">Tau</th>
								<th className="py-4 px-4 text-center font-normal text-zinc-500">OBS</th>
								<th className="py-4 px-4 text-center font-normal text-zinc-500">CapCut</th>
								<th className="py-4 px-4 text-center font-normal text-zinc-500">Phone</th>
							</tr>
						</thead>
						<tbody>
							{rows.map((row, i) => (
								<tr
									key={row.feature}
									className={`border-b border-zinc-800 last:border-0 ${i % 2 === 0 ? 'bg-zinc-900/20' : ''}`}
								>
									<td className="py-4 px-6 text-zinc-300">{row.feature}</td>
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
