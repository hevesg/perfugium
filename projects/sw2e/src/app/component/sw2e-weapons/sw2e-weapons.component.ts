import {Component, Input, OnInit} from '@angular/core';
import {D6Weapon} from '../../../../../../src/app/d6/interface/d6-weapon';

@Component({
  selector: 'sw2e-weapons',
  templateUrl: './sw2e-weapons.component.html',
  styleUrls: ['./sw2e-weapons.component.scss']
})
export class Sw2eWeaponsComponent implements OnInit {

  @Input()
  public weapons: D6Weapon[];

  constructor() { }

  ngOnInit() {
  }

}
