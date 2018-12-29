import { Character } from '../interface/character';
import md5 from 'md5';

export abstract class CharacterService {

  protected _data: Character;
  protected _gameId: string;

  protected constructor(gameId: string) {
    this._gameId = gameId;
  }

  public get data() {
    return this._data;
  }

  public get gameId(): string {
    return this._gameId;
  }

  public create(): void {
    const now: number = new Date().getTime();
    this._data = {
      id: this.getUniqueId(),
      game: this._gameId,
      name: null,
      description: null,
      created: now,
      modified: now
    };
  }

  public load(id: string): void {
    this._data = JSON.parse(localStorage.getItem(id));
  }


  public save(): void {
    this._data.modified = new Date().getTime();
    localStorage.setItem(this._data.id, JSON.stringify(this._data));
  }

  public delete() {
    localStorage.removeItem(this._data.id);
  }

  public list(game: string): Character[] {
    const list: Character[] = [];
    Object.keys(localStorage).forEach((x) => {
      const char: Character = JSON.parse(localStorage.getItem(x));
      if (char.game === game) {
        list.push();
      }
    });
    return list;
  }

  private getUniqueId(): string {
    const id: string = md5(new Date().getTime());
    if (localStorage.getItem(id) !== null) {
      return this.getUniqueId();
    } else {
      return id;
    }
  }
}
