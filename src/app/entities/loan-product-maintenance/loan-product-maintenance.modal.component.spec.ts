import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanProductMaintenanceModalComponent } from './loan-product-maintenance.modal.component';

describe('LoanProductMaintenanceModalComponent', () => {
  let component: LoanProductMaintenanceModalComponent;
  let fixture: ComponentFixture<LoanProductMaintenanceModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanProductMaintenanceModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanProductMaintenanceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
