import { Character } from './character';

const DEFAULT_CHARACTER: Character = {
  id: '78e731027d8fd50ed642340b7c9a63b3',
  game: 'game',
  name: 'Snow White',
  description: 'A grimm Disney character from the dark ages',
  created: Date.now() - 200000,
  modified: Date.now(),
};

export class CharacterBuilder {
  private readonly character: Character;

  private constructor(id: string = '78e731027d8fd50ed642340b7c9a63b3') {
    this.character = { ...DEFAULT_CHARACTER, ...{ id } };
  }

  static init(id?: string): CharacterBuilder {
    return new CharacterBuilder(id);
  }

  id(id: string): this {
    this.character.id = id;
    return this;
  }

  game(game: string): this {
    this.character.game = game;
    return this;
  }

  name(name: string): this {
    this.character.name = name;
    return this;
  }

  description(description: string): this {
    this.character.description = description;
    return this;
  }

  created(created: number): this {
    this.character.created = created;
    return this;
  }

  modified(modified: number): this {
    this.character.modified = modified;
    return this;
  }

  build(): Character {
    return { ...this.character };
  }
}
