import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettlementBankConfigComponent } from './settlement-bank-config.component';

describe('SettlementBankConfigComponent', () => {
  let component: SettlementBankConfigComponent;
  let fixture: ComponentFixture<SettlementBankConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettlementBankConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettlementBankConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
