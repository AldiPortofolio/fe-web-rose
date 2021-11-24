import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantBankLoanComponent } from './merchant-bank-loan.component';

describe('MerchantBankLoanComponent', () => {
  let component: MerchantBankLoanComponent;
  let fixture: ComponentFixture<MerchantBankLoanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MerchantBankLoanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantBankLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
