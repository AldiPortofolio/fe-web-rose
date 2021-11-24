import { TestBed } from '@angular/core/testing';

import { AssignMerchantAggregatorService } from './assign-merchant-aggregator.service';

describe('AssignMerchantAggregatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssignMerchantAggregatorService = TestBed.get(AssignMerchantAggregatorService);
    expect(service).toBeTruthy();
  });
});
