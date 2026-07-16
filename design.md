# Boundless Builders — Design System

This document is the single source of truth for how this app should look and feel.
It is extracted directly from the **boundless-platform** frontend (the main
`boundlessfi.xyz` app). Anyone building UI in this repo must follow it so the
Builders sub-app is visually indistinguishable from the main platform.

Values here are lifted from the Boundless Figma library ("Boundless UX/UI
Design"). Do not invent new colors, fonts, spacing, or component shapes. If you
need something that is not here, copy it from boundless-platform first.

> **House rule:** No em dashes in code, comments, or copy. Use periods, commas,
> or rewrite the sentence.

---

## 1. Tech stack and foundations

| Concern | Choice |
| --- | --- |
| Framework | Next.js (App Router, React Server Components) |
| Styling | Tailwind CSS **v4** with CSS-first `@theme` tokens (no `tailwind.config.js`) |
| Component library | **shadcn/ui**, style `new-york`, base color `neutral`, CSS variables on |
| Icons | **lucide-react** |
| Class merging | `cn()` from `@/lib/utils` (clsx + tailwind-merge) |
| Variants | `class-variance-authority` (cva) |
| Default theme | **dark** (the app boots in dark mode; light is a derived counterpart) |
| Toasts | `sonner`, positioned `top-right`, `richColors` |

Tailwind is configured entirely in `globals.css` via `@theme static { ... }`.
There is no JS Tailwind config. The `components.json` for shadcn should mirror
boundless-platform:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "iconLibrary": "lucide",
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}
```

---

## 2. Color system

The palette is the heart of the brand: a **cool charcoal neutral** with a
**bright teal primary** (`#2eedaa`) and deep green-black surfaces. Every scale
runs `50..900` (10 steps, no 75) and backs the Tailwind utilities
(`bg-primary-500`, `text-error-400`, `border-neutral-700`, and so on).

### 2.1 Neutral (cool charcoal)

| Token | Hex |
| --- | --- |
| `neutral-50` | `#f3f7f6` |
| `neutral-100` | `#dde7e5` |
| `neutral-200` | `#c2d0cd` |
| `neutral-300` | `#9fb3af` |
| `neutral-400` | `#7a8f8b` |
| `neutral-500` | `#5c6f6b` |
| `neutral-600` | `#42534f` |
| `neutral-700` | `#2c3a37` |
| `neutral-800` | `#1c2625` |
| `neutral-900` | `#121a1a` |

### 2.2 Primary (brand teal)

| Token | Hex |
| --- | --- |
| `primary-50` | `#eafdf7` |
| `primary-100` | `#bef9e5` |
| `primary-200` | `#9ff7d8` |
| `primary-300` | `#73f3c6` |
| `primary-400` | `#58f1bb` |
| `primary-500` | `#2eedaa` (brand) |
| `primary-600` | `#2ad89b` (hover) |
| `primary-700` | `#21a879` |
| `primary-800` | `#19825e` |
| `primary-900` | `#136447` |

### 2.3 Secondary (deep green-black surfaces)

| Token | Hex |
| --- | --- |
| `secondary-50` | `#e8e9e9` |
| `secondary-100` | `#b8bbba` |
| `secondary-200` | `#969a99` |
| `secondary-300` | `#666c6b` |
| `secondary-400` | `#484f4e` |
| `secondary-500` | `#1a2322` |
| `secondary-600` | `#18201f` |
| `secondary-700` | `#121918` |
| `secondary-800` | `#0e1313` |
| `secondary-900` | `#0b0f0e` |

### 2.4 Status scales

**Success (green)** — `50 #e9f9ef` · `100 #baedcd` · `200 #99e4b5` · `300 #6bd893` · `400 #4ed17e` · `500 #22c55e` · `600 #1fb356` · `700 #188c43` · `800 #136c34` · `900 #0e5327`

