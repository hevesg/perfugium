import { TestBed } from '@angular/core/testing';

import { GameService } from './game.service';
import {Injectable} from '@angular/core';

describe('GameService', () => {

  @Injectable({
    providedIn: 'root'
  })
  class TestService extends GameService {
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
