import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NavbarComponent } from './navbar.component';

@Component({
  template: `<prf-navbar>{{ title }}</prf-navbar>`,
  standalone: false,
})
class TestHostComponent {
  title = 'Test Title';
}

describe('NavbarComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent, TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
  });

  it('projects content into navbar-brand', () => {
    fixture.detectChanges();

    const brandElement = fixture.debugElement.query(By.css('[data-qa="navbar-brand"]'));
    expect(brandElement.nativeElement.textContent).toContain('Test Title');
  });

  it('updates projected content when host changes', () => {
    hostComponent.title = 'Updated Title';
    fixture.detectChanges();

    const brandElement = fixture.debugElement.query(By.css('[data-qa="navbar-brand"]'));
    expect(brandElement.nativeElement.textContent).toContain('Updated Title');
  });
});
