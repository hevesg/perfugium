import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './component/card/card.component';
import { IconDirective } from './directive/icon.directive';
import { ModalComponent } from './component/modal/modal.component';
import { NumberStepperComponent } from './component/number-stepper/number-stepper.component';

@NgModule({
  declarations: [
    CardComponent,
    IconDirective,
    ModalComponent,
    NumberStepperComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CardComponent,
    IconDirective,
    ModalComponent,
    NumberStepperComponent
  ]
})
export class BsModule { }
