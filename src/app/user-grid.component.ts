import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GridModule } from '@progress/kendo-angular-grid';
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';

const USERS = [
  { id: 1, name: 'Alice', email: 'alice@example.com', department: 'Engineering' },
  { id: 2, name: 'Bob', email: 'bob@example.com', department: 'Marketing' },
  { id: 3, name: 'Charlie', email: 'charlie@example.com', department: 'Sales' },
  { id: 4, name: 'Diana', email: 'diana@example.com', department: 'Engineering' },
  { id: 5, name: 'Eve', email: 'eve@example.com', department: 'HR' },
];

@Component({
  selector: 'app-user-grid',
  standalone: true,
  imports: [RouterLink, GridModule],
  template: `
    <div style="padding:2rem;">
      <h2 style="margin-bottom:1rem;">User Grid Demo</h2>
      <p style="margin-bottom:1rem;">
        This Kendo Grid supports sorting. Click column headers to sort the data.
      </p>

      <kendo-grid
        [data]="sortedUsers"
        [sortable]="true"
        [sort]="sort"
        (sortChange)="onSortChange($event)"
        style="margin-bottom:2rem;"
      >
        <kendo-grid-column field="id" title="ID" [width]="80"></kendo-grid-column>
        <kendo-grid-column field="name" title="Name" [width]="150"></kendo-grid-column>
        <kendo-grid-column field="email" title="Email" [width]="200"></kendo-grid-column>
        <kendo-grid-column field="department" title="Department" [width]="150"></kendo-grid-column>
      </kendo-grid>

      <a routerLink="/" style="color:#0078d4; text-decoration:none;">← Back to Home</a>
    </div>
  `,
})
export class UserGridComponent {
  users = USERS;
  sort: SortDescriptor[] = [];

  get sortedUsers() {
    return orderBy(this.users, this.sort);
  }

  onSortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
  }
}
