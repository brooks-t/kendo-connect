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
      <p>This is the home page demonstrating Kendo UI for Angular with the Fluent theme.</p>

      <div style="margin:2rem 0;">
        <h2>Demo Components:</h2>
        <div style="display:flex;gap:1rem;flex-wrap:wrap;">
          <button kendoButton [routerLink]="['/dashboard']" themeColor="primary" fillMode="solid">
            View Dashboard
          </button>
          <button kendoButton [routerLink]="['/grid']" themeColor="primary" fillMode="outline">
            View Grid Demo
          </button>
        </div>
      </div>

      <div style="margin:2rem 0;">
        <h3>Sample Kendo Button:</h3>
        <button kendoButton themeColor="primary">Kendo Fluent Button</button>
      </div>
    </div>
  `,
})
export class HomeComponent {}
