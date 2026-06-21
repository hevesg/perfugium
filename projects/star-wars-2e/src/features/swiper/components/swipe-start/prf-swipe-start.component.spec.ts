import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { SwiperModule } from '../../swiper-module';

@Component({
  standalone: false,
  template: `<prf-swipe-start><span data-qa="content">projected</span></prf-swipe-start>`,
})
class TestHostComponent {}

describe('PrfSwipeStartComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwiperModule],
      declarations: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('renders projected content', () => {
    const content = fixture.debugElement.query(By.css('[data-qa="content"]'));
    expect(content.nativeElement.textContent).toBe('projected');
  });
});
