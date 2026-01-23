import { ChangeDetectionStrategy, Component, forwardRef, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface GeneralData {
  gender: string;
  species: string;
  homeWorld: string;
  age: number;
  height: number;
  weight: number;
  physicalDescription: string;
  personality: string;
  background: string;
  objectives: string;
  quote: string;
}

const DEFAULT_GENERAL_DATA: GeneralData = {
  gender: '',
  species: '',
  homeWorld: '',
  age: 0,
  height: 0,
  weight: 0,
  physicalDescription: '',
  personality: '',
  background: '',
  objectives: '',
  quote: '',
};

@Component({
  selector: 'sw2e-general-data',
  standalone: true,
  templateUrl: 'general-data.component.html',
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
      useExisting: forwardRef(() => GeneralDataComponent),
      multi: true,
    },
  ],
  host: {
    class: 'card',
    role: 'region',
  },
})
export class GeneralDataComponent implements ControlValueAccessor {
  readonly data = signal<GeneralData>(DEFAULT_GENERAL_DATA);

  private onChange: (value: GeneralData) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: GeneralData | null): void {
    this.data.set(value ?? DEFAULT_GENERAL_DATA);
  }

  registerOnChange(fn: (value: GeneralData) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
