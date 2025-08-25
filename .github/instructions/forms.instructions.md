# forms.instructions.md

This file defines **best practices for building forms** in the Kendo Connect project. Use it to ensure all dialog and input forms follow consistent patterns.

---

## General Approach

- Use **dialog-based forms** for creating and editing records (Contracts, Vendors, Invoices).
- Forms should use **Kendo UI for Angular Inputs** (TextBox, NumericTextBox, DatePicker, DropDownList, MultiSelect, Upload).
- Keep forms **lean, clear, and accessible**.

---

## Layout

- Use **Kendo Dialog** as the container for forms.
- Inside dialogs, arrange inputs in a simple stacked or 2-column layout.
- Use `k-form`, `k-form-field`, and `k-label` for consistency.

---

## Validation

- Mark required fields clearly with `required` attributes.
- Provide validation messages under inputs using Kendo’s `kendoTextBox` and Angular validation.
- Example:
  ```html
  <kendo-textbox [(ngModel)]="model.title" required></kendo-textbox>
  <div *ngIf="form.submitted && !model.title" class="k-error">
  	Title is required
  </div>
  ```

---

## Inputs by Type

- **Text**: `kendo-textbox`
- **Numbers/Currency**: `kendo-numerictextbox` with `format="c"`
- **Dates**: `kendo-datepicker`
- **Dropdowns**: `kendo-dropdownlist`
- **Multi-value**: `kendo-multiselect`
- **Status/Tags**: `kendo-chiplist` or `kendo-badge`
- **File Uploads**: `kendo-upload` (stubbed, no backend)

---

## Actions

- Always provide **Cancel** (flat) and **Save** (primary) buttons in dialog actions.
- Example:
  ```html
  <kendo-dialog-actions>
  	<button kendoButton fillMode="flat" (click)="cancel()">Cancel</button>
  	<button kendoButton themeColor="primary" (click)="save()">Save</button>
  </kendo-dialog-actions>
  ```

---

## Styling Rules

- Use Fluent theme defaults; do not override spacing or fonts.
- Align labels consistently; prefer inline labels with `k-label`.
- Avoid inline CSS—style via SCSS or Kendo props.

---

## Accessibility

- Ensure labels are linked to inputs.
- First input should receive focus when dialog opens.
- Dialog must close on **Esc** and save on **Enter** if valid.

---

## Do / Don’t Checklist

**Do:**

- Do use dialog-based editing for consistency.
- Do validate required fields and show clear errors.
- Do use correct input types (numeric, date, dropdown).
- Do keep forms short and task-focused.

**Don’t:**

- Don’t mix raw HTML inputs with Kendo components.
- Don’t add custom color/typography—stick to Fluent.
- Don’t implement system theme detection.

---

**Reminder:** Forms are the primary way users add or edit data in Kendo Connect. Use this doc whenever creating or modifying forms to maintain consistency and accessibility.
