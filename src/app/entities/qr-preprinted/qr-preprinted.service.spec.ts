import { TestBed } from '@angular/core/testing';

import { QrPreprintedService } from './qr-preprinted.service';

describe('QrPreprintedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QrPreprintedService = TestBed.get(QrPreprintedService);
    expect(service).toBeTruthy();
  });
});
