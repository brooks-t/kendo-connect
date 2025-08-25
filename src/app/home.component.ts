import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from '@progress/kendo-angular-buttons';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonModule, RouterLink],
  template: `
    <div style="padding:2rem;">
      <h1>Welcome to Kendo Connect</h1>
      <button kendoButton themeColor="primary">Kendo Fluent Button</button>
      <br /><br />
      <button kendoButton [routerLink]="['/grid']" themeColor="primary" fillMode="solid">
        View Grid Demo
      </button>
    </div>
  `,
})
export class HomeComponent {}
