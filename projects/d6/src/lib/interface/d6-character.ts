import {Character} from '../../../../perfugium/src/lib/interface/character';
import {D6Attribute} from '../module/d6-attribute/interface/d6-attribute';

export interface D6Character extends Character {
  attributes: { [key: string]: D6Attribute };
  characterPoints: number;
}
