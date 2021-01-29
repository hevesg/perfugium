export interface Force {
  sensitive: boolean;
  darkSide: number;
  points: number;
  abilities: ForceAbility[];
}

export interface ForceAbility {
  name: string;
  value?: number;
  list?: string[];
}
