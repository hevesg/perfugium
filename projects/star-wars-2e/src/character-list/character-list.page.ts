import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { D6Module } from '../features/d6/d6-module';
import { CharacterService } from '../features/perfugium/services/character.service';
import { Character } from '../features/perfugium/model/character';
import { defer, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import adiGallia from '../__mock__/adi-gallia.json';

@Component({
  selector: 'sw2e-character-list',
  standalone: true,
  imports: [D6Module, AsyncPipe],
  templateUrl: 'character-list.page.html',
  styles: `
    :host {
      display: block;
    }
  `,
})
export class CharacterListPage {
  protected readonly router = inject(Router);
  private readonly service: CharacterService<Character> = inject(CharacterService);

  // TODO: Remove the defer logic after the character creation feature is implemented
  readonly characters$: Observable<Character[]> = defer(() => {
    if (!localStorage.getItem(adiGallia.id)) {
      const now = Date.now();
      localStorage.setItem(
        adiGallia.id,
        JSON.stringify({ ...adiGallia, ...{ modified: now, created: now } }),
      );
    }
    return this.service.list('sw2e');
  });
}
