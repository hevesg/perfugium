import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

import { GeneralDataModalComponent, GeneralDataModal } from './general-data-modal.component';
import { GeneralData } from '../general-data/general-data.component';

describe('GeneralDataModalComponent', () => {
  let component: GeneralDataModalComponent;
  let fixture: ComponentFixture<GeneralDataModalComponent>;
  let mockDialogRef: { close: jest.Mock };

  const mockGeneralData: GeneralData = {
    gender: 'Male',
    species: 'Human',
    homeWorld: 'Tatooine',
    age: 19,
    height: 172,
    weight: 73,
    physicalDescription: 'Blond hair, blue eyes',
    personality: 'Hopeful and determined',
    background: 'Farm boy from Tatooine',
    objectives: 'Become a Jedi Knight',
    quote: 'I have a bad feeling about this',
  };

  const mockDialogData: GeneralDataModal = {
    title: 'General Information',
    value: mockGeneralData,
  };

  beforeEach(async () => {
    jest.useFakeTimers();

    mockDialogRef = { close: jest.fn() };

    await TestBed.configureTestingModule({
      imports: [GeneralDataModalComponent],
      providers: [
        { provide: DIALOG_DATA, useValue: mockDialogData },
        { provide: DialogRef, useValue: mockDialogRef },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GeneralDataModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('form initialization', () => {
    it('initializes gender with provided value', () => {
      expect(component.form.get('gender')?.value).toBe('Male');
    });

    it('initializes species with provided value', () => {
      expect(component.form.get('species')?.value).toBe('Human');
    });

    it('initializes homeWorld with provided value', () => {
      expect(component.form.get('homeWorld')?.value).toBe('Tatooine');
    });

    it('initializes age with provided value', () => {
      expect(component.form.get('age')?.value).toBe(19);
    });

    it('initializes height with provided value', () => {
      expect(component.form.get('height')?.value).toBe(172);
    });

    it('initializes weight with provided value', () => {
      expect(component.form.get('weight')?.value).toBe(73);
    });

    it('initializes physicalDescription with provided value', () => {
      expect(component.form.get('physicalDescription')?.value).toBe('Blond hair, blue eyes');
    });

    it('initializes personality with provided value', () => {
      expect(component.form.get('personality')?.value).toBe('Hopeful and determined');
    });

    it('initializes background with provided value', () => {
      expect(component.form.get('background')?.value).toBe('Farm boy from Tatooine');
    });

    it('initializes objectives with provided value', () => {
      expect(component.form.get('objectives')?.value).toBe('Become a Jedi Knight');
    });

    it('initializes quote with provided value', () => {
      expect(component.form.get('quote')?.value).toBe('I have a bad feeling about this');
    });
  });

  describe('onConfirm', () => {
    it('closes dialog with form value when confirmed', () => {
      component.form.get('species')?.setValue('Wookiee');

      component['onConfirm'](true);

      expect(mockDialogRef.close).toHaveBeenCalledWith(
        expect.objectContaining({ species: 'Wookiee' })
      );
    });

    it('closes dialog with all form values when confirmed', () => {
      component['onConfirm'](true);

      expect(mockDialogRef.close).toHaveBeenCalledWith({
        gender: 'Male',
        species: 'Human',
        homeWorld: 'Tatooine',
        age: 19,
        height: 172,
        weight: 73,
        physicalDescription: 'Blond hair, blue eyes',
        personality: 'Hopeful and determined',
        background: 'Farm boy from Tatooine',
        objectives: 'Become a Jedi Knight',
        quote: 'I have a bad feeling about this',
      });
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
      expect(modalHeader.nativeElement.textContent).toBe('General Information');
    });

    it('renders gender input', () => {
      waitForKeyboardActivation();
      fixture.detectChanges();

      const input = fixture.debugElement.query(By.css('#gender'));
      expect(input).toBeTruthy();
      expect(input.nativeElement.value).toBe('Male');
    });

    it('renders species input', () => {
      waitForKeyboardActivation();
      fixture.detectChanges();

      const input = fixture.debugElement.query(By.css('#species'));
      expect(input).toBeTruthy();
      expect(input.nativeElement.value).toBe('Human');
    });

    it('renders homeWorld input', () => {
      waitForKeyboardActivation();
      fixture.detectChanges();

      const input = fixture.debugElement.query(By.css('#homeWorld'));
      expect(input).toBeTruthy();
      expect(input.nativeElement.value).toBe('Tatooine');
    });

    it('renders age input as number', () => {
      waitForKeyboardActivation();
      fixture.detectChanges();

      const input = fixture.debugElement.query(By.css('#age'));
      expect(input).toBeTruthy();
      expect(input.nativeElement.type).toBe('number');
    });

    it('renders height input as number', () => {
      waitForKeyboardActivation();
      fixture.detectChanges();

      const input = fixture.debugElement.query(By.css('#height'));
      expect(input).toBeTruthy();
      expect(input.nativeElement.type).toBe('number');
    });

    it('renders weight input as number', () => {
      waitForKeyboardActivation();
      fixture.detectChanges();

      const input = fixture.debugElement.query(By.css('#weight'));
      expect(input).toBeTruthy();
      expect(input.nativeElement.type).toBe('number');
    });

    it('renders physicalDescription textarea', () => {
      waitForKeyboardActivation();
      fixture.detectChanges();

      const textarea = fixture.debugElement.query(By.css('#physicalDescription'));
      expect(textarea).toBeTruthy();
      expect(textarea.nativeElement.tagName.toLowerCase()).toBe('textarea');
    });

    it('renders personality textarea', () => {
      waitForKeyboardActivation();
      fixture.detectChanges();

      const textarea = fixture.debugElement.query(By.css('#personality'));
      expect(textarea).toBeTruthy();
      expect(textarea.nativeElement.tagName.toLowerCase()).toBe('textarea');
    });

    it('renders background textarea', () => {
      waitForKeyboardActivation();
      fixture.detectChanges();

      const textarea = fixture.debugElement.query(By.css('#background'));
      expect(textarea).toBeTruthy();
      expect(textarea.nativeElement.tagName.toLowerCase()).toBe('textarea');
    });

    it('renders objectives textarea', () => {
      waitForKeyboardActivation();
      fixture.detectChanges();

      const textarea = fixture.debugElement.query(By.css('#objectives'));
      expect(textarea).toBeTruthy();
      expect(textarea.nativeElement.tagName.toLowerCase()).toBe('textarea');
    });

    it('renders quote textarea', () => {
      waitForKeyboardActivation();
      fixture.detectChanges();

      const textarea = fixture.debugElement.query(By.css('#quote'));
      expect(textarea).toBeTruthy();
      expect(textarea.nativeElement.tagName.toLowerCase()).toBe('textarea');
    });
  });

  describe('with empty values', () => {
    beforeEach(async () => {
      const emptyData: GeneralDataModal = {
        title: 'New Character',
        value: {
          gender: '',
          species: '',
          homeWorld: '',
          age: 0,
          height: 0,
          weight: 0,
          physicalDescription: '',
          personality: '',
          background: '',
          objectives: '',
          quote: '',
        },
      };

      TestBed.resetTestingModule();

      await TestBed.configureTestingModule({
        imports: [GeneralDataModalComponent],
        providers: [
          { provide: DIALOG_DATA, useValue: emptyData },
          { provide: DialogRef, useValue: mockDialogRef },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(GeneralDataModalComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('initializes form with empty values', () => {
      expect(component.form.get('gender')?.value).toBe('');
      expect(component.form.get('species')?.value).toBe('');
      expect(component.form.get('age')?.value).toBe(0);
    });

    it('displays correct title for new character', () => {
      jest.advanceTimersByTime(25);
      fixture.detectChanges();

      const modalHeader = fixture.debugElement.query(By.css('.modal-title'));
      expect(modalHeader.nativeElement.textContent).toBe('New Character');
    });
  });
});
