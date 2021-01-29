import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'd6Pip'
})
export class D6PipPipe implements PipeTransform {

  transform(value: number): unknown {
    const dice: number = Math.floor(value / 3);
    const pips: number = value % 3;
    return dice.toString() + 'D' + (!!pips ? '+' + pips : '');
  }

}
