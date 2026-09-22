#!/usr/bin/env node
// Guard against the Astro/JSX whitespace-collapse bug (apache/magpie-site#10):
// when a prose text run is immediately followed by an inline element on the
// *next line*, the newline + indentation between them collapses to nothing at
// render time, gluing the words together ("synced from" + <a> → "syncedfrom").
//
// The fix is an explicit {" "} (or &nbsp;) spacer at the boundary — see
// AGENTS.md § "Whitespace around inline elements in .astro / JSX".
//
// This linter flags the pattern in .astro / .tsx / .jsx files. It is a prek
// hook (repo: local) and also runnable directly:
//   node scripts/check-astro-spaces.mjs [files...]   # defaults to src/**
//
// Heuristic (favours precision — only flags cross-newline text→inline):
//   prev line is prose text (not a tag/expression, no connecting boundary)
//   AND the next non-blank line starts with an inline element
//   AND the prev line does not already end with a spacer ({" "} / &nbsp; / >).

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const INLINE = /^<(a|span|strong|em|code|b|i|img|abbr|mark)\b/;
// connecting boundaries that mean "no glued text here"
const ENDS_OK = /(\{" "\}|&nbsp;|>|\{|\(|=|"|`|\})$/;
const PROSE_END = /[A-Za-z0-9,;:.)?!&-]$/;

function listFiles(dir) {
  const out = [];
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === "node_modules" || e.name === "dist" || e.name.startsWith("."))
        continue;
      out.push(...listFiles(p));
    } else if ([".astro", ".tsx", ".jsx"].includes(extname(e.name))) {
      out.push(p);
    }
  }
  return out;
}

const args = process.argv.slice(2);
const files = args.length
  ? args.filter((f) => [".astro", ".tsx", ".jsx"].includes(extname(f)))
  : (statSync("src", { throwIfNoEntry: false }) ? listFiles("src") : []);

const findings = [];
for (const file of files) {
  let src;
  try {
    src = readFileSync(file, "utf8");
  } catch {
    continue;
  }
  const lines = src.split("\n");
  let inScript = false;
  let fence = 0; // astro frontmatter --- ... ---
  for (let i = 0; i < lines.length - 1; i++) {
    const raw = lines[i];
    const trimmedFull = raw.trim();
    // track astro frontmatter fences (only the leading pair)
    if (file.endsWith(".astro") && fence < 2 && trimmedFull === "---") {
      fence++;
      continue;
    }
    if (file.endsWith(".astro") && fence < 2) continue; // inside frontmatter
    if (/<script\b/.test(raw)) inScript = true;
    if (/<\/script>/.test(raw)) {
      inScript = false;
      continue;
    }
    if (inScript) continue;

    const prev = raw.replace(/\s+$/, "");
    if (!prev) continue;
    const ct = prev.trimStart();
    if (ct.startsWith("<") || ct.startsWith("{") || ct.startsWith("//")) continue;
    if (ENDS_OK.test(prev)) continue;
    if (!PROSE_END.test(prev)) continue;

    // next non-blank line
    let j = i + 1;
    while (j < lines.length && !lines[j].trim()) j++;
    if (j >= lines.length) continue;
    if (!INLINE.test(lines[j].trim())) continue;

    findings.push({
      file,
      line: i + 1,
      text: prev.slice(-50).trimStart(),
      next: lines[j].trim().slice(0, 45),
    });
  }
}

if (findings.length) {
  console.error(
    "✗ Astro/JSX whitespace-collapse risk — add a {\" \"} (or &nbsp;) spacer\n" +
      "  at these text→inline-element boundaries (see AGENTS.md):\n",
  );
  for (const f of findings) {
    console.error(`  ${f.file}:${f.line}`);
    console.error(`    …${f.text}  ⟶  ${f.next}…`);
  }
  console.error(
    `\n${findings.length} boundary(ies) flagged. Append {" "} to the text line, e.g.\n` +
      `    pages, synced from{" "}\n    <a ...>apache/magpie/docs</a>{" "}\n`,
  );
  process.exit(1);
}
console.log(`✓ no Astro/JSX whitespace-collapse risks in ${files.length} file(s)`);
