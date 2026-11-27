# Acme Design System · DESIGN.md

> **For coding agents:** This file is the contract for every UI you build with this design system. Read it before writing markup. If something isn't covered here, choose the quieter, more minimal option and match existing components. Never invent new colors, sizes or radii.

- **Figma source of truth:** https://www.figma.com/design/bT57WjgcDOi6f3tm9RcY9Q (pages: *Cover & Guide*, *Foundations*, *Components*)
- **Tokens in code:** `globals.css` of this package, imported via `@import "@vincentwtln/design-system/globals.css"` (Tailwind v4 + shadcn/ui). Figma variable names = CSS variable names 1:1. Each Figma variable carries its CSS name as *code syntax*.
- **Stack:** Next.js (App Router) · Tailwind CSS v4 · shadcn/ui · lucide-react · `next/font`

---

## 1. Design principles

1. **Clean and airy.** Plenty of whitespace and few elements per section. When in doubt, remove rather than add.
2. **Monochrome first, blue as accent.** The UI is black, white and gray. Blue marks only what matters: links, focus, highlights and small details.
3. **Hairlines over shadows.** Surfaces are separated by 1px borders. Shadows are a hint (`shadow-xs`), not a style.
4. **Code is decoration.** Code blocks and terminals are the main visual elements of the page (dev-tool aesthetic). Avoid stock illustrations and 3D blobs.
5. **Precise typography.** Inter at weight 500 with negative tracking for headlines and 400 for body. Never use 600/700 for headlines.

---

## 2. Setup

```tsx
// app/layout.tsx
import { Inter, JetBrains_Mono } from "next/font/google";
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
```

- Dark mode: class strategy (`.dark` on `<html>`), e.g. with `next-themes` (`attribute="class"`, `defaultTheme="system"`).
- shadcn/ui: `components.json` → `"cssVariables": true`, `"baseColor": "neutral"`. Then restyle the generated components as described in section 7.
- Icons: `lucide-react`, always `className="size-4" strokeWidth={1.5}` (20px variant: `size-5`).

---

## 3. Color

### 3.1 Semantic tokens (only these may be used in components)

| Token / utility | Light | Dark | Use |
|---|---|---|---|
| `background` | #FFFFFF | #0A0A0A | Page background |
| `foreground` | #0A0A0A | #FAFAFA | Text, icons |
| `card` / `card-foreground` | #FFFFFF | #111111 | Cards |
| `popover` / `popover-foreground` | #FFFFFF | #171717 | Dropdowns, mobile menu |
| `primary` / `primary-foreground` | #0A0A0A / #FAFAFA | #FAFAFA / #0A0A0A | **Primary button** (never blue) |
| `primary-hover` | #262626 | #E5E5E5 | Primary hover |
| `secondary` | #F5F5F5 | #262626 | Neutral surfaces, neutral badge |
| `muted` / `muted-foreground` | #F5F5F5 / #6B6B6B | #171717 / #A3A3A3 | Subtle areas / supporting text |
| `accent` / `accent-foreground` | #F5F5F5 | #262626 | **Hover surface** (shadcn naming!) – not brand |
| `border` · `border-strong` · `input` | #E5E5E5 · #D4D4D4 · #8A8A8A | #262626 · #404040 · #666666 | Hairlines, hover borders, input outlines (≥ 3:1) |
| `ring` | #2563EB | #3B82F6 | Focus ring |
| `brand` / `brand-foreground` / `brand-subtle` | #2563EB / #FFF / #EFF6FF | #60A5FA / #0A0A0A / #172554 | Accents, highlights, badges |
| `link` | #2563EB | #60A5FA | Inline links |
| `success` · `warning` · `destructive` (+ `-subtle`) | green-700 · amber-700 · red-700 | green-400 · amber-400 · red-400 | Status only |
| `grid-line` | #F5F5F5 | #171717 | Background grid (`bg-grid`) |
| `code-background` | #FAFAFA | #111111 | Code blocks, terminal |

### 3.2 Color rules

