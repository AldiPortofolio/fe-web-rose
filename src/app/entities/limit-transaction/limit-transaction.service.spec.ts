import { TestBed } from '@angular/core/testing';

import { LimitTransactionService } from './limit-transaction.service';

describe('LimitTransactionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LimitTransactionService = TestBed.get(LimitTransactionService);
    expect(service).toBeTruthy();
  });
});
