import { Dialog } from '@angular/cdk/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private readonly dialog = inject(Dialog);
  private readonly modalComponents = new Map<string, ComponentType<unknown>>();

  open<R, D, C>(component: ComponentType<C>, data: D): Observable<R | undefined> {
    return this.dialog
      .open<R, D>(component, {
        data,
        width: '500px',
        maxWidth: '90vw',
        disableClose: true,
      })
      .closed;
  }

  register(key: string, component: ComponentType<unknown>): this {
    this.modalComponents.set(key, component);
    return this;
  }

  get(key: string): ComponentType<unknown> {
    if (!this.modalComponents.has(key)) {
      throw new Error(`Modal component not found: ${key}`);
    }
    return this.modalComponents.get(key)!;
  }
}

