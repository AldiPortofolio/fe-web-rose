import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubMerchantBankLoanComponent } from './sub-merchant-bank-loan.component';

describe('SubMerchantBankLoanComponent', () => {
  let component: SubMerchantBankLoanComponent;
  let fixture: ComponentFixture<SubMerchantBankLoanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubMerchantBankLoanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubMerchantBankLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
