# milestones.instructions.md

This file defines the **planned milestones** for the Kendo Connect project. Use this file to stay focused on the roadmap rather than jumping ahead or adding unrelated features.

---

## Milestone 1: Project Setup

- Create Angular 20+ project with standalone components
- Add Kendo UI for Angular packages
- Apply **Microsoft Fluent theme**
- Configure routing + app shell (AppBar + navigation)

## Milestone 2: Dashboard

- Dashboard page with:
  - KPI cards (total ceiling, spend, remaining)
  - Chart (monthly spend)
  - Grid of expiring contracts
- Acceptance: Displays mock data from `DataService` and updates dynamically.

## Milestone 3: Contracts

- Contracts list in a Kendo Grid
  - Sorting, filtering, paging
  - Inline or dialog editing form (Title, Vendor, Dates, Ceiling, Status)
  - Export to Excel and PDF
- Acceptance: User can add/edit contracts and persist to localStorage.

## Milestone 4: Vendors

- Vendor directory in a Kendo Grid
- Vendor detail view (TabStrip with profile / contracts / invoices)
- Acceptance: Vendor list loads and links to details with mock data.

## Milestone 5: Invoices

- Invoice list with grouping (by vendor)
- Aggregates (totals by vendor + grand total)
- Status indicators (ChipList or Badge)
- Acceptance: User can view invoices, totals update correctly.

## Stretch Milestones (Optional)

- Stepper wizard for new contract creation
- Scheduler or Gantt for contract milestones
- Additional features as identified during development

---

**Reminder:** This is a lightweight roadmap. Use this doc to stay on track with _what we’re building next_ without bloating the always-loaded `copilot-instructions.md`.
