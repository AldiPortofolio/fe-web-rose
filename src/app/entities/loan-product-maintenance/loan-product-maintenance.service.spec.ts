import { TestBed } from '@angular/core/testing';

import { LoanProductMaintenanceService } from './loan-product-maintenance.service';

describe('LoanProductMaintenanceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoanProductMaintenanceService = TestBed.get(LoanProductMaintenanceService);
    expect(service).toBeTruthy();
  });
});
