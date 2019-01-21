import {Component, EventEmitter, forwardRef, Input, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'prf-number-stepper',
  templateUrl: './number-stepper.component.html',
  styleUrls: ['./number-stepper.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NumberStepperComponent),
      multi: true
    }
  ]
})
export class NumberStepperComponent implements ControlValueAccessor {

  @Input() min: number = Number.MIN_SAFE_INTEGER;
  @Input() max: number = Number.MAX_SAFE_INTEGER;

  @Input() value = 0;

  @Output() increased: EventEmitter<void> = new EventEmitter<void>();
  @Output() decreased: EventEmitter<void> = new EventEmitter<void>();

  propagateChange = (_: any) => {};

  constructor() { }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(val: any): void {
    this.value = val;
  }

  public increase(): void {
    if (this.max > this.value) {
      this.value++;
      this.propagateChange(this.value);
      this.increased.emit();
    }
  }

  public decrease(): void {
    if (this.min < this.value) {
      this.value--;
      this.propagateChange(this.value);
      this.decreased.emit();
    }
  }

  public get maxDisabled(): boolean {
    return this.max <= this.value;
  }

  public get minDisabled(): boolean {
    return this.min >= this.value;
  }

}
