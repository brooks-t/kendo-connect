import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-grid',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div style="padding:2rem;">
      <h2>Grid Demo Page</h2>
      <p>This is the grid demo page. If you can see this, routing to /grid is working!</p>
      <a routerLink="/" style="color:#0078d4;">← Back to Home</a>
    </div>
  `,
})
export class UserGridComponent {}
