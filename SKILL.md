---
name: design-system-builder
description: >
  從零建立完整設計系統，整合 Supa Palette（色彩）、Typescale（字型）、Figma Variables 和 tokens.json。
  當使用者說「製作設計系統」、「建立 design system」、「我需要 design token」、「幫我定義色彩系統」、
  「建立字型規範」、「設計系統從零開始」、「token 整合」、「brand token」、「Figma Variables 設定」
  時觸發此 skill。即使使用者只說「我想統一設計語言」或「我的 UI 看起來不一致」也應觸發。
  輸出包含：tokens.json、Tailwind config、Figma Variables（色彩 + 字型兩層）、設計文件 .md。
---

# Design System Builder

從零建立完整設計系統的逐步工作流程。整合 Supa Palette、Typescale、Figma MCP，產出可直接用於生產環境的 token 體系。

---

## 工具角色

| 工具 | 用途 |
|------|------|
| Supa Palette | 色彩 scale 生成（supapalette.com） |
| Typescale | 字型階層生成（typescale.com） |
| Figma MCP | 建立 Variables + 視覺展示頁 |
| tokens.json | 設計端 source of truth |
| Tailwind config | 工程端直接套用 |

---

## Phase 1：品牌決策（人工，不外包 AI）

**先問使用者這三個問題，再往下走：**

```
Q1. 品牌個性關鍵字（請從下列選 3 個或自行補充）：
    大膽、甜膩、反叛、懷舊、電子感、夢幻、躁動、可愛、
    低解析度美學、千禧年塑膠感、簡約、企業感、溫暖

Q2. 已有品牌色嗎？
    A. 有，直接提供 hex 色碼
    B. 沒有，描述想要的色彩感覺（如：溫暖、冷冽、活力、沉穩、鮮豔、中性⋯⋯）
    → 根據描述，AI 推薦 1-2 個 Primary hex 起點供選擇

Q3. 使用情境（用戶怎麼用這個產品）：
    隨手快速操作？還是坐下來慢慢使用？
```

**這步決定所有 token 的走向，不能跳過。**

---

## Phase 2：色彩系統（Supa Palette）

### 步驟

1. 根據 Q2 方向，給使用者一個建議的 Primary hex 起點
2. 請使用者去 https://supapalette.com 輸入色碼生成 scale
3. 請使用者截圖給你（需要：完整色票 50-950）
4. 審查 scale，確認：
   - 主力可用色範圍（通常 400-700）
   - 哪些是 dim（少用）
5. 建議 Accent 色，重複步驟 2-4
6. 確認背景色方向（深色 / 淺色 / 中性）

### 色票審查標準

```
可用色範圍：有足夠 contrast 且保有品牌情感的色號
Dim 色：過淡或過暗，失去品牌特色，標記為備用
主力色：contrast AAA 優先，AA 可接受
```

### 背景色決策

問使用者：**產品主要在深色還是淺色環境下使用？有沒有偏好？**

根據回答給建議，常見選項：

| 選項 | 參考色碼 | 適合情境 |
|------|----------|----------|
| 深黑 | #0A0A0A | 主色鮮豔、對比強烈的品牌 |
| 深色（自訂） | — | 依品牌主色調整，保持整體一致 |
| 淺灰 | #F0F0F0 | 高可讀性、輕量感 |
| 純白 | #FFFFFF | 極簡、內容導向 |
| 品牌色衍生 | — | 從 primitive scale 中選淺色（50-100） |

---

## Phase 3：字型系統（Typescale）

### 步驟

1. 先問使用者字型風格方向：
   ```
   A. Display font 搶眼（標題衝擊力強 + 正文中性 sans-serif）
   B. 全程 sans-serif（靠 weight/size 做層次，現代簡潔）
   C. Serif 配 sans-serif（人文感、閱讀導向）
   D. Monospace / pixel 風格（技術感、特殊美學）
   ```

2. 推薦字型配對（根據風格方向 + 品牌個性，給 2-3 組選項讓使用者決定）：

   | 風格 | Display / 主字型 | Body / 輔字型 | 感覺 |
   |------|-----------------|--------------|------|
   | A（衝擊） | Bebas Neue、Anton、Black Han Sans | DM Sans、Inter、Outfit | 強烈視覺層次 |
   | B（現代） | — | Inter、Plus Jakarta Sans、Geist | 乾淨理性 |
   | C（人文） | Playfair Display、Lora、Fraunces | Source Sans 3、Libre Franklin | 溫暖有質感 |
   | D（技術） | JetBrains Mono、Share Tech Mono、VT323 | DM Mono、IBM Plex Mono | 工程感、特殊美學 |

   **推薦原則：根據品牌個性關鍵字選擇，不要為用 display 而用 display。**

3. 請使用者去 https://typescale.com 設定：
   - Base size: 16px
   - Scale ratio: Perfect Fourth（1.333）
   - 截圖給你

