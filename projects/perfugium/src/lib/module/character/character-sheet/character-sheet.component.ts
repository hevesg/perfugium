import {FormControl, FormGroup} from '@angular/forms';

export abstract class CharacterSheetComponent {

  constructor() {
  }

  protected getFormGroup(): FormGroup {
    return new FormGroup({
      name: new FormControl(),
      description: new FormControl(),
      game: new FormControl()
    });
  }

}
