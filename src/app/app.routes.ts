import { Routes } from '@angular/router';
import { Issues } from './pages/issues/issues';

export const routes: Routes = [
  {
    path: 'issues',
    component: Issues,
  },
  {
    path: '',
    redirectTo: 'issues',
    pathMatch: 'full',
  },
];
