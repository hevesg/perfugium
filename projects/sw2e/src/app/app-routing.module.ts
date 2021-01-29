import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Sw2eCharacterSheetComponent} from './character-sheet/sw2e-character-sheet.component';

const routes: Routes = [
  { path: 'character', component: Sw2eCharacterSheetComponent },
  { path: '', redirectTo: '/character', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
