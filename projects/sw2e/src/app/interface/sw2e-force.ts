import {Sw2eAbility} from './sw2e-ability';

export interface Sw2eForce {
  sensitive: boolean;
  points: number;
  darkSide: number;
  abilities?: Sw2eAbility[];
}
