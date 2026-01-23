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
  });
});
