---
name: Kaira Design System
description: Complete design system for Kaira yoga app - colors, typography, spacing, components, layout patterns, motion, principles
type: reference
---

# Kaira Design System
v 1.0 / 2026 | Hanken Grotesk + JetBrains Mono | White, Ink, Blush, Taupe

Source: `Kaira Design System.html` (interactive reference, saved at `/root/floga-clone/kaira/design-system.html`)

---

## 01 Color

High-contrast core (pure white and near-black) softened by warm taupes and a single blush accent. No saturated colors. No gradients. Color does work through contrast and the occasional flooded chapter break.

### Surface
| Token       | Name   | Hex       | Role                              |
|-------------|--------|-----------|-----------------------------------|
| `--bg`      | White  | `#FFFFFF` | Page background                   |
| `--card`    | White  | `#FFFFFF` | Primary card                      |
| `--card-2`  | Faint  | `#FAFAF7` | Subtle hover/section bg           |
| `--bg-2`    | Taupe  | `#F5F2EC` | Flooded chapter break sections    |
| `--tag-bg`  | Tag    | `#F3F0EA` | Pill backgrounds                  |

### Ink
| Token       | Name   | Hex       | Role                              |
|-------------|--------|-----------|-----------------------------------|
| `--ink`     | Ink    | `#14130F` | Primary text, dark surfaces, buttons |
| `--ink-2`   | Ink 2  | `#2A2926` | Body copy                         |
| `--ink-3`   | Ink 3  | `#6B6A64` | Captions, secondary, mono         |
| `--rule`    | Rule   | `#E6E3DC` | Hairlines, borders                |
| `--rule-2`  | Rule 2 | `#EFECE5` | Soft separators                   |

### Accent
| Token       | Name    | Hex       | Role                              |
|-------------|---------|-----------|-----------------------------------|
| `--blush`   | Blush   | `#F4E9E3` | Accent moments only               |
| `--blush-2` | Blush 2 | `#E8D8CC` | Deeper accent                     |

### Pill
| Token       | Hex       | Role           |
|-------------|-----------|----------------|
| `--pill`    | `#14130F` | Button fill    |
| `--pill-ink`| `#FFFFFF` | Button text    |

Contrast ratio: ink on white = 21:1 (AAA).

---

## 02 Type

Single-family system. **Hanken Grotesk** across display and body. Clean geometric grotesque with tight tracking on display sizes for editorial feel. **JetBrains Mono** for captions, counters, and registration metadata.

### Scale

| Name        | Weight | Size (clamp)          | Line-height | Tracking  | Notes        |
|-------------|--------|-----------------------|-------------|-----------|--------------|
| Display XL  | 700    | clamp(40px, 6.4vw, 84px) | 1.05    | -2.5%     |              |
| Display LG  | 700    | clamp(32px, 4.4vw, 60px) | 1.08    | -2.2%     |              |
| Display MD  | 600    | clamp(24px, 2.8vw, 40px) | 1.15    | -1.8%     |              |
| Display CAP | 700    | clamp(28px, 3.4vw, 48px) | 1.05    | +1%       | UPPERCASE    |
| Display SM  | 600    | clamp(18px, 1.6vw, 22px) | 1.2     | -1%       |              |
| Body LG     | 400    | clamp(16px, 1.25vw, 19px)| 1.55    | default   | Section intros |
| Body        | 400    | 15px                  | 1.6         | default   | Workhorse    |
| Small       | 400    | 13px                  | 1.5         | default   | Captions     |
| Mono        | 400    | 11px                  | default     | +0.04em   | JetBrains Mono, UPPERCASE |
| Eyebrow     | 500    | 11px                  | default     | +0.22em   | UPPERCASE, ink-3 color |

### CSS Classes
```css
.display-xl  { font-weight: 700; font-size: clamp(40px, 6.4vw, 84px); line-height: 1.05; letter-spacing: -0.025em; }
.display-lg  { font-weight: 700; font-size: clamp(32px, 4.4vw, 60px); line-height: 1.08; letter-spacing: -0.022em; }
.display-md  { font-weight: 600; font-size: clamp(24px, 2.8vw, 40px); line-height: 1.15; letter-spacing: -0.018em; }
.display-cap { font-weight: 700; font-size: clamp(28px, 3.4vw, 48px); line-height: 1.05; letter-spacing: 0.01em; text-transform: uppercase; }
.display-sm  { font-weight: 600; font-size: clamp(18px, 1.6vw, 22px); line-height: 1.2; letter-spacing: -0.01em; }
.body-lg     { font-size: clamp(16px, 1.25vw, 19px); line-height: 1.55; color: var(--ink-2); }
.body        { font-size: 15px; line-height: 1.6; color: var(--ink-2); }
.small       { font-size: 13px; line-height: 1.5; color: var(--ink-3); }
.mono        { font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.04em; }
.eyebrow     { font-size: 11px; font-weight: 500; letter-spacing: 0.22em; text-transform: uppercase; color: var(--ink-3); }
```

---

## 03 Spacing and Radius

Clamped fluid scale. Every spacing token interpolates between a small-screen floor and a desktop ceiling.

### Spacing Scale
| Token | Size (px @ desktop) |
|-------|---------------------|
| XS    | 12                  |
| SM    | 20                  |
| MD    | 32                  |
| LG    | 48                  |
| XL    | 72                  |
| 2XL   | 96                  |

### Section Rhythm
| Element        | Value                        | Purpose                  |
|----------------|------------------------------|--------------------------|
| `.frame`       | clamp(48px, 6vw, 96px) 0     | Vertical air per section |
| `.page`        | max-width 1320px, padding clamp(16px, 3vw, 40px) | Page gutter, centered |
| `.card`        | clamp(24px, 3vw, 48px)       | Inside cards and blocks  |

