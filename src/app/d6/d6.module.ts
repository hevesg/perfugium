import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PerfugiumModule} from '../perfugium/perfugium.module';
import { D6AttributeComponent } from './component/d6-attribute/d6-attribute.component';
import { PipPipe } from './pipe/pip.pipe';

@NgModule({
  declarations: [D6AttributeComponent, PipPipe],
  imports: [
    CommonModule,
    PerfugiumModule
  ],
  exports: [
    PerfugiumModule,
    D6AttributeComponent,
    PipPipe
  ]
})
export class D6Module { }
