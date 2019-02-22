import { TestBed } from '@angular/core/testing';

import { CharacterService } from './character.service';
import {Injectable} from '@angular/core';

describe('CharacterService', () => {

  @Injectable({
    providedIn: 'root'
  })
  class TestService extends CharacterService {
    constructor() {
      super('test');
    }
  }

  beforeEach(() => TestBed.configureTestingModule({ }));

  it('should be created', () => {
    const service: TestService = TestBed.get(TestService);
    expect(service).toBeTruthy();
  });
});
