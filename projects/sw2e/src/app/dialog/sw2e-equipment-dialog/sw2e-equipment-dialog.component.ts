import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Sw2eInventory} from '../../interface/sw2e-inventory';
import {UpdateDialog} from '../../../../../../src/app/perfugium/interface/update-dialog';
import {FormGroup, FormBuilder, Validators, FormArray} from '@angular/forms';
import {Equipment} from '../../../../../../src/app/perfugium/interface/equipment';
import {Utils} from '../../../../../../src/app/perfugium/utils/utils';

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
    this.formGroup = this.formBuilder.group({
      equipment: this.formBuilder.array(
        this.data.equipment.map((x) => this._createEquipment(x))
      ),
      credits: this.data.credits
    });
  }

  public close() {
    this.dialogRef.close();
  }

  public save() {
    const rawData: Sw2eInventory = this.formGroup.getRawValue();
    rawData.equipment = Utils.sortByName(rawData.equipment);
    rawData.equipment = rawData.equipment.map((x) => {
      return {
        name: x.name,
        quantity: x.quantity > 1 ? x.quantity : null
      };
    });
    this.dialogRef.close(rawData);
  }

  private _createEquipment(x: Equipment = null): FormGroup {
    return this.formBuilder.group({
      name : [ x.name, Validators.required ],
      quantity : x.quantity || 1
    });
  }

  public addEquipment(): void {
    (this.formGroup.get('equipment') as FormArray).insert(0, this._createEquipment({name: undefined}));
  }

  public removeEquipment(index: number): void {
    const array: FormArray = (this.formGroup.get('equipment') as FormArray);
    array.at(index).clearValidators();
    array.controls.splice(index, 1);
  }

}
