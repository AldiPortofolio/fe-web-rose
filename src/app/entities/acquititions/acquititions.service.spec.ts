import { TestBed } from '@angular/core/testing';

import { AcquititionsService } from './acquititions.service';

describe('AcquititionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AcquititionsService = TestBed.get(AcquititionsService);
    expect(service).toBeTruthy();
  });
});
