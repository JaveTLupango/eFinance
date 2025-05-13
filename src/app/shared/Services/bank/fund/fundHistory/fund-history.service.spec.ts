import { TestBed } from '@angular/core/testing';

import { FundHistoryService } from './fund-history.service';

describe('FundHistoryService', () => {
  let service: FundHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FundHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
