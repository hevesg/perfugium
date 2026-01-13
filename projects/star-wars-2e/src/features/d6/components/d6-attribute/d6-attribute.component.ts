import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { D6Attribute } from '../../model/d6-character';

@Component({
  selector: 'app-d6-attribute[attributeName]',
  standalone: false,
  templateUrl: './d6-attribute.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    :host {
      display: block;
    }
  `,
})
export class D6AttributeComponent {
  readonly attributeName: InputSignal<string> = input.required();
  readonly attribute: InputSignal<D6Attribute> = input.required();
}
