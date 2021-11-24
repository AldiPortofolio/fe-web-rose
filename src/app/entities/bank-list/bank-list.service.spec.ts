import { TestBed } from '@angular/core/testing';

import { BankListService } from './bank-list.service';

describe('BankListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BankListService = TestBed.get(BankListService);
    expect(service).toBeTruthy();
  });
});
