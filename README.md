# Acme Design System

Shared design system for my web projects: Tailwind CSS v4 tokens plus the rules that humans and
coding agents follow.

| File | What |
|---|---|
| `globals.css` | Tokens (light + dark), Tailwind v4 theme, base styles |
| `DESIGN.md` | The spec: principles, colour, type, spacing, components, page patterns |
| `RULES.md` | Binding rules for coding agents in every consuming repo |
| `CHANGELOG.md` | What changed in each version |
| `scripts/check-contrast.mjs` | WCAG 2.2 AA check of all token pairs (`npm run check`), repo only |

## Use it in a project

Requires Tailwind CSS v4 and `tw-animate-css` (peer dependencies).

```sh
npm i github:vincentwtln/design-system#v1.2.0 tw-animate-css
```

Stylesheet:

```css
@import "@vincentwtln/design-system/globals.css";
```

`globals.css` reads the fonts from `--font-inter` and `--font-jetbrains-mono`; set them in the
project (e.g. `next/font` or Fontsource).

Agent instructions, in `CLAUDE.md`:

```md
@node_modules/@vincentwtln/design-system/DESIGN.md
@node_modules/@vincentwtln/design-system/RULES.md
```

Other harnesses (`AGENTS.md`, Cursor rules …): tell the agent to read those two files before any
UI work. Keep the project-specific mapping and decisions in the project's own file.

## Changing the design system

Edit here, run `npm run check` (contrast must pass), add an entry to `CHANGELOG.md`, bump `version`
in `package.json`, tag (`git tag v1.2.0 && git push --tags`), then update the `#tag` in each project. Projects never edit their copy in `node_modules`.

Figma: https://www.figma.com/design/bT57WjgcDOi6f3tm9RcY9Q (reference; when it disagrees with
`globals.css`, the code wins, see DESIGN.md §11).
