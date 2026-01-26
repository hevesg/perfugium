import { ChangeDetectionStrategy, Component, forwardRef, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { D6Weapon } from '../../model/d6-character';

@Component({
  selector: 'app-d6-weapons',
  standalone: false,
  templateUrl: './d6-weapons.component.html',
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
      useExisting: forwardRef(() => D6WeaponsComponent),
      multi: true,
    },
  ],
  host: {
    class: 'card',
    role: 'region',
  },
})
export class D6WeaponsComponent implements ControlValueAccessor {
  readonly weapons = signal<D6Weapon[]>([]);

  private onChange: (value: D6Weapon[]) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: D6Weapon[] | null): void {
    this.weapons.set(value ?? []);
  }

  registerOnChange(fn: (value: D6Weapon[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
