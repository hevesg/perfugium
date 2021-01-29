import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ForceViewComponent} from './force-view/force-view.component';
import {D6PipModule} from '../../../../d6/src/lib/module/d6-pip/d6-pip.module';


@NgModule({
  declarations: [ForceViewComponent],
  imports: [
    CommonModule,
    D6PipModule
  ],
  exports: [ForceViewComponent]
})
export class ForceModule { }
