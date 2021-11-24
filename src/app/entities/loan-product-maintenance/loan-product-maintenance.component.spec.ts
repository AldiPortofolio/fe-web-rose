import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanProductMaintenanceComponent } from './loan-product-maintenance.component';

describe('LoanProductMaintenanceComponent', () => {
  let component: LoanProductMaintenanceComponent;
  let fixture: ComponentFixture<LoanProductMaintenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanProductMaintenanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanProductMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
