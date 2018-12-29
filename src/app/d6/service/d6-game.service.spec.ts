import { TestBed } from '@angular/core/testing';

import { D6GameService } from './d6-game.service';

describe('D6GameService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: D6GameService = TestBed.get(D6GameService);
    expect(service).toBeTruthy();
  });
});
