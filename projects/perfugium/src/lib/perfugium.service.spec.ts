import {TestBed} from '@angular/core/testing';

import {PerfugiumService} from './perfugium.service';

describe('PerfugiumService', () => {
  let service: PerfugiumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerfugiumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
