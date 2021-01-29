import {Component, Input} from '@angular/core';
import {Force} from '../interface/force';

@Component({
  selector: 'app-force-view[force]',
  templateUrl: './force-view.component.html',
  styleUrls: ['./force-view.component.scss']
})
export class ForceViewComponent {

  @Input() public force!: Force;

  constructor() { }

}
