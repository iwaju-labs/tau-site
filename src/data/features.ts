import { Video, Timer, Scissors, FileVideo } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface FeatureBenefit {
	title: string;
	description: string;
}

export interface FeatureStep {
	title: string;
	description: string;
}

export interface FeatureFAQ {
	question: string;
	answer: string;
}

export interface Feature {
	slug: string;
	icon: LucideIcon;
	title: string;
	description: string;
	overview: string;
	benefits: FeatureBenefit[];
	howToUse: FeatureStep[];
	faq: FeatureFAQ[];
}

export const features: Feature[] = [
	{
		slug: 'record-from-any-camera',
		icon: Video,
		title: 'Record from any camera',
		description:
			"Capture your work directly — whether it's a coding session, design process, or art piece. MacOS users can use iPhones as a camera input.",
		overview:
			'Tau works with any camera your system recognises — built-in webcam, USB camera, or on macOS, your iPhone via Continuity Camera. Pick your source, set your frame rate, and start recording. No drivers, no setup friction.',
		benefits: [
			{
				title: 'Any camera source',
				description:
					'Use your built-in webcam, a USB camera, or on macOS, your iPhone as a high-quality camera input through Continuity Camera.',
			},
			{
				title: 'Screen capture support (Coming Soon)',
				description:
					'Record your screen as a timelapse instead of a camera feed — great for coding sessions, design work, or anything happening on your display.',
			},
			{
				title: 'Live preview while recording',
				description:
					'See exactly what Tau is capturing before you commit. Adjust framing or lighting without stopping and restarting.',
			},
			{
				title: 'Lightweight on resources',
				description:
					'Tau is built to run quietly in the background. Recording a timelapse won\'t slow down the work you\'re actually trying to capture.',
			},
		],
		howToUse: [
			{
				title: 'Open Tau and start a new recording',
				description: 'Launch Tau and click "New Recording" from the main screen.',
			},
			{
				title: 'Select your camera source',
				description:
					'Pick from any available camera input in the dropdown — webcam, iPhone, USB cam, or screen capture.',
			},
			{
				title: 'Set your frame rate',
				description:
					'Choose how many frames per second to capture. Lower rates = faster final timelapse. Higher rates = smoother playback.',
			},
			{
				title: 'Hit Record',
				description:
					'Tau starts capturing in the background. Come back when you\'re done — your timelapse will be waiting.',
			},
		],
		faq: [
			{
				question: 'Can I use multiple cameras at the same time?',
				answer:
					'Not currently — Tau records from one source per session. If you need multiple angles, record separate sessions and combine in the editor.',
			},
			{
				question: 'Does Tau work on Windows?',
				answer:
					'Yes. Tau supports Windows and macOS. The iPhone Continuity Camera feature is macOS-only.',
			},
			{
				question: 'What cameras are supported?',
				answer:
					'Any camera that your operating system recognises will appear in Tau\'s source list. This includes built-in webcams, most USB cameras, and on macOS, iPhones.',
			},
			{
				question: 'Can I record my screen instead of a camera?',
				answer:
					'Yes. Screen capture is available as a source alongside camera inputs.',
			},
		],
	},
	{
		slug: 'smart-timer-overlays',
		icon: Timer,
		title: 'Smart timer overlays',
		description:
			'Add clock, stopwatch, custom font and many other overlays to give your timelapses personality.',
		overview:
			'Timer overlays let you show elapsed time, current time, or a countdown directly in your timelapse. Customise the font, size, colour, and position — then let Tau burn it into the final export automatically.',
		benefits: [
			{
				title: 'Multiple overlay types',
				description:
					'Choose from a running stopwatch, live clock, or custom countdown. Each overlay type serves a different storytelling purpose.',
			},
			{
				title: 'Custom fonts and styles',
				description:
					'Pick from several font options and adjust size, colour, and opacity to match your brand or aesthetic.',
			},
			{
				title: 'Flexible positioning',
				description:
					'Place the overlay in any corner or along any edge of the frame. It stays exactly where you put it throughout the recording.',
			},
			{
				title: 'Auto-rendered on export',
				description:
					'The overlay is composited into the final video automatically. No post-processing or video editing required.',
			},
		],
		howToUse: [
			{
				title: 'Start or open a recording',
				description: 'Either begin a new recording or open an existing one in Tau.',
			},
			{
				title: 'Open the Overlays panel',
				description: 'Navigate to the Overlays section in the recording settings.',
			},
			{
				title: 'Enable your timer overlay',
				description:
					'Toggle on Stopwatch, Clock, or Countdown and configure the starting value if needed.',
			},
			{
				title: 'Customise appearance',
				description:
					'Adjust font, size, colour, and position using the overlay controls.',
			},
			{
				title: 'Record and export',
				description:
					'The overlay will be embedded into your exported timelapse automatically.',
			},
		],
		faq: [
			{
				question: 'Can I add more than one overlay at a time?',
				answer:
					'You can combine a timer overlay with other overlay types. Check the Overlays panel for everything that\'s available in your version of Tau.',
			},
			{
				question: 'Can I change the font?',
				answer:
					'Yes. Tau includes several font options in the overlay settings. Font size and colour are also adjustable.',
			},
			{
				question: 'Does the overlay get permanently burned into the video?',
				answer:
					'Yes — on export the overlay is composited into the video file. This keeps the output compatible with any platform without requiring a separate layer.',
			},
			{
				question: 'Can I preview the overlay before recording?',
				answer:
					'Yes. The live preview window shows the overlay exactly as it will appear in the final export.',
			},
		],
	},
	{
		slug: 'minimal-editor',
		icon: Scissors,
		title: 'Minimal editor',
		description: 'Trim and export without the bloat of a full video editor.',
		overview:
			"Tau's editor is designed for one thing: getting your timelapse trimmed and out the door. Drag the handles to set your in and out points, preview the result, and export. No timeline tracks, no keyframes, no distractions.",
		benefits: [
			{
				title: 'Trim in seconds',
				description:
					'Drag the start and end handles to cut your recording down to exactly the part you want. No precision tools required.',
			},
			{
				title: 'Non-destructive editing',
				description:
					'Your original recording is never touched. Trim points are applied at export time, so you can always re-edit.',
			},
			{
				title: 'Instant preview',
				description:
					'Play back the trimmed clip before committing to an export. What you see is exactly what you\'ll get.',
			},
			{
				title: 'Nothing unnecessary',
				description:
					'No timeline layers, no effect racks, no project files. Just the clip and the controls you actually need.',
			},
		],
		howToUse: [
			{
				title: 'Open your recording in Tau',
				description:
					'After recording, Tau will take you to the editor automatically. Or open a saved recording from the library.',
			},
			{
				title: 'Set your trim points',
				description:
					'Drag the left handle to set the start point and the right handle to set the end point.',
			},
			{
				title: 'Preview the result',
				description:
					'Hit Play to watch the trimmed clip. Adjust the handles if needed.',
			},
			{
				title: 'Export',
				description: 'Click Export, choose your format, and Tau handles the rest.',
			},
		],
		faq: [
			{
				question: 'Can I cut from the middle of a clip?',
				answer:
					'The editor supports start and end trim points. Cutting from the middle of a clip is not currently supported.',
			},
			{
				question: 'Will editing overwrite my original recording?',
				answer:
					'No. Trim edits are applied only when you export. Your source recording stays intact.',
			},
			{
				question: 'Can I re-edit a clip after exporting?',
				answer:
					'Yes. The original recording remains in Tau\'s library, so you can open it again and export with different trim points at any time.',
			},
			{
				question: 'Is there a minimum clip length?',
				answer: 'No minimum length — trim to whatever duration you need.',
			},
		],
	},
	{
		slug: 'export-to-multiple-formats',
		icon: FileVideo,
		title: 'Export to multiple formats',
		description:
			'One click to MP4, GIF, WEBM ready for Twitter, YouTube, or wherever you share.',
		overview:
			'When your timelapse is ready, Tau exports it to the format that works best for where you\'re sharing. MP4 for broad compatibility, GIF for quick social shares, WEBM for the web — all handled with a single click.',
		benefits: [
			{
				title: 'MP4 for universal sharing',
				description:
					'MP4 is accepted everywhere — Twitter, YouTube, Discord, Slack, email. It\'s the default choice for most use cases.',
			},
			{
				title: 'GIF for instant embedding',
				description:
					'GIFs autoplay inline on almost every platform with no player UI. Great for short demos or social posts.',
			},
			{
				title: 'WEBM for the web',
				description:
					'WEBM files are small and load fast in browsers. Ideal if you\'re embedding a timelapse on a website or portfolio.',
			},
			{
				title: 'Quality controls',
				description:
					'Adjust resolution and quality settings to balance file size against visual fidelity before exporting.',
			},
		],
		howToUse: [
			{
				title: 'Finish editing your timelapse',
				description:
					'Set your trim points and confirm your overlays are configured how you want them.',
			},
			{
				title: 'Click Export',
				description: 'Hit the Export button in the editor or toolbar.',
			},
			{
				title: 'Choose your format',
				description: 'Select MP4, GIF, or WEBM depending on where you\'re sharing.',
			},
			{
				title: 'Adjust quality settings (optional)',
				description:
					'Tune resolution or quality if you need a smaller file size or higher fidelity.',
			},
			{
				title: 'Save your file',
				description:
					'Tau processes the export and saves the file to your chosen location.',
			},
		],
		faq: [
			{
				question: 'What is the maximum export resolution?',
				answer:
					'Export resolution depends on your recording source. Tau exports at the resolution you recorded — up to the capability of your camera or screen.',
			},
			{
				question: 'Can I control the output file size?',
				answer:
					'Yes. The quality slider in the export dialog lets you trade off file size against visual quality.',
			},
			{
				question: 'Does GIF export support transparency?',
				answer:
					'GIF supports only binary transparency (fully transparent or fully opaque). Tau\'s GIF export does not use transparency — the background will be a solid colour.',
			},
			{
				question: 'Can I export the same timelapse in multiple formats?',
				answer:
					'Yes. Export as many times as you need in different formats. The source recording is never modified.',
			},
		],
	},
];
