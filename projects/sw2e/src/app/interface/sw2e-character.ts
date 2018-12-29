import {Character} from '../../../../../src/app/perfugium/interface/character';
import {Sw2eAttributes} from './sw2e-attributes';

export interface Sw2eCharacter extends Character {
  attributes: Sw2eAttributes;
  speed: number;
}
