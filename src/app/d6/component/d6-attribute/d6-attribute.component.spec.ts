import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { D6AttributeComponent } from './d6-attribute.component';
import {PipPipe} from '../../pipe/pip.pipe';
import {MatDialogModule} from '@angular/material';

describe('D6AttributeComponent', () => {
  let component: D6AttributeComponent;
  let fixture: ComponentFixture<D6AttributeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ D6AttributeComponent, PipPipe ],
      imports: [
        MatDialogModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(D6AttributeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
