import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReportExportMerchantComponent } from './report-export-merchant.component';
import { ReportExportMerchantService } from './report-export-merchant.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    ReportExportMerchantComponent,
  ],
  providers: [
    ReportExportMerchantService,
  ]
})
export class ReportExportMerchantModule { }
