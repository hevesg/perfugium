import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

import { D6AttributeModalComponent, D6AttributeModal } from './d6-attribute-modal.component';
import { D6Module } from '../../d6-module';
import { D6Attribute } from '../../model/d6-character';

describe('D6AttributeModalComponent', () => {
  let component: D6AttributeModalComponent;
  let fixture: ComponentFixture<D6AttributeModalComponent>;
  let mockDialogRef: { close: jest.Mock };
  let mockRouter: { navigate: jest.Mock };

  const mockAttribute: D6Attribute = {
    value: 12,
    skills: [
      { name: 'Dodge', value: 15 },
      { name: 'Brawling', value: 14 },
    ],
  };

  const mockDialogData: D6AttributeModal = {
    title: 'Dexterity',
    attribute: mockAttribute,
  };

  beforeEach(async () => {
    jest.useFakeTimers();

    mockDialogRef = { close: jest.fn() };
    mockRouter = { navigate: jest.fn() };

    await TestBed.configureTestingModule({
      imports: [D6Module],
      providers: [
        { provide: DIALOG_DATA, useValue: mockDialogData },
        { provide: DialogRef, useValue: mockDialogRef },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(D6AttributeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('form initialization', () => {
    it('initializes form with attribute value', () => {
      expect(component.form.get('value')?.value).toBe(12);
    });

    it('initializes skills FormArray with correct number of skills', () => {
      const skillsArray = component.form.get('skills');
      expect(skillsArray?.value.length).toBe(2);
    });

    it('initializes each skill with correct name and value', () => {
      const skillsArray = component.form.get('skills');
      expect(skillsArray?.value[0]).toEqual({ name: 'Dodge', value: 15 });
      expect(skillsArray?.value[1]).toEqual({ name: 'Brawling', value: 14 });
    });
  });

  describe('form validation', () => {
    it('requires attribute value', () => {
      component.form.get('value')?.setValue(null);
      expect(component.form.get('value')?.valid).toBe(false);
    });

    it('requires attribute value to be non-negative', () => {
      component.form.get('value')?.setValue(-1);
      expect(component.form.get('value')?.valid).toBe(false);
    });
  });

  describe('onConfirm', () => {
    it('closes dialog with form value when confirmed', () => {
      component.form.get('value')?.setValue(15);

      component['onConfirm'](true);

      expect(mockDialogRef.close).toHaveBeenCalledWith({
        value: 15,
        skills: [
          { name: 'Dodge', value: 15 },
          { name: 'Brawling', value: 14 },
        ],
      });
    });

    it('closes dialog with null when cancelled', () => {
      component['onConfirm'](false);

      expect(mockDialogRef.close).toHaveBeenCalledWith(null);
    });

    it('navigates to clear the URL fragment', () => {
      component['onConfirm'](true);

      expect(mockRouter.navigate).toHaveBeenCalledWith([], { fragment: undefined });
    });
  });

  describe('template rendering', () => {
    const waitForKeyboardActivation = () => jest.advanceTimersByTime(25);

    it('displays the modal title', () => {
      waitForKeyboardActivation();
      fixture.detectChanges();

      const modalHeader = fixture.debugElement.query(By.css('.modal-title'));
      expect(modalHeader.nativeElement.textContent).toBe('Dexterity');
    });

    it('renders attribute value input', () => {
      waitForKeyboardActivation();
      fixture.detectChanges();

      const attributeInput = fixture.debugElement.query(
        By.css('[formControlName="value"]')
      );
      expect(attributeInput).toBeTruthy();
    });

    it('renders skill rows for each skill', () => {
      waitForKeyboardActivation();
      fixture.detectChanges();

      const skillRows = fixture.debugElement.queryAll(By.css('[formArrayName="skills"] .row'));
      expect(skillRows.length).toBe(2);
    });

    it('renders skill name inputs', () => {
      waitForKeyboardActivation();
      fixture.detectChanges();

      const skillNameInputs = fixture.debugElement.queryAll(
        By.css('[formArrayName="skills"] input[formControlName="name"]')
      );
      expect(skillNameInputs.length).toBe(2);
      expect(skillNameInputs[0].nativeElement.value).toBe('Dodge');
      expect(skillNameInputs[1].nativeElement.value).toBe('Brawling');
    });
  });

  describe('with empty skills', () => {
    beforeEach(async () => {
      const emptySkillsData: D6AttributeModal = {
        title: 'Strength',
        attribute: { value: 9, skills: [] },
      };

      TestBed.resetTestingModule();

      await TestBed.configureTestingModule({
        imports: [D6Module],
        providers: [
          { provide: DIALOG_DATA, useValue: emptySkillsData },
          { provide: DialogRef, useValue: mockDialogRef },
          { provide: Router, useValue: mockRouter },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(D6AttributeModalComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('initializes empty skills FormArray', () => {
      const skillsArray = component.form.get('skills');
      expect(skillsArray?.value.length).toBe(0);
    });

    it('does not render skill rows', () => {
      jest.advanceTimersByTime(25);
      fixture.detectChanges();

      const skillRows = fixture.debugElement.queryAll(By.css('[formArrayName="skills"] .row'));
      expect(skillRows.length).toBe(0);
    });
  });
});
