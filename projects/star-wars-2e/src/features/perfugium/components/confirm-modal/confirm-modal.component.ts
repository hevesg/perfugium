import { Component, HostListener, input, output } from '@angular/core';

@Component({
  selector: 'prf-confirm-modal',
  standalone: false,
  template: `
    <div class="modal-content modal" tabindex="-1">
      @if (modalTitle()) {
        <div class="modal-header">
          <h5 class="modal-title">{{ modalTitle() }}</h5>
        </div>
      }
      <div class="modal-body">
        <ng-content></ng-content>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" (click)="onEscape($event)">Cancel</button>
        <button class="btn btn-primary" (click)="onEnter($event)">Confirm</button>
      </div>
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
})
export class ConfirmModalComponent {
  readonly modalTitle = input<string>();
  readonly confirm = output<boolean>();


  @HostListener('document:keyup.escape')
  protected onEscape(event?: MouseEvent) {
    if (event?.detail === 0) {
      return;
    }
    this.confirm.emit(false);
  }

  @HostListener('document:keyup.enter')
  protected onEnter(event?: MouseEvent) {
    if (event?.detail === 0) {
      return;
    }
    this.confirm.emit(true);
  }
}
