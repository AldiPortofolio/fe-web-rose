import { TestBed } from '@angular/core/testing';

import { ReportRejectedService } from './report-rejected.service';

describe('ReportRejectedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReportRejectedService = TestBed.get(ReportRejectedService);
    expect(service).toBeTruthy();
  });
});
