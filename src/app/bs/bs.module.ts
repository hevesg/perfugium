import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { IconDirective } from './directive/icon.directive';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [
    CardComponent,
    IconDirective,
    ModalComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CardComponent,
    IconDirective,
    ModalComponent
  ]
})
export class BsModule { }
