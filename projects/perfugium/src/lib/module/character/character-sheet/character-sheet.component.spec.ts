import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CharacterSheetComponent} from './character-sheet.component';
import {Component} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  template: '<p>this is a charactersheet</p>'
})
// tslint:disable-next-line:component-class-suffix
export class ExtendedCharacterSheet extends CharacterSheetComponent {
  public formGroup: FormGroup = this.getFormGroup();
  constructor() {
    super();
  }
}

describe('CharacterSheetComponent', () => {
  let component: ExtendedCharacterSheet;
  let fixture: ComponentFixture<ExtendedCharacterSheet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtendedCharacterSheet ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendedCharacterSheet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have formGroup variable', () => {
    expect(component.formGroup).toBeTruthy();
  });

  it('should have formGroup variable with default values', () => {
    expect(component.formGroup.getRawValue()).toEqual({ name: null, description: null, game: null});
  });
});
