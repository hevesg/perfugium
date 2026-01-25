import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentType } from '@angular/cdk/portal';
import { debounceTime } from 'rxjs';
import { D6AttributeModalComponent } from '../../features/d6/components/d6-attribute-modal/d6-attribute-modal.component';
import { CharacterService } from '../../features/perfugium/services/character.service';
import { Sw2eCharacter } from '../../model/sw2e-character';
import { characterForm } from '../../utils/character-form';
import { D6Module } from '../../features/d6/d6-module';
import { GeneralDataComponent } from '../../components/general-data/general-data.component';
import { GeneralDataModalComponent } from '../../components/general-data-modal/general-data-modal.component';

const MODAL_COMPONENTS: Record<string, ComponentType<unknown>> = {
  attribute: D6AttributeModalComponent,
  general: GeneralDataModalComponent,
};
@Component({
  selector: 'sw2e-character-sheet',
  standalone: true,
  imports: [RouterLink, D6Module, TitleCasePipe, ReactiveFormsModule, GeneralDataComponent],
  templateUrl: 'character-sheet.page.html',
  styles: `
    :host {
      display: block;
    }
  `,
})
export class CharacterSheetPage implements OnInit {
  private route = inject(ActivatedRoute);
  private characterService = inject(CharacterService<Sw2eCharacter>);
  private destroyRef = inject(DestroyRef);

  readonly character = this.route.snapshot.data['character'] as Sw2eCharacter;

  readonly characterForm = characterForm();
  readonly attributeKeys = ['dexterity', 'knowledge', 'mechanical', 'perception', 'strength', 'technical'] as const;

  modalOf(key: string): ComponentType<unknown> {
    if (key in MODAL_COMPONENTS) {
      return MODAL_COMPONENTS[key];
    } else {
      throw new Error(`Unknown component: ${key}`);
    }
  }

  ngOnInit(): void {
    this.characterForm.patchValue(this.character);

    this.characterForm.valueChanges
      .pipe(
        debounceTime(500),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        this.characterService
          .save({ ...this.character, ...this.characterForm.getRawValue() } as Sw2eCharacter)
          .subscribe();
      });
  }
}
