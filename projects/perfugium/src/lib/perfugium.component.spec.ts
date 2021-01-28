import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PerfugiumComponent} from './perfugium.component';

describe('PerfugiumComponent', () => {
  let component: PerfugiumComponent;
  let fixture: ComponentFixture<PerfugiumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfugiumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfugiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
