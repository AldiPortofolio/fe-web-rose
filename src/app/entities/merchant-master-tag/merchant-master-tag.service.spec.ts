import { TestBed } from '@angular/core/testing';

import { MerchantMasterTagService } from './merchant-master-tag.service';

describe('MerchantMasterTagService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MerchantMasterTagService = TestBed.get(MerchantMasterTagService);
    expect(service).toBeTruthy();
  });
});
