# AmazeUI

The design library for AmazeCC.

## Manual UI testing

Run `pnpm test:manual` and open the local URL printed by Vite to launch the component workbench.
It includes interactive examples for the core components, a 30-case step-by-step QA checklist,
keyboard/theme/responsive checks, and per-browser pass/fail notes. Results are saved in local
storage and never sent to a server. Use **Reset run** to clear the current browser's saved results.

Run `pnpm test:manual:build` to verify that the manual workbench bundles, and
`pnpm typecheck:manual` to type-check the workbench and the component source it imports. The lab is
for development only; it is not included in the published `dist` package.

## Design foundation

Import `@amazecontinuityprojects/amazeui/tailwind.css` in the consuming app to load the
Calm Notebook design tokens and Tailwind utilities. The stylesheet includes matching light and dark
themes, plus compatibility aliases for existing AmazeUI semantic classes.

Prefer the shared tokens when building AmazeCC screens:

- Surfaces and text: `bg-background`, `bg-surface`, `bg-surface-2`, `text-ink`, `text-ink-2`,
  `text-muted`
- Borders and focus: `border-line`, `border-line-2`, `ring-accent`
- Accent and status: `bg-accent`, `text-accent`, `bg-ok-soft`, `bg-warn-soft`, `bg-danger-soft`
- Course colors: `bg-course-1` through `bg-course-8` and their `text-course-*` counterparts

Keep the visual hierarchy quiet: use color for the UI accent, course identity, or status; keep
touch targets at least 44 px; use 6 / 10 / 14 px radii; and reserve shadows for popovers, sheets,
and toasts. Geist and Geist Mono are used when supplied by the consuming app, with system fallbacks.
The accent picker offers Ink, Forest, Rust, Plum, and Graphite seeds with light- and dark-mode
values.
