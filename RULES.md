# Rules for coding agents

These apply in every project that uses this package, on top of [DESIGN.md](DESIGN.md).
The project's own `CLAUDE.md` / `AGENTS.md` says how DESIGN.md maps onto its stack and records
its site-specific decisions.

- **Do not edit the tokens.** `globals.css` and `DESIGN.md` live in
  `node_modules/@vincentwtln/design-system/` and change only in the
  [design-system repo](https://github.com/vincentwtln/design-system). If a token seems missing,
  stop and ask instead of inventing one. Project-specific CSS goes into the project's own
  stylesheet, which imports `@vincentwtln/design-system/globals.css`.
- **Semantic utilities only:** `bg-background`, `text-muted-foreground`, `border-border`,
  `bg-brand-subtle` … No hex values, no `bg-neutral-*`/`bg-blue-*` primitives, no arbitrary
  values like `py-[120px]` (the hero's `[mask-image:…]` from DESIGN.md §8 is the exception).
- **Reuse before building.** Check the project's existing UI primitives before writing a new one;
  extend variants rather than creating near-duplicates.
- **Light and dark.** Every new UI must work in both modes. Verify both.
- **tailwind-merge:** if the project merges classes with `tailwind-merge` (e.g. shadcn's `cn()`),
  extend it with the custom token names, or `cn('text-h4', 'text-muted-foreground')` silently
  drops one class:

  ```ts
  extendTailwindMerge({
    extend: {
      theme: {
        text: ['display-xl', 'display-lg', 'h1', 'h2', 'h3', 'h4', 'label-sm', 'code', 'code-sm', 'eyebrow'],
        spacing: ['section', 'section-mobile', 'gutter'],
        container: ['site'],
      },
    },
  })
  ```
- **Figma is a reference, not the source of values.** Use the Figma MCP only for a specific node
  from the table in DESIGN.md §11, one node at a time. If Figma and `globals.css` disagree, the code
  wins (known drift is listed in §11).
- **Feedback:** toasts only via the shared `<Toaster />` (DESIGN.md §7 › Feedback); never build a
  second toast/notification system. Form errors stay inline on the field.
- **Before every PR:** run through the Do/Don't table in DESIGN.md §10.
