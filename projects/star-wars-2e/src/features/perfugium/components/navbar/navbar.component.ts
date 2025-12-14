import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'prf-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    :host {
      display: block;
    }
  `,
})
export class NavbarComponent {}
