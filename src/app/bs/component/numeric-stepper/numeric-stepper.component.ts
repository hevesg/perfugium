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

  @Input() ctrl = 10;
  @Input() shift = 100;

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

  public increase(e: MouseEvent): void {
    this.value += this._getValueChange(e);
    if (this.value > this.max) {
      this.value = this.max;
    }
    this.propagateChange(this.value);
    this.writeValue(this.value);
    this.increased.emit();
  }

  public decrease(e): void {
    this.value -= this._getValueChange(e);
    if (this.min > this.value) {
      this.value = this.min;
    }
    this.propagateChange(this.value);
    this.writeValue(this.value);
    this.decreased.emit();
  }

  public get maxDisabled(): boolean {
    return this.max <= this.value;
  }

  public get minDisabled(): boolean {
    return this.min >= this.value;
  }

  private _getValueChange(e: MouseEvent): number {
    let val = 1;
    if (e.ctrlKey || e.metaKey) {
      val *= this.ctrl;
    }
    if (e.shiftKey) {
      val *= this.shift;
    }
    return val;
  }

}
