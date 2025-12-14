import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'characters',
    pathMatch: 'full',
  },
  {
    path: 'characters',
    loadComponent: () =>
      import('../character-list/character-list.page').then((m) => m.CharacterListPage),
  },
  {
    path: 'characters/:id',
    loadComponent: () =>
      import('../character-sheet/character-sheet.page').then((m) => m.CharacterSheetPage),
  },
];
