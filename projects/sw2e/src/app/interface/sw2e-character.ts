import {Character} from '../../../../../src/app/perfugium/interface/character';
import {Sw2eAttributes} from './sw2e-attributes';
import {Equipment} from '../../../../../src/app/perfugium/interface/equipment';

export interface Sw2eCharacter extends Character {
  attributes: Sw2eAttributes;
  equipment: Equipment[];
  credits: number;
  speed: number;
}
