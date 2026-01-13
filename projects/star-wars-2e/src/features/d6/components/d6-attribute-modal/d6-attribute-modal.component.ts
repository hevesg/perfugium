import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { D6Attribute } from '../../model/d6-character';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

export interface D6AttributeModal {
  title: string;
  attribute: D6Attribute;
}

@Component({
  selector: 'app-d6-attribute-modal',
  standalone: false,
  template: `
    <prf-confirm-modal [modalTitle]="data.title" (confirm)="onConfirm($event)" [formGroup]="form">
      <div class="row mb-2">
        <label class="col-6 col-form-label">{{ data.title }}</label>
        <div class="col-6">
          <app-d6-pip-input formControlName="value"></app-d6-pip-input>
        </div>
      </div>
      <div formArrayName="skills">
        @for (skill of data.attribute.skills; track $index) {
          <div class="row mb-2" [formGroupName]="$index">
            <div class="col-6">
              <input class="form-control" type="text" formControlName="name" />
            </div>
            <div class="col-6">
              <app-d6-pip-input formControlName="value"></app-d6-pip-input>
            </div>
          </div>
        }
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
export class D6AttributeModalComponent {
  private router = inject(Router);
  dialogRef = inject<DialogRef<D6Attribute | null>>(DialogRef);
  data = inject<D6AttributeModal>(DIALOG_DATA);

  form: FormGroup = new FormGroup({
    value: new FormControl(this.data.attribute.value, [Validators.required, Validators.min(0)]),
    skills: new FormArray(
      this.data.attribute.skills.map(
        (skill) =>
          new FormGroup({
            name: new FormControl(skill.name),
            value: new FormControl(skill.value, [Validators.required, Validators.min(0)]),
          }),
      ),
    ),
  });

  protected onConfirm($event: boolean) {
    this.router.navigate([], { fragment: undefined });
    this.dialogRef.close($event ? this.form.value : null);
  }
}
