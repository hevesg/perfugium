import {D6Specialisation} from './d6-specialisation';
import {ObjectWithName} from '../../perfugium/interface/object-with-name';

export interface D6Skill extends ObjectWithName {
  value: number;
  specialisations?: D6Specialisation[];
}
