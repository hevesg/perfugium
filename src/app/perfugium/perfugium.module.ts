import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CharacterListComponent} from './component/character-list/character-list.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { FooterComponent } from './component/footer/footer.component';

@NgModule({
  declarations: [
    CharacterListComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CharacterListComponent,
    NavbarComponent
  ]
})
export class PerfugiumModule { }
