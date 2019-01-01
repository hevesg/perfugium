import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';

@Component({
  selector: 'sw2e-equipment-dialog',
  templateUrl: './sw2e-equipment-dialog.component.html',
  styleUrls: ['./sw2e-equipment-dialog.component.scss']
})
export class Sw2eEquipmentDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<Sw2eEquipmentDialogComponent>
  ) { }

  public close() {
    this.dialogRef.close();
  }

}
