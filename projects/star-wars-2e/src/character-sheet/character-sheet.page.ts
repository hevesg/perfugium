import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { D6Module } from '../features/d6/d6-module';
import { Observable } from 'rxjs';
import { Character } from '../features/perfugium/model/character';
import { CharacterService } from '../features/perfugium/services/character.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'sw2e-character-sheet',
  standalone: true,
  imports: [RouterLink, D6Module, AsyncPipe],
  templateUrl: 'character-sheet.page.html',
  styles: `
    :host {
      display: block;
    }
  `,
})
export class CharacterSheetPage {
  private route = inject(ActivatedRoute);
  private readonly service: CharacterService<Character> = inject(CharacterService);

  readonly character$: Observable<Character> = this.service.load(
    this.route.snapshot.paramMap.get('id')!,
  );
}
