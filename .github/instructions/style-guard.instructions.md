# style-guard.instructions.md

This file defines **styling guardrails** for the project **Kendo Connect**. Use it to correct Copilot if it drifts into non-compliant styling or ignores the chosen design system.

---

## Theme (Fluent, fixed — **do NOT auto-detect system theme**)

- Always use **Kendo UI for Angular** with the **Microsoft Fluent theme**.
- Import `@progress/kendo-theme-fluent/dist/all.css` in `angular.json` styles.
- **Do not** wire theme selection to the OS or browser preferences. Specifically **do not**:
  - use `window.matchMedia('(prefers-color-scheme: dark)')` or similar listeners
  - use CSS `@media (prefers-color-scheme: dark)` to override Kendo variables
  - import or toggle any Kendo **dark** theme packages/classes unless explicitly requested
  - add runtime theme toggles, `data-theme` attributes, or global CSS variable switches
- The default is **Fluent (light)**. Only change theme **if explicitly instructed** in a prompt that references this file.

## Component Styling

- Prefer **built-in Kendo props** (`themeColor`, `fillMode`, `size`) over custom CSS.
- **Primary actions**: `themeColor="primary"` (use sparingly, one per view).
- **Secondary actions**: `fillMode="outline"` or `fillMode="flat"`.
- Respect Fluent spacing/density defaults; adjust row height/size only when necessary.

## Layout

- Use Angular + Kendo Layout components (`AppBar`, `GridLayout`, `TabStrip`) before adding custom wrappers.
- For simple grids/flex, use minimal, scoped CSS; avoid global overrides.

## Accessibility & UX

- Ensure keyboard navigation works by default.
- Keep color usage within **Fluent** theme tokens.
- No inline styles unless it’s a quick demo; prefer component-scoped styles.

## Out of Scope

- Do **not** generate raw HTML/CSS versions of buttons, inputs, or modals—always use Kendo equivalents.
- Avoid inventing new colors, typography, or shadow systems.

---

### Enforcement checklist (use in reviews / PRs)

- [ ] Fluent light theme imported once; no dark theme assets/classes
- [ ] No `prefers-color-scheme` media queries or `matchMedia` listeners
- [ ] No runtime theme toggles/data attributes
- [ ] Kendo props used for visual states instead of ad-hoc CSS
- [ ] A11y and spacing consistent with Fluent defaults

**Reminder:** This is a corrective reference. Use it to pull Copilot back if it starts mixing in non-Kendo styling approaches or tries to auto-apply the system theme.
