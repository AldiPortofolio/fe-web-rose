import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadMerchantWipComponent } from './upload-merchant-wip.component';

describe('UploadMerchantWipComponent', () => {
  let component: UploadMerchantWipComponent;
  let fixture: ComponentFixture<UploadMerchantWipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadMerchantWipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadMerchantWipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
