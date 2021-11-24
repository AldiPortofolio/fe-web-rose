import { TestBed } from '@angular/core/testing';

import { KategoriBisnisService } from './kategori-bisnis.service';

describe('KategoriBisnisService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KategoriBisnisService = TestBed.get(KategoriBisnisService);
    expect(service).toBeTruthy();
  });
});
