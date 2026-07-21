#!/usr/bin/env node
/**
 * audit-tokens.mjs — scan source files for hard-coded values not in tokens.json
 *
 * Usage:   node scripts/audit-tokens.mjs [srcDir=src] [tokensFile=tokens.json]
 * Exit:    0 = clean, 1 = violations found
 *
 * Catches:
 *   1. Tailwind arbitrary values:  bg-[#fff], text-[13px], w-[240px], p-[3px] ...
 *   2. Hex colors (in CSS / inline styles / JSX) not present in tokens.json
 *   3. font-size px values not present in tokens.json
 *
 * No dependencies. Node 18+.
 */

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const SRC_DIR = process.argv[2] ?? "src";
const TOKENS_FILE = process.argv[3] ?? "tokens.json";
const EXTS = new Set([".tsx", ".jsx", ".ts", ".js", ".css", ".html", ".vue", ".svelte"]);
const IGNORE_DIRS = new Set(["node_modules", ".next", "dist", "build", ".git"]);

// ---- load allowed values from tokens.json -------------------------------
const tokens = JSON.parse(readFileSync(TOKENS_FILE, "utf8"));
const allowedHex = new Set();
const allowedPx = new Set();

(function walk(node) {
  if (node == null) return;
  if (typeof node === "string") {
    const hex = node.match(/#[0-9a-fA-F]{3,8}\b/g);
    if (hex) hex.forEach((h) => allowedHex.add(normalizeHex(h)));
    const px = node.match(/(\d+(?:\.\d+)?)px/g);
    if (px) px.forEach((p) => allowedPx.add(p));
    return;
  }
  if (typeof node === "object") Object.values(node).forEach(walk);
})(tokens);

function normalizeHex(h) {
  h = h.toLowerCase();
  if (h.length === 4) h = "#" + [...h.slice(1)].map((c) => c + c).join(""); // #abc → #aabbcc
  return h;
}

// ---- scan ----------------------------------------------------------------
const violations = [];

// Tailwind arbitrary values. Allowlist a few structural cases if needed.
const RE_ARBITRARY = /\b(?:bg|text|border|fill|stroke|shadow|w|h|p[trblxy]?|m[trblxy]?|gap|rounded|leading|tracking|top|left|right|bottom|inset|min-w|max-w|min-h|max-h|size)-\[[^\]]+\]/g;
const RE_HEX = /#[0-9a-fA-F]{3,8}\b/g;
const RE_FONT_SIZE_PX = /font-size\s*:\s*(\d+(?:\.\d+)?px)/g;

function scanFile(path) {
  const text = readFileSync(path, "utf8");
  const lines = text.split("\n");
  lines.forEach((line, i) => {
    if (line.includes("audit-ignore")) return; // escape hatch: // audit-ignore

    for (const m of line.matchAll(RE_ARBITRARY)) {
      violations.push({ path, line: i + 1, type: "tailwind-arbitrary", value: m[0] });
    }
    for (const m of line.matchAll(RE_HEX)) {
      if (!allowedHex.has(normalizeHex(m[0]))) {
        violations.push({ path, line: i + 1, type: "unknown-hex", value: m[0] });
      }
    }
    for (const m of line.matchAll(RE_FONT_SIZE_PX)) {
      if (!allowedPx.has(m[1])) {
        violations.push({ path, line: i + 1, type: "unknown-font-size", value: m[1] });
      }
    }
  });
}

(function walkDir(dir) {
  for (const name of readdirSync(dir)) {
    if (IGNORE_DIRS.has(name)) continue;
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walkDir(p);
    else if (EXTS.has(extname(p))) scanFile(p);
  }
})(SRC_DIR);

// ---- report ---------------------------------------------------------------
if (violations.length === 0) {
  console.log(`✅ token audit clean — ${SRC_DIR} contains no hard-coded values outside ${TOKENS_FILE}`);
  process.exit(0);
}

console.error(`❌ ${violations.length} hard-coded value(s) found:\n`);
for (const v of violations) {
  console.error(`  ${v.path}:${v.line}  [${v.type}]  ${v.value}`);
}
console.error(
  `\nFix: replace each value with a semantic token from ${TOKENS_FILE} (see llms.txt).` +
    `\nIf a value is intentionally exempt, append "// audit-ignore" to that line and document why.`
);
process.exit(1);
