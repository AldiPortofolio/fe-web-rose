import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadMerchantComponent } from './upload-merchant.component';

describe('UploadMerchantComponent', () => {
  let component: UploadMerchantComponent;
  let fixture: ComponentFixture<UploadMerchantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadMerchantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadMerchantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
