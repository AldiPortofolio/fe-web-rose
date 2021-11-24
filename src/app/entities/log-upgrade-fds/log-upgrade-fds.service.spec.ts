import { TestBed } from '@angular/core/testing';

import { LogUpgradeFdsService } from './log-upgrade-fds.service';

describe('LogUpgradeFdsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LogUpgradeFdsService = TestBed.get(LogUpgradeFdsService);
    expect(service).toBeTruthy();
  });
});
