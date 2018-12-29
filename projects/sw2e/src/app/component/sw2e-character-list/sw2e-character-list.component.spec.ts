import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Sw2eCharacterListComponent } from './sw2e-character-list.component';

describe('Sw2eCharacterListComponent', () => {
  let component: Sw2eCharacterListComponent;
  let fixture: ComponentFixture<Sw2eCharacterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Sw2eCharacterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Sw2eCharacterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
