import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PerfugiumModule} from '../perfugium/perfugium.module';
import { D6AttributeComponent } from './component/d6-attribute/d6-attribute.component';
import { PipPipe } from './pipe/pip.pipe';
import { D6WeaponRangePipe } from './pipe/d6-weapon-range.pipe';

@NgModule({
  declarations: [D6AttributeComponent, PipPipe, D6WeaponRangePipe],
  imports: [
    CommonModule,
    PerfugiumModule
  ],
  exports: [
    PerfugiumModule,
    D6AttributeComponent,
    PipPipe,
    D6WeaponRangePipe
  ]
})
export class D6Module { }
