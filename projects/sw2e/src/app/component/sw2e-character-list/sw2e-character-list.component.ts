import { Component, OnInit } from '@angular/core';
import {Sw2eGameService} from '../../service/sw2e-game.service';
import {Character} from '../../../../../../src/app/perfugium/interface/character';

@Component({
  selector: 'sw2e-character-list',
  templateUrl: './sw2e-character-list.component.html',
  styleUrls: ['./sw2e-character-list.component.scss']
})
export class Sw2eCharacterListComponent implements OnInit {

  public characters: Character[];

  constructor(private game: Sw2eGameService) { }

  ngOnInit() {
    this.characters = this.game.list();
    console.log(this.characters);
  }

}
