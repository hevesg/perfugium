import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfugiumModule } from '../perfugium/perfugium-module';
import { D6AttributeComponent } from './components/d6-attribute/d6-attribute.component';
import { D6PipPipe } from './pipes/d6-pip-pipe';

@NgModule({
  declarations: [D6AttributeComponent, D6PipPipe],
  imports: [CommonModule, PerfugiumModule],
  exports: [PerfugiumModule, D6AttributeComponent, D6PipPipe],
})
export class D6Module {}
