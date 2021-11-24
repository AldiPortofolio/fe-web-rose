import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadMerchantMasterTagComponent } from './upload-merchant-master-tag.component';

describe('UploadMerchantMasterTagComponent', () => {
  let component: UploadMerchantMasterTagComponent;
  let fixture: ComponentFixture<UploadMerchantMasterTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadMerchantMasterTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadMerchantMasterTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
