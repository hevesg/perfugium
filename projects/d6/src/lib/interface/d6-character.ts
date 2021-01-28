import {Character} from '../../../../perfugium/src/lib/interface/character';
import {D6Attribute} from './d6-attribute';

export interface D6Character extends Character {
  attributes: { [key: string]: D6Attribute };
  characterPoints: number;
}
