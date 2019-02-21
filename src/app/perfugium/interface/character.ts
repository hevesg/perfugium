import {ObjectWithName} from './object-with-name';

export interface Character extends ObjectWithName {
  id: string;
  game: string;
  description: string;
  created: number;
  modified: number;
}
