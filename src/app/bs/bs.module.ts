import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { IconDirective } from './directive/icon.directive';

@NgModule({
  declarations: [CardComponent, IconDirective],
  imports: [
    CommonModule
  ],
  exports: [
    CardComponent,
    IconDirective
  ]
})
export class BsModule { }
