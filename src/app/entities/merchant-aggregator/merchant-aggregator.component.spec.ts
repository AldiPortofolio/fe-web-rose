import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantAggregatorComponent } from './merchant-aggregator.component';

describe('MerchantAggregatorComponent', () => {
  let component: MerchantAggregatorComponent;
  let fixture: ComponentFixture<MerchantAggregatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MerchantAggregatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantAggregatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
