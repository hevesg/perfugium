import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfugiumModule } from '../perfugium/perfugium-module';
import { D6AttributeComponent } from './components/d6-attribute/d6-attribute.component';
import { D6PipPipe } from './pipes/d6-pip-pipe';
import { D6AttributeModalComponent } from './components/d6-attribute-modal/d6-attribute-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { D6PipInputComponent } from './components/d6-pip-input/d6-pip-input.component';

@NgModule({
  declarations: [D6AttributeComponent, D6PipPipe, D6AttributeModalComponent, D6PipInputComponent],
  imports: [CommonModule, PerfugiumModule, ReactiveFormsModule],
  exports: [
    PerfugiumModule,
    D6AttributeComponent,
    D6PipPipe,
    D6AttributeModalComponent,
    D6PipInputComponent,
  ],
})
export class D6Module {}
