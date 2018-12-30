import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pip'
})
export class PipPipe implements PipeTransform {

  transform(value: any, args?: any): string {
    let ret: string = Math.floor(value / 3) + 'D';
    const mod: number = value % 3;
    if (mod > 0) {
      ret += '+' + mod;
    }
    return ret;
  }

}
