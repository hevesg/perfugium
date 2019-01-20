import { Component, OnInit } from '@angular/core';
import {Sw2eCharacterService} from '../../service/sw2e-character.service';
import {ActivatedRoute} from '@angular/router';
import {Sw2eCharacter} from '../../interface/sw2e-character';
import {MatDialog} from '@angular/material';
import {Sw2eEquipmentDialogComponent} from '../../dialog/sw2e-equipment-dialog/sw2e-equipment-dialog.component';

@Component({
  selector: 'sw2e-character-sheet',
  templateUrl: './sw2e-character-sheet.component.html',
  styleUrls: ['./sw2e-character-sheet.component.scss']
})
export class Sw2eCharacterSheetComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private character: Sw2eCharacterService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.character.load(this.route.snapshot.paramMap.get('id'));
    console.log(this.character.data);
  }

  public get data(): Sw2eCharacter {
    return this.character.data;
  }

  openEquipmentDialog() {
    this.dialog.open(Sw2eEquipmentDialogComponent, { data: this.data.inventory} );
  }

}
