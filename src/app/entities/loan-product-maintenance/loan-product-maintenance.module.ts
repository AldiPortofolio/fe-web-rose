import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoanProductMaintenanceComponent } from './loan-product-maintenance.component';
import { LoanProductMaintenanceModalComponent } from './loan-product-maintenance.modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { LoanProductMaintenanceService } from './loan-product-maintenance.service';

@NgModule({
  declarations: [LoanProductMaintenanceComponent, LoanProductMaintenanceModalComponent],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule
  ],
  entryComponents: [
    LoanProductMaintenanceComponent, LoanProductMaintenanceModalComponent
  ],
  providers: [
    LoanProductMaintenanceService,
  ],
})
export class LoanProductMaintenanceModule { }
