---
name: design-system-builder
description: >
  Build a complete, AI-ready design system from scratch using Supa Palette (color), Typescale (typography),
  Figma Variables, and tokens.json. Trigger when the user says "build a design system",
  "set up design tokens", "I need a color system", "create a brand token", "typography scale",
  "design tokens from scratch", "token integration", "llms.txt", "make my design system AI-readable",
  "spec file", or "my UI looks inconsistent".
  Outputs: tokens.json, Tailwind config, Figma Variables (color + typography layers),
  design-system-doc.md (for humans), llms.txt (for AI agents), and a token audit script.
  Scope: this skill builds a NEW system from scratch. For auditing an existing Figma file,
  cataloguing naming drift, or back-filling docs for an existing system, use design:design-system.
---

# Design System Builder

A step-by-step workflow for building a complete design system from scratch. Integrates Supa Palette, Typescale, and Figma MCP to produce a production-ready token architecture.

**Core principles (AI-readiness):**

1. **Design decisions are infrastructure.** Every decision — a color choice, a tradeoff, a usage restriction — must find its way into the spec file that AI tools read. A decision that lives only in a chat log or a human-facing doc does not exist as far as AI is concerned.
2. **Closed set.** When AI generates UI, it picks from named tokens only. It never invents plausible-looking hex or px values.
3. **Text beats screenshots.** Pass values as text (hex codes, CSS output). Screenshots are for visual confirmation only. Making AI decode numbers from an image is both more expensive and less accurate.
4. **Verifiable.** Ship an audit script so hard-coded values are caught by a machine, not by eye.

---

## Tools

