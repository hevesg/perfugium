import {Sw2eCharacter} from '../interface/sw2e-character';

export const adiGallia: Sw2eCharacter = {
  id: '78e731027d8fd50ed642340b7c9a63b3',
  game: 'sw2e',
  name: 'Adi Gallia',
  description: 'A human jedi from Coruscant',
  created: 1546043351146,
  modified: 1546043351146,
  general: {
    gender: 'Female',
    species: 'human',
    homeWorld: 'Coruscant',
    age: 26,
    height: 184,
    weight: 85,
    physicalDescription: 'Gallia was a tall human female with a trim build. She bore an exotic beauty and wore an odd headdress draped ' +
      'with organic tentacles. The Force runs strongly in Gallia\'s family. A close relative of hers is also a Jedi Knight.',
    personality: 'Gallia was a superb pilot and skillful warrior. Unlike most Jedi, Gallia adopted an unorthodox reverse one-handed grip ' +
      'when wielding her lightsaber.',
    background: '',
    objectives: '',
    quote: ''
  },
  attributes: {
    dexterity: {
      value: 9,
      skills: [
        { name: 'Brawling Parry', value: 13 },
        { name: 'Dodge', value: 21 },
        { name: 'Lightsaber', value: 13 },
        { name: 'Melee Parry', value: 13 },
        { name: 'Melee Combat', value: 13 }
      ]
    },
    knowledge: {
      value: 10,
      skills: [
        { name: 'Bureaucracy', value: 12 },
        { name: 'Cultures', value: 21 },
        { name: 'Languages', value: 11 },
        { name: 'Planetary Systems', value: 21 },
        { name: 'Scholar', value: 10, specialisations: [{ name: 'Jedi Lore', value: 15}] }
      ]
    },
    mechanical: {
      value: 14,
      skills: [
        { name: 'Sensors', value: 21 },
        { name: 'Shields', value: 21 },
        { name: 'Space Transports', value: 21 },
        { name: 'Planetary Systems', value: 21 },
        { name: 'Starship Gunnery', value: 21 }
      ]
    },
    perception: {
      value: 10,
      skills: [
        { name: 'Bargain', value: 22 },
        { name: 'Con', value: 17 },
        { name: 'Disguise', value: 12 },
        { name: 'Investigation', value: 21 },
        { name: 'Persuasion', value: 22 }
      ]
    },
    strength: {
      value: 7,
      skills: [
        { name: 'Brawling', value: 13 },
        { name: 'Climbing/Jumping', value: 9 },
      ]
    },
    technical: {
      value: 8,
      skills: [
        { name: 'Lightsaber Repair', value: 13 }
      ]
    }
  },
  equipment: [
    { name: 'Blue Lightsaber' },
    { name: 'Jedi Robes' },
    { name: 'Utility Belt' },
    { name: 'Thermal detonator', quantity: 2 }
  ],
  credits: 1000,
  speed: 10
};
