import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberStepperComponent } from './number-stepper.component';

describe('NumberStepperComponent', () => {
  let component: NumberStepperComponent;
  let fixture: ComponentFixture<NumberStepperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumberStepperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
