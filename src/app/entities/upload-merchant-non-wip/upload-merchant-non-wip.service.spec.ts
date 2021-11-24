import { TestBed } from '@angular/core/testing';

import { UploadMerchantNonWipService } from './upload-merchant-non-wip.service';

describe('UploadMerchantNonWipService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UploadMerchantNonWipService = TestBed.get(UploadMerchantNonWipService);
    expect(service).toBeTruthy();
  });
});
