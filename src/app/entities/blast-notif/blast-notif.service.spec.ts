import { TestBed } from '@angular/core/testing';

import { BlastNotifService } from './blast-notif.service';

describe('BlastNotifService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BlastNotifService = TestBed.get(BlastNotifService);
    expect(service).toBeTruthy();
  });
});
