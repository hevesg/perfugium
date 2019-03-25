import {Component, Inject, OnInit} from '@angular/core';
import {UpdateDialog} from '../../../perfugium/interface/update-dialog';
import {D6Weapon} from '../../interface/d6-weapon';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {D6Difficulty} from '../../enum/d6-difficulty.enum';

@Component({
  selector: 'prf-d6-weapons-dialog',
  templateUrl: './d6-weapons-dialog.component.html',
  styleUrls: ['./d6-weapons-dialog.component.scss']
})
export class D6WeaponsDialogComponent implements OnInit, UpdateDialog<D6Weapon[]> {

  formGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<D6WeaponsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: D6Weapon[],
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      weapons: this.formBuilder.array(
        this.data.map((x) => this._createWeapons(x))
      )
    });
    console.log(this.formGroup.getRawValue());
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
  }

  private _createWeapons(x: D6Weapon = null): FormGroup {
    return this.formBuilder.group({
      name : [ x.name, Validators.required ],
      damage : x.damage,
      ranged : !!x.range,
      range : x.range,
      charge : x.charge ? x.charge : 0,
      difficulty : x.difficulty
    });
  }

  public addWeapon(): void {
    (this.formGroup.get('weapons') as FormArray)
      .insert(0, this._createWeapons({
        name: undefined,
        damage: 3,
        charge: 0,
        difficulty: D6Difficulty.VeryEasy
      }));
  }

  public removeWeapon(index: number): void {
    const array: FormArray = (this.formGroup.get('weapons') as FormArray);
    array.at(index).clearValidators();
    array.controls.splice(index, 1);
  }
}
