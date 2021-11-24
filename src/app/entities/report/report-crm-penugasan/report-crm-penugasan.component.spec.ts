import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCrmPenugasanComponent } from './report-crm-penugasan.component';

describe('ReportCrmPenugasanComponent', () => {
  let component: ReportCrmPenugasanComponent;
  let fixture: ComponentFixture<ReportCrmPenugasanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportCrmPenugasanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportCrmPenugasanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
