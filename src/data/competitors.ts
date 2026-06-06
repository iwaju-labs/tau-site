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
];
