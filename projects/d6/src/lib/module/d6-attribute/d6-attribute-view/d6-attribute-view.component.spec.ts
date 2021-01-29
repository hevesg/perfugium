import {ComponentFixture, TestBed} from '@angular/core/testing';

import {D6AttributeViewComponent} from './d6-attribute-view.component';
import {D6PipModule} from '../../d6-pip/d6-pip.module';

describe('D6AttributeViewComponent', () => {
  let component: D6AttributeViewComponent;
  let fixture: ComponentFixture<D6AttributeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ D6AttributeViewComponent ],
      imports: [
        D6PipModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(D6AttributeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
