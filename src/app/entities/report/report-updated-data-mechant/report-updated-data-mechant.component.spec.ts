import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportUpdatedDataMechantComponent } from './report-updated-data-mechant.component';

describe('ReportUpdatedDataMechantComponent', () => {
  let component: ReportUpdatedDataMechantComponent;
  let fixture: ComponentFixture<ReportUpdatedDataMechantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportUpdatedDataMechantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportUpdatedDataMechantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
