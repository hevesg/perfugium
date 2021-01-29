import {Component, Input} from '@angular/core';
import {D6Attribute} from '../interface/d6-attribute';

@Component({
  selector: 'd6-attribute-view[attribute]',
  templateUrl: './d6-attribute-view.component.html',
  styleUrls: ['./d6-attribute-view.component.css']
})
export class D6AttributeViewComponent {

  @Input() public attribute!: D6Attribute;
  @Input() public name!: string;

  constructor() { }

}
