import { TestBed } from '@angular/core/testing';

import { PortalAccessService } from './portal-access.service';

describe('PortalAccessService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PortalAccessService = TestBed.get(PortalAccessService);
    expect(service).toBeTruthy();
  });
});
