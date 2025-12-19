import { D6Attribute, D6Character } from '../features/d6/model/d6-character';

export type Sw2eCharacter = D6Character & {
  general: {
    gender: string;
    species: string;
    homeWorld: string;
    age: number;
    height: number;
    weight: number;
    physicalDescription: string;
    personality: string;
    background: string;
    objectives: string;
    quote: string;
  };
  attributes: {
    dexterity: D6Attribute;
    knowledge: D6Attribute;
    mechanical: D6Attribute;
    perception: D6Attribute;
    strength: D6Attribute;
    technical: D6Attribute;
  };
};