4. 根據截圖確認 scale 數值，產出 token 對應表：

   ```
   display/hero  → h1 尺寸（首頁大標）
   display/xl    → h2 尺寸（功能區標題）
   heading/lg    → h3 尺寸（頁面標題）
   heading/md    → h4 尺寸（區塊標題）
   heading/sm    → h5 尺寸（卡片標題）
   label/lg      → h6 尺寸（導覽、按鈕）
   body/md       → p  尺寸（正文基準，16px）
   body/sm       → small 尺寸（說明文字）
   caption       → 最小尺寸（meta、時間戳）
   ```

### 重要規則

- Display 字型（全大寫類）**不要用在正文**
- `caption` 以下不要用 display 字型
- 字型配對確認後，提醒使用者本地安裝字型（Figma 需要）

---

## Phase 4：Token 整合（AI 全自動）

拿到兩組 scale 後，產出以下三個檔案：

### 1. tokens.json 結構

```json
{
  "primitive": {
    "color": { ... },     // 原始色票，不直接用在元件
    "font": { ... }       // 原始字型數值
  },
  "semantic": {
    "color": { ... },     // 元件實際引用，alias 指向 primitive
    "typography": { ... } // 字型組合
  }
}
```

**Semantic color 必備 token：**

```
brand.primary / primary-hover / primary-active
accent.default / hover / active
background.base / surface / overlay
text.primary / secondary / on-brand / on-accent / disabled
border.default / strong / brand / accent
feedback.success / error / warning
```

### 2. Tailwind config 結構

```ts
theme: {
  extend: {
    colors: {
      // primitive scale（gy, ev 等縮寫）
      // semantic（brand, accent, bg, content, border, feedback）
    },
    fontFamily: {
      display: ['var(--font-display)', 'sans-serif'],
      body: ['var(--font-body)', 'sans-serif'],
    },
    fontSize: {
      // 每個 token 含 lineHeight + letterSpacing
    }
  }
}
```

### 3. Next.js layout.tsx 字型設定

```tsx
import { FontName, SecondFont } from 'next/font/google'

const displayFont = FontName({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
})

const bodyFont = SecondFont({
  subsets: ['latin'],
  variable: '--font-body',
})
```

---

## Phase 5：Figma Variables（AI 用 Figma MCP 執行）

### 建立順序

1. **Primitive Collection（🎨 Primitive）**
   - 色彩 scale 全部進去（依專案實際色票命名，如 brand-blue、coral、neutral 等）
   - 不建字型 variable（Figma 不支援字串型 variable 做字型）

2. **Semantic Collection（🖌 Semantic）**
   - 所有 semantic color token
   - 使用 `figma.variables.createVariableAlias()` 指向 Primitive
   - Feedback 色碼直接用 hex（非 alias）

3. **Typography Collection（📐 Typography）**
   - font-size、line-height、letter-spacing 用 FLOAT variable
   - 建立視覺展示頁（📐 Typography）

### 視覺展示頁規格

- 色票展示：primitive scale 三排 + semantic token 分群 + component preview
- 字型展示：display section + body section + font pairing preview（深色背景）
- 字型展示需要使用者**本地安裝**對應字型才能正確顯示

---

## Phase 6：設計文件（Markdown）

產出 `design-system-doc.md`，包含：

```markdown
# [專案名] — Design System

## 品牌定調（個性 / 情境 / 視覺方向）

## Color Tokens
- 每個 group 的 Usage / Don't
- Contrast ratio 標註
- 特殊 tradeoff 說明

## Typography Tokens
- 字型配對說明
- Scale 對照表
- 使用原則 / Don't

## Design Rationale
- 每個關鍵決策的原因（為什麼選這個色、這個字型）
- 這層只有人能寫，AI 不知道

## 版本紀錄
```

**重要：** Design Rationale 要請使用者補充，AI 寫不出來。

---

## 執行檢查清單

```
Phase 1  □ 品牌個性關鍵字確認
         □ 色彩方向確認
         □ 使用情境確認

Phase 2  □ Primary scale 截圖審查完成
         □ Accent scale 截圖審查完成
         □ 背景色決策完成

Phase 3  □ 字型風格方向確認
         □ 字型配對確認
         □ Typescale 截圖審查完成
         □ 使用者已在本地安裝字型

Phase 4  □ tokens.json 產出
         □ Tailwind config 產出
         □ layout.tsx 字型設定說明

Phase 5  □ Figma Primitive Variables 建立
         □ Figma Semantic Variables 建立
         □ 色彩視覺展示頁建立
         □ Typography Variables 建立
         □ Typography 視覺展示頁建立

Phase 6  □ design-system-doc.md 產出
         □ 提醒使用者補充 Design Rationale
```

---

## 常見問題處理

**字型在 Figma 顯示亂碼**
→ 字型未本地安裝。請使用者下載安裝後重啟 Figma Desktop App，再重新執行 Figma MCP。

**Contrast ratio 不過 AA**
→ 說明 tradeoff：品牌情感 vs 無障礙標準。提供兩個方案讓使用者決定，記錄決策原因到 Design Rationale。

**使用者跳過某個工具（如 DesignDoc）**
→ 評估是否真的需要。Solo 專案 Markdown 文件就夠了，不要為用工具而用工具。

**Semantic token 命名衝突**
→ 永遠用 semantic > primitive 原則。元件層不直接引用 primitive 色碼。
