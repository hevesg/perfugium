import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface D6PipModalData {
  title: string;
  value: number;
}

@Component({
  selector: 'app-d6-pip-modal',
  standalone: false,
  template: `
    <prf-confirm-modal [modalTitle]="data.title" (confirm)="onConfirm($event)" [formGroup]="form">
      <div class="row mb-2">
        <label class="col-7 col-form-label">Value</label>
        <div class="col-5">
          <app-d6-pip-stepper formControlName="value"></app-d6-pip-stepper>
        </div>
      </div>
    </prf-confirm-modal>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    :host {
      display: block;
    }
  `,
})
export class D6PipModalComponent {
  dialogRef = inject<DialogRef<number | null>>(DialogRef);
  data = inject<D6PipModalData>(DIALOG_DATA);

  form = new FormGroup({
    value: new FormControl<number>(this.data.value, [Validators.required, Validators.min(0)]),
  });

  protected onConfirm($event: boolean) {
    this.dialogRef.close($event ? this.form.getRawValue().value ?? null : null);
  }
}
