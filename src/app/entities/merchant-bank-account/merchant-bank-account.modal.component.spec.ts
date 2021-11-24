import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantBankAccountModalComponent } from './merchant-bank-account.modal.component';

describe('MerchantBankAccountModalComponent', () => {
  let component: MerchantBankAccountModalComponent;
  let fixture: ComponentFixture<MerchantBankAccountModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MerchantBankAccountModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantBankAccountModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
