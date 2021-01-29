import {D6Character} from '../../../../d6/src/lib/interface/d6-character';
import {Force} from '../force/interface/force';

export interface Sw2eCharacter extends D6Character {
  force: Force;
}
