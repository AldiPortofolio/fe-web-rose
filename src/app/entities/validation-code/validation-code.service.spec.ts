import { TestBed } from '@angular/core/testing';

import { ValidationCodeService } from './validation-code.service';

describe('ValidationCodeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ValidationCodeService = TestBed.get(ValidationCodeService);
    expect(service).toBeTruthy();
  });
});
