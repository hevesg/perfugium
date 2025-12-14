import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfugiumModule } from '../perfugium/perfugium-module';

@NgModule({
  declarations: [],
  imports: [CommonModule, PerfugiumModule],
  exports: [PerfugiumModule],
})
export class D6Module {}
