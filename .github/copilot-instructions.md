# copilot-instructions.md

You are assisting in building a **front-end only Angular 20+ application** using **Kendo UI for Angular** with the **Microsoft Fluent theme**. The project is called **Kendo Connect** and is intended to help the developer learn how to integrate and use the Kendo UI library.

## General Guidelines

- Keep all solutions **lean, simple, and educational**. Avoid over-engineering or adding unnecessary complexity.
- Prioritize **clarity of examples** over completeness. Favor showing how a feature works rather than covering every edge case.
- Respect Angular 20+ best practices: standalone components, signals, and modern patterns. Avoid legacy APIs.
- Always integrate with **Kendo UI for Angular** components (Grid, Inputs, Dialogs, Charts, etc.) using the **Fluent theme**.
- Do not add backend code. Use **mock data** or **localStorage** for persistence.
- Do not auto-generate large test setups. Keep testing and CI/CD out unless explicitly requested.

## Focus Areas

- **Grids** (sorting, filtering, grouping, exporting).
- **Forms** (inputs, dropdowns, validation, dialogs).
- **Charts** for dashboards.
- **File upload** (stubbed, no backend).
- **Navigation** with Angular Router.
- **Fluent theme usage** and consistent styling.

## Style & UX

- Follow Kendo Fluent theme defaults. Do not invent custom tokens unless explicitly instructed.
- Keep UIs **accessible, keyboard-friendly, and clear**.
- Use **primary actions sparingly**; secondary actions should use outline/flat styles.

## Feature‑Scoped, Small Edits

- Work **one feature/behavior at a time** (e.g., “debounce search in User List”).
- Touch **only files required for that feature** (OK if it’s several files, but **no cross‑feature edits**).
- Before editing, post a **2–3 line plan** (files + intent). After editing, post a **1–2 line verify note** (build/test result).
- **No project‑wide refactors** or dependency/config changes unless explicitly requested.

## Out of Scope

- No backend integrations.
- No complex test frameworks unless asked.
- No unrelated Angular libraries.

## References

- See `milestones.instructions.md` for the current roadmap and planned feature milestones.
- See `style-guard.instructions.md` for styling rules and theme consistency guardrails.

---

This file is a **high-level alignment guide**. For deeper or feature-specific directions, consult `.github/instructions/*.instructions.md` files.
