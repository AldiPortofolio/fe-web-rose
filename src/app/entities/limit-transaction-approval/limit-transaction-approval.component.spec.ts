import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LimitTransactionApprovalComponent } from './limit-transaction-approval.component';

describe('LimitTransactionApprovalComponent', () => {
  let component: LimitTransactionApprovalComponent;
  let fixture: ComponentFixture<LimitTransactionApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LimitTransactionApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LimitTransactionApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
