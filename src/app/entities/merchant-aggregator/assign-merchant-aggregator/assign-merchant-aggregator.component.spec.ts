import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignMerchantAggregatorComponent } from './assign-merchant-aggregator.component';

describe('AssignMerchantAggregatorComponent', () => {
  let component: AssignMerchantAggregatorComponent;
  let fixture: ComponentFixture<AssignMerchantAggregatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignMerchantAggregatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignMerchantAggregatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
