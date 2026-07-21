# 🎨 Design System Builder Skill

A Claude skill that guides you through building a complete, **AI-ready** design system from scratch — step by step, tool by tool.

Alongside the docs humans read, it produces a spec file AI agents read and an audit script that catches hard-coded values. So when you later generate UI with AI, it can only pick from the tokens you defined — and anything off-system gets flagged by a machine, not by eye.

**繁體中文版說明見下方 ↓**

---

## What it does

When you say *"build a design system"* or *"set up design tokens"*, this skill activates and walks you through a structured 7-phase workflow:

| Phase | What happens | Who does it |
|-------|-------------|-------------|
| 1. Brand decisions | Lock in personality, color direction, usage context | You |
| 2. Color system | Generate full color scale via Supa Palette, review contrast | AI + You |
| 3. Typography | Set type scale via Typescale, pick font pairing | AI + You |
| 4. Token integration | Output `tokens.json` + Tailwind config + audit script automatically | AI |
| 5. Figma Variables | Push Primitive + Semantic layers into Figma via MCP | AI |
| 6. Documentation | Human doc (`design-system-doc.md`) + AI spec file (`llms.txt`) | AI + You |
| 7. Sync | Regenerate derived files on token changes; version mismatch = stale | AI + You |

---

## Tools used

- [Supa Palette](https://supapalette.com) — color scale generation
- [Typescale](https://typescale.com) — type scale generation
- Figma MCP — Variables + visual showcase pages
- Next.js / Tailwind CSS — frontend token integration

---

## Outputs

For every project, the skill produces:

```
tokens.json                 ← single source of truth (primitive + semantic layers, versioned)
tailwind.config.ts          ← drop into your Next.js project
design-system-doc.md        ← Usage / Don't / Design Rationale (for humans)
llms.txt                    ← closed-set token rules (for AI agents)
audit-tokens.mjs            ← zero-dependency scanner for hard-coded values
Figma Variables             ← 🎨 Primitive + 🖌 Semantic + 📐 Typography collections
Figma showcase pages        ← color swatches + typography scale + component preview
```

### Why llms.txt and an audit script

A design system only stays consistent if the thing generating UI can be constrained. `llms.txt` states the closed set in imperative form — only these tokens, no arbitrary hex, no arbitrary px. The audit script verifies it afterwards. Together they close the loop: **AI generates → audit catches → AI fixes.**

Design decisions get written twice: the *why* goes in `design-system-doc.md` for your team, and the *what to do* gets distilled into `llms.txt` for the agent. A decision that never reaches `llms.txt` does not exist as far as AI is concerned.

Templates for both live in [`templates/`](./templates).

---

## Install

Download [`design-system-builder.skill`](./design-system-builder.skill) and place it in:

```bash
# Global (available in all projects)
~/.claude/skills/

# Per-project
.agents/skills/
```

Then in Claude Code or Claude chat, just say:

> "幫我建立設計系統" / "build a design system" / "I need design tokens"

---

## Example output

See [`examples/y2k-snap/`](./examples/y2k-snap/) for a real project walkthrough — a Y2K aesthetic photo editing app built with this skill.

Includes:
- `tokens.json` — full primitive + semantic color and typography tokens
- `tailwind.config.ts` — ready to use
- `screenshots/` — Figma Variables panel + visual showcase pages

---

## Trigger phrases

The skill activates on:

- 製作設計系統 / 建立 design system
- 我需要 design token / brand token
- 幫我定義色彩系統 / 建立字型規範
- 設計系統從零開始 / token 整合
- build a design system / set up design tokens
- my UI looks inconsistent / I need a color system

---

## Requires

- Claude with Figma MCP connected (for Phases 5)
- Figma Desktop App with fonts installed locally
- Next.js + Tailwind CSS project (for token integration)

---

---

## 繁體中文說明

### 這個 Skill 做什麼

說出「製作設計系統」或「我需要 design token」，skill 自動啟動，帶你走完六個 Phase：

1. **品牌決策** — 確認個性關鍵字、色彩方向、使用情境（你決定）
2. **色彩系統** — 用 Supa Palette 生成完整 scale，AI 審查 contrast（你 + AI）
3. **字型系統** — 用 Typescale 設定階層，AI 推薦字型配對（你 + AI）
4. **Token 整合** — 自動產出 `tokens.json` + Tailwind config + audit script（AI 全自動）
5. **Figma Variables** — 透過 Figma MCP 建立 Primitive + Semantic 兩層（AI 全自動）
6. **文件化** — 人類文件 `design-system-doc.md` + AI 用 spec file `llms.txt`（AI 起草，你補 Rationale）
7. **Sync 維護** — token 改版時同步衍生檔案，版本號不符即視為過期

### 安裝方式

下載 [`design-system-builder.skill`](./design-system-builder.skill)，放到：

```bash
# 全局安裝（所有專案都能用）
~/.claude/skills/

# 單一專案安裝
.agents/skills/
```

### 產出物

每個專案結束後你會拿到：

- `tokens.json` — primitive + semantic 兩層 token，含版本號，全系統唯一 source of truth
- `tailwind.config.ts` — 直接貼進 Next.js 專案
- `design-system-doc.md` — 完整設計文件含決策原因（給人看）
- `llms.txt` — 宣告封閉 token 集合的硬規則檔（給 AI 看）
- `audit-tokens.mjs` — 零依賴掃描腳本，抓出所有 hard-coded 色碼與尺寸
- Figma Variables — 三個 collection 全部建好
- Figma 視覺展示頁 — 色票 + 字型 scale + 元件預覽

### 注意事項

- Phase 5 需要 Figma MCP 連線
- 字型需本地安裝才能在 Figma 正確顯示
- Design Rationale 只有你能寫，AI 不知道你的決策脈絡
- 色票與字級數值請用**文字**貼給 AI，不要只給截圖——讓 AI 從圖片讀色碼容易出錯（`#4A90D9` 讀成 `#4A90D0` 你不會發現）
- 這個 skill 的邊界是「從零建立」。既有系統要補 AI-ready，先用 FigmaLint 稽核，再回來走 Phase 4–7

---

## License

MIT — fork it, adapt it, make it yours.
