import { TestBed } from '@angular/core/testing';

import { MccService } from './mcc.service';

describe('MccService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MccService = TestBed.get(MccService);
    expect(service).toBeTruthy();
  });
});
