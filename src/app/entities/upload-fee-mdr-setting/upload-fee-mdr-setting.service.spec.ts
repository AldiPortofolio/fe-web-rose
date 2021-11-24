import { TestBed } from '@angular/core/testing';

import { UploadFeeMdrSettingService } from './upload-fee-mdr-setting.service';

describe('UploadFeeMdrSettingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UploadFeeMdrSettingService = TestBed.get(UploadFeeMdrSettingService);
    expect(service).toBeTruthy();
  });
});