**Warning (amber)** — `50 #fef7e6` · `100 #fce7b0` · `200 #fadc8a` · `300 #f8cc55` · `400 #f7c234` · `500 #f5b301` · `600 #dfa301` · `700 #ae7f01` · `800 #876201` · `900 #674b00`

**Error (red)** — `50 #ffeded` · `100 #ffc8c8` · `200 #ffadad` · `300 #ff8888` · `400 #ff7171` · `500 #ff4d4d` · `600 #e84646` · `700 #b53737` · `800 #8c2a2a` · `900 #6b2020`

**Info (blue)** — `50 #ebf6ff` · `100 #c2e4ff` · `200 #a5d7ff` · `300 #7cc4ff` · `400 #62b9ff` · `500 #3ba7ff` · `600 #3698e8` · `700 #2a77b5` · `800 #205c8c` · `900 #19466b`

### 2.5 Brand aliases and accents

| Token | Hex / value | Use |
| --- | --- | --- |
| `brand` | `#2eedaa` | Marketing surfaces (`bg-brand`, `text-brand`) |
| `brand-hover` | `#2ad89b` | Hover state for brand |
| `brand-soft` | `#eafdf7` | Soft brand background |
| `lime` | `#a7f950` | Bright lime accent (glows, winner rings) |
| `border-subtle` | `#1f2a28` | Quieter than the default border |
| `ink` | `#0d1111` | Deepest surface / text on primary |
| `ink-soft` | `#141c1c` | Slightly raised ink surface |
| `active-bg` | `rgba(46,237,170,0.08)` | Active/selected tint |
| `active-bg2` | `rgba(46,237,170,0.32)` | Stronger active tint |
| `hero-bg` | `#0d1111` | Hero backgrounds |
| `text-muted` | `#999da2` | Muted text |
| `text-muted-brand` | `#e8e9e7` | Muted text on brand surfaces |
| `surface-subtle` | `rgba(250,250,250,0.02)` | Barely-there surface lift |

---

## 3. Semantic tokens (shadcn)

The **dark theme is canonical**. Light is a derived, usable counterpart. These
map to Tailwind utilities like `bg-background`, `text-foreground`,
`bg-card`, `border-border`, `ring-ring`.

### 3.1 Dark (canonical — the app defaults to this)

| Token | Hex | Figma meaning |
| --- | --- | --- |
| `--background` | `#0d1111` | Background/Base |
| `--foreground` | `#f1fff1` | Text/Primary |
| `--card` | `#141c1c` | Surface/Base |
| `--card-foreground` | `#f1fff1` | |
| `--popover` | `#1a2322` | Background/Raised |
| `--popover-foreground` | `#f1fff1` | |
| `--primary` | `#2eedaa` | Primary 500 |
| `--primary-foreground` | `#0d1111` | Text on primary button |
| `--secondary` | `#1a2322` | Secondary 500 |
| `--secondary-foreground` | `#f1fff1` | |
| `--muted` | `#141c1c` | |
| `--muted-foreground` | `#72736f` | Text/Secondary |
| `--accent` | `#182120` | Surface/Hover |
| `--accent-foreground` | `#f1fff1` | |
| `--destructive` | `#ff4d4d` | Error 500 |
| `--destructive-foreground` | `#0d1111` | |
| `--border` | `#2e3a38` | Border/Default |
| `--input` | `#2e3a38` | |
| `--ring` | `#2eedaa` | |

### 3.2 Light (derived)

| Token | Hex |
| --- | --- |
| `--background` | `#ffffff` |
| `--foreground` | `#121a1a` |
| `--card` | `#ffffff` |
| `--popover` | `#ffffff` |
| `--primary` | `#2eedaa` |
| `--primary-foreground` | `#0d1111` |
| `--secondary` | `#f3f7f6` |
| `--muted` | `#f3f7f6` |
| `--muted-foreground` | `#5c6f6b` |
| `--accent` | `#eafdf7` |
| `--accent-foreground` | `#136447` |
| `--destructive` | `#ff4d4d` |
| `--border` | `#dde7e5` |
| `--input` | `#dde7e5` |
| `--ring` | `#2eedaa` |

