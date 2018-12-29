import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CharacterListComponent} from '../../../../src/app/perfugium/component/character-list/character-list.component';

const routes: Routes = [
  {
    path: 'character',
    component: CharacterListComponent
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
