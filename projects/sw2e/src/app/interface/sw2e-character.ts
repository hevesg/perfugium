import {Character} from '../../../../../src/app/perfugium/interface/character';
import {Sw2eAttributes} from './sw2e-attributes';
import {Equipment} from '../../../../../src/app/perfugium/interface/equipment';
import {Sw2eCharacterInfo} from './sw2e-character-info';
import {D6WeaponRange} from '../../../../../src/app/d6/interface/d6-weapon-range';
import {D6Weapon} from '../../../../../src/app/d6/interface/d6-weapon';
import {Sw2eForce} from './sw2e-force';
import {Sw2eAbility} from './sw2e-ability';

export interface Sw2eCharacter extends Character {
  attributes: Sw2eAttributes;
  general: Sw2eCharacterInfo;
  equipment: Equipment[];
  weapons: D6Weapon[];
  credits: number;
  force: Sw2eForce;
  abilities?: Sw2eAbility[];
  speed: number;
}
