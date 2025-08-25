# theme.instructions.md

This file defines **theming rules** for the Kendo Connect project. Use it to ensure consistency with the **Kendo UI Fluent theme** and prevent Copilot from drifting into custom or conflicting styles.

---

## Theme Source

- Always import Fluent theme:
  ```json
  "styles": [
    "node_modules/@progress/kendo-theme-fluent/dist/all.css",
    "src/styles.scss"
  ]
  ```
- Do **not** import Tailwind, Bootstrap, or other CSS frameworks unless explicitly instructed.
- Do **not** load dark theme variants. System theme detection is **not allowed**.

---

## Component Styling

- Use Kendo’s built-in props:
  - `themeColor` → defines semantic colors (primary, secondary, etc.)
  - `fillMode` → defines button/input appearance (solid, outline, flat)
  - `size` → small / medium / large
- Prefer Kendo props instead of custom SCSS overrides.
- Example:
  ```html
  <button kendoButton themeColor="primary" fillMode="outline" size="small">
  	Save
  </button>
  ```

---

## Spacing & Density

- Use Fluent defaults unless explicitly asked to adjust.
- Grid row height: default; use `size="small"` only when necessary.
- Forms: use `k-form-field` spacing consistently.

---

## Colors & Typography

- Do not define custom colors or typography.
- Use Fluent theme tokens only.
- Primary color is reserved for main actions; secondary/outline/flat for less critical actions.

---

## Layout Guidance

- Use Kendo layout components (`AppBar`, `Drawer`, `GridLayout`, `TabStrip`) for structure.
- Minimal custom CSS grid/flex is acceptable, but never replace Fluent tokens.

---

## Accessibility

- Maintain sufficient contrast by relying on Fluent defaults.
- Do not override tokens in a way that reduces readability.

---

## Do / Don’t Checklist

**Do:**

- Do use Fluent theme defaults consistently.
- Do rely on Kendo props (`themeColor`, `fillMode`, `size`).
- Do keep spacing consistent with Fluent design language.

**Don’t:**

- Don’t auto-detect system theme or apply dark mode unless explicitly instructed.
- Don’t invent custom colors, typography, or shadows.
- Don’t mix in external frameworks like Tailwind or Bootstrap.

---

**Reminder:** The Fluent theme defines the visual identity of Kendo Connect. Use this doc to ensure Copilot stays on-theme and does not introduce custom or conflicting styles.
