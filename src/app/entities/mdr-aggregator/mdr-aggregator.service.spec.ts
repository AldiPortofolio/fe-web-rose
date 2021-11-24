import { TestBed } from '@angular/core/testing';

import { MdrAggregatorService } from './mdr-aggregator.service';

describe('MdrAggregatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MdrAggregatorService = TestBed.get(MdrAggregatorService);
    expect(service).toBeTruthy();
  });
});
