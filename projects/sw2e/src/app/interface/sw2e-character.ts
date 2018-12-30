import {Character} from '../../../../../src/app/perfugium/interface/character';
import {Sw2eAttributes} from './sw2e-attributes';
import {Equipment} from '../../../../../src/app/perfugium/interface/equipment';
import {Sw2eCharacterInfo} from './sw2e-character-info';

export interface Sw2eCharacter extends Character {
  attributes: Sw2eAttributes;
  general: Sw2eCharacterInfo;
  equipment: Equipment[];
  credits: number;
  speed: number;
}
