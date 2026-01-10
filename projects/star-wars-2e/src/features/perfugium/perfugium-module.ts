import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterListComponent } from './components/character-list/character-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CharacterService } from './services/character.service';
import { AgoPipe } from './pipes/ago/ago-pipe';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';

@NgModule({
  declarations: [CharacterListComponent, NavbarComponent, AgoPipe, ConfirmModalComponent],
  imports: [CommonModule],
  exports: [CharacterListComponent, NavbarComponent, AgoPipe, ConfirmModalComponent],
  providers: [CharacterService],
})
export class PerfugiumModule {}
