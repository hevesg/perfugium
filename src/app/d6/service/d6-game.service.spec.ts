import { TestBed } from '@angular/core/testing';

import { D6GameService } from './d6-game.service';
import {Injectable} from '@angular/core';

describe('D6GameService', () => {

  @Injectable({
    providedIn: 'root'
  })
  class TestService extends D6GameService {
    constructor() {
      super();
    }
  }

  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TestService = TestBed.get(TestService);
    expect(service).toBeTruthy();
  });
});
