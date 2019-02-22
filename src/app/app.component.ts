import { Component } from '@angular/core';
import {DiceService} from './perfugium/service/dice.service';

@Component({
  selector: 'prf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pefugium';

  constructor(private dice: DiceService) {
    console.log(this.dice.roll('d6'));
    console.log(this.dice.roll('2d10+6'));
    console.log(this.dice.roll('2d10!'));
    console.log(this.dice.roll('-2d10!10'));
    console.log(this.dice.roll('3d10!k2+20'));

    const array: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < 10000; i++) {
      array[this.dice.roll('d10').result - 1]++;
    }
    console.log(array);
  }
}
