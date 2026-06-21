import { Component, ElementRef, inject } from '@angular/core';

@Component({
  selector: 'prf-swipe-start',
  standalone: false,
  template: `<ng-content></ng-content>`,
  styles: `
    :host {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      display: flex;
      align-items: stretch;
    }
  `,
})
export class PrfSwipeStartComponent {
  readonly elementRef = inject(ElementRef);
}
