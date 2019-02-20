import { TestBed } from '@angular/core/testing';

import { DiceService } from './dice.service';
import {DiceResult} from '../type/dice-result';

describe('DiceService', () => {

  let service: DiceService;

  beforeEach(() => TestBed.configureTestingModule({}));

  beforeEach(() => {
    service = TestBed.get(DiceService);
  });

  it('should return a number between 0 and 1 if random() function is called', () => {
    const result: number = service.random();
    expect(result >= 0 && result < 1).toBeTruthy();
  });

  it('should return a number between 1 and 10 if roll(\'d10\') function is called', () => {
    const diceResult: DiceResult = service.roll('d10');
    expect(diceResult.result >= 1 && diceResult.result <= 10).toBeTruthy();
    expect(diceResult.diceResults.length).toEqual(1);
  });

  it('should return a number between 3 and 18 if roll(\'3d6\') function is called', () => {
    const diceResult: DiceResult = service.roll('3d6');
    expect(diceResult.result >= 3 && diceResult.result <= 18).toBeTruthy();
    expect(diceResult.diceResults.length).toEqual(3);
  });

  it('should return a number between 22 and 40 if roll(\'2d10+20\') function is called', () => {
    const diceResult: DiceResult = service.roll('2d10+20');
    expect(diceResult.result >= 22 && diceResult.result <= 40).toBeTruthy();
    expect(diceResult.diceResults.length).toEqual(2);
  });

  it('should return a number greater than 2 if roll(\'2d10!\') function is called', () => {
    const diceResult: DiceResult = service.roll('2d10!');
    expect(diceResult.result).toBeGreaterThanOrEqual(2);
    expect(diceResult.diceResults.length).toEqual(2);
  });
});