| Tool | Role |
|------|------|
| [Supa Palette](https://supapalette.com) | Color scale generation |
| [Typescale](https://typescale.com) | Type scale generation |
| Figma MCP | Create Variables + visual showcase pages |
| tokens.json | Single source of truth for the whole system |
| Tailwind config | Frontend token integration (derived from tokens.json) |
| llms.txt | Spec file consumed by AI agents (derived from tokens.json + decisions) |
| audit script | Scans output for hard-coded values |

---

## Phase 1: Brand Decisions (Human only — do not skip)

**Ask the user these three questions before proceeding:**

```
Q1. Brand personality — pick 3 keywords (or add your own):
    Bold, Playful, Rebellious, Nostalgic, Electronic, Dreamy, Energetic, Cute,
    Lo-fi aesthetic, Minimalist, Corporate, Warm, Luxurious, Trustworthy

Q2. Do you have a brand color?
    A. Yes — provide the hex code directly
    B. No — describe the feeling you want (e.g. warm, cool, vibrant, calm, vivid, neutral...)
    → AI recommends 1-2 Primary hex options based on the description

Q3. Usage context — how do users interact with this product?
    Quick impulsive actions (mobile, on-the-go)?
    Or focused sessions (desktop, task-oriented)?
```

**This phase determines the direction of all tokens. It cannot be skipped.**

---

## Phase 2: Color System (Supa Palette)

### Steps

1. Based on Q2, suggest a Primary hex starting point
2. Ask the user to go to https://supapalette.com, enter the hex, generate the scale
3. Ask the user to copy/export the full color scale (50–950) and paste the hex values **as text**.
   A screenshot may be attached for visual confirmation, but never read hex codes from an image
4. Review the scale:
   - Identify the usable range (typically 400–700)
   - Mark dim swatches (too light or too dark — reduced brand presence)
5. Suggest an Accent color, repeat steps 2–4
6. Confirm background color direction

### Scale Review Criteria

```
Usable range: sufficient contrast AND retains brand character
Dim swatches: too pale or too dark, mark as reserved/backup
Primary color: AAA contrast preferred, AA acceptable
```

### Background Color Decision

Ask the user: **Does this product work better on a dark or light background? Any preference?**

Common options based on answer:

| Option | Reference | Best for |
|--------|-----------|----------|
| Deep black | #0A0A0A | Vivid brand colors, high contrast |
| Custom dark | — | Adjust tint to match brand primary |
| Light gray | #F0F0F0 | Readability, lightweight feel |
| Pure white | #FFFFFF | Minimal, content-first |
| Brand-derived | — | Pick lightest shade (50–100) from primitive scale |

---

## Phase 3: Typography System (Typescale)

### Steps

1. Ask the user for their typography style direction:
   ```
   A. Display + Body — impactful headline font paired with neutral sans-serif
   B. All sans-serif — single typeface family, hierarchy via weight and size
   C. Serif + Sans-serif — humanist, editorial, reading-focused
   D. Monospace / Pixel — technical, retro, or niche aesthetic
   ```

2. Recommend font pairings based on direction + brand personality (offer 2–3 options):

   | Style | Display / Primary | Body / Secondary | Feel |
   |-------|-------------------|-----------------|------|
   | A (Impact) | Bebas Neue, Anton, Black Han Sans | DM Sans, Inter, Outfit | Strong visual hierarchy |
   | B (Modern) | — | Inter, Plus Jakarta Sans, Geist | Clean, rational |
   | C (Humanist) | Playfair Display, Lora, Fraunces | Source Sans 3, Libre Franklin | Warm, editorial |
   | D (Technical) | JetBrains Mono, Share Tech Mono, VT323 | DM Mono, IBM Plex Mono | Engineering feel |

   **Principle: choose based on brand personality. Don't use a display font just because it looks cool.**

3. Ask the user to go to https://typescale.com and configure:
   - Base size: 16px
   - Scale ratio: Perfect Fourth (1.333)
   - Use "Copy CSS" / export and paste the values **as text** (screenshot for visual confirmation only)

4. Map scale values to token names:

   ```
   display/hero  → h1 size  (hero, splash screen)
   display/xl    → h2 size  (feature section title)
   heading/lg    → h3 size  (page title)
   heading/md    → h4 size  (section title)
   heading/sm    → h5 size  (card title)
   label/lg      → h6 size  (nav, button text)
   body/md       → p size   (body baseline — 16px)
   body/sm       → small    (secondary description)
   caption       → smallest (timestamp, meta info)
   ```

### Rules

- All-caps display fonts (e.g. Bebas Neue) **must not be used for body text**
- Do not use display fonts below `caption` size
- After confirming the font pairing, remind the user to **install fonts locally** — Figma requires local installation to render correctly

---

## Phase 4: Token Integration (AI automated)

Once both scales are confirmed, output four files automatically. **tokens.json is the single source of truth** — the other three are derived from it.

### 1. tokens.json structure

```json
{
  "$version": "1.0.0",
  "primitive": {
    "color": { },     // raw color scale — never referenced directly in components
    "font": { }       // raw font values
  },
  "semantic": {
    "color": { },     // component-level tokens — alias to primitive
    "typography": { } // font composites
  }
}
```

Add `$version` (semver) at the top level. Bump it on any token change so derived files can be checked for staleness.

**Required semantic color tokens:**

```
brand.primary / primary-hover / primary-active
accent.default / hover / active
background.base / surface / overlay
text.primary / secondary / on-brand / on-accent / disabled
border.default / strong / brand / accent
feedback.success / error / warning
```

### 2. Tailwind config structure

Add a header comment: `// Generated from tokens.json v1.0.0 — do not edit values by hand`

```ts
theme: {
  extend: {
    colors: {
      // primitive scales (abbreviated keys)
      // semantic groups: brand, accent, bg, content, border, feedback
    },
    fontFamily: {
      display: ['var(--font-display)', 'sans-serif'],
      body:    ['var(--font-body)',    'sans-serif'],
    },
    fontSize: {
      // each token includes lineHeight + letterSpacing
    }
  }
}
```

### 3. Next.js layout.tsx font setup

```tsx
import { DisplayFont, BodyFont } from 'next/font/google'

const displayFont = DisplayFont({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
})

const bodyFont = BodyFont({
  subsets: ['latin'],
  variable: '--font-body',
})

export default function RootLayout({ children }) {
  return (
    <html className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body>{children}</body>
    </html>
  )
}
```

### 4. Audit script (templates/audit-tokens.mjs)

Copy from the template and adjust per project. It scans every `.tsx/.jsx/.css/.html` file under `src/` and flags:

- Tailwind arbitrary values (`bg-[#...]`, `text-[13px]`, `w-[...]`, etc.)
- Hex colors in CSS or inline styles that do not appear in tokens.json
- `font-size` px values outside the scale

Any hit exits with code 1. Wire it into CI, or have the coding agent run it after generating and fix what it reports.

**This is what closes the loop: AI generates → audit catches → AI fixes.** No human eyeballing required.

---

## Phase 5: Figma Variables (AI runs via Figma MCP)

### Creation order

1. **Primitive Collection (🎨 Primitive)**
   - All color scales go here (name by actual brand color, e.g. brand-blue, coral, neutral)
   - Do not create font-family variables — Figma does not support string-type variables for fonts

2. **Semantic Collection (🖌 Semantic)**
   - All semantic color tokens
   - Use `figma.variables.createVariableAlias()` to point to Primitive
   - Feedback colors: use hex directly (not aliased)

3. **Typography Collection (📐 Typography)**
   - font-size, line-height, letter-spacing as FLOAT variables
   - Build visual showcase page (📐 Typography)

### Visual showcase page spec

- **Color page**: primitive scale rows + semantic token groups + component preview
- **Typography page**: display section + body section + dark background font pairing preview
- Fonts must be installed locally for Figma to render them correctly

---

## Phase 6: Documentation — two files, two audiences

### 6a. Human doc: design-system-doc.md

The narrative document your teammates read:

```markdown
# [Project Name] — Design System

## Brand Foundation
personality / usage context / visual direction

## Color Tokens
- Usage / Don't for each group
- Contrast ratio annotations
- Tradeoff decisions and rationale

## Typography Tokens
- Font pairing rationale
- Full scale reference table
- Usage rules / Don'ts

## Design Rationale
- Why each key decision was made (color choice, font choice, background)
- This section can only be written by the human — AI does not know the decision context

## Changelog
```

**Important:** Prompt the user to fill in the Design Rationale section. AI cannot write this.

### 6b. AI spec file: llms.txt (templates/llms-template.txt)

The machine-facing rules file, placed at the project root. Any coding or design agent reads this before generating UI. How to write it:

- **Imperative and executable**, not explanatory. "MUST use `text.primary` for body text" — not "we chose this because…"
- Open by declaring the closed-set rule: only the listed tokens may be used; no arbitrary hex, no arbitrary px, no Tailwind arbitrary values
- List the full semantic token set (generated from tokens.json) as token → class → usage rule
- Separate Do's and Don'ts
- Header line: `Token version: x.y.z`, matching `$version` in tokens.json

### 6c. Rationale must be written twice

Once the user fills in the Design Rationale, it **cannot stay only in the human doc**. Distil each entry into an executable rule and write it back into llms.txt:

```
Human doc (why):
  "primary-300 only hits 3.8:1 contrast, but we keep it for brand character"
        ↓ distil
llms.txt (what to do):
  "NEVER use `primary-300` for text. Decorative use only.
   Body text MUST use `text.primary`."
```

Every decision follows this path, including ones made later during maintenance. **A decision that never reaches llms.txt does not exist as far as AI is concerned.**

---

## Phase 7: Sync rules (maintenance)

tokens.json is the single source of truth. When a token changes:

```
1. Edit tokens.json → bump $version
2. Regenerate: Tailwind config, llms.txt, Figma Variables (sync the version header in all three)
3. Run the audit script to confirm nothing broke from a removed token
4. Record the reasoning in design-system-doc.md changelog + distil it into llms.txt
```

**Staleness detection:** if a derived file's version header does not match `$version` in tokens.json, it is stale. When AI reads llms.txt and finds a version mismatch, it must stop and ask the user to regenerate rather than generate against an outdated spec.

---

## Execution Checklist

```
Phase 1  □ Brand personality keywords confirmed
         □ Color direction confirmed
         □ Usage context confirmed

Phase 2  □ Primary scale hex values received as text and reviewed
         □ Accent scale hex values received as text and reviewed
         □ Background color decided

Phase 3  □ Typography style direction confirmed
         □ Font pairing confirmed
         □ Typescale values received as text and reviewed
         □ User has installed fonts locally

Phase 4  □ tokens.json output (with $version)
         □ Tailwind config output (version header included)
         □ layout.tsx font setup documented
         □ audit script output and run once

Phase 5  □ Figma Primitive Variables created
         □ Figma Semantic Variables created
         □ Color visual showcase page built
         □ Typography Variables created
         □ Typography visual showcase page built

Phase 6  □ design-system-doc.md output
         □ llms.txt output (version header included)
         □ User reminded to fill in Design Rationale
         □ Rationale distilled back into llms.txt

Phase 7  □ Sync workflow and staleness rule explained to the user
```

---

## Troubleshooting

**Font renders as garbled text in Figma**
→ Font is not installed locally. Ask user to download and install it, restart Figma Desktop App, then re-run the Figma MCP script.

**Contrast ratio fails AA**
→ Explain the tradeoff: brand character vs. accessibility standard. Offer two options and let the user decide. Record the decision in Design Rationale, **and distil it into a prohibition rule in llms.txt**. Note: color alone must not be the only way information is conveyed (WCAG principle).

**User skips a tool (e.g. DesignDoc)**
→ Evaluate if it's actually needed. For solo projects, a Markdown file is sufficient. Don't use tools for the sake of using tools. But don't skip llms.txt or the audit script — if AI will generate UI in this project later, those two are the floor on output quality.

**Semantic token naming conflict**
→ Always follow semantic > primitive hierarchy. Components must never reference primitive color codes directly.

**AI-generated prototype contains arbitrary color values**
→ Run the audit script, paste the report back to the AI, and have it convert each hit to a semantic token. If the same class of error keeps recurring, the llms.txt rule is not explicit enough — fix the rule rather than hand-patching every time.

**Existing design system needs to be made AI-ready (not built from scratch)**
→ Out of scope for this skill. Use design:design-system for auditing and cataloguing. FigmaLint (free Figma plugin) is useful for finding detached instances, hard-coded values, and missing interactive states first; then come back and run Phases 4–7 to add the token, spec, and audit layers.
