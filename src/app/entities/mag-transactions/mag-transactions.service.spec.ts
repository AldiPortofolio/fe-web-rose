import { TestBed } from '@angular/core/testing';

import { MagTransactionsService } from './mag-transactions.service';

describe('MagTransactionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MagTransactionsService = TestBed.get(MagTransactionsService);
    expect(service).toBeTruthy();
  });
});
