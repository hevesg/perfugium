import { Character } from '../interface/character';
import md5 from 'md5';

export abstract class CharacterServiceService {

  protected data: Character;

  constructor() { }

  public create(): Character {
    const now: number = new Date().getTime();
    const data: Character = {
      id: md5(now),
      name: null,
      description: null,
      created: now,
      modified: now
    };
    return data;
  }

  public load(id: string): Character {
    this.data = JSON.parse(localStorage.getItem(id));
    return this.data;
  }


  public save() {
    this.data.modified = new Date().getTime();
    localStorage.setItem(this.data.id, JSON.stringify(this.data));
  }

  public delete() {
    localStorage.removeItem(this.data.id);
  }

  public list() {

  }
}
