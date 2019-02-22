import { TestBed } from '@angular/core/testing';

import { Sw2eGameService } from './sw2e-game.service';

describe('Sw2eGameService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Sw2eGameService = TestBed.get(Sw2eGameService);
    expect(service).toBeTruthy();
  });
});
