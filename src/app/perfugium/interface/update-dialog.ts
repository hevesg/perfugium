import {FormGroup} from '@angular/forms';

export interface UpdateDialog<T> {
  formGroup: FormGroup;
  close(): void;
  save(): void;
}
