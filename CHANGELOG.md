# Changelog

## 2.0.0 — Calm Notebook

AmazeUI drops the v1 look (indigo accent, glass cards, gradients, oversized radii, hover zoom,
uppercase micro-labels) for the Calm Notebook design language. The full design, with every screen
in light and dark, is on the AmazeCC design canvas.

### Tokens (`tailwind.css`)

- New palette in oklch, light and dark: `bg`, `surface`, `surface-2`, `line`, `line-2`, `ink`,
  `ink-2`, `muted`, `accent`, `accent-soft`, `ok`/`warn`/`danger` and their `-soft` fills, and an
  eight-hue course palette `course-1` … `course-8`.
- Every v1 token name still resolves (`background`, `surface-secondary`, `text-heading`,
  `text-muted`, `primary`, `success-surface`, `info`, `chart-*`, `sidebar-*`, the `gray`/`slate`
  neutral chain), so existing classes keep working and pick up the new colours.
- **Indigo now follows the accent.** `indigo-50` … `indigo-950` are built from the selected accent
  palette with each step keeping its lightness. Hard-coded `text-indigo-600 dark:text-indigo-400`
  or `bg-indigo-50 dark:bg-indigo-950/40` in consumer apps re-colour without code changes, and the
  accent picker reaches them.
- Radius scale: `sm` 6 px (controls), `md` 10 px (cards), `lg`/`xl`/`2xl` 14 px (sheets). Large
  v1 radii collapse onto the scale.
- Fonts fall back to Geist and Geist Mono when the app does not provide `--font-geist-*`.

### Accent picker

- Five tested seeds: Ink (default), Forest, Rust, Plum, Graphite, each with light and dark values.
- Old palette ids are migrated (`neonPink` and `lavender` → Plum, `rose`/`amber`/`sunset` → Rust,
  `ocean` → Ink). The picker no longer tints the page background.

### New

- `attendanceBudget(attended, held, threshold?)` returns the percentage plus the action: "Can skip
  6", "No skips left" or "Attend next 1". `attendanceAfter()` gives "what if" percentages.
- `AttendanceBar` draws attendance with the 75% line marked and switches to `danger` below it.
- `courseHue()` / `courseColor()` give each course a stable hue from its code (theory and lab parts
  share one). `CourseDot` and `SlotBadge` render it.

### Changed components

- Button: 44 px minimum target, 14 px label, 6 px radius, accent focus ring, token colours.
  `success` uses the `ok` token.
- Card: solid surface with a 1 px line. `glass` renders as `default`; `gradient` renders as a flat
  accent card. `hover` changes the surface only (no lift or shadow).
- Modal, Dialog, CommandPalette, AppLibrary sheet, SyncNotification: solid surfaces, one soft
  shadow, no blur or glow layers, 44 px close targets.
- LoadingScreen and ErrorDiagnosticCard: no glow, ping or pulse; plain accent progress bar.
- Badge `purple`, IconBadge and Timeline colour keys map to tokens and course hues.
- FetchButton `gradient` renders as `primary`.
- Labels are sentence case at 11 px or larger; weights are 400/500/600.
- LoginForm and NavigationTabs: brand indigo, gradient text and dark hex surfaces moved to tokens.

### Migration notes for consumers

- `bg-muted` is now the muted **text** colour. Use `bg-surface-2` for a muted fill
  (AmazeCC: `OptionPicker` hover, 2 places).
- `bg-accent` is now the brand accent, not a hover grey. Use `bg-surface-2` for the old meaning
  (AmazeCC: FFCS course chips, 4 places).
- Apps that override the accent with `[data-color-palette] [class*="indigo-"]` selectors can delete
  them: indigo follows the palette natively.
