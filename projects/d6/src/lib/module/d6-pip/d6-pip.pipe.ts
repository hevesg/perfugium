import { Pipe, PipeTransform } from '@angular/core';

/**
 * Converts a <code>number</code> into a <code>string</code> representing a D6 pip
 *
 * You can chose to break one die in pips, i.e. You can transform 1d in three +1 pips or in one +1 and one +2.
 *
 * The gradation of skills/attributes works in this progression: 1d, 1d+1, 1d+2, 2d, 2d+1, 2d+2, 3d, 3d+1, 3d+2, 4d... And so on.
 *
 * Let's say if you have 3d+2 in Blasters, you can spend 1 pip (buying it with Characters Points) to increase it not to 3d+3 but to 4d.
 */
@Pipe({
  name: 'd6Pip'
})
export class D6PipPipe implements PipeTransform {

  /**
   * @example
   * {{ 3 | d6Pip}} // returns 1d
   * {{ 7 | d6Pip}} // returns 2d+1
   * {{ 0 | d6Pip}} // returns 0d
   *
   * @param {number} value  The target to process see
   * @returns The processed target number
   */

  transform(value: number): string {
    const dice: number = Math.floor(value / 3);
    const pips: number = value % 3;
    return dice.toString() + 'd' + (!!pips ? '+' + pips : '');
  }

}
