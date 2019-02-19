export interface DiceRoll {
  sides: number;
  operator: boolean;
  numberOfDice?: number;
  exploding?: number;
  keep?: number;
  loose?: number;
}
