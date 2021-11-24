import { TestBed } from '@angular/core/testing';

import { ReportExportAkuisisiSfaService } from './report-export-akuisisi-sfa.service';

describe('ReportExportAkuisisiSfaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReportExportAkuisisiSfaService = TestBed.get(ReportExportAkuisisiSfaService);
    expect(service).toBeTruthy();
  });
});
