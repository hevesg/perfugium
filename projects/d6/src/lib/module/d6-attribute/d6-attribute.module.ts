import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {D6AttributeViewComponent} from './d6-attribute-view/d6-attribute-view.component';
import {D6PipModule} from '../d6-pip/d6-pip.module';


@NgModule({
  declarations: [D6AttributeViewComponent],
  exports: [
    D6AttributeViewComponent
  ],
  imports: [
    CommonModule,
    D6PipModule
  ]
})
export class D6AttributeModule { }
