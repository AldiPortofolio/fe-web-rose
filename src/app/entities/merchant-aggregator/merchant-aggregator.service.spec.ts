import { TestBed } from '@angular/core/testing';

import { MerchantAggregatorService } from './merchant-aggregator.service';

describe('MerchantAggregatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MerchantAggregatorService = TestBed.get(MerchantAggregatorService);
    expect(service).toBeTruthy();
  });
});