### Radius
| Token | Value  | Usage                         |
|-------|--------|-------------------------------|
| XS    | 4px    | Hairline accents              |
| SM    | 6px    | Small frames                  |
| MD    | 8px    | Content containers            |
| LG    | 18px   | Content cards                 |
| PILL  | 999px  | Buttons, pills                |

---

## 04 Components

### Split Pill (primary CTA)
The signature button. Label and arrow are separate elements that share a hover:
- Label: `height: 52px; padding: 0 32px; border-radius: 999px; bg: var(--pill); color: var(--pill-ink)`
- Arrow: `width: 52px; height: 52px; border-radius: 999px; same bg/color`
- **Hover:** label nudges -3px, arrow slides +8px. `cubic-bezier(.65,0,.35,1) / 350ms`
- Small variant (`.btn-pill.sm`): label 42px height, arrow 42px
- Inverted variant (`.btn-pill.inverted`): white bg, ink text
- Light variant (`.btn-pill.light`): same as inverted

### Ghost Button
- `border: 1px solid var(--ink); border-radius: 999px; padding: 14px 22px`
- `font-size: 12px; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase`
- **Hover:** bg floods to ink, text to white. `200ms ease`

### Icon Button
- `width: 44px; height: 44px; border-radius: 999px; border: 1px solid var(--ink)`
- **Hover:** bg floods ink, color cream, translateY(-1px). `200ms ease`
- `.filled` variant: already filled with ink

### Pills
Three variants:
- **Default:** `bg: var(--tag-bg); font-size: 12px; font-weight: 500; padding: 8px 14px`
- **Dark:** `bg: var(--ink); color: var(--card-2)`
- **Outline:** `bg: transparent; border-color: var(--rule)`

### Registration Mark
- 14x14px cross at section corners
- `color: var(--ink-3); opacity: 0.55`
- Two pseudo-elements: vertical 1px line + horizontal 1px line
- The signature mark of the design system

### Cards
- Default: `bg: var(--card); border-radius: 18px; padding: clamp(24px, 3vw, 48px)`
- Blush variant: `bg: var(--blush)`
- Faint variant: `bg: var(--card-2)`

### Counter (carousel)
- Mono fraction between two icon buttons: `← 03/12 →`
- `font-family: JetBrains Mono; font-size: 13px; color: var(--ink-3)`

---

## 05 Layout Patterns

Three repeating patterns carry the page:

### Numbered Chapter Rows
Used for: Problem section, Features section.
- Grid: `90px (number) | 1fr (title + deck) | auto (icon)`
- Separated by `1px solid var(--rule)` hairlines
- Number: `font-size: clamp(28px, 3vw, 44px); font-weight: 600; letter-spacing: -0.03em`
- Title: `font-size: clamp(22px, 2.2vw, 28px); font-weight: 600`
- Deck: `color: var(--ink-2); font-size: 14px; max-width: 480px`

### Stacked One-Liners
Used for: Together section, Principles.
- Grid: `auto (mono number) | 1fr (text) | auto (arrow)`
- Number: `JetBrains Mono, 11px, ink-3`
- Text: `font-size: clamp(20px, 2.4vw, 32px); font-weight: 500; letter-spacing: -0.022em; color: var(--ink-2)`
- **Hover:** text slides +12px, darkens to ink. Arrow fades in. `350ms cubic-bezier(.65,0,.35,1)`

### 3-Up Carousel
Used for: Styles, Beyond.
- Grid: `0.9fr | 0.9fr | 2.6fr` (two small, one featured)
- Small cards: `aspect-ratio: 4/5; border-radius: 6px`
- Featured: image + metadata side-by-side with tags, title, description
- Featured image: `box-shadow: 0 18px 50px -28px rgba(20,18,16,0.35)`

### General Rule
Cards are the exception, not the default. Most content sits directly on the page, separated only by hairlines.

---

## 06 Motion

Two timing curves do all the work.

### Curves
| Name          | Timing                          | Duration      | Used for                        |
|---------------|---------------------------------|---------------|---------------------------------|
| UI Snap       | `cubic-bezier(.65,0,.35,1)`     | 350ms         | Buttons, hover shifts, arrows   |
| Content Ease  | `cubic-bezier(.22,1,.36,1)`     | 520-620ms     | Carousel fades, image scale, text slide |
| Hover Wash    | `ease`                          | 200-250ms     | Color washes (icon-btn, ticker) |

### Signature Behaviours
1. **Split-pill break:** Label and arrow drift apart 11px on hover, opening a gap that signals direction
2. **Row shift:** List rows translate +12px on hover. Arrow fades in. Text darkens from ink-2 to ink
3. **Carousel hand-off:** Featured image scales 0.985 to 1, text slides from -10px, 80ms staggered

---

## 07 Principles

1. Negative space is the loudest design choice
2. Hairlines, not card backgrounds
3. Every image earns a mono caption
4. Asymmetry over center alignment
5. One typeface, two weights, one register shift to mono
6. Color is contrast, not decoration

---

## Font Loading

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
```

## CSS Variables (complete)

```css
:root {
  --bg: #ffffff;
  --bg-2: #f5f2ec;
  --card: #ffffff;
  --card-2: #fafaf7;
  --blush: #f4e9e3;
  --blush-2: #e8d8cc;
  --ink: #14130f;
  --ink-2: #2a2926;
  --ink-3: #6b6a64;
  --rule: #e6e3dc;
  --rule-2: #efece5;
  --tag-bg: #f3f0ea;
  --pill: #14130f;
  --pill-ink: #ffffff;
}
```