- ✅ `bg-primary text-primary-foreground` for the **one** main CTA per viewport.
- ✅ Blue only for: `text-link`, `ring-ring`, `text-brand` (a highlighted word, an icon, a status), `bg-brand-subtle text-brand` (a badge), and strings in code.
- ❌ No blue on large surfaces (sections, hero backgrounds, cards).
- ❌ No `bg-blue-600`, `text-neutral-500`, hex values or `bg-[#…]`. Primitives are for `globals.css` only.
- ❌ No gradients on surfaces. The only decoration allowed is `bg-grid` (faded with a mask) and code blocks.
- ❌ `accent` is **not** the brand color. It is the gray hover surface from shadcn.
- Text on tinted backgrounds always uses the matching role color (`bg-success-subtle text-success`).

---

## 4. Typography

**Fonts:** Inter (`font-sans`, weights 400/500) · JetBrains Mono (`font-mono`, 400/500).

| Figma style | Tailwind | Size/line-height · tracking | Use |
|---|---|---|---|
| Display/XL | `text-display-xl` | 64/68 · −3% · 500 | Hero headline ≥ lg |
| Display/LG | `text-display-lg` | 56/60 · −3% · 500 | Hero headline md |
| Heading/H1 | `text-h1` | 48/52 · −2.5% · 500 | Section headline ≥ md |
| Heading/H2 | `text-h2` | 36/40 · −2% · 500 | Section headline mobile, hero mobile |
| Heading/H3 | `text-h3` | 24/32 · −1.5% · 500 | Subsections, pricing price |
| Heading/H4 | `text-h4` | 20/28 · −1% · 500 | Card titles |
| Body/LG | `text-lg` | 18/28 | Hero subline, lead text |
| Body/MD | `text-base` | 16/24 | Body text |
| Body/SM | `text-sm` | 14/20 | Card text, footer |
| Body/XS | `text-xs` | 12/16 | Legal, captions |
| Label/MD | `text-sm font-medium` | 14/20 · 500 | Buttons md/lg, nav |
| Label/SM | `text-label-sm font-medium` | 13/18 · 500 | Buttons sm, badges, tabs |
| Mono/MD | `font-mono text-code` | 14/22 | Code blocks, terminal |
| Mono/SM | `font-mono text-code-sm` | 13/20 | Inline code, file names |
| Mono/Eyebrow | `font-mono text-eyebrow uppercase` | 12/16 · +4% · 500 | Eyebrow above section headlines (in `text-brand` or `text-muted-foreground`) |

**Rules**
- Responsive hero: `text-h2 md:text-display-lg lg:text-display-xl`. Section headlines: `text-h2 md:text-h1`.
- Headlines `text-balance`, body copy `text-pretty`. Max line length: headlines `max-w-3xl`, body text `max-w-2xl`.
- Hierarchy comes from size and color (`foreground` vs. `muted-foreground`), never from bold (no `font-semibold`/`font-bold`).
- Inline code: `font-mono text-code-sm bg-muted rounded-sm px-1.5 py-0.5`.
- Sentence case for buttons, headlines and labels ("Get started", not "Get Started").

---

## 5. Spacing and layout

- 4px base = Tailwind scale (`p-4` = 16px). Only use scale values. No arbitrary values.
- **Container:** `mx-auto w-full max-w-site px-gutter` (1200px + 24px side padding).
- **Sections:** `py-section-mobile md:py-section` (64px / 96px). Don't stack additional spacing on top.
- **Inside a section:** eyebrow → headline `mt-3`, headline → subline `mt-4`, header → content `mt-12 md:mt-16`.
- **Grids:** Features `grid gap-4 md:grid-cols-2 lg:grid-cols-3`. Pricing `grid gap-6 lg:grid-cols-3`.
- **Card padding:** `p-6` (feature, testimonial), `p-8` (pricing).
- Sections may be separated by a `border-t border-border` hairline (full width or container width), never by colored bands.

## 6. Shape, depth, motion

| Element | Radius | Border | Shadow |
|---|---|---|---|
| Button, Icon Button, Badge | `rounded-full` | Secondary: `border` | – |
| Input | `rounded-sm` (8px) | `border-input` | `shadow-xs` |
| Tab, menu item, copy button | `rounded-md` / `rounded-sm` | – | – |
| Card, code block, terminal | `rounded-lg` (12px) | `border` | `shadow-xs` |
| Large panels (product screenshot) | `rounded-xl` (16px) | `border` | `shadow-sm` |
| Popover, dropdown, mobile sheet | `rounded-lg` | `border` | `shadow-md` |

