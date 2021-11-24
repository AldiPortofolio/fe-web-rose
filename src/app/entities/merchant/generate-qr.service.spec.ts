import { TestBed } from '@angular/core/testing';

import { GenerateQrService } from './generate-qr.service';

describe('GenerateQrService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GenerateQrService = TestBed.get(GenerateQrService);
    expect(service).toBeTruthy();
  });
});
