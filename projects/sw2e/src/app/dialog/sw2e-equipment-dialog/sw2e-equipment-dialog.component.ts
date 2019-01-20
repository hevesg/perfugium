import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Sw2eInventory} from '../../interface/sw2e-inventory';
import {UpdateDialog} from '../../../../../../src/app/perfugium/interface/update-dialog';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
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
    console.log(this.data);
    const equipments = this.data.equipment.map((x) => this.addEquipment(x));

    this.formGroup = this.formBuilder.group({
      equipments: this.formBuilder.array(equipments)
    });
  }

  public close() {
    this.dialogRef.close();
  }

  public save() {
    this.dialogRef.close();
  }

  public addEquipment(x: Equipment = null): FormGroup {
    return this.formBuilder.group({
      name : [ x.name, Validators.required ],
      quantity : x.quantity || 1
    });
  }

  public removeEquipment(index: number): void {
    // this.formGroup.controls.equipments.controls.get('equipments').controls.
    this.data.equipment.splice(index, 1);
  }

  private createEquipment(x: Equipment): FormGroup {
    return this.formBuilder.group({
      name : [ x.name, Validators.required ],
      quantity : x.quantity
    });
  }

}
