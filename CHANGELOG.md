# Changelog

## v1.2.0 · 2026-11-27

- **Marketing components are now in Figma:** Feature Card, Pricing Card, Testimonial, Logo Wall, FAQ Item / FAQ Accordion (DESIGN.md §7 no longer marks them as pending).
- **New: Toast** (DESIGN.md §7 › Feedback): sonner, four types, copy rules, CHF format, reference `sonner.tsx`. In Figma as component set *Toast*.
- DESIGN.md §11: Figma node IDs for every component, and a table of known drift between Figma and code.
- `npm run check`: WCAG 2.2 AA contrast check of all token pairs in light and dark (118 checks).
- RULES.md: Figma is a reference only; one shared toaster.
- No token changes. Upgrading from v1.1.0 needs no code changes.

## v1.1.0

- WCAG AA fixes: input outline ≥ 3:1, every text token ≥ 4.5:1 on all surfaces, 16px inputs on mobile.

## v1.0.0

- Initial release: tokens (`globals.css`), DESIGN.md, RULES.md.
