import {D6Specialisation} from './d6-specialisation';

export interface D6Skill {
  name: string;
  value: number;
  specialisations?: D6Specialisation[];
}
