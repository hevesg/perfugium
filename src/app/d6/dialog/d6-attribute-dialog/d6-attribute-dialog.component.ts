import {Component, Inject, OnInit} from '@angular/core';
import {UpdateDialog} from '../../../perfugium/interface/update-dialog';
import {D6Attribute} from '../../interface/d6-attribute';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {D6AttributeDialogData} from '../../interface/d6-attribute-dialog-data';

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
  ) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({});
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.dialogRef.close();
  }

}
