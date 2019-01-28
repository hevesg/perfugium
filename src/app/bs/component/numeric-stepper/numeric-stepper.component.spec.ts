import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumericStepperComponent } from './numeric-stepper.component';

describe('NumericStepperComponent', () => {
  let component: NumericStepperComponent;
  let fixture: ComponentFixture<NumericStepperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumericStepperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumericStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
