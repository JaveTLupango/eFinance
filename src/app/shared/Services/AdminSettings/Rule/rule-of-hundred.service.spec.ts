import { TestBed } from '@angular/core/testing';

import { RuleOfHundredService } from './rule-of-hundred.service';

describe('RuleOfHundredService', () => {
  let service: RuleOfHundredService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RuleOfHundredService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
