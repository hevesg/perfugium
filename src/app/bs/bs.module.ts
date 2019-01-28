import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './component/card/card.component';
import { ModalComponent } from './component/modal/modal.component';
import { NumericStepperComponent } from './component/numeric-stepper/numeric-stepper.component';

@NgModule({
  declarations: [
    CardComponent,
    ModalComponent,
    NumericStepperComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CardComponent,
    ModalComponent,
    NumericStepperComponent
  ]
})
export class BsModule { }
