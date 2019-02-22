import { Pipe, PipeTransform } from '@angular/core';
import {D6WeaponRange} from '../interface/d6-weapon-range';

@Pipe({
  name: 'd6WeaponRange'
})
export class D6WeaponRangePipe implements PipeTransform {

  transform(value: D6WeaponRange): string {
    return value.pb + '-' + value.short + '/' + value.medium + '/' + value.long;
  }

}
