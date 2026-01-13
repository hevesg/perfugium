import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { D6Module } from '../features/d6/d6-module';
import { Subscription, filter, combineLatest } from 'rxjs';
import { CharacterService } from '../features/perfugium/services/character.service';
import { AsyncPipe, TitleCasePipe } from '@angular/common';
import { Sw2eCharacter } from '../model/sw2e-character';
import { Dialog } from '@angular/cdk/dialog';
import { D6AttributeModalComponent } from '../features/d6/components/d6-attribute-modal/d6-attribute-modal.component';
import { D6Attribute } from '../features/d6/model/d6-character';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'sw2e-character-sheet',
  standalone: true,
  imports: [RouterLink, D6Module, AsyncPipe, TitleCasePipe],
  templateUrl: 'character-sheet.page.html',
  styles: `
    :host {
      display: block;
    }
  `,
})
export class CharacterSheetPage implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private readonly service: CharacterService<Sw2eCharacter> = inject(CharacterService);
  private readonly dialog = inject(Dialog);
  private subscription: Subscription = new Subscription();

  readonly character$ = this.service.load(this.route.snapshot.paramMap.get('id')!);

  ngOnInit(): void {
    this.subscription.add(combineLatest([
      this.route.fragment.pipe(filter((fragment): fragment is string => !!fragment)),
      this.character$,
    ]).subscribe(([fragment, character]) => {
      if (fragment.startsWith('attribute-')) {
        const attributeKey = fragment.replace('attribute-', '');
        const attribute = character.attributes[attributeKey as keyof typeof character.attributes];
        this.openAttributeDialog(attributeKey, attribute);
      }
    }));
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  openAttribute(attribute: string): void {
    setTimeout(() => {
      this.router.navigate([], { fragment: 'attribute-' + attribute });
    }, 25);
  }

  private openAttributeDialog(attributeName: string, attribute: D6Attribute): void {
    this.dialog.open(D6AttributeModalComponent, {
      data: {
        title: attributeName.charAt(0).toUpperCase() + attributeName.slice(1),
        attribute,
      },
      width: '500px',
      maxWidth: '90vw',
      disableClose: true,
    }).closed.subscribe((result) => {
      console.log(result);
    })
  };
}
