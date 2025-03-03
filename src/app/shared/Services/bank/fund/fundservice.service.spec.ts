import { TestBed } from '@angular/core/testing';

import { FundserviceService } from './fundservice.service';

describe('FundserviceService', () => {
  let service: FundserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FundserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
