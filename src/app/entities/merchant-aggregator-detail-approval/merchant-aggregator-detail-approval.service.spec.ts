import { TestBed } from '@angular/core/testing';

import { MerchantAggregatorDetailApprovalService } from './merchant-aggregator-detail-approval.service';

describe('MerchantAggregatorDetailApprovalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MerchantAggregatorDetailApprovalService = TestBed.get(MerchantAggregatorDetailApprovalService);
    expect(service).toBeTruthy();
  });
});
