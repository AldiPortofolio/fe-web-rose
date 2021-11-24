import { TestBed } from '@angular/core/testing';

import { UploadMissingDataService } from './upload-missing-data.service';

describe('UploadMissingDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UploadMissingDataService = TestBed.get(UploadMissingDataService);
    expect(service).toBeTruthy();
  });
});
