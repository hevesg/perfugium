import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { CharacterService } from '../services/character.service';
import { Character } from '../model/character';

export const characterResolver: ResolveFn<Character> = <T>(route: ActivatedRouteSnapshot) => {
  const service = inject(CharacterService<Character>);
  return service.load(route.paramMap.get('id')!);
};
