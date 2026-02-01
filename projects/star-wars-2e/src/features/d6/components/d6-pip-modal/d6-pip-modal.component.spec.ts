import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

import { D6PipModalComponent, D6PipModalData } from './d6-pip-modal.component';
import { D6Module } from '../../d6-module';

describe('D6PipModalComponent', () => {
  let component: D6PipModalComponent;
  let fixture: ComponentFixture<D6PipModalComponent>;
  let mockDialogRef: { close: jest.Mock };

  const mockDialogData: D6PipModalData = {
    title: 'Attribute Value',
    value: 12,
  };

  beforeEach(async () => {
    jest.useFakeTimers();

    mockDialogRef = { close: jest.fn() };

    await TestBed.configureTestingModule({
      imports: [D6Module],
      providers: [
        { provide: DIALOG_DATA, useValue: mockDialogData },
        { provide: DialogRef, useValue: mockDialogRef },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(D6PipModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('form initialization', () => {
    it('initializes form with data value', () => {
      expect(component.form.get('value')?.value).toBe(12);
    });
  });

  describe('form validation', () => {
    it('requires value', () => {
      component.form.get('value')?.setValue(null);
      expect(component.form.get('value')?.valid).toBe(false);
    });

    it('requires value to be non-negative', () => {
      component.form.get('value')?.setValue(-1);
      expect(component.form.get('value')?.valid).toBe(false);
    });
  });

  describe('onConfirm', () => {
    it('closes dialog with form value when confirmed', () => {
      component.form.get('value')?.setValue(15);

      component['onConfirm'](true);

      expect(mockDialogRef.close).toHaveBeenCalledWith(15);
    });

    it('closes dialog with null when cancelled', () => {
      component['onConfirm'](false);

      expect(mockDialogRef.close).toHaveBeenCalledWith(null);
    });
  });

  describe('template rendering', () => {
    const waitForKeyboardActivation = () => jest.advanceTimersByTime(25);

    it('displays the modal title', () => {
      waitForKeyboardActivation();
      fixture.detectChanges();

      const modalHeader = fixture.debugElement.query(By.css('.modal-title'));
      expect(modalHeader.nativeElement.textContent).toBe('Attribute Value');
    });

    it('renders pip stepper', () => {
      waitForKeyboardActivation();
      fixture.detectChanges();

      const stepper = fixture.debugElement.query(By.css('app-d6-pip-stepper'));
      expect(stepper).toBeTruthy();
    });
  });
});
