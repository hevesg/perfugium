import { Pipe, PipeTransform } from '@angular/core';

const DIFFICULTY_LEVELS: Record<number, string> = {
  0: 'Very Easy',
  1: 'Easy',
  2: 'Moderate',
  3: 'Difficult',
  4: 'Very Difficult',
  5: 'Heroic',
};

@Pipe({
  name: 'd6Difficulty',
  standalone: false,
})
export class D6DifficultyPipe implements PipeTransform {
  transform(value: number): string {
    return DIFFICULTY_LEVELS[value] ?? `Unknown (${value})`;
  }
}
