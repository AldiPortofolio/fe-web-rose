import { TestBed } from '@angular/core/testing';

import { UploadMerchantMasterTagService } from './upload-merchant-master-tag.service';

describe('UploadMerchantMasterTagService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UploadMerchantMasterTagService = TestBed.get(UploadMerchantMasterTagService);
    expect(service).toBeTruthy();
  });
});
