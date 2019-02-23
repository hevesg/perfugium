import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { D6DifficultySelectorComponent } from './d6-difficulty-selector.component';

describe('D6DifficultySelectorComponent', () => {
  let component: D6DifficultySelectorComponent;
  let fixture: ComponentFixture<D6DifficultySelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ D6DifficultySelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(D6DifficultySelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
