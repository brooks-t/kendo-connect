# mock-data.instructions.md

This file defines how **mock data** works in **Kendo Connect** so Copilot uses a single, consistent data pattern.

---

## Goals

- **Front‑end only**: no backend calls, no third‑party APIs.
- **Deterministic**: same seed data on first run, persisted afterward.
- **Simple**: signals + localStorage; minimal helpers.

---

## Storage Keys

Use a single namespace prefix:

```
LS_PREFIX = 'kendoConnect.'
keys: vendors, contracts, invoices, meta
```

---

## Data Model (types)

Keep all types in `src/app/models.ts` and import everywhere else. Avoid ad‑hoc interfaces.

```ts
export type Currency = "USD" | "EUR" | "GBP";
export interface Vendor {
	id: string;
	name: string;
	duns?: string;
	active: boolean;
	poc?: string;
}
export interface Contract {
	id: string;
	title: string;
	vendorId: string;
	start: Date;
	end: Date;
	ceiling: number;
	obligated: number;
	currency: Currency;
	status: "Active" | "Expired" | "Pending";
	categories: string[];
	notes?: string;
	attachments?: string[];
}
export interface Invoice {
	id: string;
	contractId: string;
	vendorId: string;
	date: Date;
	amount: number;
	status: "Draft" | "Submitted" | "Paid";
}
```

---

## Data Service (signals + localStorage)

Create a single `DataService` that owns state and persistence.

```ts
// src/app/data.service.ts
import { Injectable, signal, computed } from "@angular/core";
import { Vendor, Contract, Invoice } from "./models";

const P = "kendoConnect.";
const lsGet = <T>(k: string, f: T): T =>
	JSON.parse(localStorage.getItem(P + k) || "null") ?? f;
const lsSet = (k: string, v: any) =>
	localStorage.setItem(P + k, JSON.stringify(v));

@Injectable({ providedIn: "root" })
export class DataService {
	vendors = signal<Vendor[]>(lsGet("vendors", seedVendors()));
	contracts = signal<Contract[]>(lsGet("contracts", seedContracts()));
	invoices = signal<Invoice[]>(lsGet("invoices", seedInvoices()));

	totals = computed(() => {
		const spend = this.invoices().reduce((s, i) => s + i.amount, 0);
		const ceiling = this.contracts().reduce((s, c) => s + c.ceiling, 0);
		return { spend, ceiling, remaining: ceiling - spend };
	});

	save() {
		lsSet("vendors", this.vendors());
		lsSet("contracts", this.contracts());
		lsSet("invoices", this.invoices());
	}

	upsert<T extends { id: string }>(list: T[], next: T) {
		const idx = list.findIndex((x) => x.id === next.id);
		const copy = [...list];
		idx < 0 ? copy.push(next) : copy.splice(idx, 1, next);
		return copy;
	}
}

// Seed helpers kept below or in a separate seed module
function seedVendors(): Vendor[] {
	return [
		{
			id: "v-1",
			name: "Aquila Systems",
			duns: "111111111",
			active: true,
			poc: "sam@aquila.com",
		},
		{
			id: "v-2",
			name: "Blue Harbor LLC",
			duns: "222222222",
			active: true,
			poc: "ops@blueharbor.com",
		},
	];
}
function seedContracts(): Contract[] {
	return [
		{
			id: "c-1",
			title: "Navy Logistics Support",
			vendorId: "v-1",
			start: new Date("2025-01-01"),
			end: new Date("2026-01-01"),
			ceiling: 1500000,
			obligated: 650000,
			currency: "USD",
			status: "Active",
			categories: ["Logistics"],
		},
		{
			id: "c-2",
			title: "Fleet Analytics Pilot",
			vendorId: "v-2",
			start: new Date("2024-10-01"),
			end: new Date("2025-09-30"),
			ceiling: 400000,
			obligated: 380000,
			currency: "USD",
			status: "Active",
			categories: ["Analytics"],
		},
	];
}
function seedInvoices(): Invoice[] {
	return [
		{
			id: "i-1001",
			contractId: "c-1",
			vendorId: "v-1",
			date: new Date("2025-07-15"),
			amount: 125000,
			status: "Paid",
		},
		{
			id: "i-1002",
			contractId: "c-2",
			vendorId: "v-2",
			date: new Date("2025-08-01"),
			amount: 60000,
			status: "Submitted",
		},
	];
}
```

---

## ID Generation

- Use short, readable IDs: `c-xxxxx`, `v-xxxxx`, `i-xxxxx`.
- Helper: `id(prefix) => prefix + Math.random().toString(36).slice(2,7)`.

---

## Immutability Rule

- Treat arrays as immutable: always create new arrays when adding/updating/removing.
- Never mutate objects in place inside components; use the service to persist changes and call `save()`.

---

## Date Handling

- Store as `Date` instances in memory; on load from localStorage, revive via `new Date(value)` if needed.
- When binding to Kendo `DatePicker`, pass actual `Date` objects.

---

## Persistence Triggers

- Call `data.save()` after any create/update/delete.
- Use explicit save calls inside add/edit flows; avoid auto‑saving on every keystroke.

---

## Versioning (optional, lightweight)

- Keep `meta` object in localStorage: `{ schemaVersion: 1 }`.
- If schema changes, migrate on startup before loading signals.

---

## Error Handling

- Guard against corrupt LS data: if JSON parse fails, fall back to seeds and overwrite on next save.
- Validate required fields in forms before persisting.

---

## Performance Notes

- For >100 rows, enable Grid virtualization.
- Provide `trackBy` in repeater contexts.

---

## Security/Policy Reminders

- **No external calls** (CDNs/APIs) for data — all local.
- **No system theme detection** or runtime theme toggles (styling is governed elsewhere).

---

## Do / Don’t Checklist

**Do**

- Do keep all data access in `DataService`.
- Do use signals/computed for reactive totals and summaries.
- Do persist via `save()` after mutations.

**Don’t**

- Don’t scatter `localStorage` access across components.
- Don’t mix different ID schemes per entity.
- Don’t mutate arrays/objects in place.

---

**Reminder:** Mock data exists to support learning the **Kendo UI** workflows in Kendo Connect. Keep it predictable, local, and easy to reason about.
