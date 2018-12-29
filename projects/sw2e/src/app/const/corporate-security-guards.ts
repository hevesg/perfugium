import {Sw2eCharacter} from '../interface/sw2e-character';

const testCharacter: Sw2eCharacter = {
  id: '78e731027d8fd50ed642340b7c9a63b3',
  game: 'sw2e',
  name: 'Gippy Betany',
  description: 'Test character',
  created: 1546043351146,
  modified: 1546043351146,
  attributes: {
    dexterity: {
      value: 6,
      skills: [
        { name: 'Blaster', value: 9 },
        { name: 'Dodge', value: 9 },
      ]
    },
    knowledge: {
      value: 6,
      skills: [
        { name: 'Law enforcement', value: 9 },
        { name: 'Streetwise', value: 9 }
      ]
    },
    mechanical: {
      value: 6,
      skills: []
    },
    perception: {
      value: 6,
      skills: []
    },
    strength: {
      value: 6,
      skills: []
    },
    technical: {
      value: 6,
      skills: []
    }
  },
  speed: 10
};
