import { Routes } from '@angular/router';
import { characterResolver } from '../features/perfugium/misc/character-sheet.resolver';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'characters',
    pathMatch: 'full',
  },
  {
    path: 'characters',
    loadComponent: () =>
      import('../pages/character-list/character-list.page').then((m) => m.CharacterListPage),
  },
  {
    path: 'characters/:id',
    loadComponent: () =>
      import('../pages/character-sheet/character-sheet.page').then((m) => m.CharacterSheetPage),
    resolve: { character: characterResolver },
  },
];
