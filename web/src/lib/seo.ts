/** Clamp meta description to ~120–160 chars at a word boundary. */
export function seoDescription(text: string, max = 160, min = 120): string {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (normalized.length <= max) {
    return normalized;
  }

  const slice = normalized.slice(0, max - 1);
  const lastSpace = slice.lastIndexOf(" ");
  const clipped = (lastSpace >= min ? slice.slice(0, lastSpace) : slice).trim();
  return `${clipped}…`;
}
