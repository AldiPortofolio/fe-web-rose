import { TestBed } from '@angular/core/testing';

import { MasterTagService } from './master-tag.service';

describe('MasterTagService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MasterTagService = TestBed.get(MasterTagService);
    expect(service).toBeTruthy();
  });
});
