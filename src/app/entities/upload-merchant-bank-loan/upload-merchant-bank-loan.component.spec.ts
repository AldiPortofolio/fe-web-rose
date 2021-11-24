import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadMerchantBankLoanComponent } from './upload-merchant-bank-loan.component';

describe('UploadMerchantBankLoanComponent', () => {
  let component: UploadMerchantBankLoanComponent;
  let fixture: ComponentFixture<UploadMerchantBankLoanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadMerchantBankLoanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadMerchantBankLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
