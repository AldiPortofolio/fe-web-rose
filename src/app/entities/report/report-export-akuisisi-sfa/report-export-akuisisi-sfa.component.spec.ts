import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportExportAkuisisiSfaComponent } from './report-export-akuisisi-sfa.component';

describe('ReportExportAkuisisiSfaComponent', () => {
  let component: ReportExportAkuisisiSfaComponent;
  let fixture: ComponentFixture<ReportExportAkuisisiSfaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportExportAkuisisiSfaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportExportAkuisisiSfaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
