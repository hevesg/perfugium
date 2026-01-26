import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { D6Weapon } from '../../model/d6-character';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

export interface D6WeaponsModal {
  title: string;
  value: D6Weapon[];
}

@Component({
  selector: 'app-d6-weapons-modal',
  standalone: false,
  templateUrl: './d6-weapons-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    :host {
      display: block;
    }
  `,
})
export class D6WeaponsModalComponent {
  dialogRef = inject<DialogRef<D6Weapon[] | null>>(DialogRef);
  data = inject<D6WeaponsModal>(DIALOG_DATA);

  form: FormGroup = new FormGroup({
    weapons: new FormArray(
      this.data.value.map(
        (weapon) =>
          new FormGroup({
            name: new FormControl(weapon.name, [Validators.required]),
            damage: new FormControl(weapon.damage, [Validators.required, Validators.min(0)]),
            range: new FormGroup({
              pb: new FormControl(weapon.range?.pb),
              short: new FormControl(weapon.range?.short),
              medium: new FormControl(weapon.range?.medium),
              long: new FormControl(weapon.range?.long),
            }),
            difficulty: new FormControl(weapon.difficulty),
            charge: new FormControl(weapon.charge),
            strength: new FormControl(weapon.strength ?? false),
          }),
      ),
    ),
  });

  get weaponsFormArray(): FormArray {
    return this.form.get('weapons') as FormArray;
  }

  protected onConfirm($event: boolean) {
    if (!$event) {
      this.dialogRef.close(null);
      return;
    }

    const weapons = this.weaponsFormArray.value.map((weapon: any) => {
      const result: D6Weapon = {
        name: weapon.name,
        damage: weapon.damage,
      };

      // Only include range if at least one range value is set
      if (weapon.range.pb || weapon.range.short || weapon.range.medium || weapon.range.long) {
        result.range = {};
        if (weapon.range.pb) result.range.pb = weapon.range.pb;
        if (weapon.range.short) result.range.short = weapon.range.short;
        if (weapon.range.medium) result.range.medium = weapon.range.medium;
        if (weapon.range.long) result.range.long = weapon.range.long;
      }

      if (weapon.difficulty !== null && weapon.difficulty !== undefined) {
        result.difficulty = weapon.difficulty;
      }

      if (weapon.charge !== null && weapon.charge !== undefined) {
        result.charge = weapon.charge;
      }

      if (weapon.strength) {
        result.strength = true;
      }

      return result;
    });

    this.dialogRef.close(weapons);
  }
}
