import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterListComponent } from './components/character-list/character-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CharacterService } from './services/character.service';
import { AgoPipe } from './pipes/ago/ago-pipe';
import { ModalBaseComponent } from './components/modal-base/modal-base.component';

@NgModule({
  declarations: [CharacterListComponent, NavbarComponent, AgoPipe, ModalBaseComponent],
  imports: [CommonModule],
  exports: [CharacterListComponent, NavbarComponent, AgoPipe, ModalBaseComponent],
  providers: [CharacterService],
})
export class PerfugiumModule {}
