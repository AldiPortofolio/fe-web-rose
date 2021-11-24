import { TestBed } from '@angular/core/testing';

import { ReportCrmPenugasanService } from './report-crm-penugasan.service';

describe('ReportCrmPenugasanService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReportCrmPenugasanService = TestBed.get(ReportCrmPenugasanService);
    expect(service).toBeTruthy();
  });
});
