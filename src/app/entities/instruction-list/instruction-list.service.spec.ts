import { TestBed } from '@angular/core/testing';

import { InstructionListService } from './instruction-list.service';

describe('InstructionListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InstructionListService = TestBed.get(InstructionListService);
    expect(service).toBeTruthy();
  });
});
