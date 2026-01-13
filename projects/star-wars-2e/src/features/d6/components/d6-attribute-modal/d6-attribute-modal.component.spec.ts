import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D6AttributeModalComponent } from './d6-attribute-modal.component';

describe('D6AttributeModal', () => {
  let component: D6AttributeModalComponent;
  let fixture: ComponentFixture<D6AttributeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [D6AttributeModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(D6AttributeModalComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
