import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LimitTransactionApprovalModalComponent } from './limit-transaction-approval.modal.component';

describe('LimitTransactionApproval.ModalComponent', () => {
  let component: LimitTransactionApprovalModalComponent;
  let fixture: ComponentFixture<LimitTransactionApprovalModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LimitTransactionApprovalModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LimitTransactionApprovalModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
