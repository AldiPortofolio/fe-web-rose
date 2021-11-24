import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatedDataMerchantComponent } from './updated-data-merchant.component';

describe('UpdatedDataMerchantComponent', () => {
  let component: UpdatedDataMerchantComponent;
  let fixture: ComponentFixture<UpdatedDataMerchantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatedDataMerchantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatedDataMerchantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
