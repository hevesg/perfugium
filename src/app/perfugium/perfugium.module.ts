import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CharacterListComponent} from './component/character-list/character-list.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { FooterComponent } from './component/footer/footer.component';
import {RouterModule} from '@angular/router';
import {BsModule} from '../bs/bs.module';
import {TimeAgoPipe} from 'time-ago-pipe';

@NgModule({
  declarations: [
    CharacterListComponent,
    NavbarComponent,
    FooterComponent,
    TimeAgoPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    BsModule
  ],
  exports: [
    CharacterListComponent,
    NavbarComponent,
    FooterComponent,
    BsModule
  ]
})
export class PerfugiumModule { }
