import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GeneralData } from '../general-data/general-data.component';
import { PerfugiumModule } from '../../features/perfugium/perfugium-module';

export interface GeneralDataModal {
  title: string;
  value: GeneralData;
}

@Component({
  selector: 'sw2e-general-data-modal',
  standalone: true,
  imports: [PerfugiumModule, ReactiveFormsModule],
  templateUrl: 'general-data-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    :host {
      display: block;
    }
  `,
})
export class GeneralDataModalComponent {
  dialogRef = inject<DialogRef<GeneralData | null>>(DialogRef);
  data = inject<GeneralDataModal>(DIALOG_DATA);

  form = new FormGroup({
    gender: new FormControl(this.data.value.gender),
    species: new FormControl(this.data.value.species),
    homeWorld: new FormControl(this.data.value.homeWorld),
    age: new FormControl(this.data.value.age),
    height: new FormControl(this.data.value.height),
    weight: new FormControl(this.data.value.weight),
    physicalDescription: new FormControl(this.data.value.physicalDescription),
    personality: new FormControl(this.data.value.personality),
    background: new FormControl(this.data.value.background),
    objectives: new FormControl(this.data.value.objectives),
    quote: new FormControl(this.data.value.quote),
  });

  protected onConfirm($event: boolean) {
    this.dialogRef.close($event ? (this.form.value as GeneralData) : null);
  }
}
