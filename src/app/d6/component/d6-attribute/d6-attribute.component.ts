import {Component, Input, OnInit} from '@angular/core';
import {D6Attribute} from '../../interface/d6-attribute';

@Component({
  selector: 'prf-d6-attribute',
  templateUrl: './d6-attribute.component.html',
  styleUrls: ['./d6-attribute.component.scss']
})
export class D6AttributeComponent implements OnInit {

  @Input()
  public title: string;

  @Input()
  public attribute: D6Attribute;

  constructor() { }

  ngOnInit() {
  }

}
