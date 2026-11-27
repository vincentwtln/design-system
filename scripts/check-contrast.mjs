#!/usr/bin/env node
// Checks the WCAG 2.2 AA promises of DESIGN.md §9 against globals.css, in light and dark.
// Usage: npm run check   (exit code 1 on any failure)
import { readFileSync } from 'node:fs'

const css = readFileSync(new URL('../globals.css', import.meta.url), 'utf8')

function block(selector) {
  const m = css.match(new RegExp(selector.replace('.', '\\.') + '\\s*\\{([^}]*)\\}'))
  if (!m) throw new Error(`Block ${selector} not found in globals.css`)
  return Object.fromEntries([...m[1].matchAll(/--([\w-]+):\s*(#[0-9a-fA-F]{3,6})\b/g)].map(([, k, v]) => [k, v]))
}
const light = block(':root')
const dark = { ...light, ...block('.dark') }

const hex = h => { h = h.slice(1); if (h.length === 3) h = [...h].map(c => c + c).join(''); return [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16) / 255) }
const lum = h => { const [r, g, b] = hex(h).map(c => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)); return 0.2126 * r + 0.7152 * g + 0.0722 * b }
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05) }

const surfaces = ['background', 'card', 'popover', 'muted', 'secondary', 'accent']
const text = ['foreground', 'muted-foreground', 'brand', 'link', 'success', 'warning', 'destructive']
const checks = [
  ...text.flatMap(t => surfaces.map(s => [t, s, 4.5])),
  ...['success', 'warning', 'destructive', 'brand'].map(r => [r, `${r}-subtle`, 4.5]),
  ['primary-foreground', 'primary', 4.5], ['primary-foreground', 'primary-hover', 4.5],
  ['brand-foreground', 'brand', 4.5],
  ['card-foreground', 'card', 4.5], ['popover-foreground', 'popover', 4.5],
  ['secondary-foreground', 'secondary', 4.5], ['accent-foreground', 'accent', 4.5],
  ['foreground', 'code-background', 4.5], ['muted-foreground', 'code-background', 4.5], ['brand', 'code-background', 4.5],
  ['input', 'background', 3], ['ring', 'background', 3], ['ring', 'card', 3],
]

let failed = 0
for (const [mode, t] of [['light', light], ['dark', dark]]) {
  for (const [fg, bg, min] of checks) {
    if (!t[fg] || !t[bg]) { console.log(`?  ${mode.padEnd(5)} ${fg} on ${bg}: token missing`); failed++; continue }
    const r = ratio(t[fg], t[bg])
    if (r < min) { failed++; console.log(`✗  ${mode.padEnd(5)} ${fg} (${t[fg]}) on ${bg} (${t[bg]}): ${r.toFixed(2)} < ${min}`) }
  }
}
console.log(failed ? `\n${failed} contrast check(s) failed.` : `All ${checks.length * 2} contrast checks pass (WCAG 2.2 AA).`)
process.exit(failed ? 1 : 0)
