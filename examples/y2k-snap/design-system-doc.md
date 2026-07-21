# Y2K Snap — Design System

> Token source of truth: [`tokens.json`](./tokens.json) (v1.0.0) · AI spec: [`llms.txt`](./llms.txt) · Audit: [`audit-tokens.mjs`](./audit-tokens.mjs)

## Brand Foundation

- **Personality:** Bold · Nostalgic · Electronic (Y2K aesthetic)
- **Usage context:** Quick, impulsive mobile actions — a photo-editing app used on the go.
- **Visual direction:** High-energy green-yellow brand against a light neutral surface, with an electric-violet accent for secondary emphasis. Impact display type (Bebas Neue) over a neutral body sans (DM Sans).

---

## Color Tokens

Semantic tokens are the only layer components may reference. Primitive scales (`gy-*` green-yellow, `ev-*` electric-violet, `neutral-*`) exist only to define these.

### Brand — green-yellow

| Token | Value | Tailwind class | Usage |
|-------|-------|----------------|-------|
| `brand.primary` | `#B8FF3C` | `bg-brand` / `text-brand` | Primary actions, brand moments |
| `brand.primary-hover` | `#A3FC11` | `bg-brand-hover` | Hover state of primary only |
| `brand.primary-active` | `#87DA05` | `bg-brand-active` | Pressed state of primary only |

- **Usage:** Pair brand fills with `text-content-on-brand` (near-black). On-brand contrast is ~16.3:1 — excellent.
- **Don't:** Never place white text on brand green — it fails contrast. Never use brand green to signal *success* (that's `feedback.success`, a deliberately similar but semantically distinct color).

### Accent — electric-violet

| Token | Value | Tailwind class | Usage |
|-------|-------|----------------|-------|
| `accent.default` | `#9B5DFF` | `bg-accent` / `text-accent` | Secondary emphasis, highlights |
| `accent.hover` | `#8639FD` | `bg-accent-hover` | Hover state of accent only |
| `accent.active` | `#7215FA` | `bg-accent-active` | Pressed state of accent only |

- **Contrast note:** White on `accent.default` (`#9B5DFF`) is **≈3.9:1** — passes WCAG AA for large text and UI components, but **fails for body-size text**. For body-size text on violet, use `accent.hover` (`#8639FD`, white ≈5.2:1) or darker.
- **Don't:** Don't run paragraphs of small copy over `accent.default`.

### Background & Surface

| Token | Value | Tailwind class | Usage |
|-------|-------|----------------|-------|
| `background.base` | `#F0F0F0` | `bg-bg-base` | Page background |
| `background.surface` | `#FFFFFF` | `bg-bg-surface` | Cards, panels, sheets |
| `background.overlay` | `rgba(10,10,10,.6)` | (modal scrim) | Modal / sheet backdrop only |

### Text

| Token | Value | Tailwind class | Usage | Contrast |
|-------|-------|----------------|-------|----------|
| `text.primary` | `#0A0A0A` | `text-content-primary` | Body text (default) | ~16:1 on base |
| `text.secondary` | `#4A4A4A` | `text-content-secondary` | Captions, meta, helper | ~8.8:1 on surface |
| `text.on-brand` | `#0A0A0A` | `text-content-on-brand` | Text on brand green | ~16.3:1 |
| `text.on-accent` | `#FFFFFF` | `text-content-on-accent` | Text on accent violet | ~3.9:1 (large/UI only) |
| `text.disabled` | `#858585` | `text-content-disabled` | Disabled states only | ~3.2:1 (intentionally low) |

### Border

| Token | Value | Tailwind class | Usage |
|-------|-------|----------------|-------|
| `border.default` | `#C2C2C2` | `border-border` | Dividers, input borders |
| `border.strong` | `#858585` | `border-border-strong` | Emphasized boundaries |
| `border.brand` | `#B8FF3C` | `border-border-brand` | Brand outlines / focus rings |
| `border.accent` | `#9B5DFF` | `border-border-accent` | Accent outlines |

### Feedback (state meaning only — never decorative)

| Token | Value | Tailwind class | Usage |
|-------|-------|----------------|-------|
| `feedback.success` | `#A3FC11` | `text-feedback-success` / `bg-feedback-success` | Success only |
| `feedback.error` | `#FF3C6B` | `text-feedback-error` / `bg-feedback-error` | Errors, destructive actions only |
| `feedback.warning` | `#FFD600` | `text-feedback-warning` / `bg-feedback-warning` | Warnings only |

---

## Typography Tokens

- **Display / heading font:** Bebas Neue (all-caps impact) — `font-display`
- **Body font:** DM Sans — `font-body`
- **Scale:** 16px base, Perfect Fourth (1.333)

| Token | Size | Font | Tailwind class | Usage |
|-------|------|------|----------------|-------|
| `display-hero` | 89.76px | display | `text-display-hero` | h1, one per page max |
| `display-xl` | 67.34px | display | `text-display-xl` | h2, section heroes |
| `heading-lg` | 50.52px | display | `text-heading-lg` | h3, page titles |
| `heading-md` | 37.9px | display | `text-heading-md` | h4, block titles |
| `heading-sm` | 28.43px | display | `text-heading-sm` | h5, card titles |
| `label-lg` | 21.33px | body | `text-label-lg` | h6, nav, buttons |
| `body-md` | 16px | body | `text-body-md` | Body copy |
| `body-sm` | 12px | body | `text-body-sm` | Helper text |
| `caption` | 9px | body | `text-caption` | Meta, timestamps (min size) |

- **Usage:** `font-display` is for `display-*` and `heading-*` only. Everything from `label-lg` down uses `font-body`.
- **Don't:** Bebas Neue is all-caps and unreadable at length — never use a display/heading token for body copy or anything below `label-lg`.

---

## Design Rationale

> **⚠️ This section can only be written by the human.** AI does not know the decision context. When you fill in each decision, distil it into an imperative rule and append it to [`llms.txt`](./llms.txt) — a decision that never reaches `llms.txt` does not exist as far as AI is concerned.

- **Why green-yellow as the brand color?** _(TODO — your reasoning)_
- **Why an electric-violet accent, and why keep `accent.default` despite the ~3.9:1 white-on-violet contrast?** _(TODO — brand character vs. AA tradeoff)_
- **Why a light `#F0F0F0` background rather than deep-black Y2K?** _(TODO)_
- **Why Bebas Neue + DM Sans?** _(TODO — pairing rationale)_

---

## Changelog

- **v1.0.0** — Initial token system: green-yellow brand, electric-violet accent, neutral surface; Bebas Neue / DM Sans type scale (Perfect Fourth). Added `llms.txt` AI spec and `audit-tokens.mjs`.
