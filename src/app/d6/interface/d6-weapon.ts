import {D6WeaponRange} from './d6-weapon-range';
import {D6Difficulty} from '../enum/d6-difficulty.enum';

export interface D6Weapon {
  name: string;
  damage: number;
  strength?: boolean;
  charge?: number;
  range?: D6WeaponRange;
  difficulty?: D6Difficulty;
}
