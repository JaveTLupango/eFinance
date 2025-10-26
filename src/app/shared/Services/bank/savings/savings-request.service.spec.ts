import { TestBed } from '@angular/core/testing';

import { SavingsRequestService } from './savings-request.service';

describe('SavingsRequestService', () => {
  let service: SavingsRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SavingsRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
