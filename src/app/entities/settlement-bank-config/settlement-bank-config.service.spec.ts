import { TestBed } from '@angular/core/testing';

import { SettlementBankConfigService } from './settlement-bank-config.service';

describe('SettlementBankConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SettlementBankConfigService = TestBed.get(SettlementBankConfigService);
    expect(service).toBeTruthy();
  });
});
