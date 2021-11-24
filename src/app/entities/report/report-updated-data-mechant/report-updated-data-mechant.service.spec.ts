import { TestBed } from '@angular/core/testing';

import { ReportUpdatedDataMechantService } from './report-updated-data-mechant.service';

describe('ReportUpdatedDataMechantService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReportUpdatedDataMechantService = TestBed.get(ReportUpdatedDataMechantService);
    expect(service).toBeTruthy();
  });
});
