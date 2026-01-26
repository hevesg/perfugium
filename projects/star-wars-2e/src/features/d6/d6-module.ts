import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfugiumModule } from '../perfugium/perfugium-module';
import { D6AttributeComponent } from './components/d6-attribute/d6-attribute.component';
import { D6PipPipe } from './pipes/d6-pip-pipe';
import { D6DifficultyPipe } from './pipes/d6-difficulty-pipe';
import { D6AttributeModalComponent } from './components/d6-attribute-modal/d6-attribute-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { D6PipStepperComponent } from './components/d6-pip-input/d6-pip-stepper.component';
import { D6WeaponsComponent } from './components/d6-weapons/d6-weapons.component';
import { D6EquipmentComponent } from './components/d6-equipment/d6-equipment.component';
import { D6WeaponsModalComponent } from './components/d6-weapons-modal/d6-weapons-modal.component';

@NgModule({
  declarations: [
    D6AttributeComponent,
    D6PipPipe,
    D6DifficultyPipe,
    D6AttributeModalComponent,
    D6PipStepperComponent,
    D6WeaponsComponent,
    D6EquipmentComponent,
    D6WeaponsModalComponent,
  ],
  imports: [CommonModule, PerfugiumModule, ReactiveFormsModule],
  exports: [
    PerfugiumModule,
    D6AttributeComponent,
    D6PipPipe,
    D6DifficultyPipe,
    D6AttributeModalComponent,
    D6PipStepperComponent,
    D6WeaponsComponent,
    D6EquipmentComponent,
    D6WeaponsModalComponent,
  ],
})
export class D6Module {}
