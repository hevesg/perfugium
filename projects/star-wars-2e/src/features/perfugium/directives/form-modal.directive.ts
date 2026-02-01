import { Directive, inject, input, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';
import { take } from 'rxjs';
import { ComponentType } from '@angular/cdk/portal';
import { ModalService } from '../services/modal.service';

@Directive({
  selector: '[formModal]',
  standalone: false,
  host: {
    '(click)': 'open()',
    '(keyup.enter)': 'open()',
    '(keyup.space)': 'open(); $event.preventDefault();',
    '(keydown.space)': '$event.preventDefault();',
    tabindex: '0',
  },
})
export class FormModalDirective {
  readonly formModal = input.required<string>();
  readonly formModalData = input<Object>({});

  private readonly ngControl = inject(NgControl, { optional: false });
  private readonly modalService = inject(ModalService);

  open(): void {
    this.modalService
      .open(this.modalService.get(this.formModal()), {
        ...this.formModalData(),
        ...{ value: this.ngControl.value },
      })
      .pipe(take(1))
      .subscribe((result) => {
        if (result) {
          this.ngControl.control?.setValue(result);
        }
      });
  }
}
