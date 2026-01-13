import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D6PipInputComponent } from './d6-pip-input.component';

describe('D6PipInput', () => {
  let component: D6PipInputComponent;
  let fixture: ComponentFixture<D6PipInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [D6PipInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(D6PipInputComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
