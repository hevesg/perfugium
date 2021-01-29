import {ComponentFixture, TestBed} from '@angular/core/testing';

import {D6SkillViewComponent} from './d6-skill-view.component';

describe('D6SkillViewComponent', () => {
  let component: D6SkillViewComponent;
  let fixture: ComponentFixture<D6SkillViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ D6SkillViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(D6SkillViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
