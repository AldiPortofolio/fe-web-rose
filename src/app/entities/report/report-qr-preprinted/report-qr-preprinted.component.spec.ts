import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportQrPreprintedComponent } from './report-qr-preprinted.component';

describe('ReportQrPreprintedComponent', () => {
  let component: ReportQrPreprintedComponent;
  let fixture: ComponentFixture<ReportQrPreprintedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportQrPreprintedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportQrPreprintedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
