import { TestBed } from '@angular/core/testing';

import { LimitTransactionApprovalService } from './limit-transaction-approval.service';

describe('LimitTransactionApprovalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LimitTransactionApprovalService = TestBed.get(LimitTransactionApprovalService);
    expect(service).toBeTruthy();
  });
});
