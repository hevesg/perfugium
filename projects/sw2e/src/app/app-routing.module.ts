import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {Sw2eCharacterListComponent} from './component/sw2e-character-list/sw2e-character-list.component';
import {Sw2eCharacterSheetComponent} from './component/sw2e-character-sheet/sw2e-character-sheet.component';

const routes: Routes = [
  {
    path: 'character',
    component: Sw2eCharacterListComponent
  },
  {
    path: 'character/:id',
    component: Sw2eCharacterSheetComponent
  },
  {
    path: '**',
    redirectTo: 'character'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
