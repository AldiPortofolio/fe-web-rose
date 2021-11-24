import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportExportMerchantComponent } from './report-export-merchant.component';

describe('ReportExportMerchantComponent', () => {
  let component: ReportExportMerchantComponent;
  let fixture: ComponentFixture<ReportExportMerchantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportExportMerchantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportExportMerchantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
