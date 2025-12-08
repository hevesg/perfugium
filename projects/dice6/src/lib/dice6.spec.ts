
import { Dice6 } from './dice6';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('Dice6', () => {
  let component: Dice6;
  let fixture: ComponentFixture<Dice6>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Dice6]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dice6);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
