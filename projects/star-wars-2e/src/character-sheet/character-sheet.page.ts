import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { D6Module } from '../features/d6/d6-module';
import { Observable } from 'rxjs';
import { CharacterService } from '../features/perfugium/services/character.service';
import { AsyncPipe } from '@angular/common';
import { D6Attribute } from '../features/d6/model/d6-character';
import { Sw2eCharacter } from '../model/sw2e-character';

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
  private readonly service: CharacterService<Sw2eCharacter> = inject(CharacterService);

  readonly character$: Observable<Sw2eCharacter> = this.service.load(
    this.route.snapshot.paramMap.get('id')!,
  );

  protected onTapGeneral() {
    console.log('onTapGeneral');
  }

  protected onTouch(param: [string, D6Attribute]) {
    console.info(param);
  }
}
