function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * Detect whether an HTML page contains a valid webring widget.
 *
 * Requires all of:
 * 1. A marker: `data-webring="ca"` attribute or `webring.ca/embed.js` script
 * 2. A prev link: `href` pointing to `webring.ca/prev/`
 * 3. A next link: `href` pointing to `webring.ca/next/`
 *
 * When `slug` is provided, prev/next links must match that member exactly.
 * HTML comments are stripped before detection so hidden markers don't pass.
 *
 * NOTE: Detection runs against raw HTML returned by fetch(). Sites that render
 * the widget entirely via client-side JavaScript (SPAs with no SSR) will not
 * pass — the marker and links must be present in the initial HTML response.
 */
export function detectWidget(html: string, slug?: string): boolean {
  const stripped = html.toLowerCase().replace(/<!--[\s\S]*?-->/g, '')
  const hasMarker = stripped.includes('data-webring="ca"') || stripped.includes('webring.ca/embed.js')
  const slugPattern = slug ? escapeRegex(slug.toLowerCase()) : '[a-z0-9-]+'
  const hasPrev = new RegExp(`href=["'][^"']*webring\\.ca/prev/${slugPattern}(?:[?#/][^"']*)?["']`).test(stripped)
  const hasNext = new RegExp(`href=["'][^"']*webring\\.ca/next/${slugPattern}(?:[?#/][^"']*)?["']`).test(stripped)
  return hasMarker && hasPrev && hasNext
}
