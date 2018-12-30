import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Sw2eCharacterSheetComponent } from './sw2e-character-sheet.component';

describe('Sw2eCharacterSheetComponent', () => {
  let component: Sw2eCharacterSheetComponent;
  let fixture: ComponentFixture<Sw2eCharacterSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Sw2eCharacterSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Sw2eCharacterSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
