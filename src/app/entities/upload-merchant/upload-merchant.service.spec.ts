import { TestBed } from '@angular/core/testing';

import { UploadMerchantService } from './upload-merchant.service';

describe('UploadMerchantService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UploadMerchantService = TestBed.get(UploadMerchantService);
    expect(service).toBeTruthy();
  });
});
