import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Sw2eWeaponsComponent } from './sw2e-weapons.component';

describe('Sw2eWeaponsComponent', () => {
  let component: Sw2eWeaponsComponent;
  let fixture: ComponentFixture<Sw2eWeaponsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Sw2eWeaponsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Sw2eWeaponsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
