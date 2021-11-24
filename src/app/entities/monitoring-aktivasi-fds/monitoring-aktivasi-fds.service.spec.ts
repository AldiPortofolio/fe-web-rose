import { TestBed } from '@angular/core/testing';

import { MonitoringAktivasiFdsService } from './monitoring-aktivasi-fds.service';

describe('MonitoringAktivasiFdsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MonitoringAktivasiFdsService = TestBed.get(MonitoringAktivasiFdsService);
    expect(service).toBeTruthy();
  });
});
