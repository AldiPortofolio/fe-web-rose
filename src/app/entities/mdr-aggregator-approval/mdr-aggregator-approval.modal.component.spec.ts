import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MdrAggregatorApprovalModalComponent } from './mdr-aggregator-approval.modal.component';

describe('MdrAggregatorApprovalModalComponent', () => {
  let component: MdrAggregatorApprovalModalComponent;
  let fixture: ComponentFixture<MdrAggregatorApprovalModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MdrAggregatorApprovalModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MdrAggregatorApprovalModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