- Dark mode: `--shadow` is transparent, so the borders carry the separation. Don't add dark-specific shadows.
- **Motion:** `transition-colors duration-150 ease-out` for hover (color, background, border). `duration-200 ease-out` for opacity and accordion height. No bounce, no scale on hover, no scroll reveals. `prefers-reduced-motion` is respected globally.
- **Focus:** always `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background`.

---

## 7. Components

Figma component names in **bold**. All variants and properties exist in the Figma file unless marked *(spec, Figma pending)*.

### Basics

**Button** – `components/ui/button.tsx` (shadcn, restyled)
- Variants: `default` (= Figma Primary), `outline` (= Secondary), `ghost`. Sizes: `sm` h-8 px-3 `text-label-sm`, `default` h-10 px-4 `text-sm`, `lg` h-12 px-6 `text-sm`. Always `rounded-full font-medium gap-1.5` (sm) / `gap-2`.
- Primary: `bg-primary text-primary-foreground hover:bg-primary-hover`.
- Secondary: `border border-border bg-background hover:bg-accent hover:border-border-strong`.
- Ghost: `hover:bg-accent`.
- Optional trailing icon `ArrowRight` (size-4, strokeWidth 1.5). On hover it may move `translate-x-0.5` (the only motion allowed).
- **Max one primary per viewport.** Pairing in the hero: Primary "Get started" + Secondary "Read the docs".
- Disabled: `disabled:opacity-50 disabled:pointer-events-none` (avoid it where possible).

**Icon Button** – `Button size="icon"`: `size-8` (sm) / `size-10`, `rounded-full`, variants outline/ghost. Always set `aria-label`.

**Link** – Default: `text-link hover:underline underline-offset-4`. Muted (nav, footer): `text-muted-foreground hover:text-foreground transition-colors`. External links with `ArrowUpRight`.

**Badge** – `inline-flex items-center rounded-full px-2 py-0.5 text-label-sm font-medium`. Variants: neutral `bg-secondary text-secondary-foreground`, brand `bg-brand-subtle text-brand`, success/warning/destructive analogous with `-subtle`, outline `border text-foreground`.

**Input** – `h-10 rounded-sm border border-input bg-background px-3 text-base md:text-sm shadow-xs placeholder:text-muted-foreground hover:border-foreground`. 16px below md, or iOS zooms in on focus. Focus: ring (see above). Error: `border-destructive` + helper text `text-sm text-destructive`. Optional leading icon (`Search`, muted-foreground, `pl-9`).

### Navigation

**Announcement Bar** – Full width, `h-10 border-b`, centered: brand badge "New" + message `text-sm` + link with `ArrowRight`. Max one at a time.

**Navbar** – `sticky top-0 z-50 h-16 border-b bg-background/80 backdrop-blur`. Container `max-w-site`. Left: logo (22px) + 4 muted links (`gap-6`, `gap-10` to the logo). Right: Ghost sm "Sign in" + Primary sm "Get started" (no icon). Mobile (< md): logo + Ghost icon button `Menu` → full-width sheet (`bg-popover shadow-md`) with the links stacked and full-width buttons.

**Footer** – `border-t pt-16 pb-8`. Top: logo + tagline (`text-sm text-muted-foreground`, max 2 lines) and 3 columns (heading `text-sm font-medium`, 4 muted links each, `gap-3`, columns `gap-16`). Bottom: `border-t pt-6`, copyright `text-xs text-muted-foreground` left, status badge (success) right. Mobile: columns as a 2-col grid.

**Logo** – Placeholder (22px mark + wordmark). Replace with the real SVG.

### Dev elements

**Code Block** – `rounded-lg border bg-code-background shadow-xs overflow-hidden`. Header `flex items-center justify-between border-b px-4 py-1.5`: file name `font-mono text-code-sm text-muted-foreground` + Copy Button. Body `p-4 font-mono text-code overflow-x-auto`. Syntax theme (shiki, custom): keywords `muted-foreground`, strings `brand`, comments `muted-foreground italic`, everything else `foreground`. No colorful themes.

**Terminal** – Same surface as the Code Block. Header: three neutral dots (`size-2.5 rounded-full bg-border-strong`, `gap-1.5`) + title centered `text-code-sm text-muted-foreground`. Prompt `$` and progress text `muted-foreground`, success `✓` in `success`, URLs in `link`. No macOS traffic-light colors.

