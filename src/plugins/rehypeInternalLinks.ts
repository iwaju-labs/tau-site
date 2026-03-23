/**
 * Rehype plugin that auto-links keyword mentions in blog content to internal pages.
 * - Only links the first occurrence of each destination URL per page
 * - Skips headings, links, code blocks, and pre elements
 * - Longer keyword phrases take priority over shorter ones
 */

const SKIP_TAGS = new Set([
	'a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
	'code', 'pre', 'script', 'style',
]);

type HastNode = {
	type: string;
	tagName?: string;
	value?: string;
	children?: HastNode[];
	properties?: Record<string, unknown>;
};

function replaceText(text: string, usedUrls: Set<string>, keywords: [string, string][]): HastNode[] {
	for (const [keyword, url] of keywords) {
		if (usedUrls.has(url)) continue;

		const idx = text.toLowerCase().indexOf(keyword.toLowerCase());
		if (idx === -1) continue;

		const before = text.slice(0, idx);
		const matched = text.slice(idx, idx + keyword.length);
		const after = text.slice(idx + keyword.length);

		usedUrls.add(url);

		return [
			...(before ? [{ type: 'text', value: before }] : []),
			{
				type: 'element',
				tagName: 'a',
				properties: { href: url },
				children: [{ type: 'text', value: matched }],
			},
			...replaceText(after, usedUrls, keywords),
		];
	}

	return [{ type: 'text', value: text }];
}

function walk(node: HastNode, insideSkip: boolean, usedUrls: Set<string>, keywords: [string, string][]) {
	if (!node.children) return;

	const skip = insideSkip || (node.type === 'element' && SKIP_TAGS.has(node.tagName!));
	const newChildren: HastNode[] = [];

	for (const child of node.children) {
		if (!skip && child.type === 'text' && child.value) {
			newChildren.push(...replaceText(child.value, usedUrls, keywords));
		} else {
			walk(child, skip, usedUrls, keywords);
			newChildren.push(child);
		}
	}

	node.children = newChildren;
}

export function rehypeInternalLinks(keywords: Record<string, string>) {
	const sorted = Object.entries(keywords).sort(([a], [b]) => b.length - a.length);

	return (tree: HastNode) => {
		const usedUrls = new Set<string>();
		walk(tree, false, usedUrls, sorted);
	};
}
