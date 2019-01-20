import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Sw2eInventory} from '../../interface/sw2e-inventory';
import {UpdateDialog} from '../../../../../../src/app/perfugium/interface/update-dialog';
import {FormGroup, FormBuilder, Validators, FormArray} from '@angular/forms';
import {Equipment} from '../../../../../../src/app/perfugium/interface/equipment';

@Component({
  selector: 'sw2e-equipment-dialog',
  templateUrl: './sw2e-equipment-dialog.component.html',
  styleUrls: ['./sw2e-equipment-dialog.component.scss']
})
export class Sw2eEquipmentDialogComponent implements OnInit, UpdateDialog<Sw2eInventory> {

  public formGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<Sw2eEquipmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Sw2eInventory,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    const equipments = this.data.equipment.map((x) => this.addEquipment(x));

    this.formGroup = this.formBuilder.group({
      equipments: this.formBuilder.array(equipments)
    });
  }

  public close() {
    this.dialogRef.close();
  }

  public save() {
    this.data = this.formGroup.getRawValue();
    this.dialogRef.close(this.data);
  }

  public addEquipment(x: Equipment = null): FormGroup {
    return this.formBuilder.group({
      name : [ x.name, Validators.required ],
      quantity : x.quantity || 1
    });
  }

  public removeEquipment(index: number): void {
    const equipments: FormArray = this.formGroup.get('equipments') as FormArray;
    equipments.controls.splice(index, 1);
  }

}
