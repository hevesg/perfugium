import {Component, Input, OnInit} from '@angular/core';
import {Equipment} from '../../../../../../src/app/perfugium/interface/equipment';

@Component({
  selector: 'sw2e-equipment',
  templateUrl: './sw2e-equipment.component.html',
  styleUrls: ['./sw2e-equipment.component.scss']
})
export class Sw2eEquipmentComponent {

  @Input()
  public equipment: Equipment[];

  @Input()
  public credits = 0;

  constructor() { }

}
