import {CharacterService} from '../../perfugium/service/character.service';
import {D6Attribute} from '../interface/d6-attribute';

export abstract class D6CharacterService extends CharacterService {

  protected constructor(gameId: string) {
    super(gameId);
  }

  protected createAttribute(val: number): D6Attribute {
    return { value: val, skills: [] };
  }

  protected setAttribute(attr: D6Attribute, val: number): void {
    const diff: number = val - attr.value;
    attr.skills.forEach((x) => {
      if (diff < 0) {
        x.value += diff;
      }
      if (x.value < val) {
        x.value = val;
      }
    });
    attr.value = val;
  }
}
