import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { D6Attribute } from '../../model/d6-character';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

export interface D6AttributeModal {
  title: string;
  value: D6Attribute;
}

@Component({
  selector: 'app-d6-attribute-modal',
  standalone: false,
  template: `
    <prf-confirm-modal [modalTitle]="data.title" (confirm)="onConfirm($event)" [formGroup]="form">
      <div class="row mb-2">
        <div class="col-6">
          <button class="btn btn-outline-secondary" type="button" (click)="addSkill()">Add Skill</button>
        </div>
        <div class="col-6">
          <app-d6-pip-stepper formControlName="value"></app-d6-pip-stepper>
        </div>
      </div>
      <div formArrayName="skills">
        @for (skill of skills.controls; track skill) {
          <div class="row mb-2" [formGroupName]="$index">
            <div class="col-6">
              <input class="form-control" type="text" formControlName="name" />
            </div>
            <div class="col-6">
              <app-d6-pip-stepper formControlName="value"></app-d6-pip-stepper>
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
  dialogRef = inject<DialogRef<D6Attribute | null>>(DialogRef);
  data = inject<D6AttributeModal>(DIALOG_DATA);

  form: FormGroup = new FormGroup({
    value: new FormControl(this.data.value.value, [Validators.required, Validators.min(3)]),
    skills: new FormArray(
      this.data.value.skills.map(
        (skill) =>
          new FormGroup({
            name: new FormControl(skill.name),
            value: new FormControl(skill.value, [Validators.required, Validators.min(0)]),
          }),
      ),
    ),
  });

  get skills(): FormArray {
    return this.form.get('skills') as FormArray;
  }

  protected addSkill() {
    this.skills.insert(0, new FormGroup({
      name: new FormControl(''),
      value: new FormControl(0, [Validators.required, Validators.min(0)]),
    }));
  }

  protected onConfirm($event: boolean) {
    this.dialogRef.close($event ? this.form.value : null);
  }
}
