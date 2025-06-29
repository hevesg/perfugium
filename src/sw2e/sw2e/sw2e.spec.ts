import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sw2e } from './sw2e';

describe('Sw2e', () => {
  let component: Sw2e;
  let fixture: ComponentFixture<Sw2e>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sw2e]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sw2e);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
