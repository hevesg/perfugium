import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { D6Module } from '../features/d6/d6-module';
import { TitleCasePipe } from '@angular/common';
import { Sw2eCharacter } from '../model/sw2e-character';
import { ReactiveFormsModule } from '@angular/forms';
import { characterForm } from '../utils/character-form';

@Component({
  selector: 'sw2e-character-sheet',
  standalone: true,
  imports: [RouterLink, D6Module, TitleCasePipe, ReactiveFormsModule],
  templateUrl: 'character-sheet.page.html',
  styles: `
    :host {
      display: block;
    }
  `,
})
export class CharacterSheetPage implements OnInit {
  private route = inject(ActivatedRoute);

  readonly character = this.route.snapshot.data['character'] as Sw2eCharacter;

  readonly characterForm = characterForm();
  readonly attributeKeys = ['dexterity', 'knowledge', 'mechanical', 'perception', 'strength', 'technical'] as const;

  ngOnInit(): void {
    this.characterForm.patchValue(this.character);
  }
}
