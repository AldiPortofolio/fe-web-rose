import { TestBed } from '@angular/core/testing';

import { UploadMerchantWipService } from './upload-merchant-wip.service';

describe('UploadMerchantWipService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UploadMerchantWipService = TestBed.get(UploadMerchantWipService);
    expect(service).toBeTruthy();
  });
});
