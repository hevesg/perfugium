import {Character} from '../../../../../src/app/perfugium/interface/character';
import {Sw2eAttributes} from './sw2e-attributes';
import {Sw2eCharacterInfo} from './sw2e-character-info';
import {D6Weapon} from '../../../../../src/app/d6/interface/d6-weapon';
import {Sw2eForce} from './sw2e-force';
import {Sw2eAbility} from './sw2e-ability';
import {Sw2eInventory} from './sw2e-inventory';

export interface Sw2eCharacter extends Character {
  attributes: Sw2eAttributes;
  general: Sw2eCharacterInfo;
  inventory: Sw2eInventory;
  weapons: D6Weapon[];
  force: Sw2eForce;
  abilities?: Sw2eAbility[];
  speed: number;
}
