/**
 * Keyword → internal URL map used by the rehypeInternalLinks plugin.
 * The plugin links the FIRST occurrence of each keyword in blog content.
 * Longer phrases take priority over shorter ones (sorted by length in the plugin).
 * Only one link per URL is created per page.
 */
export const internalLinks: Record<string, string> = {
	// Recording sources
	'multi-source recording': '/features/record-from-any-source',
	'screen and camera': '/features/record-from-any-source',
	'screen timelapse recorder': '/features/record-from-any-source',
	'screen timelapse': '/features/record-from-any-source',
	'camera resolution': '/features/record-from-any-source',
	'frame intervals': '/features/record-from-any-source',
	// Export
	'output format': '/features/export-to-multiple-formats',
	'export screen': '/features/export-to-multiple-formats',
	// Overlays
	'timer overlays': '/features/smart-timer-overlays',
	'timer overlay': '/features/smart-timer-overlays',
	'stopwatch overlay': '/features/smart-timer-overlays',
	'overlays': '/features/smart-timer-overlays',
	// Editor
	'timelapse editor': '/features/minimal-editor',
};
