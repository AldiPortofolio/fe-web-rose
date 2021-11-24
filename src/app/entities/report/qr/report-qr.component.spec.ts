import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportQrComponent } from './report-qr.component';

describe('ReportQrComponent', () => {
  let component: ReportQrComponent;
  let fixture: ComponentFixture<ReportQrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportQrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
