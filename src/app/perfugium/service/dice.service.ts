import { Injectable } from '@angular/core';
import md5 from 'md5';
import {DiceRoll} from '../type/dice-roll';
import {DiceResult} from '../type/dice-result';

@Injectable({
  providedIn: 'root'
})
export class DiceService {

  private readonly _diceRegex: RegExp = new RegExp('([-+]?)(?:([\\d]*)d)?([\\d]+)(?:!([\\d]*))?([kl][\\d]*)?', 'gi');

  constructor() { }

  /**
   * Returns a float between 0 and 1 (1 is not part of the set)
   */
  public random(): number {
    return parseInt(md5(Math.random()).substr(0, 8), 16) / 4294967296;
  }

  /**
   * Returns a number depending on passed dice roll code
   * @param code  a dice roll code such as d6, 2d10+6, 2d10!, -2d10!10, 3d10!k2+20
   */
  public roll(code: string): DiceResult {
    let value = 0;
    let results: number[] = [];
    code.match(this._diceRegex).forEach((dice) => {
      const diceRoll: DiceRoll = this._parseDice(dice);

      let result: number;
      if (diceRoll.numberOfDice) {
        const array = this.diceArray(diceRoll.sides, diceRoll.numberOfDice, diceRoll.exploding);
        results = results.concat(array);
        result = array.reduce((a, b) => a + b);
      } else {
        result = diceRoll.sides;
      }

      if (!diceRoll.operator) {
        result = -result;
      }

      value += result;

    });
    return {
      diceCode: code,
      diceResults: results,
      result: value
    };
  }

  public dice(sides: number = 6, exploding: number = null): number {
    exploding = exploding ? exploding : sides + 1;
    if (exploding < 2) {
      console.warn('Exploding value cannot be smaller than 2');
      return 0;
    }
    let value = Math.floor(this.random() * sides) + 1;
    if (value >= exploding) {
      value += this.dice(sides, exploding);
    }
    return value;
  }

  public keep(array: number[], keep: number = 1): number {
    array.sort((a, b) => b - a);
    array.splice(keep);
    return array.reduce((total, num) => total + num);
  }

  public loose(array: number[], loose: number = 1): number {
    array.sort((a, b) => a - b);
    array.splice(loose);
    return array.reduce((total, num) => total + num);
  }

  public diceArray(sides: number = 6, numberOfDice: number = 1, exploding: number = null): number[] {
    const array = [];
    for (let i = 0; i < numberOfDice; i++) {
      array.push(this.dice(sides, exploding));
    }
    return array;
  }

  private _parseDice(str: string): DiceRoll {
    const exec = this._diceRegex.exec(str);
    this._diceRegex.lastIndex = 0;
    return {
      sides: this._parseSides(exec[3]),
      operator: this._parseOperator(exec[1]),
      numberOfDice: this._parseNumberOfDice(exec[2]),
      exploding: this._parseExploding(exec[4], this._parseSides(exec[3]))
    };

  }

  private _parseSides(str: string): number {
    return parseInt(str, 10);
  }

  private _parseOperator(str: string): boolean {
    return str ? str === '+' : true;
  }

  private _parseNumberOfDice(str: string): number {
    if (str === undefined) {
      return null;
    } else if (str === '') {
      return 1;
    }
    return str ? parseInt(str, 10) : null;
  }

  private _parseExploding(exp: string, sides: number): number {
    if (exp === undefined) {
      return null;
    } else if (exp === '') {
      return sides;
    }
    return parseInt(exp, 10);
  }
}
