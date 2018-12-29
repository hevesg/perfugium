import { TestBed } from '@angular/core/testing';

import { CharacterServiceService } from './character.service';

describe('CharacterServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CharacterServiceService = TestBed.get(CharacterServiceService);
    expect(service).toBeTruthy();
  });
});
