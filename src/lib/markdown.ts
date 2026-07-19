import { readFileSync } from "fs";
import path from "path";

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatInline(text: string) {
  let out = escapeHtml(text);
  out = out.replace(
    /\[([^\]]+)\]\((https?:\/\/[^)]+|mailto:[^)]+)\)/g,
    '<a href="$2" class="text-[#0095ff] underline underline-offset-2 hover:opacity-80">$1</a>'
  );
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  return out;
}

/** Minimal markdown renderer for legal docs (headings, lists, paragraphs, links, bold). */
export function markdownToHtml(md: string) {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const html: string[] = [];
  let inList = false;

  const closeList = () => {
    if (inList) {
      html.push("</ul>");
      inList = false;
    }
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    const trimmed = line.trim();

    if (!trimmed) {
      closeList();
      continue;
    }

    if (trimmed.startsWith("- ")) {
      if (!inList) {
        html.push('<ul class="my-4 list-disc space-y-2 pl-6">');
        inList = true;
      }
      html.push(`<li class="leading-7 text-[#262626]">${formatInline(trimmed.slice(2))}</li>`);
      continue;
    }

    closeList();

    if (trimmed.startsWith("# ")) {
      html.push(
        `<h1 class="mb-4 text-[32px] font-semibold leading-10 tracking-tight text-[#262626] sm:text-[40px] sm:leading-[44px]">${formatInline(trimmed.slice(2))}</h1>`
      );
      continue;
    }
    if (trimmed.startsWith("## ")) {
      html.push(
        `<h2 class="mb-3 mt-10 text-[22px] font-semibold leading-7 text-[#262626] sm:text-[24px]">${formatInline(trimmed.slice(3))}</h2>`
      );
      continue;
    }
    if (trimmed.startsWith("### ")) {
      html.push(
        `<h3 class="mb-2 mt-6 text-[18px] font-semibold leading-6 text-[#262626]">${formatInline(trimmed.slice(4))}</h3>`
      );
      continue;
    }

    html.push(
      `<p class="mb-4 text-base leading-7 text-[#262626]">${formatInline(trimmed)}</p>`
    );
  }

  closeList();
  return html.join("\n");
}

export function readLegalMarkdown(filename: "privacy-policy.md" | "terms-of-service.md") {
  const filePath = path.join(process.cwd(), "content", "legal", filename);
  return readFileSync(filePath, "utf8");
}
