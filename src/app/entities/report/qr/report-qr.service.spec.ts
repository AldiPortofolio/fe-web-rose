import { TestBed } from '@angular/core/testing';

import { ReportQrService } from './report-qr.service';

describe('ReportQrService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReportQrService = TestBed.get(ReportQrService);
    expect(service).toBeTruthy();
  });
});
