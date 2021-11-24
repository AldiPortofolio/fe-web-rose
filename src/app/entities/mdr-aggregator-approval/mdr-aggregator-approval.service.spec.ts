import { TestBed } from '@angular/core/testing';

import { MdrAggregatorApprovalService } from './mdr-aggregator-approval.service';

describe('MdrAggregatorApprovalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MdrAggregatorApprovalService = TestBed.get(MdrAggregatorApprovalService);
    expect(service).toBeTruthy();
  });
});
