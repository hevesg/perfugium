import {Component, EventEmitter, forwardRef, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'prf-number-stepper',
  templateUrl: './numeric-stepper.component.html',
  styleUrls: ['./numeric-stepper.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NumericStepperComponent),
      multi: true
    }
  ]
})
export class NumericStepperComponent implements ControlValueAccessor, OnChanges {

  @Input() min: number = Number.MIN_SAFE_INTEGER;
  @Input() max: number = Number.MAX_SAFE_INTEGER;

  @Input() value = 0;
  @Input() disabled = false;

  @Output() increased: EventEmitter<void> = new EventEmitter<void>();
  @Output() decreased: EventEmitter<void> = new EventEmitter<void>();

  propagateChange = (_: any) => {};

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.min && changes.min.currentValue > this.value) {
      this.propagateChange(this.min);
      this.writeValue(this.min);
    }
    if (changes.max && changes.max.currentValue < this.value) {
      this.propagateChange(this.max);
      this.writeValue(this.max);
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
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
