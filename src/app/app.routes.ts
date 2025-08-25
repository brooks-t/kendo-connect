import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { UserGridComponent } from './user-grid.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'grid',
    component: UserGridComponent,
  },
];
