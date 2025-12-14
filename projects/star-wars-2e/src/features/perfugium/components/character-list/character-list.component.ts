import { Component, input, InputSignal, output } from '@angular/core';
import { Character } from '../../model/character';

@Component({
  selector: 'prf-character-list',
  standalone: false,
  templateUrl: './character-list.component.html',
})
export class CharacterListComponent {
  readonly characters: InputSignal<Character[]> = input.required();
  readonly selectCharacter = output<Character>();
}
