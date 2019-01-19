import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Sw2eInventory} from '../../interface/sw2e-inventory';

@Component({
  selector: 'sw2e-equipment-dialog',
  templateUrl: './sw2e-equipment-dialog.component.html',
  styleUrls: ['./sw2e-equipment-dialog.component.scss']
})
export class Sw2eEquipmentDialogComponent {

  public dialogData: Sw2eInventory;

  constructor(
    public dialogRef: MatDialogRef<Sw2eEquipmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Sw2eInventory
  ) {
    console.log('const');
    this.dialogData = Object.assign({}, this.data);
  }

  public close() {
    this.dialogRef.close();
  }

  public save() {
    console.log(this.dialogData);
    this.dialogRef.close();
  }

  public addEquipment() {

  }

  public removeEquipment(index: number): void {
    this.dialogData.equipment.splice(index, 1);
    console.log(this.data);
    console.log(this.dialogData);
  }

  public addItem(index: number): void {
    let quantity = this.dialogData.equipment[index].quantity ? this.dialogData.equipment[index].quantity : 1;
    quantity++;
    this.dialogData.equipment[index].quantity = quantity;
  }

  public removeItem(index: number): void {
    if (this.dialogData.equipment[index].quantity > 1) {
      this.dialogData.equipment[index].quantity--;
    }
    if (this.dialogData.equipment[index].quantity === 1) {
      delete this.dialogData.equipment[index].quantity;
    }
  }

}
