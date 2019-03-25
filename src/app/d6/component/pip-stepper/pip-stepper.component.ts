import {Component, forwardRef, Input} from '@angular/core';
import {NumericStepperComponent} from '../../../bs/component/numeric-stepper/numeric-stepper.component';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'prf-pip-stepper',
  templateUrl: './pip-stepper.component.html',
  styleUrls: ['./pip-stepper.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PipStepperComponent),
      multi: true
    }
  ]
})
export class PipStepperComponent extends NumericStepperComponent implements ControlValueAccessor {

  @Input() min = 3;

  @Input() ctrl = 3;
  @Input() shift = 1;

  constructor() {
    super();
  }

}
