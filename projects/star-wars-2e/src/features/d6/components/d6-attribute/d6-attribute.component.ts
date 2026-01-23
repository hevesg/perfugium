import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  inject,
  input,
  InputSignal,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Dialog } from '@angular/cdk/dialog';
import { D6Attribute } from '../../model/d6-character';

@Component({
  selector: 'app-d6-attribute[attributeName]',
  standalone: false,
  templateUrl: './d6-attribute.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    :host {
      display: block;
      cursor: pointer;
    }
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => D6AttributeComponent),
      multi: true,
    },
  ],
  host: {
    class: 'card',
    role: 'region',
  },
})
export class D6AttributeComponent implements ControlValueAccessor {
  private readonly  = inject(Dialog);

  readonly attributeName: InputSignal<string> = input.required();

  readonly attribute = signal<D6Attribute>({ value: 0, skills: [] });

  private onChange: (value: D6Attribute) => void = () => { };
  private onTouched: () => void = () => { };

  writeValue(value: D6Attribute | null): void {
    this.attribute.set(value ?? { value: 0, skills: [] });
  }

  registerOnChange(fn: (value: D6Attribute) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
