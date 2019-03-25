import { Component, OnInit } from '@angular/core';
import {Sw2eCharacterService} from '../../service/sw2e-character.service';
import {ActivatedRoute} from '@angular/router';
import {Sw2eCharacter} from '../../interface/sw2e-character';
import {MatDialog} from '@angular/material';
import {Sw2eEquipmentDialogComponent} from '../../dialog/sw2e-equipment-dialog/sw2e-equipment-dialog.component';
import {D6Attribute} from '../../../../../../src/app/d6/interface/d6-attribute';
import {D6WeaponsDialogComponent} from '../../../../../../src/app/d6/dialog/d6-weapons-dialog/d6-weapons-dialog.component';

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

  public openEquipmentDialog() {
    const dialog = this.dialog.open(Sw2eEquipmentDialogComponent, { data: this.data.inventory});

    dialog.afterClosed().subscribe((x) => {
      if (x) {
        this.data.inventory = x;
        this.character.save();
      }
    });
  }

  public openWeaponsDialog() {
    const dialog = this.dialog.open(D6WeaponsDialogComponent, { data: this.data.weapons});

    dialog.afterClosed().subscribe((x) => {
      if (x) {
        this.data.weapons = x;
        this.character.save();
      }
    });
  }

  public saveAttribute(attribute: string, value: D6Attribute): void {
    this.data.attributes[attribute] = value;
    this.character.save();
  }
}
