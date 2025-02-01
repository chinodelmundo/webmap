import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/map-page').then((m) => m.MapPageComponent),
  },
];
