import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'prf-navbar[brand]',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  @Input() public brand = '';
  @Input() public backUrl = 'hh';

  @Output() clickBrand: EventEmitter<void> = new EventEmitter<void>();

  constructor() {
  }

  onClickBrand(): void {
    this.clickBrand.emit();
  }
}
