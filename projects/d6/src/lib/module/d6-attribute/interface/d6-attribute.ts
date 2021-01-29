import {D6Skill} from '../../d6-skill/interface/d6-skill';

export interface D6Attribute {
  value: number;
  skills: D6Skill[];
}
