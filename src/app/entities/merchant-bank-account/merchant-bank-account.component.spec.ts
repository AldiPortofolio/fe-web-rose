import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantBankAccountComponent } from './merchant-bank-account.component';

describe('MerchantBankAccountComponent', () => {
  let component: MerchantBankAccountComponent;
  let fixture: ComponentFixture<MerchantBankAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MerchantBankAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantBankAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
