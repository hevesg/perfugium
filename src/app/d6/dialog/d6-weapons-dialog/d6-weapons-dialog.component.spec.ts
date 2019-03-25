import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { D6WeaponsDialogComponent } from './d6-weapons-dialog.component';

describe('D6WeaponsDialogComponent', () => {
  let component: D6WeaponsDialogComponent;
  let fixture: ComponentFixture<D6WeaponsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ D6WeaponsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(D6WeaponsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
