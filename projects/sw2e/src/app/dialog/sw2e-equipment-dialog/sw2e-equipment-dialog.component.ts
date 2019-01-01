import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Sw2eInventory} from '../../interface/sw2e-inventory';

@Component({
  selector: 'sw2e-equipment-dialog',
  templateUrl: './sw2e-equipment-dialog.component.html',
  styleUrls: ['./sw2e-equipment-dialog.component.scss']
})
export class Sw2eEquipmentDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<Sw2eEquipmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Sw2eInventory
  ) { }

  public close() {
    this.dialogRef.close();
  }

}
