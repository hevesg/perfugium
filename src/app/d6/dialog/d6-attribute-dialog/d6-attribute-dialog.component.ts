import {Component, Inject, OnInit} from '@angular/core';
import {UpdateDialog} from '../../../perfugium/interface/update-dialog';
import {D6Attribute} from '../../interface/d6-attribute';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {D6AttributeDialogData} from '../../interface/d6-attribute-dialog-data';
import {D6Skill} from '../../interface/d6-skill';

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
      attr: this.data.attribute.value,
      skills: this.formBuilder.array(
        this.data.attribute.skills.map((x) => this._createSkill(x))
      )
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    console.log(this.formGroup.getRawValue());
    // this.dialogRef.close();
  }

  private _createSkill(x: D6Skill = null): FormGroup {
    return this.formBuilder.group({
      name: [x.name, Validators.required],
      value: x.value ? x.value : this.data.attribute.value
    });
  }
}
