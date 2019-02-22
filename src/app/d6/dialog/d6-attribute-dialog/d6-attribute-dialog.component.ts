import {Component, Inject, OnInit} from '@angular/core';
import {UpdateDialog} from '../../../perfugium/interface/update-dialog';
import {D6Attribute} from '../../interface/d6-attribute';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {D6AttributeDialogData} from '../../interface/d6-attribute-dialog-data';
import {D6Skill} from '../../interface/d6-skill';
import {Sw2eInventory} from '../../../../../projects/sw2e/src/app/interface/sw2e-inventory';
import {Utils} from '../../../perfugium/utils/utils';

@Component({
  selector: 'prf-d6-attribute-dialog',
  templateUrl: './d6-attribute-dialog.component.html',
  styleUrls: ['./d6-attribute-dialog.component.scss']
})
export class D6AttributeDialogComponent implements OnInit, UpdateDialog<D6Attribute> {

  formGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<D6AttributeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: D6AttributeDialogData,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      attr: this.data.attribute.attr,
      skills: this.formBuilder.array(
        this.data.attribute.skills.map((x) => this._createSkill(x))
      )
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    const rawData: D6Attribute = this.formGroup.getRawValue();
    rawData.skills = Utils.sortByName(rawData.skills);
    this.dialogRef.close(rawData);
  }

  private _createSkill(x: D6Skill = null): FormGroup {
    return this.formBuilder.group({
      name: [x.name, Validators.required],
      value: x.value ? x.value : this.data.attribute.attr
    });
  }

  public addSkill(): void {
    (this.formGroup.get('skills') as FormArray).insert(0, this._createSkill({ name: undefined, value: this.formGroup.get('attr').value}));
  }

  public removeSkill(index: number): void {
    const array: FormArray = (this.formGroup.get('skills') as FormArray);
    array.at(index).clearValidators();
    array.controls.splice(index, 1);
  }
}
