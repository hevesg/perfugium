import {TestBed} from '@angular/core/testing';

import {D6Service} from './d6.service';

describe('D6Service', () => {
  let service: D6Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(D6Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
