import { TestBed } from '@angular/core/testing';

import { VersionAppService } from './version-app.service';

describe('VersionAppService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VersionAppService = TestBed.get(VersionAppService);
    expect(service).toBeTruthy();
  });
});
