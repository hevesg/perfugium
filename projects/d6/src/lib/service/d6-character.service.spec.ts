import { TestBed } from '@angular/core/testing';

import { D6CharacterService } from './d6-character.service';

describe('D6CharacterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: D6CharacterService = TestBed.get(D6CharacterService);
    expect(service).toBeTruthy();
  });
});
