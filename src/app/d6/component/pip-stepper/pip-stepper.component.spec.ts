import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PipStepperComponent } from './pip-stepper.component';

describe('PipStepperComponent', () => {
  let component: PipStepperComponent;
  let fixture: ComponentFixture<PipStepperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PipStepperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PipStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
