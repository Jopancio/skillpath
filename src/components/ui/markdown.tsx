import { Fragment, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Renders simple markdown-ish text: ## / ### headings, **bold**, *italic*,
 * "- " bullet lists, "1." numbered lists, and paragraphs.
 * Line-aware: headings/lists are recognized even without a preceding blank line
 * (AI-generated content often omits them).
 */
export function MarkdownText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const blocks = parseBlocks(text);
  return (
    <div className={cn("space-y-4 leading-relaxed", className)}>
      {blocks.map((block, i) => {
        if (block.type === "heading") {
          return (
            <h2
              key={i}
              className="mt-2 font-display text-lg font-extrabold tracking-tight text-foreground first:mt-0"
            >
              {renderInline(block.lines[0])}
            </h2>
          );
        }
        if (block.type === "subheading") {
          return (
            <h3
              key={i}
              className="mt-1 font-display text-base font-bold text-foreground first:mt-0"
            >
              {renderInline(block.lines[0])}
            </h3>
          );
        }
        if (block.type === "list") {
          const ordered = /^\d+\./.test(block.lines[0]);
          const Tag = ordered ? "ol" : "ul";
          return (
            <Tag
              key={i}
              className={cn(
                "space-y-2 pl-5 text-[15px]",
                ordered ? "list-decimal" : "list-disc"
              )}
            >
              {block.lines.map((l, j) => (
                <li key={j} className="pl-1 marker:text-primary marker:font-bold">
                  {renderInline(l.replace(/^\s*(?:-|\*|\d+\.)\s*/, ""))}
                </li>
              ))}
            </Tag>
          );
        }
        // paragraph
        return (
          <p key={i} className="text-[15px]">
            {block.lines.map((l, j) => (
              <Fragment key={j}>
                {renderInline(l)}
                {j < block.lines.length - 1 && <br />}
              </Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
}

type Block = {
  type: "heading" | "subheading" | "list" | "paragraph";
  lines: string[];
};

function parseBlocks(text: string): Block[] {
  const blocks: Block[] = [];
  let current: Block | null = null;

  const flush = () => {
    if (current && current.lines.length > 0) blocks.push(current);
    current = null;
  };

  for (const rawLine of text.split("\n")) {
    const line = rawLine.trimEnd();
    const trimmed = line.trim();

    if (!trimmed) {
      flush();
      continue;
    }

    // Headings: strip ### / ## prefix (with or without space)
    const h3 = trimmed.match(/^###\s*(.+)$/);
    const h2 = trimmed.match(/^##\s*(.+)$/);
    if (h3) {
      flush();
      blocks.push({ type: "subheading", lines: [h3[1]] });
      continue;
    }
    if (h2) {
      flush();
      blocks.push({ type: "heading", lines: [h2[1]] });
      continue;
    }

    // List items: "- item", "* item", "1. item"
    if (/^(?:-|\*|\d+\.)\s+/.test(trimmed)) {
      if (!current || current.type !== "list") {
        flush();
        current = { type: "list", lines: [] };
      }
      current.lines.push(trimmed);
      continue;
    }

    // Regular text
    if (!current || current.type !== "paragraph") {
      flush();
      current = { type: "paragraph", lines: [] };
    }
    current.lines.push(trimmed);
  }
  flush();
  return blocks;
}

function renderInline(text: string): ReactNode {
  // split by **bold** and *italic*
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-bold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
      return (
        <em key={i} className="italic">
          {part.slice(1, -1)}
        </em>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}
