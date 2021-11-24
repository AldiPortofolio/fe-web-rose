import { TestBed } from '@angular/core/testing';

import { ClearSessionService } from './clear-session.service';

describe('ClearSessionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClearSessionService = TestBed.get(ClearSessionService);
    expect(service).toBeTruthy();
  });
});
