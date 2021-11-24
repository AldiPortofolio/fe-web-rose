import { TestBed } from '@angular/core/testing';

import { MerchantBankLoanService } from './merchant-bank-loan.service';

describe('MerchantBankLoanService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MerchantBankLoanService = TestBed.get(MerchantBankLoanService);
    expect(service).toBeTruthy();
  });
});
