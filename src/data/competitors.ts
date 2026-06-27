export interface CompetitorFeature {
	label: string;
	tau: boolean | 'partial';
	them: boolean | 'partial';
}

export interface Competitor {
	slug: string;
	name: string;
	category: string;
	price: string;
	platforms: string[];
	summary: string;
	theirStrengths: string[];
	theirWeaknesses: string[];
	features: CompetitorFeature[];
	verdict: { tau: string; them: string };
	metaTitle: string;
	metaDescription: string;
}

export const competitors: Competitor[] = [
	{
		slug: 'obs',
		name: 'OBS Studio',
		category: 'Screen recorder / Live streaming tool',
		price: 'Free',
		platforms: ['macOS', 'Windows', 'Linux'],
		summary:
			'OBS is the gold standard for live streaming and full-rate screen capture. It was designed for broadcast — not timelapse.',
		theirStrengths: [
			'Free and open source',
			'Excellent multi-source scene management',
			'Broad platform support including Linux',
			'Large community and plugin ecosystem',
			'Great for live streaming to Twitch, YouTube, etc.',
		],
		theirWeaknesses: [
			'No native frame interval recording — timelapse requires FFmpeg post-processing',
			'No built-in timelapse editor',
			'No timer overlay for timelapses',
			'No GIF or WEBM export',
			'Steep learning curve for a simple recording task',
			'Resource-heavy for background sessions',
		],
		features: [
			{ label: 'Native timelapse (frame intervals)', tau: true, them: false },
			{ label: 'Screen recording', tau: true, them: true },
			{ label: 'Camera recording', tau: true, them: true },
			{ label: 'Screen + camera simultaneously', tau: true, them: 'partial' },
			{ label: 'Built-in timelapse editor', tau: true, them: false },
			{ label: 'Timer overlays', tau: true, them: false },
			{ label: 'Export to GIF / WEBM', tau: true, them: false },
			{ label: 'Audio attachment', tau: true, them: false },
			{ label: 'Runs quietly in the background', tau: true, them: false },
			{ label: 'One-time payment', tau: true, them: true },
			{ label: 'Free', tau: false, them: true },
			{ label: 'Live streaming', tau: false, them: true },
		],
		verdict: {
			tau: "You want to capture your work as a timelapse — screen, camera, or both — and export something polished in one workflow.",
			them: "You're live streaming to Twitch or YouTube, or you need complex multi-source scene management.",
		},
		metaTitle: 'Tau vs OBS Studio for Timelapse — What\'s the Difference?',
		metaDescription:
			'OBS and Tau both record your screen — but they\'re built for different things. Honest comparison of Tau vs OBS for timelapse recording on Mac and Windows.',
	},
	{
		slug: 'screenflow',
		name: 'ScreenFlow',
		category: 'Screen recorder and video editor',
		price: '$149 one-time (macOS only)',
		platforms: ['macOS'],
		summary:
			'ScreenFlow is a polished screen recorder and video editor for Mac. It\'s built for creating tutorials and demos — not timelapses.',
		theirStrengths: [
			'Full-featured video editor with timeline',
			'Good screen and camera recording quality',
			'Polished macOS-native UI',
			'Annotations, callouts, and effects',
			'Widely used for course and tutorial creation',
		],
		theirWeaknesses: [
			'macOS only — no Windows support',
			'No native frame interval recording',
			'$149 — significantly more expensive than Tau',
			'Overkill for timelapse — most features won\'t be used',
			'No GIF export without workarounds',
			'Subscription plan also available (ongoing cost)',
		],
		features: [
			{ label: 'Native timelapse (frame intervals)', tau: true, them: false },
			{ label: 'Screen recording', tau: true, them: true },
			{ label: 'Camera recording', tau: true, them: true },
			{ label: 'Screen + camera simultaneously', tau: true, them: true },
			{ label: 'Built-in editor', tau: true, them: true },
			{ label: 'Timer overlays', tau: true, them: 'partial' },
			{ label: 'Export to GIF', tau: true, them: false },
			{ label: 'Export to WEBM', tau: true, them: false },
			{ label: 'Windows support', tau: true, them: false },
			{ label: 'One-time payment under €20', tau: true, them: false },
			{ label: 'Full timeline video editor', tau: false, them: true },
			{ label: 'Annotations and callouts', tau: false, them: true },
		],
		verdict: {
			tau: "You want a timelapse-first workflow on Mac or Windows at a fraction of the price.",
			them: "You're creating tutorials, courses, or polished demo videos that need a full timeline editor and screen annotations.",
		},
		metaTitle: 'Tau vs ScreenFlow — Timelapse Recording Comparison',
		metaDescription:
			'ScreenFlow is a great screen recorder for tutorials. But for timelapse, it\'s the wrong tool. Here\'s how Tau compares for Mac users.',
	},
	{
		slug: 'loom',
		name: 'Loom',
		category: 'Async screen sharing / SaaS',
		price: 'Free tier + $12.50/mo (Starter)',
		platforms: ['macOS', 'Windows', 'Browser'],
		summary:
			'Loom is a SaaS tool for recording and sharing short screen videos asynchronously. It\'s built for communication — not timelapse.',
		theirStrengths: [
			'Instant shareable link after recording',
			'Great for async team communication',
			'Browser-based — no installation required',
			'Comments and reactions on videos',
			'Free tier available',
		],
		theirWeaknesses: [
			'No frame interval recording — full-rate video only',
			'No timelapse editing tools',
			'No timer overlays',
			'Subscription required for most useful features',
			'Videos hosted on Loom servers (not local)',
			'5-minute limit on free tier',
			'Not designed for multi-hour session capture',
		],
		features: [
			{ label: 'Native timelapse (frame intervals)', tau: true, them: false },
			{ label: 'Screen recording', tau: true, them: true },
			{ label: 'Camera recording', tau: true, them: true },
			{ label: 'Screen + camera simultaneously', tau: true, them: true },
			{ label: 'Built-in timelapse editor', tau: true, them: false },
			{ label: 'Timer overlays', tau: true, them: false },
			{ label: 'Export to GIF / WEBM', tau: true, them: false },
			{ label: 'Local file output (no cloud required)', tau: true, them: false },
			{ label: 'One-time payment', tau: true, them: false },
			{ label: 'Instant shareable link', tau: false, them: true },
			{ label: 'Team collaboration features', tau: false, them: true },
			{ label: 'Free tier', tau: false, them: true },
		],
		verdict: {
			tau: "You want to record a long session as a timelapse — screen, camera, or both — and export it as a polished video, GIF, or WEBM.",
			them: "You need to quickly record and share a short async screen video with teammates, with no editing required.",
		},
		metaTitle: 'Tau vs Loom — Which is Right for Recording Your Work?',
		metaDescription:
			'Loom is great for async screen shares. Tau is built for timelapse. Here\'s an honest comparison of both tools for creators and developers.',
	},
	{
		slug: 'cleanshot-x',
		name: 'CleanShot X',
		category: 'Screenshot & screen recording tool',
		price: '$29 one-time (macOS only)',
		platforms: ['macOS'],
		summary:
			'CleanShot X is a beloved Mac screenshot and quick screen-recording tool. It\'s built for fast captures and GIFs — not for multi-hour timelapse sessions.',
		theirStrengths: [
			'Excellent screenshot annotation tools',
			'Fast, polished GIF recording for short clips',
			'Clean, native macOS design',
			'Cloud sharing with instant links',
			'Lightweight menu bar app',
		],
		theirWeaknesses: [
			'macOS only — no Windows support',
			'No native frame interval recording — it\'s full-rate video, not timelapse',
			'No camera recording at all',
			'No timer overlays or timelapse-specific editing',
			'Not designed for multi-hour background sessions',
			'Cloud features require an ongoing subscription',
		],
		features: [
			{ label: 'Native timelapse (frame intervals)', tau: true, them: false },
			{ label: 'Screen recording', tau: true, them: true },
			{ label: 'Camera recording', tau: true, them: false },
			{ label: 'Screen + camera simultaneously', tau: true, them: false },
			{ label: 'Built-in timelapse editor', tau: true, them: false },
			{ label: 'Timer overlays', tau: true, them: false },
			{ label: 'Export to GIF / WEBM', tau: true, them: 'partial' },
			{ label: 'Windows support', tau: true, them: false },
			{ label: 'One-time payment', tau: true, them: true },
			{ label: 'Screenshot annotation tools', tau: false, them: true },
			{ label: 'Instant cloud sharing links', tau: false, them: true },
		],
		verdict: {
			tau: "You want to capture a long session — coding, design, anything — as a proper timelapse with overlays, on Mac or Windows.",
			them: "You need fast, polished screenshots and short GIF captures for documentation or bug reports on Mac.",
		},
		metaTitle: 'Tau vs CleanShot X — Timelapse vs Quick Screen Capture',
		metaDescription:
			'CleanShot X is great for screenshots and short GIFs. Tau is built for timelapse. Here\'s how they compare for Mac users who want to record longer sessions.',
	},
	{
		slug: 'screenstudio',
		name: 'Screen Studio',
		category: 'Screen recorder for product demos',
		price: '$89 one-time (Personal license)',
		platforms: ['macOS'],
		summary:
			'Screen Studio creates beautifully smooth screen recordings with automatic zoom and cursor effects — built for product demos and marketing videos, not timelapse.',
		theirStrengths: [
			'Stunning automatic cursor and zoom effects',
			'Great for polished product demo videos',
			'Clean, minimal recording workflow',
			'Background and frame styling presets',
		],
		theirWeaknesses: [
			'macOS only',
			'No frame interval recording — it\'s full-rate video at high quality',
			'No timelapse-specific editing or timer overlays',
			'Not designed for multi-hour capture sessions',
			'$89+ price point for a single-purpose tool',
			'No GIF or WEBM export',
		],
		features: [
			{ label: 'Native timelapse (frame intervals)', tau: true, them: false },
			{ label: 'Screen recording', tau: true, them: true },
			{ label: 'Camera recording', tau: true, them: 'partial' },
			{ label: 'Built-in timelapse editor', tau: true, them: false },
			{ label: 'Timer overlays', tau: true, them: false },
			{ label: 'Export to GIF / WEBM', tau: true, them: false },
			{ label: 'Windows support', tau: true, them: false },
			{ label: 'One-time payment under €20', tau: true, them: false },
			{ label: 'Automatic cursor/zoom effects', tau: false, them: true },
			{ label: 'Polished demo-video presets', tau: false, them: true },
		],
		verdict: {
			tau: "You want to capture your process as a timelapse — coding, design, art — on Mac or Windows, at a fraction of the price.",
			them: "You're making a polished product demo or marketing video that needs automatic zoom and cursor effects.",
		},
		metaTitle: 'Tau vs Screen Studio — Timelapse vs Product Demo Recording',
		metaDescription:
			'Screen Studio is built for slick product demos. Tau is built for timelapse. Here\'s an honest comparison for Mac users deciding between the two.',
	},
	{
		slug: 'camtasia',
		name: 'Camtasia',
		category: 'Screen recorder & video editor',
		price: '~$199/year (subscription)',
		platforms: ['macOS', 'Windows'],
		summary:
			'Camtasia is a full-featured screen recorder and video editor used widely for tutorials and e-learning. It\'s a heavyweight editing suite — not a timelapse tool.',
		theirStrengths: [
			'Full timeline video editor with effects and transitions',
			'Quizzing and interactivity features for e-learning',
			'Mature, well-supported product with a large user base',
			'Cross-platform (macOS and Windows)',
		],
		theirWeaknesses: [
			'No native frame interval recording — timelapse isn\'t a built-in feature',
			'Subscription pricing — ongoing cost rather than one-time',
			'Steep learning curve and heavy install for a simple timelapse',
			'Overkill if you just want to capture and export a timelapse',
			'No timer overlays designed for timelapse storytelling',
		],
		features: [
			{ label: 'Native timelapse (frame intervals)', tau: true, them: false },
			{ label: 'Screen recording', tau: true, them: true },
			{ label: 'Camera recording', tau: true, them: true },
			{ label: 'Screen + camera simultaneously', tau: true, them: true },
			{ label: 'Built-in timelapse editor', tau: true, them: false },
			{ label: 'Timer overlays', tau: true, them: false },
			{ label: 'Export to GIF / WEBM', tau: true, them: 'partial' },
			{ label: 'One-time payment', tau: true, them: false },
			{ label: 'Full timeline video editor', tau: false, them: true },
			{ label: 'Quizzing / e-learning features', tau: false, them: true },
		],
		verdict: {
			tau: "You want a timelapse-first workflow that's quick to learn and pay once for.",
			them: "You're producing full tutorial or e-learning courses that need a complete timeline editor and interactivity.",
		},
		metaTitle: 'Tau vs Camtasia — Timelapse Recording vs Full Video Editor',
		metaDescription:
			'Camtasia is a powerful (and pricey) video editing suite. Tau is a focused, one-time-payment timelapse tool. Here\'s how they compare.',
	},
];
