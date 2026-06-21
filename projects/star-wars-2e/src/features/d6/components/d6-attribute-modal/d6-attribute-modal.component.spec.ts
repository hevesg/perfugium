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
    value: mockAttribute,
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

    it('rejects attribute value below 3', () => {
      component.form.get('value')?.setValue(2);
      expect(component.form.get('value')?.valid).toBe(false);
    });

    it('accepts attribute value of 3', () => {
      component.form.get('value')?.setValue(3);
      expect(component.form.get('value')?.valid).toBe(true);
    });

    it('rejects skill value below attribute value', () => {
      component.skills.at(0).get('value')?.setValue(mockAttribute.value - 1);
      expect(component.skills.at(0).get('value')?.valid).toBe(false);
    });

    it('accepts skill value equal to attribute value', () => {
      component.skills.at(0).get('value')?.setValue(mockAttribute.value);
      expect(component.skills.at(0).get('value')?.valid).toBe(true);
    });

    it('rejects skill with empty name', () => {
      component.skills.at(0).get('name')?.setValue('');
      expect(component.skills.at(0).get('name')?.valid).toBe(false);
    });

    it('accepts skill with non-empty name', () => {
      component.skills.at(0).get('name')?.setValue('Dodge');
      expect(component.skills.at(0).get('name')?.valid).toBe(true);
    });
  });

  describe('onConfirm', () => {
    it('closes dialog with skills sorted alphabetically when confirmed', () => {
      component.form.get('value')?.setValue(15);

      component['onConfirm'](true);

      expect(mockDialogRef.close).toHaveBeenCalledWith({
        value: 15,
        skills: [
          { name: 'Brawling', value: 14 },
          { name: 'Dodge', value: 15 },
        ],
      });
    });

    it('sorts skills with more than two entries alphabetically', () => {
      component['addSkill']();
      component.skills.at(0).get('name')?.setValue('Alien Languages');

      component['onConfirm'](true);

      const closed = mockDialogRef.close.mock.calls[0][0];
      expect(closed.skills.map((s: { name: string }) => s.name)).toEqual([
        'Alien Languages',
        'Brawling',
        'Dodge',
      ]);
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

    it('sets aria-valuemin to 3 on the attribute stepper', () => {
      waitForKeyboardActivation();
      fixture.detectChanges();

      const stepperInputs = fixture.debugElement.queryAll(By.css('app-d6-pip-stepper input'));
      expect(stepperInputs[0].nativeElement.getAttribute('aria-valuemin')).toBe('3');
    });

    it('sets aria-valuemin to attribute value on skill steppers', () => {
      waitForKeyboardActivation();
      fixture.detectChanges();

      const stepperInputs = fixture.debugElement.queryAll(By.css('app-d6-pip-stepper input'));
      expect(stepperInputs[1].nativeElement.getAttribute('aria-valuemin')).toBe(String(mockAttribute.value));
      expect(stepperInputs[2].nativeElement.getAttribute('aria-valuemin')).toBe(String(mockAttribute.value));
    });

    it('disables attribute stepper decrease button at value 3', () => {
      component.form.get('value')?.setValue(3);
      waitForKeyboardActivation();
      fixture.detectChanges();

      const decreaseButtons = fixture.debugElement.queryAll(By.css('app-d6-pip-stepper button[aria-label="Decrease"]'));
      expect(decreaseButtons[0].nativeElement.disabled).toBe(true);
    });

    it('disables skill stepper decrease button at attribute value', () => {
      component.skills.at(0).get('value')?.setValue(mockAttribute.value);
      waitForKeyboardActivation();
      fixture.detectChanges();

      const decreaseButtons = fixture.debugElement.queryAll(By.css('app-d6-pip-stepper button[aria-label="Decrease"]'));
      expect(decreaseButtons[1].nativeElement.disabled).toBe(true);
    });

    it('enables Add Skill button when form is valid', () => {
      waitForKeyboardActivation();
      fixture.detectChanges();

      const addButton = fixture.debugElement.query(By.css('.btn-outline-secondary'));
      expect(addButton.nativeElement.disabled).toBe(false);
    });

    it('disables Add Skill button when form is invalid', () => {
      component.skills.at(0).get('name')?.setValue('');
      waitForKeyboardActivation();
      fixture.detectChanges();

      const addButton = fixture.debugElement.query(By.css('.btn-outline-secondary'));
      expect(addButton.nativeElement.disabled).toBe(true);
    });

    it('enables Confirm button when form is valid', () => {
      waitForKeyboardActivation();
      fixture.detectChanges();

      const confirmButton = fixture.debugElement.query(By.css('.btn-primary'));
      expect(confirmButton.nativeElement.disabled).toBe(false);
    });

    it('disables Confirm button when form is invalid', () => {
      component.skills.at(0).get('name')?.setValue('');
      waitForKeyboardActivation();
      fixture.detectChanges();

      const confirmButton = fixture.debugElement.query(By.css('.btn-primary'));
      expect(confirmButton.nativeElement.disabled).toBe(true);
    });

    it('adds is-invalid class to attribute stepper when value is invalid', () => {
      component.form.get('value')?.setValue(2);
      waitForKeyboardActivation();
      fixture.detectChanges();

      const attributeStepper = fixture.debugElement.queryAll(By.css('app-d6-pip-stepper'))[0];
      expect(attributeStepper.nativeElement.classList).toContain('is-invalid');
    });

    it('does not add is-invalid class to attribute stepper when value is valid', () => {
      waitForKeyboardActivation();
      fixture.detectChanges();

      const attributeStepper = fixture.debugElement.queryAll(By.css('app-d6-pip-stepper'))[0];
      expect(attributeStepper.nativeElement.classList).not.toContain('is-invalid');
    });

    it('adds is-invalid class to skill name input when name is empty', () => {
      component.skills.at(0).get('name')?.setValue('');
      waitForKeyboardActivation();
      fixture.detectChanges();

      const skillNameInputs = fixture.debugElement.queryAll(
        By.css('[formArrayName="skills"] input[formControlName="name"]'),
      );
      expect(skillNameInputs[0].nativeElement.classList).toContain('is-invalid');
    });

    it('does not add is-invalid class to skill name input when name is non-empty', () => {
      waitForKeyboardActivation();
      fixture.detectChanges();

      const skillNameInputs = fixture.debugElement.queryAll(
        By.css('[formArrayName="skills"] input[formControlName="name"]'),
      );
      expect(skillNameInputs[0].nativeElement.classList).not.toContain('is-invalid');
    });

    it('adds is-invalid class to skill value stepper when value is below attribute value', () => {
      component.skills.at(0).get('value')?.setValue(mockAttribute.value - 1);
      waitForKeyboardActivation();
      fixture.detectChanges();

      const skillSteppers = fixture.debugElement.queryAll(
        By.css('[formArrayName="skills"] app-d6-pip-stepper'),
      );
      expect(skillSteppers[0].nativeElement.classList).toContain('is-invalid');
    });

    it('does not add is-invalid class to skill value stepper when value is valid', () => {
      waitForKeyboardActivation();
      fixture.detectChanges();

      const skillSteppers = fixture.debugElement.queryAll(
        By.css('[formArrayName="skills"] app-d6-pip-stepper'),
      );
      expect(skillSteppers[0].nativeElement.classList).not.toContain('is-invalid');
    });
  });

  describe('addSkill', () => {
    it('inserts a new skill at index 0', () => {
      component['addSkill']();

      expect(component.skills.length).toBe(3);
      expect(component.skills.at(0).value).toEqual({ name: '', value: mockAttribute.value });
    });

    it('preserves existing skills after the new one', () => {
      component['addSkill']();

      expect(component.skills.at(1).value).toEqual({ name: 'Dodge', value: 15 });
      expect(component.skills.at(2).value).toEqual({ name: 'Brawling', value: 14 });
    });

    it('adds multiple skills each at index 0', () => {
      component['addSkill']();
      component['addSkill']();

      expect(component.skills.length).toBe(4);
      expect(component.skills.at(0).value).toEqual({ name: '', value: mockAttribute.value });
      expect(component.skills.at(1).value).toEqual({ name: '', value: mockAttribute.value });
      expect(component.skills.at(2).value).toEqual({ name: 'Dodge', value: 15 });
    });

    it('renders the new skill row as first in the template', () => {
      jest.advanceTimersByTime(25);
      fixture.detectChanges();

      const addButton = fixture.debugElement.query(By.css('.btn-outline-secondary'));
      addButton.nativeElement.click();
      fixture.detectChanges();

      const skillNameInputs = fixture.debugElement.queryAll(
        By.css('[formArrayName="skills"] input[formControlName="name"]')
      );
      expect(skillNameInputs.length).toBe(3);
      expect(skillNameInputs[0].nativeElement.value).toBe('');
      expect(skillNameInputs[1].nativeElement.value).toBe('Dodge');
      expect(skillNameInputs[2].nativeElement.value).toBe('Brawling');
    });

    it('new skill name is invalid when empty', () => {
      component['addSkill']();

      const newSkillName = component.skills.at(0).get('name');
      expect(newSkillName?.valid).toBe(false);
    });

    it('new skill name is valid when non-empty', () => {
      component['addSkill']();

      const newSkillName = component.skills.at(0).get('name');
      newSkillName?.setValue('Piloting');
      expect(newSkillName?.valid).toBe(true);
    });

    it('new skill has required and min(attribute value) validators on value', () => {
      component['addSkill']();

      const newSkillValue = component.skills.at(0).get('value');
      newSkillValue?.setValue(null);
      expect(newSkillValue?.valid).toBe(false);

      newSkillValue?.setValue(mockAttribute.value - 1);
      expect(newSkillValue?.valid).toBe(false);

      newSkillValue?.setValue(mockAttribute.value);
      expect(newSkillValue?.valid).toBe(true);
    });
  });

  describe('with empty skills', () => {
    beforeEach(async () => {
      const emptySkillsData: D6AttributeModal = {
        title: 'Strength',
        value: { value: 9, skills: [] },
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
