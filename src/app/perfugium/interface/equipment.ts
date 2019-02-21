import {ObjectWithName} from './object-with-name';

export interface Equipment extends ObjectWithName {
  quantity?: number;
  weight?: number;
  location?: number;
}
