import { D6Character } from './d6-character';
import { CharacterBuilder } from '../../perfugium/model/character.mock';

const DEFAULT_CHARACTER: Partial<D6Character> = {
  attributes: {
    dexterity: {
      value: 6,
      skills: [
        {
          name: 'Melee',
          value: 9,
          specs: [
            {
              name: 'Sword',
              value: 10,
            },
          ],
        },
        {
          name: 'Defense',
          value: 8,
        },
      ],
    },
  },
};

export class D6CharacterBuilder extends CharacterBuilder {
  protected constructor(id?: string) {
    super(id);
    this.character = { ...this.character, ...DEFAULT_CHARACTER };
  }

  static override init(id?: string): D6CharacterBuilder {
    return new D6CharacterBuilder(id);
  }

  override build(): D6Character {
    return { ...this.character } as D6Character;
  }
}
