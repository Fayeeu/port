import type { ReactNode } from "react";

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const tokenPattern = /\[([^\]]+)\]\((https?:\/\/[^\s)]+|mailto:[^\s)]+|\/(?!\/)[^\s)]+|#[^\s)]+)\)|\*\*(.+?)\*\*|__(.+?)__|`([^`]+)`|\*(.+?)\*|_(.+?)_/g;
  const output: ReactNode[] = [];
  let cursor = 0;
  let tokenIndex = 0;

  for (const match of text.matchAll(tokenPattern)) {
    const index = match.index ?? 0;
    if (index > cursor) output.push(text.slice(cursor, index));

    const key = `${keyPrefix}-${tokenIndex++}`;
    if (match[1] && match[2]) {
      const external = match[2].startsWith("https://");
      output.push(
        <a
          key={key}
          href={match[2]}
          className="font-medium text-[#915f54] underline decoration-[#c9a79d] underline-offset-4 transition-colors hover:text-ink"
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {match[1]}
        </a>,
      );
    } else if (match[3] || match[4]) {
      output.push(<strong key={key} className="font-semibold text-ink">{match[3] ?? match[4]}</strong>);
    } else if (match[5]) {
      output.push(<code key={key} className="rounded-md bg-[#eadccf] px-1.5 py-0.5 font-mono text-[0.9em] text-[#765b50]">{match[5]}</code>);
    } else {
      output.push(<em key={key} className="italic text-ink/85">{match[6] ?? match[7]}</em>);
    }

    cursor = index + match[0].length;
  }

  if (cursor < text.length) output.push(text.slice(cursor));
  return output;
}

function startsBlock(line: string): boolean {
  return /^(#{1,6}\s|```|>\s?|[-*+]\s|\d+\.\s|(?:---+|___+|\*\*\*+)$)/.test(line);
}

export function MarkdownContent({ source }: { source: string }) {
  const lines = source.replace(/\r\n/g, "\n").split("\n");
  const blocks: ReactNode[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index].trimEnd();
    if (!line.trim()) {
      index++;
      continue;
    }

    const codeFence = line.match(/^```([\w-]*)\s*$/);
    if (codeFence) {
      const language = codeFence[1];
      const code: string[] = [];
      index++;
      while (index < lines.length && !/^```\s*$/.test(lines[index].trim())) code.push(lines[index++]);
      if (index < lines.length) index++;
      blocks.push(
        <pre key={`block-${blocks.length}`} className="overflow-x-auto rounded-2xl border border-ink/8 bg-[#e9dfd2] p-5 text-sm leading-relaxed text-ink/85">
          {language && <span className="mb-3 block font-mono text-[10px] uppercase tracking-[0.18em] text-muted">{language}</span>}
          <code>{code.join("\n")}</code>
        </pre>,
      );
      continue;
    }

    const heading = line.match(/^(#{1,6})\s+(.+)$/);
    if (heading) {
      const level = Math.min(4, heading[1].length + 1);
      const headingText = heading[2].replace(/\s+#+\s*$/, "");
      const className = level === 2
        ? "mt-12 font-hero text-2xl font-bold leading-snug tracking-tight text-ink sm:text-3xl"
        : level === 3
          ? "mt-9 font-hero text-xl font-bold leading-snug text-ink"
          : "mt-7 font-hero text-lg font-semibold text-ink";
      const content = renderInline(headingText, `heading-${blocks.length}`);
      const key = `block-${blocks.length}`;
      if (level === 2) blocks.push(<h2 key={key} className={className}>{content}</h2>);
      else if (level === 3) blocks.push(<h3 key={key} className={className}>{content}</h3>);
      else blocks.push(<h4 key={key} className={className}>{content}</h4>);
      index++;
      continue;
    }

    if (/^(---+|___+|\*\*\*+)$/.test(line.trim())) {
      blocks.push(<hr key={`block-${blocks.length}`} className="my-10 border-0 border-t border-ink/12" />);
      index++;
      continue;
    }

    if (line.startsWith(">")) {
      const quote: string[] = [];
      while (index < lines.length && lines[index].trim().startsWith(">")) {
        quote.push(lines[index++].trim().replace(/^>\s?/, ""));
      }
      blocks.push(
        <blockquote key={`block-${blocks.length}`} className="my-8 border-l-2 border-[#bd8f82] pl-5 font-hero text-lg leading-relaxed text-ink/80 sm:pl-7 sm:text-xl">
          {renderInline(quote.join(" "), `quote-${blocks.length}`)}
        </blockquote>,
      );
      continue;
    }

    const listItem = line.match(/^\s*([-*+] |\d+\. )(.+)$/);
    if (listItem) {
      const ordered = /^\d+\./.test(listItem[1]);
      const items: string[] = [];
      while (index < lines.length) {
        const item = lines[index].match(/^\s*([-*+] |\d+\. )(.+)$/);
        if (!item || /^\d+\./.test(item[1]) !== ordered) break;
        items.push(item[2]);
        index++;
      }
      const listClass = "my-5 space-y-2.5 pl-6 leading-8 text-ink/80 marker:text-[#a9786b]";
      const children = items.map((item, itemIndex) => <li key={`item-${itemIndex}`}>{renderInline(item, `list-${blocks.length}-${itemIndex}`)}</li>);
      blocks.push(ordered
        ? <ol key={`block-${blocks.length}`} className={listClass}>{children}</ol>
        : <ul key={`block-${blocks.length}`} className={listClass}>{children}</ul>);
      continue;
    }

    const paragraph: string[] = [line.trim()];
    index++;
    while (index < lines.length && lines[index].trim() && !startsBlock(lines[index].trim())) {
      paragraph.push(lines[index].trim());
      index++;
    }
    blocks.push(
      <p key={`block-${blocks.length}`} className="my-5 text-[16px] leading-[1.95] text-ink/80 sm:text-[17px]">
        {renderInline(paragraph.join(" "), `paragraph-${blocks.length}`)}
      </p>,
    );
  }

  return <div className="markdown-content">{blocks}</div>;
}
