import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { D6PipStepperComponent } from './d6-pip-stepper.component';
import { D6Module } from '../../d6-module';

@Component({
  template: `
    <app-d6-pip-stepper
      [formControl]="control"
      [min]="min"
      [max]="max"
    ></app-d6-pip-stepper>
  `,
  standalone: false,
})
class TestHostComponent {
  control = new FormControl(6);
  min = 3;
  max = 15;
}

describe('D6 Pip Stepper Component', () => {
  let component: D6PipStepperComponent;
  let fixture: ComponentFixture<D6PipStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [D6Module],
    }).compileComponents();

    fixture = TestBed.createComponent(D6PipStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('value management', () => {
    it('initializes value to 0', () => {
      expect(component.value()).toBe(0);
    });

    it('updates internal value when writeValue is called', () => {
      component.writeValue(9);

      expect(component.value()).toBe(9);
    });

    it('handles null value by defaulting to 0', () => {
      component.writeValue(null as unknown as number);

      expect(component.value()).toBe(0);
    });
  });

  describe('increment and decrement', () => {
    it('increases value by 1 on increment', () => {
      component.writeValue(5);

      component.increment();

      expect(component.value()).toBe(6);
    });

    it('decreases value by 1 on decrement', () => {
      component.writeValue(5);

      component.decrement();

      expect(component.value()).toBe(4);
    });

    it('does not decrement below min', () => {
      fixture.componentRef.setInput('min', 0);
      component.writeValue(0);

      component.decrement();

      expect(component.value()).toBe(0);
    });
  });

  describe('change callbacks', () => {
    it('calls registered onChange callback on value change', () => {
      const onChangeSpy = jest.fn();
      component.registerOnChange(onChangeSpy);
      component.writeValue(5);

      component.increment();

      expect(onChangeSpy).toHaveBeenCalledWith(6);
    });

    it('calls registered onTouched callback on value change', () => {
      const onTouchedSpy = jest.fn();
      component.registerOnTouched(onTouchedSpy);

      component.increment();

      expect(onTouchedSpy).toHaveBeenCalled();
    });
  });

  describe('disabled state', () => {
    it('updates disabled state when setDisabledState is called', () => {
      component.setDisabledState(true);

      expect(component.disabled()).toBe(true);
    });

    it('ignores keyboard events when disabled', () => {
      component.writeValue(5);
      component.setDisabledState(true);
      const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });

      component.onKeydown(event);

      expect(component.value()).toBe(5);
    });
  });

  describe('keyboard navigation', () => {
    it('increments on ArrowUp when below max', () => {
      component.writeValue(5);
      const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
      jest.spyOn(event, 'preventDefault');

      component.onKeydown(event);

      expect(component.value()).toBe(6);
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('does not increment on ArrowUp when at max', () => {
      fixture.componentRef.setInput('max', 5);
      component.writeValue(5);
      const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });

      component.onKeydown(event);

      expect(component.value()).toBe(5);
    });

    it('decrements on ArrowDown when above min', () => {
      component.writeValue(5);
      const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
      jest.spyOn(event, 'preventDefault');

      component.onKeydown(event);

      expect(component.value()).toBe(4);
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('does not decrement on ArrowDown when at min', () => {
      fixture.componentRef.setInput('min', 5);
      component.writeValue(5);
      const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });

      component.onKeydown(event);

      expect(component.value()).toBe(5);
    });

    it('ignores unrelated keys', () => {
      component.writeValue(5);
      const event = new KeyboardEvent('keydown', { key: 'Enter' });

      component.onKeydown(event);

      expect(component.value()).toBe(5);
    });
  });
});