**Copy Button** – `size-7 rounded-sm text-muted-foreground hover:bg-accent hover:text-foreground`. Icon `Copy`, after clicking `Check` in `text-success` for 2s. `aria-label="Copy code"`.

**Tabs / Tab** – Line tabs: list `flex gap-4 border-b`, trigger `pb-2 text-label-sm font-medium text-muted-foreground hover:text-foreground`, active `text-foreground` + 2px `foreground` underline (`after:` pseudo element or `border-b-2 -mb-px`). Typical use: npm / pnpm / yarn / bun above a code block.

### Marketing

**Feature Card** – `rounded-lg border bg-card p-6 shadow-xs`. Icon in a `size-9 rounded-md border bg-background` box (icon `size-4`, `text-foreground`; at most one highlighted card uses `text-brand`), title `text-h4 mt-4`, text `text-sm text-muted-foreground mt-2`. Hover: `hover:border-border-strong` only. Optional "Learn more" link at the bottom.

**Pricing Card** – `rounded-lg border bg-card p-8`. Plan name `text-sm font-medium`, price `text-h1` + "/month" `text-sm text-muted-foreground`, description, button (full width; **only the highlighted plan** gets Primary, the rest Secondary), feature list `text-sm` with `Check` icons (`text-muted-foreground`; `text-brand` in the highlighted plan). Highlighted plan: `border-foreground` (not blue!) + badge "Popular" (brand) + `shadow-sm`.

**Testimonial** – `rounded-lg border bg-card p-6`. Quote `text-base text-foreground` (no quotation-mark icons), below it an avatar `size-8 rounded-full` + name `text-sm font-medium` + role `text-sm text-muted-foreground`. Grid of 3 or a masonry layout.

**Logo Wall** – Eyebrow "Trusted by teams at" (`text-eyebrow font-mono text-muted-foreground`, centered), logos in grayscale `opacity-60 hover:opacity-100 transition-opacity`, height 24–28px, grid `grid-cols-3 md:grid-cols-6 gap-8`, optionally separated by `border-y`.

**FAQ Item / FAQ Accordion** – shadcn `Accordion type="single" collapsible`. Item `border-b`, trigger `py-5 text-base font-medium text-left hover:no-underline`, icon `Plus` → rotates 45° (`duration-200`), content `pb-5 text-sm text-muted-foreground max-w-2xl`. Section layout: headline left, list right on lg (`grid lg:grid-cols-[1fr_2fr]`).

### Feedback

