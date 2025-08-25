import { Component } from '@angular/core';
import { ButtonModule } from '@progress/kendo-angular-buttons';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonModule],
  template: `
    <div style="padding:2rem;">
      <h1>Welcome to Kendo Connect</h1>
      <button kendoButton themeColor="primary">Kendo Fluent Button</button>
    </div>
  `,
})
export class HomeComponent {}
