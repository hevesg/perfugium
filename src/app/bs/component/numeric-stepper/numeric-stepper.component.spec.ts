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

  it('should increase value', () => {
    expect(component.maxDisabled).toBeFalsy();
    component.increase();
    expect(component.value).toEqual(1);
  });

  it('should decrease value', () => {
    expect(component.minDisabled).toBeFalsy();
    component.decrease();
    expect(component.value).toEqual(-1);
  });

  it('should not increase value if max is reached', () => {
    component.max = 0;
    expect(component.maxDisabled).toBeTruthy();

    component.increase();
    expect(component.value).toEqual(0);
  });

  it('should not decrease value if min is reached', () => {
    component.min = 0;
    expect(component.minDisabled).toBeTruthy();

    component.decrease();
    expect(component.value).toEqual(0);
  });
});
