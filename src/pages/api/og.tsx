import { ImageResponse } from '@vercel/og';
import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
	const url = new URL(request.url);
	const title = url.searchParams.get('title') ?? 'Tau Blog';

	return new ImageResponse(
		(
			<div
				style={{
					width: '1200px',
					height: '628px',
					background: '#09090b',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					padding: '72px 80px',
					fontFamily: 'sans-serif',
					position: 'relative',
				}}
			>
				{/* Top-left red accent bar */}
				<div
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						width: '6px',
						height: '100%',
						background: '#aa1e0f',
					}}
				/>

				{/* Logo + wordmark */}
				<div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
					<div
						style={{
							width: '48px',
							height: '48px',
							background: 'white',
							borderRadius: '12px',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							fontSize: '24px',
							fontWeight: 900,
							color: '#09090b',
							letterSpacing: '-1px',
						}}
					>
						τ
					</div>
					<span
						style={{
							fontSize: '22px',
							fontWeight: 700,
							color: '#71717a',
							letterSpacing: '-0.5px',
						}}
					>
						Tau Blog
					</span>
				</div>

				{/* Title */}
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						gap: '16px',
						flex: 1,
						justifyContent: 'center',
						paddingLeft: '6px',
					}}
				>
					<p
						style={{
							fontSize: title.length > 60 ? '52px' : '64px',
							fontWeight: 800,
							color: '#ffffff',
							lineHeight: 1.15,
							margin: 0,
							letterSpacing: '-2px',
							maxWidth: '980px',
						}}
					>
						{title}
					</p>
				</div>

				{/* Bottom: URL */}
				<div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingLeft: '6px' }}>
					<span style={{ fontSize: '20px', color: '#52525b', fontWeight: 500 }}>
						trytau.app
					</span>
				</div>
			</div>
		),
		{
			width: 1200,
			height: 628,
		}
	);
};
