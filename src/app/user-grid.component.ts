import { Component } from '@angular/core';
import { GridModule } from '@progress/kendo-angular-grid';
import { SortDescriptor, process, DataResult } from '@progress/kendo-data-query';

const USERS = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
  { id: 3, name: 'Charlie', email: 'charlie@example.com' },
];

@Component({
  selector: 'app-user-grid',
  standalone: true,
  imports: [GridModule],
  template: `
    <h2 style="margin-bottom:1rem;">User List (Kendo Grid)</h2>
    <kendo-grid
      [data]="gridData"
      [sortable]="true"
      [sort]="sort"
      (sortChange)="onSortChange($event)"
      style="height:300px;"
    >
      <kendo-grid-column field="id" title="ID" [width]="60"></kendo-grid-column>
      <kendo-grid-column field="name" title="Name"></kendo-grid-column>
      <kendo-grid-column field="email" title="Email"></kendo-grid-column>
    </kendo-grid>
  `,
})
export class UserGridComponent {
  public users = USERS;
  public sort: SortDescriptor[] = [];
  public gridData: any = USERS;

  onSortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    this.gridData = process(this.users, { sort });
  }
}
