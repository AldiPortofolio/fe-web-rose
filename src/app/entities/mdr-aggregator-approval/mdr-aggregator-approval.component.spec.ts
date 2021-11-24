import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MdrAggregatorApprovalComponent } from './mdr-aggregator-approval.component';

describe('MdrAggregatorApprovalComponent', () => {
  let component: MdrAggregatorApprovalComponent;
  let fixture: ComponentFixture<MdrAggregatorApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MdrAggregatorApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MdrAggregatorApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
