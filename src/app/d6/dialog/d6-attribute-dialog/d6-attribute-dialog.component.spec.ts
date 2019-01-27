import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { D6AttributeDialogComponent } from './d6-attribute-dialog.component';

describe('D6AttributeDialogComponent', () => {
  let component: D6AttributeDialogComponent;
  let fixture: ComponentFixture<D6AttributeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ D6AttributeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(D6AttributeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
