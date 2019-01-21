import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './component/card/card.component';
import { ModalComponent } from './component/modal/modal.component';
import { NumberStepperComponent } from './component/number-stepper/number-stepper.component';

@NgModule({
  declarations: [
    CardComponent,
    ModalComponent,
    NumberStepperComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CardComponent,
    ModalComponent,
    NumberStepperComponent
  ]
})
export class BsModule { }
