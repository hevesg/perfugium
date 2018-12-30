import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PerfugiumModule} from '../perfugium/perfugium.module';
import { D6AttributeComponent } from './component/d6-attribute/d6-attribute.component';

@NgModule({
  declarations: [D6AttributeComponent],
  imports: [
    CommonModule,
    PerfugiumModule
  ],
  exports: [
    PerfugiumModule,
    D6AttributeComponent
  ]
})
export class D6Module { }
