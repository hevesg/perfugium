import { Component, ElementRef, inject } from '@angular/core';

@Component({
  selector: 'prf-swipe-start',
  standalone: false,
  template: `<ng-content></ng-content>`,
  styles: `
    :host {
      display: none;
      opacity: 0;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      transition: opacity 300ms ease;
    }

    :host-context(prf-swipe-item.is-open-start),
    :host-context(prf-swipe-item.is-opening) {
      display: block;
      opacity: 1;
    }
    :host-context(prf-swipe-item.is-closing) {
      display: block;
      opacity: 0;
    }
  `,
})
export class PrfSwipeStartComponent {
  readonly elementRef = inject(ElementRef);
}
