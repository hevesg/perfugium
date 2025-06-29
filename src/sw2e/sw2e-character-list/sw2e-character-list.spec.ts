import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sw2eCharacterList } from './sw2e-character-list';

describe('Sw2eCharacterList', () => {
  let component: Sw2eCharacterList;
  let fixture: ComponentFixture<Sw2eCharacterList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sw2eCharacterList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sw2eCharacterList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
