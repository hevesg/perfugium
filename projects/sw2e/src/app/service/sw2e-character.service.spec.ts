import { TestBed } from '@angular/core/testing';

import { Sw2eCharacterServiceService } from './sw2e-character.service';

describe('Sw2eCharacterServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Sw2eCharacterServiceService = TestBed.get(Sw2eCharacterServiceService);
    expect(service).toBeTruthy();
  });
});
