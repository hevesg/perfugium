import { Dialog } from '@angular/cdk/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private readonly dialog = inject(Dialog);

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
}

