import { Component, HostListener, input, OnInit, output } from '@angular/core';

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
export class PrfConfirmModalComponent implements OnInit {
  private readonly KEYBOARD_ACTIVATION_DELAY_MS = 25;
  private keyboardActive = false;

  readonly modalTitle = input<string>();
  readonly confirm = output<boolean>();

  ngOnInit(): void {
    // Delay keyboard activation to prevent the Enter/Escape keyup event
    // that opened the modal from immediately triggering confirm/cancel.
    setTimeout(() => {
      this.keyboardActive = true;
    }, this.KEYBOARD_ACTIVATION_DELAY_MS);
  }

  @HostListener('document:keyup.escape')
  protected onEscape(event?: MouseEvent) {
    // event.detail === 0 means keyboard-triggered click (Enter/Space on focused button).
    // We skip those to avoid duplicate handling with the HostListener.
    if (event?.detail === 0 || !this.keyboardActive) {
      return;
    }
    this.confirm.emit(false);
  }

  @HostListener('document:keyup.enter')
  protected onEnter(event?: MouseEvent) {
    // event.detail === 0 means keyboard-triggered click (Enter/Space on focused button).
    // We skip those to avoid duplicate handling with the HostListener.
    if (event?.detail === 0 || !this.keyboardActive) {
      return;
    }
    this.confirm.emit(true);
  }
}
