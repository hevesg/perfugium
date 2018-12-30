import {Character} from '../interface/character';

export class GameService {

  protected _gameId: string;

  constructor() { }

  public get id() {
    return this._gameId;
  }

  public list(): Character[] {
    const list: Character[] = [];
    Object.keys(localStorage).forEach((x) => {
      const char: Character = JSON.parse(localStorage.getItem(x));
      if (char.game === this._gameId) {
        list.push(char);
      }
    });
    return list;
  }

}