### 3.3 Charts and sidebar

Chart series (both themes): `chart-1 #2eedaa`, `chart-2 #3ba7ff`,
`chart-3 #f5b301`, `chart-4 #ff4d4d`, `chart-5 #22c55e`.

Sidebar tokens follow card surfaces: dark uses `sidebar #141c1c`,
`sidebar-accent #182120`, `sidebar-border #2e3a38`, with `sidebar-primary #2eedaa`.

---

## 4. Typography

### 4.1 Font families

| Role | Family | Variable | Notes |
| --- | --- | --- | --- |
| Body / sans (default) | **Plus Jakarta Sans** | `--font-jakarta` | Loaded via `next/font/google` |
| Headings (display) | **TASA Orbiter** | `--font-heading` | Brand display face. `.woff2` not in repo yet, so it falls back to Plus Jakarta Sans until the real face lands via `next/font/local`. All `h1..h6` use it automatically. |
| Mono | Geist Mono | `--font-mono` | Falls back to `ui-monospace` |
| Display (wordmarks) | **Bebas Neue** | `--font-bebas` | Condensed face for partner wordmarks, loaded via `next/font/google` weight 400 |

Wire fonts in `app/layout.tsx` exactly like boundless-platform:

```tsx
import { Bebas_Neue, Plus_Jakarta_Sans } from 'next/font/google';

const jakarta = Plus_Jakarta_Sans({ variable: '--font-jakarta', subsets: ['latin'] });
const bebasNeue = Bebas_Neue({ variable: '--font-bebas', weight: '400', subsets: ['latin'] });

// <html className={`${jakarta.variable} ${bebasNeue.variable} h-full antialiased`}>
```

In `globals.css` the base layer sets `h1..h6 { font-family: var(--font-heading); }`
and `button { cursor: pointer; }`.

### 4.2 Type scale

Apply headings with `font-heading`. Body and captions use the default sans.
Captions are uppercase with wide tracking.

| Utility | Size | Line height | Letter spacing | Weight |
| --- | --- | --- | --- | --- |
| `text-display-lg` | 56px | 1 | -0.04em | |
| `text-display-sm` | 48px | 1 | -0.04em | |
| `text-h1` | 40px | 1 | -0.04em | |
| `text-h2` | 32px | 1 | -0.04em | |
| `text-h3` | 28px | 1.2 | -0.02em | |
| `text-h4` | 24px | 1.2 | -0.02em | |
| `text-h5` | 20px | 1.2 | -0.02em | |
| `text-h6` | 18px | 1.2 | -0.02em | |
| `text-body-lg` | 18px | 1.45 | | |
| `text-body` | 16px | 1.45 | | |
| `text-body-sm` | 14px | 1.45 | | |
| `text-body-xs` | 12px | 1.45 | | |
| `text-caption-lg` | 14px | 1.2 | 0.12em | 600 |
| `text-caption-sm` | 12px | 1.2 | 0.12em | 600 |
| `text-caption-xs` | 10px | 1.2 | 0.16em | 600 |

---

## 5. Spacing, radius, and layout container

### 5.1 Radius

Base radius is `--radius: 0.5rem` (8px, the Figma "Rounded" button radius).
Derived utilities:

| Utility | Value |
| --- | --- |
| `rounded-sm` | `radius - 4px` |
| `rounded-md` | `radius - 2px` |
| `rounded-lg` | `radius` (8px) |
| `rounded-xl` | `radius + 4px` |
| `rounded-pill` / `rounded-full` | `999px` |

### 5.2 Page container

The whole app aligns to a single content width: `--container-page: 1440px`
(`max-w-page`). Put gutters on the outer element and cap content with an inner
`mx-auto max-w-page`, so the gutter only bites below the cap and wide screens
land on exactly this width. Nav, page body, and footer all share this cap.

