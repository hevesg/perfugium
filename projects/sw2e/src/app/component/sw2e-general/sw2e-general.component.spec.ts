import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Sw2eGeneralComponent } from './sw2e-general.component';

describe('Sw2eGeneralComponent', () => {
  let component: Sw2eGeneralComponent;
  let fixture: ComponentFixture<Sw2eGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Sw2eGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Sw2eGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
