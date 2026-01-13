import { Component, forwardRef, ChangeDetectionStrategy, signal, input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-d6-pip-input',
  standalone: false,
  templateUrl: './d6-pip-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => D6PipInputComponent),
      multi: true,
    },
  ],
  host: {
    class: 'd-flex',
  },
})
export class D6PipInputComponent implements ControlValueAccessor {
  readonly value = signal(0);
  readonly disabled = signal(false);

  readonly min = input(3);
  readonly max = input(Number.MAX_SAFE_INTEGER);

  private onChange: (value: number) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: number): void {
    this.value.set(value ?? 0);
  }

  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  increment(): void {
    this.value.update((v) => v + 1);
    this.emitChange();
  }

  decrement(): void {
    this.value.update((v) => Math.max(0, v - 1));
    this.emitChange();
  }

  private emitChange(): void {
    this.onChange(this.value());
    this.onTouched();
  }

  onKeydown(event: KeyboardEvent): void {
    if (this.disabled()) return;

    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        if (this.value() < this.max()) this.increment();
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (this.value() > this.min()) this.decrement();
        break;
    }
  }

  protected readonly Number = Number;
}
