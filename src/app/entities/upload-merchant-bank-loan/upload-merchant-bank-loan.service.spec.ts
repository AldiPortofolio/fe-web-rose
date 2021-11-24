import { TestBed } from '@angular/core/testing';

import { UploadMerchantBankLoanService } from './upload-merchant-bank-loan.service';

describe('UploadMerchantBankLoanService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UploadMerchantBankLoanService = TestBed.get(UploadMerchantBankLoanService);
    expect(service).toBeTruthy();
  });
});
