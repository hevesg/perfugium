import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CharacterSheetComponent} from "./character-sheet/character-sheet.component";

const routes: Routes = [
  { path: 'character', component: CharacterSheetComponent },
  { path: '', redirectTo: '/character', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
