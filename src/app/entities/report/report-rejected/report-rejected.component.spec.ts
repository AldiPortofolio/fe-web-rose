import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportRejectedComponent } from './report-rejected.component';

describe('ReportRejectedComponent', () => {
  let component: ReportRejectedComponent;
  let fixture: ComponentFixture<ReportRejectedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportRejectedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportRejectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
