import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Sw2eEquipmentComponent } from './sw2e-equipment.component';

describe('Sw2eEquipmentComponent', () => {
  let component: Sw2eEquipmentComponent;
  let fixture: ComponentFixture<Sw2eEquipmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Sw2eEquipmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Sw2eEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
