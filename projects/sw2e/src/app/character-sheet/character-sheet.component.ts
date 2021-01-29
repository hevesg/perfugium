import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ADI_GALLIA} from '../interface/mock/adi-gallia';

@Component({
  selector: 'app-character-sheet',
  templateUrl: './character-sheet.component.html',
  styleUrls: ['./character-sheet.component.scss']
})
export class CharacterSheetComponent implements OnInit {

  public formGroup: FormGroup = this.getFormGroup();

  public get name(): string {
    return this.formGroup.get('name')?.value;
  }
  constructor() { }

  ngOnInit(): void {
    this.formGroup.setValue(ADI_GALLIA, { emitEvent: false });
  }

  onClickName(): void {
    console.log('hello');
  }

  private getFormGroup(): FormGroup {
    return new FormGroup({
      name: new FormControl(),
      description: new FormControl(),
      game: new FormControl('sw2e'),
      characterPoints: new FormControl(),
      attributes: new FormControl(),
      force: new FormControl()
    });
  }
}
