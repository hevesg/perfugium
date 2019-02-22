import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PerfugiumModule} from '../perfugium/perfugium.module';
import { D6AttributeComponent } from './component/d6-attribute/d6-attribute.component';
import { PipPipe } from './pipe/pip.pipe';
import { D6WeaponRangePipe } from './pipe/d6-weapon-range.pipe';
import { D6AttributeDialogComponent } from './dialog/d6-attribute-dialog/d6-attribute-dialog.component';
import { PipStepperComponent } from './component/pip-stepper/pip-stepper.component';

@NgModule({
  declarations: [D6AttributeComponent, PipPipe, D6WeaponRangePipe, D6AttributeDialogComponent, PipStepperComponent],
  imports: [
    CommonModule,
    PerfugiumModule
  ],
  exports: [
    PerfugiumModule,
    D6AttributeComponent,
    PipPipe,
    D6WeaponRangePipe,
    D6AttributeDialogComponent
  ],
  providers: [
    D6AttributeDialogComponent
  ],
  entryComponents: [
    D6AttributeDialogComponent
  ]
})
export class D6Module { }
