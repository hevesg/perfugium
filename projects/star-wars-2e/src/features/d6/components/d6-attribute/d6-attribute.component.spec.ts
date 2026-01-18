import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Dialog } from '@angular/cdk/dialog';
import { of } from 'rxjs';

import { D6AttributeComponent } from './d6-attribute.component';
import { D6Module } from '../../d6-module';
import { D6Attribute } from '../../model/d6-character';

describe('D6AttributeComponent', () => {
  let component: D6AttributeComponent;
  let fixture: ComponentFixture<D6AttributeComponent>;
  let mockDialog: { open: jest.Mock };

  const mockAttribute: D6Attribute = {
    value: 12,
    skills: [
      { name: 'Dodge', value: 15 },
      { name: 'Brawling', value: 14 },
    ],
  };

  const createMockDialogRef = (result: D6Attribute | undefined) => ({
    closed: of(result),
  });

  beforeEach(async () => {
    mockDialog = {
      open: jest.fn().mockReturnValue(createMockDialogRef(undefined)),
    };

    await TestBed.configureTestingModule({
      imports: [D6Module],
      providers: [{ provide: Dialog, useValue: mockDialog }],
    }).compileComponents();

    fixture = TestBed.createComponent(D6AttributeComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('attributeName', 'Dexterity');
    fixture.detectChanges();
  });

  describe('template rendering', () => {
    it('displays the attribute name', () => {
      const heading = fixture.debugElement.query(By.css('h3 span:first-child'));
      expect(heading.nativeElement.textContent).toBe('Dexterity');
    });

    it('displays the attribute value using d6Pip format', () => {
      component.writeValue({ value: 12, skills: [] });
      fixture.detectChanges();

      const valueSpan = fixture.debugElement.query(By.css('h3 span:last-child'));
      expect(valueSpan.nativeElement.textContent).toBe('4D');
    });

    it('displays skills list when skills exist', () => {
      component.writeValue(mockAttribute);
      fixture.detectChanges();

      const skillItems = fixture.debugElement.queryAll(By.css('ul li'));
      expect(skillItems.length).toBe(2);
      expect(skillItems[0].nativeElement.textContent).toContain('Dodge');
      expect(skillItems[1].nativeElement.textContent).toContain('Brawling');
    });

    it('hides skills list when no skills exist', () => {
      component.writeValue({ value: 10, skills: [] });
      fixture.detectChanges();

      const skillsList = fixture.debugElement.query(By.css('ul'));
      expect(skillsList).toBeNull();
    });
  });

  describe('ControlValueAccessor', () => {
    it('writeValue sets the attribute signal', () => {
      component.writeValue(mockAttribute);

      expect(component.attribute()).toEqual(mockAttribute);
    });

    it('writeValue handles null by setting default value', () => {
      component.writeValue(null);

      expect(component.attribute()).toEqual({ value: 0, skills: [] });
    });

    it('registerOnChange stores the callback', () => {
      const callback = jest.fn();
      component.registerOnChange(callback);

      // Trigger a value update through the modal
      mockDialog.open.mockReturnValue(createMockDialogRef(mockAttribute));
      component.openModal();

      expect(callback).toHaveBeenCalledWith(mockAttribute);
    });

    it('registerOnTouched stores the callback', () => {
      const callback = jest.fn();
      component.registerOnTouched(callback);

      // Trigger a value update through the modal
      mockDialog.open.mockReturnValue(createMockDialogRef(mockAttribute));
      component.openModal();

      expect(callback).toHaveBeenCalled();
    });
  });

  describe('openModal', () => {
    it('opens the dialog with correct configuration', () => {
      component.writeValue(mockAttribute);
      component.openModal();

      expect(mockDialog.open).toHaveBeenCalledWith(
        expect.any(Function),
        expect.objectContaining({
          data: {
            title: 'Dexterity',
            attribute: mockAttribute,
          },
          width: '500px',
          maxWidth: '90vw',
          disableClose: true,
        })
      );
    });

    it('updates the value when dialog returns a result', () => {
      const newAttribute: D6Attribute = { value: 15, skills: [] };
      mockDialog.open.mockReturnValue(createMockDialogRef(newAttribute));

      component.openModal();

      expect(component.attribute()).toEqual(newAttribute);
    });

    it('does not update the value when dialog is cancelled', () => {
      const originalAttribute: D6Attribute = { value: 10, skills: [] };
      component.writeValue(originalAttribute);
      mockDialog.open.mockReturnValue(createMockDialogRef(undefined));

      component.openModal();

      expect(component.attribute()).toEqual(originalAttribute);
    });
  });

  describe('host interactions', () => {
    it('opens modal on click', () => {
      fixture.debugElement.triggerEventHandler('click', {});

      expect(mockDialog.open).toHaveBeenCalled();
    });

    it('opens modal on Enter key', () => {
      fixture.debugElement.triggerEventHandler('keyup.enter', {});

      expect(mockDialog.open).toHaveBeenCalled();
    });

    it('opens modal on Space key and prevents default', () => {
      const event = { preventDefault: jest.fn() };
      fixture.debugElement.triggerEventHandler('keydown.space', event);

      expect(mockDialog.open).toHaveBeenCalled();
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('has correct accessibility attributes', () => {
      const hostEl = fixture.debugElement;

      expect(hostEl.attributes['tabindex']).toBe('0');
      expect(hostEl.attributes['role']).toBe('button');
      expect(hostEl.classes['card']).toBe(true);
    });
  });
});
