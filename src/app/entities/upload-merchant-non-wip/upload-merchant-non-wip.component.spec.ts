import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadMerchantNonWipComponent } from './upload-merchant-non-wip.component';

describe('UploadMerchantNonWipComponent', () => {
  let component: UploadMerchantNonWipComponent;
  let fixture: ComponentFixture<UploadMerchantNonWipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadMerchantNonWipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadMerchantNonWipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
