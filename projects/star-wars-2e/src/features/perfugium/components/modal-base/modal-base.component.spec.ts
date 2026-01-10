import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ModalBaseComponent } from './modal-base.component';

describe('ModalBaseComponent', () => {
  let component: ModalBaseComponent;
  let fixture: ComponentFixture<ModalBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalBaseComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates the component', () => {
    expect(component).toBeTruthy();
  });

  describe('modal title', () => {
    it('displays the title when provided', () => {
      fixture.componentRef.setInput('modalTitle', 'Test Title');
      fixture.detectChanges();

      const titleElement = fixture.debugElement.query(By.css('.modal-title'));
      expect(titleElement).toBeTruthy();
      expect(titleElement.nativeElement.textContent).toBe('Test Title');
    });

    it('hides the header when no title is provided', () => {
      fixture.detectChanges();

      const headerElement = fixture.debugElement.query(By.css('.modal-header'));
      expect(headerElement).toBeNull();
    });
  });

  describe('Cancel button', () => {
    it('emits false on mouse click', () => {
      const confirmSpy = jest.spyOn(component.confirm, 'emit');
      const cancelButton = fixture.debugElement.query(By.css('.btn-secondary'));

      cancelButton.triggerEventHandler('click', { detail: 1 } as MouseEvent);

      expect(confirmSpy).toHaveBeenCalledWith(false);
    });

    it('does not emit on keyboard-triggered click (detail === 0)', () => {
      const confirmSpy = jest.spyOn(component.confirm, 'emit');
      const cancelButton = fixture.debugElement.query(By.css('.btn-secondary'));

      cancelButton.triggerEventHandler('click', { detail: 0 } as MouseEvent);

      expect(confirmSpy).not.toHaveBeenCalled();
    });
  });

  describe('Confirm button', () => {
    it('emits true on mouse click', () => {
      const confirmSpy = jest.spyOn(component.confirm, 'emit');
      const confirmButton = fixture.debugElement.query(By.css('.btn-primary'));

      confirmButton.triggerEventHandler('click', { detail: 1 } as MouseEvent);

      expect(confirmSpy).toHaveBeenCalledWith(true);
    });

    it('does not emit on keyboard-triggered click (detail === 0)', () => {
      const confirmSpy = jest.spyOn(component.confirm, 'emit');
      const confirmButton = fixture.debugElement.query(By.css('.btn-primary'));

      confirmButton.triggerEventHandler('click', { detail: 0 } as MouseEvent);

      expect(confirmSpy).not.toHaveBeenCalled();
    });
  });

  describe('keyboard shortcuts', () => {
    it('emits false on Escape key', () => {
      const confirmSpy = jest.spyOn(component.confirm, 'emit');

      document.dispatchEvent(new KeyboardEvent('keyup', { key: 'Escape' }));

      expect(confirmSpy).toHaveBeenCalledWith(false);
    });

    it('emits true on Enter key', () => {
      const confirmSpy = jest.spyOn(component.confirm, 'emit');

      document.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter' }));

      expect(confirmSpy).toHaveBeenCalledWith(true);
    });
  });
});
