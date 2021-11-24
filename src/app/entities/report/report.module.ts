import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportSLAComponent } from './sla/report-sla.component';
import { ReportProductivityComponent } from './productivity/report-productivity.component';
import { ReportFinishedComponent } from './finished/report-finished.component';
import { ReportSLAService } from './sla/report-sla.service';
import { ReportProductivityService } from './productivity/report-productivity.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ReportFinishedService } from './finished/report-finished.service';
import { ReportRejectService } from './reject/report-reject.service';
import { ReportRejectComponent } from './reject/report-reject.component';
import { FinishedReportComponent } from './finished-report/finished-report.component';
import { ReportQrComponent } from './qr/report-qr.component';
import { ReportRejectedComponent } from './report-rejected/report-rejected.component';
import { ReportQrPreprintedComponent } from './report-qr-preprinted/report-qr-preprinted.component';
import { ReportQrPreprintedService } from './report-qr-preprinted/report-qr-preprinted.service';
import { ReportCrmPenugasanComponent } from './report-crm-penugasan/report-crm-penugasan.component';
import { ReportCrmPenugasanService } from './report-crm-penugasan/report-crm-penugasan.service';
import { ReportUpdatedDataMechantComponent } from './report-updated-data-mechant/report-updated-data-mechant.component';
import { ReportExportMerchantComponent } from './report-export-merchant/report-export-merchant.component';
import { ReportExportAkuisisiSfaComponent } from './report-export-akuisisi-sfa/report-export-akuisisi-sfa.component';


@NgModule({
    declarations: [
        ReportSLAComponent,
        ReportProductivityComponent,
        ReportFinishedComponent,
        ReportRejectComponent,
        FinishedReportComponent,
        ReportQrComponent,
        ReportRejectedComponent,
        ReportQrPreprintedComponent,
        ReportCrmPenugasanComponent,
        ReportUpdatedDataMechantComponent,
        ReportExportMerchantComponent,
        ReportExportAkuisisiSfaComponent,
    ],
    imports: [
        CommonModule,
        NgbModule,
        FormsModule
    ],
    entryComponents: [
        ReportSLAComponent,
        ReportProductivityComponent,
        ReportFinishedComponent,
        ReportRejectComponent,
        ReportQrPreprintedComponent,
        ReportCrmPenugasanComponent,
        ReportUpdatedDataMechantComponent,
        ReportExportMerchantComponent
    ],
    providers: [
        ReportSLAService,
        ReportProductivityService,
        ReportFinishedService,
        ReportRejectService,
        ReportQrPreprintedService,
        ReportCrmPenugasanService
    ],
    exports: [
        // RegionModalComponent
    ]
})
export class ReportModule { }

