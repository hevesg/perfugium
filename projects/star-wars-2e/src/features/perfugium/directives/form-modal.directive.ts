import { Directive, inject, input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgControl } from '@angular/forms';
import { filter, map, switchMap, take, tap } from 'rxjs';
import { ComponentType } from '@angular/cdk/portal';
import { ModalService } from '../services/modal.service';

@Directive({
  selector: '[formModal]',
  standalone: false,
  host: {
    '(click)': 'open()',
    '(keyup.enter)': 'open()',
    '(keyup.space)': 'open()',
    tabindex: '0',
  },
})
export class FormModalDirective {
  readonly formModal = input.required<ComponentType<unknown>>();
  readonly formModalData = input<Object>({});

  private readonly ngControl = inject(NgControl, { optional: false });
  private readonly modalService = inject(ModalService);

  open(): void {
    this.modalService.open(this.formModal(), { ...this.formModalData(), ...{ value: this.ngControl.value } })
      .pipe(take(1))
      .subscribe((result) => {
        if (result) {
          this.ngControl.control?.setValue(result);
        }
      });
  }
}
