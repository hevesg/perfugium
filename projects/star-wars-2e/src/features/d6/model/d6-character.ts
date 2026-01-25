import { Character } from '../../perfugium/model/character';

export type D6Skill = {
  name: string;
  value: number;
  specs?: { name: string; value: number }[];
};

export type D6Attribute = {
  value: number;
  skills: D6Skill[];
};

export type D6Weapon = {
  name: string;
  damage: number;
  range?: { pb?: number; short?: number; medium?: number; long?: number };
  difficulty?: number;
  charge?: number;
  strength?: boolean;
};

export type D6Character = Character & {
  attributes: { [key: string]: D6Attribute };
};
