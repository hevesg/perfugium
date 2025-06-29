import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sw2eCharacterSheet } from './sw2e-character-sheet';

describe('Sw2eCharacterSheet', () => {
  let component: Sw2eCharacterSheet;
  let fixture: ComponentFixture<Sw2eCharacterSheet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sw2eCharacterSheet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sw2eCharacterSheet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
