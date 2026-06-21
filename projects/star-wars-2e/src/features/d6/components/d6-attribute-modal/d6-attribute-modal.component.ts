import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
    <prf-confirm-modal [modalTitle]="data.title" (confirm)="onConfirm($event)" [formGroup]="form" [confirmDisabled]="form.invalid">
      <div class="row mb-2">
        <div class="col-6">
          <button class="btn btn-outline-secondary" type="button" (click)="addSkill()" [disabled]="form.invalid">Add Skill</button>
        </div>
        <div class="col-6">
          <app-d6-pip-stepper formControlName="value" [min]="3"
            [class.is-invalid]="form.get('value')?.invalid"></app-d6-pip-stepper>
        </div>
      </div>
      <div formArrayName="skills">
        @for (skill of skills.controls; track skill) {
          <prf-swipe-item class="mb-2" #swipeItem>
            <prf-swipe-end class="d-flex justify-content-center gap-2 bg-danger-subtle p-1 rounded-end">
              <button class="btn btn-danger btn-sm" type="button" (click)="deleteSkill($index)">Delete skill</button>
              <button class="btn btn-secondary btn-sm" type="button" (click)="swipeItem.close()">Cancel</button>
            </prf-swipe-end>
            <div class="row" [formGroupName]="$index">
              <div class="col-6">
                <input class="form-control" type="text" formControlName="name"
                  [class.is-invalid]="skill.get('name')?.invalid" />
              </div>
              <div class="col-6">
                <app-d6-pip-stepper formControlName="value" [min]="attributeValue()"
                  [class.is-invalid]="skill.get('value')?.invalid"></app-d6-pip-stepper>
              </div>
            </div>
          </prf-swipe-item>
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
  private cdr = inject(ChangeDetectorRef);

  readonly attributeValue = signal(this.data.value.value);

  form: FormGroup = new FormGroup({
    value: new FormControl(this.data.value.value, [Validators.required, Validators.min(3)]),
    skills: new FormArray(
      this.data.value.skills.map(
        (skill) =>
          new FormGroup({
            name: new FormControl(skill.name, [Validators.required]),
            value: new FormControl(skill.value, [Validators.required, Validators.min(this.data.value.value)]),
          }),
      ),
    ),
  });

  constructor() {
    this.form.get('value')!.valueChanges.pipe(takeUntilDestroyed()).subscribe((newMin: number) => {
      this.attributeValue.set(newMin);
      this.skills.controls.forEach((skillGroup) => {
        const valueControl = skillGroup.get('value')!;
        valueControl.setValidators([Validators.required, Validators.min(newMin)]);
        if (valueControl.value < newMin) {
          valueControl.setValue(newMin, { emitEvent: false });
        }
        valueControl.updateValueAndValidity({ emitEvent: false });
      });
    });
  }

  get skills(): FormArray {
    return this.form.get('skills') as FormArray;
  }

  protected deleteSkill(index: number) {
    this.skills.removeAt(index);
    this.cdr.markForCheck();
  }

  protected addSkill() {
    this.skills.insert(0, new FormGroup({
      name: new FormControl('', [Validators.required]),
      value: new FormControl(this.attributeValue(), [Validators.required, Validators.min(this.attributeValue())]),
    }));
  }

  protected onConfirm($event: boolean) {
    if (!$event) {
      this.dialogRef.close(null);
      return;
    }
    const value = this.form.value;
    value.skills = [...value.skills].sort((a: { name: string }, b: { name: string }) =>
      a.name.localeCompare(b.name),
    );
    this.dialogRef.close(value);
  }
}
