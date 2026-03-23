/**
 * Keyword → internal URL map used by the rehypeInternalLinks plugin.
 * The plugin links the FIRST occurrence of each keyword in blog content.
 * Longer phrases take priority over shorter ones (sorted by length in the plugin).
 * Only one link per URL is created per page.
 */
export const internalLinks: Record<string, string> = {
	'camera resolution': '/features/record-from-any-camera',
	'frame intervals': '/features/record-from-any-camera',
	'output format': '/features/export-to-multiple-formats',
	'export screen': '/features/export-to-multiple-formats',
	'timer overlays': '/features/smart-timer-overlays',
	'timer overlay': '/features/smart-timer-overlays',
	'overlays': '/features/smart-timer-overlays',
	'timelapse editor': '/features/minimal-editor',
};
