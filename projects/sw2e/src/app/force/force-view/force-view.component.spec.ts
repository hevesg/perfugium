import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ForceViewComponent} from './force-view.component';
import {D6PipModule} from '../../../../../d6/src/lib/module/d6-pip/d6-pip.module';

describe('ForceViewComponent', () => {
  let component: ForceViewComponent;
  let fixture: ComponentFixture<ForceViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForceViewComponent ],
      imports: [ D6PipModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForceViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
