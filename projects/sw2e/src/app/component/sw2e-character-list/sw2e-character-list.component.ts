import { Component, OnInit } from '@angular/core';
import {Sw2eGameService} from '../../service/sw2e-game.service';
import {Character} from '../../../../../../src/app/perfugium/interface/character';
import {adiGallia} from '../../const/adiGallia';

@Component({
  selector: 'sw2e-character-list',
  templateUrl: './sw2e-character-list.component.html',
  styleUrls: ['./sw2e-character-list.component.scss']
})
export class Sw2eCharacterListComponent implements OnInit {

  public characters: Character[];

  constructor(private game: Sw2eGameService) { }

  ngOnInit() {
    localStorage.setItem('78e731027d8fd50ed642340b7c9a63b3', JSON.stringify(adiGallia));
    this.characters = this.game.list();
  }

}
