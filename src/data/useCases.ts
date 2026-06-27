export interface UseCaseFAQ {
	question: string;
	answer: string;
}

export interface UseCase {
	slug: string;
	title: string;
	audience: string;
	headline: string;
	subheadline: string;
	metaTitle: string;
	metaDescription: string;
	painPoints: string[];
	benefits: { title: string; description: string }[];
	relatedFeatures: string[];
	faq: UseCaseFAQ[];
}

export const useCases: UseCase[] = [
	{
		slug: 'coding',
		title: 'Tau for Coding Timelapses',
		audience: 'developers',
		headline: 'Turn your coding sessions into shareable timelapses',
		subheadline:
			'Record your screen while you build, then export a polished timelapse for X, YouTube, or your devlog — without a 4-hour raw video sitting in your downloads folder.',
		metaTitle: 'Tau for Coding — Record Coding Timelapses on Mac & Windows',
		metaDescription:
			'Record your coding sessions as a timelapse with Tau. Screen capture, timer overlays, and one-click export — built for developers sharing their process.',
		painPoints: [
			'Full-length screen recordings are huge files nobody wants to watch',
			'Editing a 3-hour coding session down to something postable takes longer than the code did',
			'Generic screen recorders weren\'t built for long background sessions',
		],
		benefits: [
			{
				title: 'Record in the background while you work',
				description:
					'Start Tau, minimize it, and code. It captures frames at intervals so your CPU stays free for your actual editor and terminal.',
			},
			{
				title: 'Show elapsed time with overlays',
				description:
					'Add a stopwatch or clock overlay so viewers can see how long a feature actually took to build — a small detail that makes devlogs more credible.',
			},
			{
				title: 'Trim and export in minutes',
				description:
					'Cut the session down to the part worth sharing, then export straight to MP4 for YouTube or GIF for a quick X post.',
			},
		],
		relatedFeatures: ['record-from-any-source', 'smart-timer-overlays', 'export-to-multiple-formats'],
		faq: [
			{
				question: 'Will recording slow down my IDE or builds?',
				answer:
					'No. Tau captures frames at intervals rather than full-rate video, so it runs quietly in the background with minimal CPU usage — even during compiles or builds.',
			},
			{
				question: 'Can I show my webcam alongside my code?',
				answer:
					'Yes. Tau supports recording your screen and camera at the same time, so you can show your face alongside your editor for a more personal devlog.',
			},
			{
				question: 'What format should I export for X or YouTube?',
				answer:
					'MP4 works everywhere and is the best default. Use GIF for short, autoplaying clips embedded directly in a post.',
			},
		],
	},
	{
		slug: 'design',
		title: 'Tau for Design Process Timelapses',
		audience: 'designers',
		headline: 'Show your design process, not just the final file',
		subheadline:
			'Record your screen while you design in Figma, Photoshop, or anywhere else — and turn hours of iteration into a satisfying timelapse for your portfolio or socials.',
		metaTitle: 'Tau for Designers — Record Design Process Timelapses',
		metaDescription:
			'Capture your design process as a timelapse with Tau. Works with Figma, Photoshop, and any app — overlays, editing, and export built in.',
		painPoints: [
			'Clients and followers want to see process, not just the final shot',
			'Screen recordings of a multi-hour design session are too long to post anywhere',
			'Most recording tools add bloat you don\'t need for a simple timelapse',
		],
		benefits: [
			{
				title: 'Works with any design tool',
				description:
					'Figma, Photoshop, Illustrator, Procreate on iPad via Continuity Camera — Tau records whatever is on your screen or camera.',
			},
			{
				title: 'Add personality with overlays',
				description:
					'A timer overlay shows how long a piece took, adding context that makes process videos more compelling for clients and followers.',
			},
			{
				title: 'Export straight to your portfolio format',
				description:
					'WEBM for a fast-loading embed on your portfolio site, MP4 for YouTube, or GIF for a quick Instagram or X share — all from one export panel.',
			},
		],
		relatedFeatures: ['record-from-any-source', 'smart-timer-overlays', 'minimal-editor'],
		faq: [
			{
				question: 'Does Tau work with Figma and other browser-based tools?',
				answer:
					'Yes. Tau records your screen directly, so it works with any app — browser-based or native — including Figma, Photoshop, and Illustrator.',
			},
			{
				question: 'Can I record my iPad screen while sketching?',
				answer:
					'On macOS, you can use your iPhone as a camera input via Continuity Camera. Direct iPad screen capture depends on your setup — mirroring your iPad to your Mac will work.',
			},
			{
				question: 'What\'s the best export format for a portfolio site?',
				answer:
					'WEBM is the best choice for embedding on a website — small file size and fast loading without sacrificing quality.',
			},
		],
	},
	{
		slug: 'digital-art',
		title: 'Tau for Digital Art Timelapses',
		audience: 'digital artists',
		headline: 'Capture your art process as a timelapse, automatically',
		subheadline:
			'Record your screen while you paint, sketch, or illustrate — then export a satisfying process video without manually speeding anything up.',
		metaTitle: 'Tau for Digital Artists — Record Art Process Timelapses',
		metaDescription:
			'Record your digital art process as a timelapse with Tau. Capture your screen at frame intervals and export a polished video, GIF, or WEBM in one click.',
		painPoints: [
			'Speeding up full recordings in a video editor afterward is slow and fiddly',
			'A multi-hour art session produces a video file too large to deal with',
			'Most screen recorders aren\'t built to capture in true timelapse intervals',
		],
		benefits: [
			{
				title: 'True frame-interval timelapse, not sped-up video',
				description:
					'Tau captures at set frame intervals from the start, so you get a real timelapse — not a full-rate recording you have to speed up later.',
			},
			{
				title: 'Stays light while you paint',
				description:
					'Runs quietly in the background so your tablet drivers and art software keep all the resources they need.',
			},
			{
				title: 'One-click export for social',
				description:
					'Export your finished timelapse to MP4, GIF, or WEBM — ready for X, Instagram, or YouTube Shorts without extra conversion steps.',
			},
		],
		relatedFeatures: ['record-from-any-source', 'minimal-editor', 'export-to-multiple-formats'],
		faq: [
			{
				question: 'Is this a real timelapse or just sped-up video?',
				answer:
					'A real timelapse. Tau captures frames at the interval you set, rather than recording full-rate video and speeding it up afterward.',
			},
			{
				question: 'Will it work with my drawing tablet software?',
				answer:
					'Yes. Tau records whatever is on your screen, so it works with any tablet or art software — Procreate, Photoshop, Clip Studio Paint, and others.',
			},
			{
				question: 'Can I add music to my art timelapse?',
				answer:
					'Yes. Tau\'s editor lets you attach an audio file to your timelapse and automatically matches the duration before export.',
			},
		],
	},
	{
		slug: 'devlogs',
		title: 'Tau for Devlogs & Content Creators',
		audience: 'content creators',
		headline: 'Make better devlogs and process videos, faster',
		subheadline:
			'Record your screen and camera together, add overlays for context, and export in the format your platform needs — all without leaving Tau.',
		metaTitle: 'Tau for Devlogs & Content Creators — Timelapse Process Videos',
		metaDescription:
			'Build better devlogs and process content with Tau. Record screen and camera together, add timer overlays, and export to MP4, GIF, or WEBM.',
		painPoints: [
			'Juggling separate screen recording and camera apps is a hassle',
			'Editing two video tracks together eats hours you don\'t have',
			'Viewers lose interest in raw, unedited multi-hour footage',
		],
		benefits: [
			{
				title: 'Screen and camera in one recording',
				description:
					'Tau captures both at once, so you don\'t need to sync two separate recordings in post — your face and your work, already combined.',
			},
			{
				title: 'Context with timer overlays',
				description:
					'A live clock or stopwatch overlay tells your audience exactly how the project is progressing — a small touch that builds trust in devlog content.',
			},
			{
				title: 'Trim and export without a full editing suite',
				description:
					'Cut the dead air, attach background audio, and export — no need to learn a timeline-based video editor for a simple devlog cut.',
			},
		],
		relatedFeatures: ['record-from-any-source', 'smart-timer-overlays', 'minimal-editor'],
		faq: [
			{
				question: 'Can I record my screen and webcam at the same time for a devlog?',
				answer:
					'Yes. Tau supports multi-source recording, capturing your screen and camera simultaneously in a single session.',
			},
			{
				question: 'Do I need separate editing software?',
				answer:
					'No. Tau\'s built-in editor handles trimming and audio attachment, and exports directly to MP4, GIF, or WEBM.',
			},
			{
				question: 'What\'s the best format for YouTube devlogs?',
				answer:
					'MP4 at your recorded resolution is the safest choice for YouTube — broadly compatible and good quality at a reasonable file size.',
			},
		],
	},
];
