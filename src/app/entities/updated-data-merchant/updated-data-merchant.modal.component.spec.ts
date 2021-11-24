import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatedDataMerchantModalComponent } from './updated-data-merchant.modal.component';

describe('UpdatedDataMerchantModalComponent', () => {
  let component: UpdatedDataMerchantModalComponent;
  let fixture: ComponentFixture<UpdatedDataMerchantModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatedDataMerchantModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatedDataMerchantModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
