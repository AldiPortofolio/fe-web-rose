import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantAggregatorDetailComponent } from './merchant-aggregator-detail.component';

describe('MerchantAggregatorDetailComponent', () => {
  let component: MerchantAggregatorDetailComponent;
  let fixture: ComponentFixture<MerchantAggregatorDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MerchantAggregatorDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantAggregatorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
