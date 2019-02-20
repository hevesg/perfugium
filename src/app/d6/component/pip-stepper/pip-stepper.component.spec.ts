import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PipStepperComponent } from './pip-stepper.component';
import {PipPipe} from '../../pipe/pip.pipe';

describe('PipStepperComponent', () => {
  let component: PipStepperComponent;
  let fixture: ComponentFixture<PipStepperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PipStepperComponent, PipPipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PipStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be the same as parent Numeric Stepper', () => {
    expect(component).toBeTruthy();
  });
});
