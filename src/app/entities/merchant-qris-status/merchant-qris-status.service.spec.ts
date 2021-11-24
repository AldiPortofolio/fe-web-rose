import { TestBed } from '@angular/core/testing';

import { MerchantQrisStatusService } from './merchant-qris-status.service';

describe('MerchantQrisStatusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MerchantQrisStatusService = TestBed.get(MerchantQrisStatusService);
    expect(service).toBeTruthy();
  });
});
