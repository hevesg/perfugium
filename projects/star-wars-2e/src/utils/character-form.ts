import { FormControl, FormGroup } from '@angular/forms';
import { D6Attribute } from '../features/d6/model/d6-character';

export const characterForm = () => {
  return new FormGroup({
    // Character base fields
    id: new FormControl(''),
    game: new FormControl(''),
    name: new FormControl(''),
    description: new FormControl(''),
    created: new FormControl(0),
    modified: new FormControl(0),

    // General information
    general: new FormGroup({
      gender: new FormControl(''),
      species: new FormControl(''),
      homeWorld: new FormControl(''),
      age: new FormControl(0),
      height: new FormControl(0),
      weight: new FormControl(0),
      physicalDescription: new FormControl(''),
      personality: new FormControl(''),
      background: new FormControl(''),
      objectives: new FormControl(''),
      quote: new FormControl(''),
    }),

    // Character points
    characterPoints: new FormControl(0),

    // Attributes
    attributes: new FormGroup({
      dexterity: new FormControl<D6Attribute>({ value: 0, skills: [] }),
      knowledge: new FormControl<D6Attribute>({ value: 0, skills: [] }),
      mechanical: new FormControl<D6Attribute>({ value: 0, skills: [] }),
      perception: new FormControl<D6Attribute>({ value: 0, skills: [] }),
      strength: new FormControl<D6Attribute>({ value: 0, skills: [] }),
      technical: new FormControl<D6Attribute>({ value: 0, skills: [] }),
    }),

    // Inventory
    inventory: new FormGroup({
      equipment: new FormControl<{ name: string; quantity?: number }[]>([]),
      weapons: new FormControl<{ name: string; damage?: number }[]>([]),
      credits: new FormControl(0),
    }),

    // Force
    force: new FormControl<{
      sensitive: boolean;
      points: number;
      darkSide: number;
      abilities: { name: string; value?: number; list: string[] }[];
    }>({
      sensitive: false,
      points: 0,
      darkSide: 0,
      abilities: [],
    }),

    // Abilities
    abilities: new FormControl<{ name: string; description: string }[]>([]),

    // Speed
    speed: new FormControl(0),
  });
};