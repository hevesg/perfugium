import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PerfugiumModule} from '../perfugium/perfugium.module';
import { D6AttributeComponent } from './component/d6-attribute/d6-attribute.component';
import { PipPipe } from './pipe/pip.pipe';
import { D6WeaponRangePipe } from './pipe/d6-weapon-range.pipe';
import { D6AttributeDialogComponent } from './dialog/d6-attribute-dialog/d6-attribute-dialog.component';
import { PipStepperComponent } from './component/pip-stepper/pip-stepper.component';
import { D6WeaponsDialogComponent } from './dialog/d6-weapons-dialog/d6-weapons-dialog.component';
import {MatRadioModule} from '@angular/material';
import { D6DifficultySelectorComponent } from './component/d6-difficulty-selector/d6-difficulty-selector.component';
import { D6RangeComponent } from './component/d6-range/d6-range.component';

@NgModule({
  declarations: [
    D6AttributeComponent,
    PipPipe,
    D6WeaponRangePipe,
    D6AttributeDialogComponent,
    PipStepperComponent,
    D6WeaponsDialogComponent,
    D6DifficultySelectorComponent,
    D6RangeComponent
  ],
  imports: [
    CommonModule,
    PerfugiumModule,
    MatRadioModule
  ],
  exports: [
    PerfugiumModule,
    D6AttributeComponent,
    PipPipe,
    D6WeaponRangePipe,
    D6AttributeDialogComponent,
    D6WeaponsDialogComponent,
    D6RangeComponent
  ],
  providers: [
    D6AttributeDialogComponent
  ],
  entryComponents: [
    D6AttributeDialogComponent,
    D6WeaponsDialogComponent
  ]
})
export class D6Module { }
