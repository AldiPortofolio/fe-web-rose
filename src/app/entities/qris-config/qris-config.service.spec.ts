import { TestBed } from '@angular/core/testing';

import { QrisConfigService } from './qris-config.service';

describe('QrisConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QrisConfigService = TestBed.get(QrisConfigService);
    expect(service).toBeTruthy();
  });
});
