import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {D6Difficulty} from '../../enum/d6-difficulty.enum';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'prf-d6-difficulty-selector',
  templateUrl: './d6-difficulty-selector.component.html',
  styleUrls: ['./d6-difficulty-selector.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => D6DifficultySelectorComponent),
      multi: true
    }
  ]
})
export class D6DifficultySelectorComponent implements ControlValueAccessor, OnInit {

  public readonly difficulties: string[] = [
    D6Difficulty.VeryEasy,
    D6Difficulty.Easy,
    D6Difficulty.Medium,
    D6Difficulty.Hard,
    D6Difficulty.VeryHard
  ];

  @Input() value: D6Difficulty;
  @Input() disabled = false;

  propagateChange = (_: any) => {};

  constructor() { }

  ngOnInit() {
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(val: D6Difficulty): void {
    console.log(val);
    this.value = val;
  }

  onChange(e) {
    this.propagateChange(e.value);
    this.writeValue(e.value);
  }
}