describe('D6 Pip Stepper Component (TestHost)', () => {
  let hostFixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [D6Module, ReactiveFormsModule],
      declarations: [TestHostComponent],
    }).compileComponents();

    hostFixture = TestBed.createComponent(TestHostComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();
  });

  function getInput(): HTMLInputElement {
    return hostFixture.debugElement.query(By.css('input')).nativeElement;
  }

  function getDecrementButton(): HTMLButtonElement {
    return hostFixture.debugElement.query(By.css('button[aria-label="Decrease"]')).nativeElement;
  }

  function getIncrementButton(): HTMLButtonElement {
    return hostFixture.debugElement.query(By.css('button[aria-label="Increase"]')).nativeElement;
  }

  describe('value display', () => {
    it('displays value formatted as D6 pip notation', () => {
      expect(getInput().value).toBe('2D');
    });

    it('updates display when form control value changes', () => {
      hostComponent.control.setValue(7);
      hostFixture.detectChanges();

      expect(getInput().value).toBe('2D+1');
    });
  });

  describe('form control binding', () => {
    it('updates form control when increment button is clicked', () => {
      getIncrementButton().click();
      hostFixture.detectChanges();

      expect(hostComponent.control.value).toBe(7);
    });

    it('updates form control when decrement button is clicked', () => {
      getDecrementButton().click();
      hostFixture.detectChanges();

      expect(hostComponent.control.value).toBe(5);
    });

    it('disables both buttons when form control is disabled', () => {
      hostComponent.control.disable();
      hostFixture.detectChanges();

      expect(getDecrementButton().disabled).toBe(true);
      expect(getIncrementButton().disabled).toBe(true);
    });

    it('enables buttons when form control is enabled', () => {
      hostComponent.control.disable();
      hostFixture.detectChanges();

      hostComponent.control.enable();
      hostFixture.detectChanges();

      expect(getDecrementButton().disabled).toBe(false);
      expect(getIncrementButton().disabled).toBe(false);
    });
  });

  describe('min/max constraints', () => {
    it('disables decrement button when value equals min', () => {
      hostComponent.control.setValue(3);
      hostFixture.detectChanges();

      expect(getDecrementButton().disabled).toBe(true);
    });

    it('enables decrement button when value is above min', () => {
      hostComponent.control.setValue(4);
      hostFixture.detectChanges();

      expect(getDecrementButton().disabled).toBe(false);
    });

    it('disables increment button when value equals max', () => {
      hostComponent.control.setValue(15);
      hostFixture.detectChanges();

      expect(getIncrementButton().disabled).toBe(true);
    });

    it('enables increment button when value is below max', () => {
      hostComponent.control.setValue(14);
      hostFixture.detectChanges();

      expect(getIncrementButton().disabled).toBe(false);
    });

    it('respects updated min input', () => {
      hostComponent.min = 6;
      hostFixture.changeDetectorRef.markForCheck();
      hostFixture.detectChanges();

      expect(getDecrementButton().disabled).toBe(true);
    });

    it('respects updated max input', () => {
      hostComponent.max = 6;
      hostFixture.changeDetectorRef.markForCheck();
      hostFixture.detectChanges();

      expect(getIncrementButton().disabled).toBe(true);
    });

    it('does not increment past max on ArrowUp', () => {
      hostComponent.control.setValue(15);
      hostFixture.detectChanges();

      const input = getInput();
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
      hostFixture.detectChanges();

      expect(hostComponent.control.value).toBe(15);
    });

    it('does not decrement past min on ArrowDown', () => {
      hostComponent.control.setValue(3);
      hostFixture.detectChanges();

      const input = getInput();
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
      hostFixture.detectChanges();

      expect(hostComponent.control.value).toBe(3);
    });
  });

  describe('keyboard navigation', () => {
    it('increments on ArrowUp keydown', () => {
      const input = getInput();
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
      hostFixture.detectChanges();

      expect(hostComponent.control.value).toBe(7);
    });

    it('decrements on ArrowDown keydown', () => {
      const input = getInput();
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
      hostFixture.detectChanges();

      expect(hostComponent.control.value).toBe(5);
    });
  });

  describe('accessibility', () => {
    it('sets role to spinbutton on input', () => {
      expect(getInput().getAttribute('role')).toBe('spinbutton');
    });

    it('sets aria-valuenow to current value', () => {
      expect(getInput().getAttribute('aria-valuenow')).toBe('6');
    });

    it('sets aria-valuemin to min value', () => {
      expect(getInput().getAttribute('aria-valuemin')).toBe('3');
    });

    it('sets aria-valuemax to max value', () => {
      expect(getInput().getAttribute('aria-valuemax')).toBe('15');
    });

    it('sets aria-valuetext to formatted value', () => {
      expect(getInput().getAttribute('aria-valuetext')).toBe('2D');
    });

    it('omits aria-valuemax when max is MAX_SAFE_INTEGER', () => {
      hostComponent.max = Number.MAX_SAFE_INTEGER;
      hostFixture.changeDetectorRef.markForCheck();
      hostFixture.detectChanges();

      expect(getInput().getAttribute('aria-valuemax')).toBeNull();
    });

    it('updates aria attributes when value changes', () => {
      hostComponent.control.setValue(10);
      hostFixture.detectChanges();

      expect(getInput().getAttribute('aria-valuenow')).toBe('10');
      expect(getInput().getAttribute('aria-valuetext')).toBe('3D+1');
    });
  });
});
