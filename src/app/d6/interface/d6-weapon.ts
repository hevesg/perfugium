import {D6WeaponRange} from './d6-weapon-range';
import {D6Difficulty} from '../enum/d6-difficulty.enum';
import {ObjectWithName} from '../../perfugium/interface/object-with-name';

export interface D6Weapon extends ObjectWithName {
  damage: number;
  strength?: boolean;
  charge?: number;
  range?: D6WeaponRange;
  difficulty?: D6Difficulty;
}
