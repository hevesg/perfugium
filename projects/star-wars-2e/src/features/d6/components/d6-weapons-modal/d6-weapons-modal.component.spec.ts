import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

import { D6WeaponsModalComponent, D6WeaponsModal } from './d6-weapons-modal.component';
import { D6Module } from '../../d6-module';
import { D6Weapon } from '../../model/d6-character';

describe('D6WeaponsModalComponent', () => {
  let component: D6WeaponsModalComponent;
  let fixture: ComponentFixture<D6WeaponsModalComponent>;
  let mockDialogRef: { close: jest.Mock };

  const mockWeapons: D6Weapon[] = [
    {
      name: 'Blaster Pistol',
      damage: 12,
      range: { short: 25, medium: 50, long: 250 },
    },
    {
      name: 'Lightsaber',
      damage: 15,
      difficulty: 4,
    },
  ];

  const mockDialogData: D6WeaponsModal = {
    title: 'Weapons',
    value: mockWeapons,
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

    fixture = TestBed.createComponent(D6WeaponsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('form initialization', () => {
    it('initializes weapons FormArray with correct number of weapons', () => {
      expect(component.weaponsFormArray.length).toBe(2);
    });

    it('initializes each weapon with correct values', () => {
      const weapons = component.weaponsFormArray.value;
      expect(weapons[0].name).toBe('Blaster Pistol');
      expect(weapons[0].damage).toBe(12);
      expect(weapons[0].range.short).toBe(25);
      expect(weapons[1].name).toBe('Lightsaber');
      expect(weapons[1].damage).toBe(15);
      expect(weapons[1].difficulty).toBe(4);
    });
  });

  describe('form validation', () => {
    it('requires weapon name', () => {
      const firstWeapon = component.weaponsFormArray.at(0) as any;
      firstWeapon.get('name')?.setValue('');
      expect(firstWeapon.get('name')?.valid).toBe(false);
    });

    it('requires weapon damage', () => {
      const firstWeapon = component.weaponsFormArray.at(0) as any;
      firstWeapon.get('damage')?.setValue(null);
      expect(firstWeapon.get('damage')?.valid).toBe(false);
    });

    it('requires damage to be non-negative', () => {
      const firstWeapon = component.weaponsFormArray.at(0) as any;
      firstWeapon.get('damage')?.setValue(-1);
      expect(firstWeapon.get('damage')?.valid).toBe(false);
    });
  });

  describe('onConfirm', () => {
    it('closes dialog with weapons when confirmed', () => {
      component['onConfirm'](true);

      expect(mockDialogRef.close).toHaveBeenCalled();
      const result = mockDialogRef.close.mock.calls[0][0];
      expect(result.length).toBe(2);
      expect(result[0].name).toBe('Blaster Pistol');
      expect(result[0].damage).toBe(12);
      expect(result[0].range?.short).toBe(25);
      expect(result[1].name).toBe('Lightsaber');
      expect(result[1].damage).toBe(15);
      expect(result[1].difficulty).toBe(4);
    });

    it('closes dialog with null when cancelled', () => {
      component['onConfirm'](false);

      expect(mockDialogRef.close).toHaveBeenCalledWith(null);
    });

    it('omits empty range values', () => {
      const weaponWithEmptyRange = component.weaponsFormArray.at(0) as any;
      weaponWithEmptyRange.get('range.short')?.setValue(null);
      weaponWithEmptyRange.get('range.medium')?.setValue(null);
      weaponWithEmptyRange.get('range.long')?.setValue(null);

      component['onConfirm'](true);

      const result = mockDialogRef.close.mock.calls[0][0];
      expect(result[0].range).toBeUndefined();
    });

    it('includes strength when true', () => {
      const weapon = component.weaponsFormArray.at(0) as any;
      weapon.get('strength')?.setValue(true);

      component['onConfirm'](true);

      const result = mockDialogRef.close.mock.calls[0][0];
      expect(result[0].strength).toBe(true);
    });

    it('omits strength when false', () => {
      const weapon = component.weaponsFormArray.at(0) as any;
      weapon.get('strength')?.setValue(false);

      component['onConfirm'](true);

      const result = mockDialogRef.close.mock.calls[0][0];
      expect(result[0].strength).toBeUndefined();
    });
  });

  describe('template rendering', () => {
    const waitForKeyboardActivation = () => jest.advanceTimersByTime(25);

    it('displays the modal title', () => {
      waitForKeyboardActivation();
      fixture.detectChanges();

      const modalHeader = fixture.debugElement.query(By.css('.modal-title'));
      expect(modalHeader.nativeElement.textContent).toBe('Weapons');
    });

    it('renders weapon rows for each weapon', () => {
      waitForKeyboardActivation();
      fixture.detectChanges();

      const weaponRows = fixture.debugElement.queryAll(By.css('[formArrayName="weapons"] > div'));
      expect(weaponRows.length).toBe(2);
    });

    it('renders weapon name inputs', () => {
      waitForKeyboardActivation();
      fixture.detectChanges();

      const nameInputs = fixture.debugElement.queryAll(
        By.css('[formArrayName="weapons"] input[formControlName="name"]'),
      );
      expect(nameInputs.length).toBe(2);
      expect(nameInputs[0].nativeElement.value).toBe('Blaster Pistol');
      expect(nameInputs[1].nativeElement.value).toBe('Lightsaber');
    });
  });

  describe('with empty weapons', () => {
    beforeEach(async () => {
      const emptyWeaponsData: D6WeaponsModal = {
        title: 'Weapons',
        value: [],
      };

      TestBed.resetTestingModule();

      await TestBed.configureTestingModule({
        imports: [D6Module],
        providers: [
          { provide: DIALOG_DATA, useValue: emptyWeaponsData },
          { provide: DialogRef, useValue: mockDialogRef },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(D6WeaponsModalComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('initializes empty weapons FormArray', () => {
      expect(component.weaponsFormArray.length).toBe(0);
    });

    it('does not render weapon rows', () => {
      jest.advanceTimersByTime(25);
      fixture.detectChanges();

      const weaponRows = fixture.debugElement.queryAll(By.css('[formArrayName="weapons"] > div'));
      expect(weaponRows.length).toBe(0);
    });
  });
});
