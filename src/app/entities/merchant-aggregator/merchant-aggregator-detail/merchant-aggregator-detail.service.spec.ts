import { TestBed } from '@angular/core/testing';

import { MerchantAggregatorDetailService } from './merchant-aggregator-detail.service';

describe('MerchantAggregatorDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MerchantAggregatorDetailService = TestBed.get(MerchantAggregatorDetailService);
    expect(service).toBeTruthy();
  });
});
