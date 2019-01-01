import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Sw2eEquipmentDialogComponent } from './sw2e-equipment-dialog.component';

describe('Sw2eEquipmentDialogComponent', () => {
  let component: Sw2eEquipmentDialogComponent;
  let fixture: ComponentFixture<Sw2eEquipmentDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Sw2eEquipmentDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Sw2eEquipmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
