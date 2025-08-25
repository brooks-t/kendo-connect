import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { UserGridComponent } from './user-grid.component';
import { DashboardComponent } from './dashboard.component';
import { ContractsComponent } from './contracts.component';

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
    path: 'contracts',
    component: ContractsComponent,
  },
  {
    path: 'grid',
    component: UserGridComponent,
  },
];
