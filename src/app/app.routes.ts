import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'sw2e',
    loadComponent: () => import('../sw2e/sw2e/sw2e').then(m => m.Sw2e),
    children: [
      {
        path: 'characters',
        loadComponent: () => import('../sw2e/sw2e-character-list/sw2e-character-list').then(m => m.Sw2eCharacterList)
      },
      {
        path: 'characters/:id',
        loadComponent: () => import('../sw2e/sw2e-character-sheet/sw2e-character-sheet').then(m => m.Sw2eCharacterSheet)
      }
    ]
  },
  {
    path: '',
    redirectTo: 'sw2e/characters',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'sw2e/characters'
  }
];
