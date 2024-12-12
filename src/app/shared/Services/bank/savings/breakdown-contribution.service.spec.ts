import { TestBed } from '@angular/core/testing';

import { BreakdownContributionService } from './breakdown-contribution.service';

describe('BreakdownContributionService', () => {
  let service: BreakdownContributionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BreakdownContributionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
