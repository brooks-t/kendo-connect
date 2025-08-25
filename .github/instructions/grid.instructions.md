# grid.instructions.md

This file defines **best practices for Kendo UI Grids** in the Kendo Connect project. Use it to ensure all data tables (Contracts, Vendors, Invoices) follow consistent patterns.

---

## Standard Patterns

### Data Binding

- Use signals + a `DataService` for data.
- Client-side operations (sort, filter, group) are acceptable for mock/local data.
- Always provide `trackBy` for performance.

### Editing

- Use **dialog-based editing** for Contracts and Vendors.
- Inline editing may be used for quick demos but is not the default.
- Always validate required fields (e.g., contract title, vendor, dates).

### Columns & Formatting

- **Dates:** format with `'d'` (short date).
- **Currency:** use `currency` pipe (USD by default).
- **Status:** render as `ChipList` or `Badge`, not plain text.
- Include column menus (sort, filter, hide) where useful.

### Performance

- Enable virtualization when row count > 100.
- Use light templates; avoid complex inline logic inside cell templates.

### Export

- Use built-in **ExcelExport** and **PDFExport**.
- Exported files should mirror the grid’s visible columns and formats.

### Accessibility & UX

- Preserve Kendo’s default keyboard behavior.
- Do not override focus order.
- Keep row density consistent with Fluent defaults (use `size="small"` if needed).

### Styling

- Follow Fluent theme props (`themeColor`, `fillMode`, `size`).
- Do not add custom CSS for headers, rows, or cells unless explicitly needed.

---

## Do / Don’t Checklist

**Do:**

- Use dialog-based editing for consistency.
- Apply correct date/currency/status formatting.
- Enable virtualization for large data sets.
- Keep exports aligned with on-screen columns.

**Don’t:**

- Don’t use OS system theme detection.
- Don’t use CDN-loaded Grid scripts/styles.
- Don’t hand-roll HTML tables or inputs inside grids.
- Don’t add heavy CSS overrides that fight Fluent theme.

---

**Reminder:** The Grid is the centerpiece of Kendo Connect. Use this doc whenever scaffolding or modifying data tables to ensure consistent UX, performance, and styling.
