import { ChangeDetectionStrategy, Component, forwardRef, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { D6Equipment } from '../../model/d6-character';

@Component({
  selector: 'app-d6-equipment',
  standalone: false,
  templateUrl: './d6-equipment.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    :host {
      display: block;
    }
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => D6EquipmentComponent),
      multi: true,
    },
  ],
  host: {
    class: 'card',
    role: 'region',
  },
})
export class D6EquipmentComponent implements ControlValueAccessor {
  readonly equipment = signal<D6Equipment[]>([]);

  private onChange: (value: D6Equipment[]) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: D6Equipment[] | null): void {
    this.equipment.set(value ?? []);
  }

  registerOnChange(fn: (value: D6Equipment[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
