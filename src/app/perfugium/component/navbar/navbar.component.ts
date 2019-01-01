import {Component, Input, OnInit} from '@angular/core';
import {Character} from '../../interface/character';

@Component({
  selector: 'prf-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input()
  public character: Character;

  @Input()
  public label: string;

  constructor() { }

  ngOnInit() {
  }

}
