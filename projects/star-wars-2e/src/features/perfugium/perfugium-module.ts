import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterListComponent } from './components/character-list/character-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CharacterService } from './services/character.service';
import { AgoPipe } from './pipes/ago-pipe';

@NgModule({
  declarations: [CharacterListComponent, NavbarComponent, AgoPipe],
  imports: [CommonModule],
  exports: [CharacterListComponent, NavbarComponent, AgoPipe],
  providers: [CharacterService],
})
export class PerfugiumModule {}
