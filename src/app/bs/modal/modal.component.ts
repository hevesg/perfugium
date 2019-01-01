import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'prf-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  @Input()
  public label: string;

  @Output()
  private close = new EventEmitter();

  @Output()
  private save = new EventEmitter();

  constructor() { }

  public closeModal(): void {
    this.close.emit();
  }

  public saveModal(): void {
    this.save.emit();
  }

}
