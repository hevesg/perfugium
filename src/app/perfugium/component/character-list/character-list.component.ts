import {Component, Input, OnInit} from '@angular/core';
import {Character} from '../../interface/character';

@Component({
  selector: 'prf-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit {

  @Input()
  public characters: Character[] = [];

  constructor() { }

  ngOnInit() {
  }

}
