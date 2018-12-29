import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {Sw2eCharacterListComponent} from './component/sw2e-character-list/sw2e-character-list.component';

const routes: Routes = [
  {
    path: 'character',
    component: Sw2eCharacterListComponent
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