### 5.3 Scrollbar utilities

Two reusable utilities exist in `globals.css`:

- `scrollbar-hide` — hides the scrollbar entirely.
- `custom-scrollbar` — thin 6px scrollbar, thumb `#4a4a4a`, transparent track.

---

## 6. Component patterns

Build all interactive UI from the shadcn primitives in `components/ui`,
customized to the design system via cva variants and `className`. Do not
hand-roll a raw `<button>`, `<input>`, or `<select>` when a primitive exists.

### 6.1 Button (the Boundless button system)

The button composes from independent axes. Defaults: `intent=primary`,
`appearance=solid`, `size=large`, `shape=rounded`.

- **intent**: `primary` | `secondary` | `white` | `destructive`
- **appearance**: `solid` | `outline` | `text`
- **size**: `small` (h-10, px-4, text-sm) | `large` (h-12, px-6, text-base)
- **shape**: `rounded` (rounded-lg) | `pill` (rounded-full)
- **iconOnly**: square icon button (width tracks height)
- **loading**: shows a `Loader2` spinner and blocks interaction

Anything that reads as an action button uses `Button`. Bespoke menu/combobox/
disclosure triggers and compact nav icon affordances that do not fit this system
may stay as semantic `<button>`s with their own layout.

Key state colors to preserve:
- Primary solid: `bg-primary-500 text-ink`, hover `bg-primary-400`, active `bg-primary-600`, focus ring `primary-200`, disabled `bg-[#1a2422] text-[#4a5a57]`.
- Destructive solid: `bg-error-500 text-white`, hover `bg-error-400`, active `bg-error-600`.
- Outline/text intents use tinted borders and `/8` background washes on hover.

```tsx
<Button>Primary large</Button>
<Button intent="secondary" appearance="outline" size="small">Secondary</Button>
<Button intent="destructive">Delete</Button>
<Button appearance="text" shape="pill">Text pill</Button>
<Button iconOnly aria-label="Add"><Plus /></Button>
<Button loading>Saving</Button>
```

### 6.2 Input

Bordered frame with optional leading icon, control, and trailing add-on/status
icon, a label above, and helper text below. Compose from `inputSize`
(`small` h-9 | `large` h-11, sm:h-14), `shape` (`rounded` | `pill`), and `state`
(`default` | `success` | `error`).

- Default state: `border-neutral-600`, focus `border-primary-500` with a
  `0 0 0 4px rgba(46,237,170,0.12)` ring glow and `bg-ink-soft`.
- Success: green border, `CircleCheck` status icon.
- Error: red border, `CircleX` status icon, helper text in error color.
- Caret is `caret-primary-500`; placeholder is `text-neutral-400/70`.

### 6.3 Card

`bg-card text-card-foreground`, `rounded-xl`, `border`, `shadow-sm`, vertical
`gap-6`, `py-6`, with `px-6` on header/content/footer. Subcomponents: `Card`,
`CardHeader`, `CardTitle`, `CardDescription`, `CardAction`, `CardContent`,
`CardFooter`.

### 6.4 Available primitives to port

From boundless-platform `components/ui/`: `avatar`, `avatar-group`, `button`,
`card`, `checkbox`, `command`, `country-select`, `dialog`, `dropdown-menu`,
`entity-row`, `form`, `glow-banner`, `hover-card`, `image-cropper`, `input`,
`label`, `option-card`, `pagination`, `popover`, `select`, `skeleton`,
`snapshot-card`, `sonner`, `sparks-icon`, `stats-bar`, `success-dialog`, `tabs`,
`textarea`, `token-amount`.

Layout components in `components/layout/`: `app-nav`, `boundless-logo`,
`brand-icons`, `footer-glow`, `mobile-nav-menu`, `pill-button`, `profile-menu`,
`site-footer`, `site-header`.

