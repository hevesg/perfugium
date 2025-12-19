import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D6AttributeComponent } from './d6-attribute.component';

describe('D6Attribute', () => {
  let component: D6AttributeComponent;
  let fixture: ComponentFixture<D6AttributeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [D6AttributeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(D6AttributeComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
