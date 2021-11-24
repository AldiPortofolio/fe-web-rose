import { TestBed } from '@angular/core/testing';

import { ReportQrPreprintedService } from './report-qr-preprinted.service';

describe('ReportQrPreprintedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReportQrPreprintedService = TestBed.get(ReportQrPreprintedService);
    expect(service).toBeTruthy();
  });
});
