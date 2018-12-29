import { Component } from '@angular/core';
import {Sw2eCharacterService} from './service/sw2e-character.service';
import {Sw2eCharacter} from './interface/sw2e-character';

@Component({
  selector: 'sw2e-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sw2e';

  constructor( private character: Sw2eCharacterService) {
    character.create();
    console.log(character.data);
  }
}
