import { TestBed } from '@angular/core/testing';

import { D6Service } from './d6.service';

describe('D6Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: D6Service = TestBed.get(D6Service);
    expect(service).toBeTruthy();
  });
});
