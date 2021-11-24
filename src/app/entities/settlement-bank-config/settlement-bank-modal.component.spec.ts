import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettlementBankModalComponent } from './settlement-bank-modal.component';

describe('SettlementBankModalComponent', () => {
  let component: SettlementBankModalComponent;
  let fixture: ComponentFixture<SettlementBankModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettlementBankModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettlementBankModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
