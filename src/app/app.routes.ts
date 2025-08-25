import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { UserGridComponent } from './user-grid.component';
import { DashboardComponent } from './dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'grid',
    component: UserGridComponent,
  },
];
