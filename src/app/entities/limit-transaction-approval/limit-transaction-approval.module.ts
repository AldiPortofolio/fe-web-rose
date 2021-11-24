import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LimitTransactionApprovalComponent } from './limit-transaction-approval.component';
import { LimitTransactionApprovalModalComponent } from './limit-transaction-approval.modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { LimitTransactionApprovalService } from './limit-transaction-approval.service';

@NgModule({
    declarations: [
        LimitTransactionApprovalComponent,
        LimitTransactionApprovalModalComponent
    ],
    imports: [
        CommonModule,
        NgbModule,
        FormsModule
    ],
    entryComponents: [
        LimitTransactionApprovalComponent,
        LimitTransactionApprovalModalComponent
    ],
    providers: [
        LimitTransactionApprovalService,
    ],
    exports: [
        LimitTransactionApprovalModalComponent
    ]
})
export class LimitTransactionApprovalModule { }
