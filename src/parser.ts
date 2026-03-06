export interface Metadata {
  title: string | undefined;
  summary: string | undefined;
  readWhen: string[];
  error: string | undefined;
}

/**
 * The frontmatter parsing approach is derived from OpenClaw's docs-list script.
 * See https://github.com/openclaw/openclaw/ (MIT, © 2025 Peter Steinberger).
 */
export function extractMetadata(content: string): Metadata {
  if (!content.startsWith("---")) {
    return { title: undefined, summary: undefined, readWhen: [], error: "Missing frontmatter" };
  }

  const closingIndex = content.indexOf("\n---", 3);
  if (closingIndex === -1) {
    return {
      title: undefined,
      summary: undefined,
      readWhen: [],
      error: "Unterminated frontmatter",
    };
  }

  const block = content.slice(4, closingIndex);
  const lines = block.split("\n");

  let title: string | undefined;
  let summary: string | undefined;
  const readWhen: string[] = [];
  let collectingReadWhen = false;

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed.startsWith("- ") && collectingReadWhen) {
      readWhen.push(trimmed.slice(2).trim());
      continue;
    }

    const colonIndex = trimmed.indexOf(":");
    if (colonIndex !== -1) {
      const key = trimmed.slice(0, colonIndex).trim();
      const value = trimmed.slice(colonIndex + 1).trim();

      if (key === "read_when") {
        collectingReadWhen = true;
        continue;
      }

      collectingReadWhen = false;

      const stripped = value.replace(/^["']|["']$/g, "");
      if (key === "title") {
        title = stripped;
      } else if (key === "summary") {
        summary = stripped;
      }
    }
  }

  return { title, summary, readWhen, error: undefined };
}

export function stripFrontmatter(content: string): string {
  if (!content.startsWith("---")) return content;
  const closingIndex = content.indexOf("\n---", 3);
  if (closingIndex === -1) return content;
  return content.slice(closingIndex + 4).replace(/^\n+/, "");
}
