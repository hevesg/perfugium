import { TestBed } from '@angular/core/testing';

import { D6CharacterService } from './d6-character.service';
import {Injectable} from '@angular/core';

describe('D6CharacterService', () => {

  @Injectable({
    providedIn: 'root'
  })
  class TestService extends D6CharacterService {
    constructor() {
      super('test');
    }
  }

  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TestService = TestBed.get(TestService);
    expect(service).toBeTruthy();
  });
});