When you need one of these, copy it over rather than rebuilding it.

---

## 7. Motion

A few named animations live in the theme (marketing surfaces mostly). Reuse
these rather than inventing timings:

- `animate-prize-scroll` — 18s linear vertical loop (prize ticker).
- `animate-card-rotate` — 10s stepped rotation through four rows.
- `animate-marquee-left` / `animate-marquee-right` — 48s horizontal marquees.
- `animate-glow-in` — glow entrance with a spring `linear()` easing.

Respect `motion-reduce:` variants (the input status icon animation already does).

---

## 8. Architecture and conventions

The main app is **feature-first**. Even though this Builders app is display-only,
mirror the structure so code stays consistent and portable.

```
app/                # routes only: thin components that compose features
  layout.tsx        # root layout, wires <Providers>, fonts
  globals.css       # Tailwind v4 @theme tokens (copy from boundless-platform)
features/           # one folder per domain (builders, projects, teams, ...)
  <name>/
    api/            # TanStack Query hooks on the typed API client
    components/     # feature-scoped UI
    hooks/
    types.ts        # derived from generated schema where possible
    index.ts        # the ONLY public surface
components/
  ui/               # shadcn primitives (themeable)
  layout/           # nav, shells, footer
lib/
  api/              # typed REST client (generated types, do not hand-write)
  utils.ts          # cn()
providers/          # small client provider tree (theme, query, ...)
```

Rules to keep parity with boundless-platform:

- **Import features by their `index.ts`**, never reach into internals.
- **One typed API client** under `@/lib/api`. When the backend
  (`boundless-nestjs`) exposes builders/projects endpoints, generate types with
  `npm run codegen` and derive from the generated schema. Never hand-write API
  types.
- **Validated env**: import `env` from `@/lib/env`, never read `process.env`
  directly.
- **Server state** via TanStack Query. Keep UI state local or in feature hooks.
- Since this app only **displays** builders, projects, and teams, expect mostly
  read (`GET`) hooks and no create/upload flows. Creation lives in the main app.

---

## 9. Code style (Prettier + house rules)

Match boundless-platform's `.prettierrc.json`:

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "bracketSameLine": false,
  "arrowParens": "avoid",
  "endOfLine": "lf",
  "quoteProps": "as-needed",
  "jsxSingleQuote": true,
  "proseWrap": "preserve",
  "plugins": ["prettier-plugin-tailwindcss"],
  "tailwindStylesheet": "./app/globals.css",
  "tailwindFunctions": ["clsx", "cn", "cva"]
}
```

- Single quotes, JSX single quotes, semicolons, 2-space indent, 80 col width.
- `prettier-plugin-tailwindcss` sorts class names. It is aware of `clsx`, `cn`,
  and `cva`.
- **No em dashes** anywhere: code, comments, or copy.
- Before finishing a change, run `typecheck`, `lint`, and `test` (and `build`
  when touching config or Tailwind).

---

## 10. Getting started checklist for this repo

To bring the design system into this app:

1. Copy `globals.css` from `boundless-platform/src/app/` into this app's
   `app/globals.css` (it contains the full `@theme`, tokens, keyframes, and
   utilities). Adjust the import path if your CSS lives elsewhere.
2. Add `components.json` (section 1) and install shadcn primitives, or copy the
   `components/ui` folder directly from boundless-platform.
3. Install fonts in `app/layout.tsx` (Plus Jakarta Sans + Bebas Neue) and set
   `defaultTheme='dark'` in the theme provider.
4. Add `cn()` to `lib/utils.ts` (clsx + tailwind-merge).
5. Copy `.prettierrc.json` and the ESLint setup for consistent formatting.
6. Build every screen from the primitives and tokens above. When something is
   missing, port it from boundless-platform rather than inventing it.

**Golden rule:** if in doubt, open boundless-platform and copy what it does.
This app must look like a native part of Boundless, not a cousin.
