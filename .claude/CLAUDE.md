# Kaira Yoga App

## Design System
Read `DESIGN.md` in the repo root before writing any UI code. It defines every color token, type scale level, spacing value, component spec, layout pattern, and motion curve. Follow it exactly.

Key rules:
- Light theme only. Page bg is #FFFFFF. No dark mode.
- Hanken Grotesk for all text. JetBrains Mono for mono/captions only.
- Use CSS variables from DESIGN.md (--ink, --ink-2, --ink-3, --bg, --bg-2, --card, --card-2, --blush, --rule, --tag-bg, --pill, --pill-ink).
- Split pill is the primary CTA (label + arrow, break apart on hover).
- Registration marks (14px crosses) at section corners.
- Negative space over decoration. Hairlines over card backgrounds.

## Stack
- Next.js 16 (App Router) + TypeScript
- Styling: inline styles or Tailwind, must use design system tokens
- State: React Context (no external state library)
- Data: hardcoded TypeScript fixtures in src/data/

## Architecture
- The landing page is served from public/landing/ via middleware rewrite on /
- App screens should use Next.js App Router routes
- Placeholder content everywhere (no real images, videos, or backend)

## Code Style
- No em dashes in any output
- TypeScript strict mode
- Prefer named exports
- Keep components in src/components/
- Keep data fixtures in src/data/
- Keep page routes in src/app/
