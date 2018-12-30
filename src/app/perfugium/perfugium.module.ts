import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CharacterListComponent} from './component/character-list/character-list.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { FooterComponent } from './component/footer/footer.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    CharacterListComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    CharacterListComponent,
    NavbarComponent,
    FooterComponent
  ]
})
export class PerfugiumModule { }
