import { TestBed } from '@angular/core/testing';

import { UpdatedDataMerchantService } from './updated-data-merchant.service';

describe('UpdatedDataMerchantService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UpdatedDataMerchantService = TestBed.get(UpdatedDataMerchantService);
    expect(service).toBeTruthy();
  });
});