**Toast** – [sonner](https://sonner.emilkowal.ski) via shadcn (`npx shadcn@latest add sonner`), `<Toaster />` once in the root layout. Figma: component set *Toast* (`Type` = Default / Success / Error / Warning; booleans *Description*, *Action*, *Close*).
- Surface `rounded-lg border bg-popover text-popover-foreground p-4 shadow-md`, sonner's default width (356px). Icon left, text column, close button top right.
- Icon (not on Default): `size-5 rounded-full bg-{role}-subtle text-{role}` with lucide `Check` (success) / `X` (error) at `size-3`, or a `!` (`text-xs font-semibold`) for warning. No `info` type, no `richColors`.
- Title `text-sm font-medium`, description `text-sm text-muted-foreground` (optional). Action: `outline` `sm` button **below** the description (`mt-2`), never beside the title. Close: `X` `size-3.5 text-muted-foreground`.
- Behaviour: `position="bottom-right"` (sonner goes full width at the bottom on small screens by itself), max. 3 visible, 4s duration, errors 8s.
- Copy: the title states the result ("Payment received", not "Success!"); amounts and details go into the description.
- Money: `CHF 10.–` for whole francs, otherwise `CHF 10.50`. Format with `Intl.NumberFormat('de-CH', { style: 'currency', currency: 'CHF' })` and replace a trailing `.00` with `.–`.
- Not for form validation (inline error on the field) and not for destructive confirmations (use a dialog).

```ts
toast.success('Zahlung erfasst', { description: 'CHF 10.– · Visa •••• 4242' })
toast.error('Zahlung fehlgeschlagen', {
  description: 'Die Karte wurde abgelehnt.',
  duration: 8000,
  action: { label: 'Erneut versuchen', onClick: retry },
})
```

Reference `components/ui/sonner.tsx` (replaces the shadcn default; verify visually in light and dark):

```tsx
'use client'
import { Check, X } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Toaster as Sonner, type ToasterProps } from 'sonner'

const dot = 'flex size-5 items-center justify-center rounded-full'
const icons = {
  success: <span className={`${dot} bg-success-subtle text-success`}><Check className="size-3" strokeWidth={2} /></span>,
  error: <span className={`${dot} bg-destructive-subtle text-destructive`}><X className="size-3" strokeWidth={2} /></span>,
  warning: <span className={`${dot} bg-warning-subtle text-warning text-xs font-semibold`}>!</span>,
  close: <X className="size-3.5" />,
}

export function Toaster(props: ToasterProps) {
  const { theme = 'system' } = useTheme()
  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      position="bottom-right"
      visibleToasts={3}
      duration={4000}
      closeButton
      icons={icons}
      toastOptions={{
        unstyled: true,
        classNames: {
          // grid: icon | text; the action sits in the text column below the description
          toast: 'relative grid w-full grid-cols-[auto_1fr] items-start rounded-lg border bg-popover p-4 pr-10 font-sans text-popover-foreground shadow-md',
          icon: 'row-span-2 mr-3',
          content: 'col-start-2 flex flex-col gap-0.5',
          title: 'text-sm font-medium',
          description: 'text-sm text-muted-foreground',
          actionButton: 'col-start-2 mt-2 inline-flex h-8 items-center justify-self-start rounded-full border bg-background px-3 text-label-sm font-medium hover:border-border-strong hover:bg-accent',
          closeButton: 'absolute right-3 top-3 flex size-5 items-center justify-center rounded-sm text-muted-foreground hover:bg-accent hover:text-foreground',
        },
      }}
      {...props}
    />
  )
}
```

---

## 8. Landing page patterns

Recommended order: Announcement Bar → Navbar → Hero → Logo Wall → Features (3–6 cards) → Code/product section (tabs + code block) → Testimonials → Pricing → FAQ → final CTA → Footer.

**Hero:** centered, `pt-24 md:pt-32 pb-section`. Order: badge or announcement pill (`rounded-full border px-3 py-1 text-sm` + link) → headline `text-display-*` → subline `text-lg text-muted-foreground max-w-2xl mt-6` → buttons `mt-10 flex gap-3` (Primary + Secondary) → terminal or product screenshot `mt-16` (`rounded-xl border shadow-sm`). Background: `bg-grid` with `[mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]`.

**Section header:** eyebrow (mono, brand) → `text-h2 md:text-h1` → `text-lg text-muted-foreground`. Left-aligned or centered, but consistent across the whole page.

**Final CTA:** headline + one Primary button + Secondary, on `bg-grid` or with a `border-t`. No colored band.

---

## 9. Accessibility

- Contrast (WCAG 2.2 AA, both modes): every text token is ≥ 4.5:1 on every surface it sits on (`background`, `card`, `muted`/`secondary`/`accent`, its `-subtle`); input outlines and the focus ring ≥ 3:1. Don't lighten text with `opacity`.
- Every interactive element has a visible focus ring (section 6). Icon-only buttons need `aria-label`.
- Minimum touch target on mobile: 40px (`h-10`); use `sm` buttons only on desktop/in the navbar.
- Use semantic HTML: `<header>`, `<nav>`, `<main>`, `<section aria-labelledby>`, `<footer>`. One `<h1>` per page (the hero).

---

## 10. Do / Don't (quick check before every PR)

| ✅ Do | ❌ Don't |
|---|---|
| `bg-primary` for the main CTA | Blue primary buttons, several primaries side by side |
| `text-muted-foreground` for supporting text | `text-gray-500`, `opacity-70` on text |
| `border` + `shadow-xs` on cards | Large, soft drop shadows, glow, glassmorphism |
| `rounded-full` buttons, `rounded-lg` cards | Mixed radii, `rounded-2xl` on cards |
| `font-medium` + negative tracking for headlines | `font-bold`, all-caps headlines |
| `py-section` between sections | Arbitrary `py-[120px]` |
| Lucide `strokeWidth={1.5}` | Other icon sets, filled icons, emoji |
| `bg-grid`, code blocks as visuals | Gradient blobs, stock 3D illustrations |
| Test light **and** dark | Light-only tokens or `dark:` overrides with hex values |

---

## 11. Notes on the Figma file

- **Plan limits (Figma Starter):** one mode per variable collection, so light values live in *Color / Light* (bound in components) and dark values in *Color / Dark* (same names, reference only). Max 3 pages, so component groups are sections on the *Components* page. After upgrading to Professional, *Color / Dark* can be merged into *Color / Light* as a real "Dark" mode.
- Collections: *Primitives* (hidden from pickers), *Color / Light*, *Color / Dark*, *Spacing* (incl. `layout/*`), *Radius*. Text styles: Display, Heading, Body, Label, Mono. Effect styles: Shadow/XS, SM, MD, Focus/Ring.
- If something differs between Figma and this file, **globals.css + DESIGN.md win in code**. Report the difference so Figma can be updated.

**Node IDs** (for `get_design_context` / `get_screenshot`, one node at a time):

| Component | Node |
|---|---|
| Foundations (page) | [4:2](https://www.figma.com/design/bT57WjgcDOi6f3tm9RcY9Q?node-id=4-2) |
| Button | [6:138](https://www.figma.com/design/bT57WjgcDOi6f3tm9RcY9Q?node-id=6-138) |
| Icon Button | [6:187](https://www.figma.com/design/bT57WjgcDOi6f3tm9RcY9Q?node-id=6-187) |
| Link | [7:100](https://www.figma.com/design/bT57WjgcDOi6f3tm9RcY9Q?node-id=7-100) |
| Badge | [7:113](https://www.figma.com/design/bT57WjgcDOi6f3tm9RcY9Q?node-id=7-113) |
| Input | [7:139](https://www.figma.com/design/bT57WjgcDOi6f3tm9RcY9Q?node-id=7-139) |
| Copy Button | [8:100](https://www.figma.com/design/bT57WjgcDOi6f3tm9RcY9Q?node-id=8-100) |
| Tabs / Tab | [8:108](https://www.figma.com/design/bT57WjgcDOi6f3tm9RcY9Q?node-id=8-108) |
| Code Block | [8:117](https://www.figma.com/design/bT57WjgcDOi6f3tm9RcY9Q?node-id=8-117) |
| Terminal | [8:126](https://www.figma.com/design/bT57WjgcDOi6f3tm9RcY9Q?node-id=8-126) |
| Logo | [9:101](https://www.figma.com/design/bT57WjgcDOi6f3tm9RcY9Q?node-id=9-101) |
| Announcement Bar | [9:104](https://www.figma.com/design/bT57WjgcDOi6f3tm9RcY9Q?node-id=9-104) |
| Navbar | [9:166](https://www.figma.com/design/bT57WjgcDOi6f3tm9RcY9Q?node-id=9-166) |
| Footer | [9:167](https://www.figma.com/design/bT57WjgcDOi6f3tm9RcY9Q?node-id=9-167) |
| Feature Card | [11:183](https://www.figma.com/design/bT57WjgcDOi6f3tm9RcY9Q?node-id=11-183) |
| Pricing Card | [11:250](https://www.figma.com/design/bT57WjgcDOi6f3tm9RcY9Q?node-id=11-250) |
| Testimonial | [11:253](https://www.figma.com/design/bT57WjgcDOi6f3tm9RcY9Q?node-id=11-253) |
| Logo Wall | [11:263](https://www.figma.com/design/bT57WjgcDOi6f3tm9RcY9Q?node-id=11-263) |
| FAQ Item | [11:301](https://www.figma.com/design/bT57WjgcDOi6f3tm9RcY9Q?node-id=11-301) |
| FAQ Accordion | [11:302](https://www.figma.com/design/bT57WjgcDOi6f3tm9RcY9Q?node-id=11-302) |
| Toast | [11:397](https://www.figma.com/design/bT57WjgcDOi6f3tm9RcY9Q?node-id=11-397) |

**Known drift (Figma lags behind code):** the WCAG fixes of v1.1.0 are not in the Figma variables yet. Code is correct; Figma still shows the v1.0 values for:

| Variable | Figma (v1.0) | Code (v1.1+) |
|---|---|---|
| Light `muted-foreground` | #737373 | #6B6B6B |
| Light `input` | #E5E5E5 | #8A8A8A |
| Light `destructive` · `success` · `warning` | red-600 · green-600 · amber-600 | red-700 · green-700 · amber-700 |
| Dark `input` | #262626 | #666666 |
| Dark `destructive` | #EF4444 | #F87171 |
| Dark `brand` / `brand-foreground` | #3B82F6 / #FFFFFF | #60A5FA / #0A0A0A |
