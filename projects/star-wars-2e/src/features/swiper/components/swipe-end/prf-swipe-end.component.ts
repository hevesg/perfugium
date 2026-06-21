import { Component, ElementRef, inject } from '@angular/core';

@Component({
  selector: 'prf-swipe-end',
  standalone: false,
  template: `<ng-content></ng-content>`,
  styles: `
    :host {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      display: flex;
      align-items: stretch;
    }
  `,
})
export class PrfSwipeEndComponent {
  readonly elementRef = inject(ElementRef);
}
