import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { PerfugiumModule } from '../../perfugium-module';
import { Character } from '../../model/character';
import { CharacterBuilder } from '../../model/character.mock';

@Component({
  standalone: false,
  template: `<prf-character-list [characters]="characters" (selectCharacter)="onSelect($event)" />`,
})
class TestHostComponent {
  characters: Character[] = [];
  selectedCharacter: Character | null = null;

  onSelect(character: Character): void {
    this.selectedCharacter = character;
  }
}

describe('CharacterListComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfugiumModule],
      declarations: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
  });

  describe('with no characters', () => {
    it('does not render the list', () => {
      fixture.detectChanges();

      const listGroup = fixture.debugElement.query(By.css('.list-group'));
      expect(listGroup).toBeNull();
    });
  });

  describe('with characters', () => {
    const characters = [
      CharacterBuilder.init('char-1').name('Luke Skywalker').description('Jedi Knight').build(),
      CharacterBuilder.init('char-2').name('Han Solo').description('Smuggler').build(),
    ];

    beforeEach(() => {
      hostComponent.characters = characters;
      fixture.detectChanges();
    });

    it('renders the list group', () => {
      const listGroup = fixture.debugElement.query(By.css('.list-group'));
      expect(listGroup).not.toBeNull();
    });

    it('renders a button for each character', () => {
      const buttons = fixture.debugElement.queryAll(By.css('.list-group-item'));
      expect(buttons.length).toBe(2);
    });

    it('displays character name', () => {
      const names = fixture.debugElement.queryAll(By.css('[data-qa="character-name"]'));
      expect(names[0].nativeElement.textContent).toBe('Luke Skywalker');
      expect(names[1].nativeElement.textContent).toBe('Han Solo');
    });

    it('displays character description', () => {
      const descriptions = fixture.debugElement.queryAll(By.css('[data-qa="character-description"]'));
      expect(descriptions[0].nativeElement.textContent).toBe('Jedi Knight');
      expect(descriptions[1].nativeElement.textContent).toBe('Smuggler');
    });

    it('displays modified time using ago pipe', () => {
      const modified = fixture.debugElement.query(By.css('[data-qa="character-modified"]'));
      expect(modified).not.toBeNull();
    });

    it('emits selectCharacter when button is clicked', () => {
      const buttons = fixture.debugElement.queryAll(By.css('.list-group-item'));

      buttons[0].triggerEventHandler('click', null);

      expect(hostComponent.selectedCharacter).toEqual(characters[0]);
    });

    it('emits the correct character when second button is clicked', () => {
      const buttons = fixture.debugElement.queryAll(By.css('.list-group-item'));

      buttons[1].triggerEventHandler('click', null);

      expect(hostComponent.selectedCharacter).toEqual(characters[1]);
    });
  });
});
