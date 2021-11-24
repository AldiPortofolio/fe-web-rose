import { TestBed } from '@angular/core/testing';

import { ValidationCodeMasterTagService } from './validation-code-master-tag.service';

describe('ValidationCodeMasterTagService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ValidationCodeMasterTagService = TestBed.get(ValidationCodeMasterTagService);
    expect(service).toBeTruthy();
  });
});
