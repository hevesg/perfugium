import { Injectable } from '@angular/core';
import {D6GameService} from '../../../../../src/app/d6/service/d6-game.service';

@Injectable({
  providedIn: 'root'
})
export class Sw2eGameService extends D6GameService {

  constructor() {
    super();
    this._gameId = 'sw2e';
  }
}
