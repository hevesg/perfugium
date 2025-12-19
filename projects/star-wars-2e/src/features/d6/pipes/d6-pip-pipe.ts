import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'd6Pip',
  standalone: false,
})
export class D6PipPipe implements PipeTransform {
  transform(value: number): string {
    const dice = Math.floor(value / 3);
    const pips = value % 3;

    if (dice === 0) {
      return pips > 0 ? `+${pips}` : '0';
    }

    return pips > 0 ? `${dice}D+${pips}` : `${dice}D`;
  }
}
