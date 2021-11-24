import { TestBed } from '@angular/core/testing';

import { ReportExportMerchantService } from './report-export-merchant.service';

describe('ReportExportMerchantService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReportExportMerchantService = TestBed.get(ReportExportMerchantService);
    expect(service).toBeTruthy();
  });
});
