import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ADI_GALLIA} from '../interface/mock/adi-gallia';
import {CharacterSheetComponent} from '../../../../perfugium/src/lib/module/character/character-sheet/character-sheet.component';
import {Sw2eCharacter} from '../interface/sw2e-character';

@Component({
  selector: 'app-sw2e-character-sheet',
  templateUrl: './sw2e-character-sheet.component.html',
  styleUrls: ['./sw2e-character-sheet.component.scss']
})
export class Sw2eCharacterSheetComponent extends CharacterSheetComponent implements OnInit {

  public formGroup: FormGroup = this.getFormGroup();

  public get character(): Sw2eCharacter {
    return this.formGroup.getRawValue() as Sw2eCharacter;
  }

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.formGroup.setValue(ADI_GALLIA, { emitEvent: false });
  }

  onClickName(): void {
    console.log('hello');
  }

  protected getFormGroup(): FormGroup {
    const fg: FormGroup = super.getFormGroup();
    fg.addControl('characterPoints', new FormControl());
    fg.addControl('attributes', new FormControl());
    fg.addControl('force', new FormControl());
    return fg;
  }
}
