import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantAggregatorDetailApprovalComponent } from './merchant-aggregator-detail-approval.component';

describe('MerchantAggregatorDetailApprovalComponent', () => {
  let component: MerchantAggregatorDetailApprovalComponent;
  let fixture: ComponentFixture<MerchantAggregatorDetailApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MerchantAggregatorDetailApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantAggregatorDetailApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
