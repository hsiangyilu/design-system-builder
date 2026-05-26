# 🎨 Design System Builder Skill

A Claude skill that guides you through building a complete design system from scratch — step by step, tool by tool.

**繁體中文版說明見下方 ↓**

---

## What it does

When you say *"build a design system"* or *"set up design tokens"*, this skill activates and walks you through a structured 6-phase workflow:

| Phase | What happens | Who does it |
|-------|-------------|-------------|
| 1. Brand decisions | Lock in personality, color direction, usage context | You |
| 2. Color system | Generate full color scale via Supa Palette, review contrast | AI + You |
| 3. Typography | Set type scale via Typescale, pick font pairing | AI + You |
| 4. Token integration | Output `tokens.json` + Tailwind config automatically | AI |
| 5. Figma Variables | Push Primitive + Semantic layers into Figma via MCP | AI |
| 6. Documentation | Generate `design-system-doc.md` with Usage / Don't / Rationale | AI + You |

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
tokens.json                 ← design source of truth (primitive + semantic layers)
tailwind.config.ts          ← drop into your Next.js project
design-system-doc.md        ← Usage / Don't / Design Rationale
Figma Variables             ← 🎨 Primitive + 🖌 Semantic + 📐 Typography collections
Figma showcase pages        ← color swatches + typography scale + component preview
```

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
4. **Token 整合** — 自動產出 `tokens.json` + Tailwind config（AI 全自動）
5. **Figma Variables** — 透過 Figma MCP 建立 Primitive + Semantic 兩層（AI 全自動）
6. **文件化** — 產出含 Usage / Don't / Design Rationale 的設計文件（AI 起草，你補 Rationale）

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

- `tokens.json` — primitive + semantic 兩層 token
- `tailwind.config.ts` — 直接貼進 Next.js 專案
- `design-system-doc.md` — 完整設計文件含決策原因
- Figma Variables — 三個 collection 全部建好
- Figma 視覺展示頁 — 色票 + 字型 scale + 元件預覽

### 注意事項

- Phase 5 需要 Figma MCP 連線
- 字型需本地安裝才能在 Figma 正確顯示
- Design Rationale 只有你能寫，AI 不知道你的決策脈絡

---

## License

MIT — fork it, adapt it, make it yours.
